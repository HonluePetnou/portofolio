"use client";

import { useRef, useState } from "react";
import {
  Loader2,
  Upload,
  X,
  UserCircle,
  CloudUpload,
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
          <p className="text-[9px] text-rose-500 font-bold uppercase tracking-widest animate-in slide-in-from-top-1">
            {error}
          </p>
        )}
      </div>
    );
  }

  // ── Banner Variant ───────────────────────────────────────────────────────────
  return (
    <div className="space-y-3 w-full">
      <div
        className={cn(
          "relative rounded-2xl border border-dashed overflow-hidden flex items-center justify-center cursor-pointer transition-all duration-300 h-44",
          value
            ? "border-transparent"
            : "border-white/20 bg-white/5 hover:bg-primary/5 hover:border-primary/40",
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => !isUploading && !value && inputRef.current?.click()}
      >
        {value ? (
          <div className="relative h-full w-full group/banner">
            <img
              src={value}
              alt="Banner image"
              className="w-full h-full object-cover transition-transform duration-700 group-hover/banner:scale-105"
            />

            <div className="absolute inset-0 flex items-center justify-center bg-[#0a0d1f]/60 backdrop-blur-sm opacity-0 group-hover/banner:opacity-100 transition-all duration-300">
              <div className="flex flex-col items-center gap-2">
                <div className="p-2.5 bg-white/10 rounded-xl border border-white/20">
                  <CloudUpload className="h-5 w-5 text-white" />
                </div>
                <span className="text-xs font-semibold text-white/80">
                  Replace image
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
                className="absolute top-3 right-3 bg-[#0a0d1f]/80 backdrop-blur-md text-white p-2 rounded-lg border border-white/10 hover:bg-rose-500 hover:border-rose-500 transition-all duration-200 z-20"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}

            {isUploading && (
              <div className="absolute inset-0 bg-black/50 backdrop-blur-md flex flex-col items-center justify-center gap-3 z-30">
                <Loader2 className="h-7 w-7 animate-spin text-primary" />
                <span className="text-xs font-semibold text-white/70">
                  Uploading...
                </span>
              </div>
            )}
          </div>
        ) : isUploading ? (
          <div className="flex flex-col items-center gap-3 relative z-10">
            <Loader2 className="h-7 w-7 animate-spin text-primary" />
            <span className="text-xs font-semibold text-white/50">Uploading...</span>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3 text-white/30 relative z-10 text-center transition-all duration-300">
            <div className={cn(
              "p-3 rounded-xl transition-all duration-300 bg-white/5 border border-white/10",
              isHovered && "bg-primary/20 border-primary/30 text-primary scale-105",
            )}>
              <Upload className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <span className={cn(
                "block text-xs font-semibold transition-colors",
                isHovered ? "text-white/70" : "text-white/40",
              )}>
                Click to upload banner image
              </span>
              <span className="block text-[11px] text-white/20">
                PNG, WebP or JPG · Max 5MB
              </span>
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
        <p className="text-xs text-rose-500 font-semibold">
          {error}
        </p>
      )}
    </div>
  );
}
