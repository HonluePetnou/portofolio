"use client";

import { useRef, useState } from "react";
import {
  Loader2,
  Upload,
  X,
  UserCircle,
  CloudUpload,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AvatarUploadProps {
  value: string;
  onChange: (url: string) => void;
  folder?: "testimonials" | "articles" | "projects" | "general";
  variant?: "avatar" | "banner";
}

export function AvatarUpload({
  value,
  onChange,
  folder = "general",
  variant = "avatar",
}: AvatarUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setError("Asset exceeds 5MB limit.");
      return;
    }

    setError(null);
    setIsUploading(true);

    try {
      const token = localStorage.getItem("auth_token");
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

      const body = new FormData();
      body.append("file", file);
      body.append("folder", folder);

      const res = await fetch(`${apiUrl}/media/upload`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body,
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.detail || "Strategic upload failed");
      }

      const data = await res.json();
      onChange(`${apiUrl}${data.url}`);
    } catch (err: any) {
      setError(err.message || "Narrative disruption: Upload failed.");
    } finally {
      setIsUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const handleClear = () => {
    onChange("");
    setError(null);
  };

  // ── Circular Avatar Variant ──────────────────────────────────────────────
  if (variant === "avatar") {
    return (
      <div className="flex flex-col items-center gap-3">
        <div
          className="relative group/avatar cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => !isUploading && inputRef.current?.click()}
        >
          {/* External Halo Effect */}
          <div
            className={cn(
              "absolute -inset-1 rounded-full bg-linear-to-tr from-primary via-indigo-500 to-rose-500 opacity-0 group-hover/avatar:opacity-100 transition-opacity duration-700 blur-[2px]",
              isUploading && "opacity-100 animate-pulse",
            )}
          />

          <div
            className={cn(
              "relative h-20 w-20 rounded-full border-2 border-white/10 bg-slate-900 flex items-center justify-center overflow-hidden transition-all duration-500 z-10 shadow-2xl",
              isHovered && "scale-105 border-white/20",
            )}
          >
            {value ? (
              <img
                src={value}
                alt="Identity representation"
                className="h-full w-full object-cover transition-transform duration-700 group-hover/avatar:scale-110"
              />
            ) : isUploading ? (
              <div className="flex flex-col items-center">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            ) : (
              <div className="flex flex-col items-center text-white/30 group-hover/avatar:text-primary transition-colors">
                <UserCircle className="h-8 w-8" />
              </div>
            )}

            {/* Hover Camera Overlay */}
            <div className="absolute inset-0 bg-primary/20 backdrop-blur-sm opacity-0 group-hover/avatar:opacity-100 transition-opacity flex items-center justify-center">
              <CloudUpload className="h-5 w-5 text-white" />
            </div>
          </div>

          {/* Premium Clear Button */}
          {value && !isUploading && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleClear();
              }}
              className="absolute -top-1 -right-1 h-6 w-6 rounded-full bg-slate-950 border border-white/10 text-white
                         flex items-center justify-center shadow-2xl hover:bg-rose-500 hover:border-rose-500 transition-all z-20 group/remove"
            >
              <X className="h-3 w-3 group-hover/remove:scale-110" />
            </button>
          )}
        </div>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
          disabled={isUploading}
        />

        {error && (
          <p className="text-[9px] text-rose-500 font-bold uppercase tracking-[0.1em] animate-in slide-in-from-top-1">
            {error}
          </p>
        )}
      </div>
    );
  }

  // ── Banner Variant (Premium Large) ──────────────────────────────────────────
  return (
    <div className="space-y-4 w-full">
      <div
        className={cn(
          "relative rounded-[2rem] border-2 border-dashed overflow-hidden flex items-center justify-center cursor-pointer transition-all duration-700 h-48",
          value
            ? "border-transparent shadow-2xl"
            : "border-white/10 bg-white/[0.02] hover:bg-primary/5 hover:border-primary/50",
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => !isUploading && !value && inputRef.current?.click()}
      >
        {/* Ambient Glow */}
        <div
          className={cn(
            "absolute inset-0 bg-primary/10 blur-[80px] transition-opacity duration-1000",
            isHovered && !value ? "opacity-100" : "opacity-0",
          )}
        />

        {value ? (
          <div className="relative h-full w-full group/banner">
            <img
              src={value}
              alt="Contextual representation"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover/banner:scale-105"
            />

            <div className="absolute inset-0 bg-linear-to-t from-slate-950/60 via-transparent to-transparent opacity-0 group-hover/banner:opacity-100 transition-opacity duration-500" />

            <div className="absolute inset-0 flex items-center justify-center bg-primary/20 backdrop-blur-sm opacity-0 group-hover/banner:opacity-100 transition-all duration-500">
              <div className="flex flex-col items-center gap-2 transform translate-y-4 group-hover/banner:translate-y-0 transition-transform duration-500">
                <div className="p-3 bg-white text-primary rounded-2xl shadow-xl">
                  <CloudUpload className="h-6 w-6" />
                </div>
                <span className="text-[10px] font-black text-white uppercase tracking-widest">
                  Replace Visual Artifact
                </span>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                disabled={isUploading}
              />
            </div>

            {!isUploading && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleClear();
                }}
                className="absolute top-4 right-4 bg-white/10 backdrop-blur-xl text-white p-3 rounded-2xl shadow-2xl hover:bg-rose-500 hover:text-white transition-all duration-300 border border-white/10 z-20"
              >
                <X className="h-4 w-4" />
              </button>
            )}

            {isUploading && (
              <div className="absolute inset-0 bg-black/40 backdrop-blur-md flex flex-col items-center justify-center gap-4 z-30">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
                <span className="text-[10px] font-black text-white uppercase tracking-widest">
                  Updating...
                </span>
              </div>
            )}
          </div>
        ) : isUploading ? (
          <div className="flex flex-col items-center gap-4 relative z-10">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
            <div className="text-center space-y-1">
              <span className="block text-[10px] font-black text-white uppercase tracking-widest">
                Uploading High-End Assets
              </span>
              <span className="block text-[9px] text-white/30 font-bold italic tracking-tighter">
                Please hold...
              </span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-6 text-white/20 relative z-10 p-8 text-center transition-all duration-500">
            <div
              className={cn(
                "p-5 rounded-[2rem] transition-all duration-500 transform bg-white/5 border border-white/5",
                isHovered &&
                  "scale-110 rotate-3 bg-primary text-white border-white/0 shadow-[0_0_50px_rgba(var(--primary),0.3)]",
              )}
            >
              {isHovered ? (
                <Sparkles className="h-8 w-8" />
              ) : (
                <Upload className="h-8 w-8" />
              )}
            </div>
            <div className="space-y-2">
              <span
                className={cn(
                  "block text-xs font-black uppercase tracking-[0.2em] transition-colors",
                  isHovered ? "text-white" : "text-white/40",
                )}
              >
                Elevate your visual identity
              </span>
              <span className="block text-[10px] text-white/10 font-bold tracking-widest">
                Optimized for PNG, WebP · Max 5MB
              </span>
            </div>

            <div
              className={cn(
                "px-6 py-2 rounded-xl border font-black text-[10px] uppercase tracking-widest transition-all",
                isHovered
                  ? "bg-white text-primary border-white"
                  : "bg-transparent border-white/10",
              )}
            >
              Commit File
            </div>
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
        disabled={isUploading}
      />

      {error && (
        <p className="text-[10px] text-rose-500 font-bold text-center uppercase tracking-widest">
          {error}
        </p>
      )}
    </div>
  );
}
