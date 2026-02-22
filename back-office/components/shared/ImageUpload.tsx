"use client";

import { useState } from "react";
import {
  Upload,
  X,
  Loader2,
  Image as ImageIcon,
  Sparkles,
  CloudUpload,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  onRemove?: () => void;
  className?: string;
}

export function ImageUpload({
  value,
  onChange,
  label,
  onRemove,
  className,
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const token = localStorage.getItem("auth_token");
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

      const response = await fetch(`${apiUrl}/media/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      onChange(`${apiUrl}${data.url}`);
    } catch (err) {
      console.error("Upload error:", err);
      // Custom error toast logic could go here
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className={cn("space-y-4 w-full group/upload", className)}>
      {label && (
        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 ml-1">
          {label}
        </label>
      )}

      <div
        className="relative w-full aspect-video sm:aspect-auto sm:h-48 rounded-[2rem] overflow-hidden transition-all duration-500"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {value ? (
          <div className="relative h-full w-full group/image">
            <img
              src={value}
              alt="Uploaded workspace"
              className="h-full w-full object-cover transition-transform duration-700 group-hover/image:scale-110"
            />

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-500" />

            {/* Remove Button - Premium Design */}
            <button
              onClick={(e) => {
                e.preventDefault();
                onChange("");
                if (onRemove) onRemove();
              }}
              className="absolute top-4 right-4 bg-white/10 backdrop-blur-xl text-white p-3 rounded-2xl shadow-2xl hover:bg-rose-500 hover:text-white transition-all duration-300 transform group-hover/image:translate-y-0 translate-y-[-10px] opacity-0 group-hover/image:opacity-100 border border-white/10"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Change Overlay */}
            <label className="absolute inset-0 flex items-center justify-center bg-primary/20 backdrop-blur-sm opacity-0 group-hover/image:opacity-100 transition-all duration-500 cursor-pointer">
              <div className="flex flex-col items-center gap-2 transform translate-y-4 group-hover/image:translate-y-0 transition-transform duration-500">
                <div className="p-3 bg-white text-primary rounded-2xl shadow-xl">
                  <CloudUpload className="h-6 w-6" />
                </div>
                <span className="text-[10px] font-black text-white uppercase tracking-widest">
                  Replace Masterpiece
                </span>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                disabled={isUploading}
              />
            </label>
          </div>
        ) : (
          <div
            className={cn(
              "h-full w-full flex flex-col items-center justify-center gap-4 transition-all duration-700 relative border-2 border-dashed",
              isHovered
                ? "border-primary/50 bg-primary/5"
                : "border-white/10 bg-white/[0.02]",
            )}
          >
            {/* Animated Glow Effect Background */}
            <div
              className={cn(
                "absolute inset-0 bg-primary/20 blur-[100px] transition-opacity duration-1000 pointer-events-none",
                isHovered ? "opacity-30" : "opacity-0",
              )}
            />

            {isUploading ? (
              <div className="flex flex-col items-center gap-6 animate-in fade-in zoom-in duration-500">
                <div className="relative">
                  <Loader2 className="h-12 w-12 animate-spin text-primary" />
                  <div className="absolute inset-0 blur-xl bg-primary/40 animate-pulse" />
                </div>
                <div className="space-y-1 text-center">
                  <p className="text-[10px] font-black text-white uppercase tracking-[0.2em]">
                    Uploading Assets
                  </p>
                  <p className="text-[9px] text-white/40 font-bold uppercase tracking-widest italic">
                    Optimizing performance...
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-6 relative z-10 p-8 text-center">
                <div
                  className={cn(
                    "p-5 rounded-[2rem] transition-all duration-500 transform",
                    isHovered
                      ? "bg-primary text-white scale-110 rotate-3 shadow-[0_0_40px_rgba(var(--primary),0.5)]"
                      : "bg-white/5 text-white/20 border border-white/5",
                  )}
                >
                  {isHovered ? (
                    <Sparkles className="h-8 w-8" />
                  ) : (
                    <CloudUpload className="h-8 w-8" />
                  )}
                </div>

                <div className="space-y-2">
                  <p
                    className={cn(
                      "text-xs font-black uppercase tracking-[0.2em] transition-colors duration-500",
                      isHovered ? "text-white" : "text-white/40",
                    )}
                  >
                    {isHovered
                      ? "Release to Craft"
                      : "Drop your visual masterwork"}
                  </p>
                  <p className="text-[10px] text-white/20 font-bold tracking-widest">
                    PNG, JPG, WebP (Max 5MB)
                  </p>
                </div>

                <div
                  className={cn(
                    "px-6 py-2.5 rounded-xl border font-black text-[10px] uppercase tracking-widest transition-all duration-500",
                    isHovered
                      ? "bg-white text-primary border-white"
                      : "bg-transparent border-white/10 text-white/40",
                  )}
                >
                  Browse Files
                </div>
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              onChange={handleUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
              disabled={isUploading}
            />
          </div>
        )}
      </div>
    </div>
  );
}
