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
    <div className={cn("space-y-2 w-full group/upload", className)}>
      {label && (
        <label className="text-xs font-semibold text-white/50">
          {label}
        </label>
      )}

      <div
        className="relative w-full h-full min-h-[160px] rounded-2xl overflow-hidden transition-all duration-300"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {value ? (
          <div className="relative h-full w-full group/image">
            <img
              src={value}
              alt="Uploaded workspace"
              className="h-full w-full object-cover transition-transform duration-500 group-hover/image:scale-105"
            />

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d1f]/80 via-transparent to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-300" />

            {/* Remove Button */}
            <button
              onClick={(e) => {
                e.preventDefault();
                onChange("");
                if (onRemove) onRemove();
              }}
              className="absolute top-3 right-3 bg-white/10 backdrop-blur-md text-white p-2 rounded-xl hover:bg-rose-500/20 hover:text-rose-400 transition-all duration-200 opacity-0 group-hover/image:opacity-100 border border-white/10 z-10"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Change Overlay */}
            <label className="absolute inset-0 flex items-center justify-center bg-[#0a0d1f]/40 backdrop-blur-sm opacity-0 group-hover/image:opacity-100 transition-all duration-300 cursor-pointer">
              <div className="flex flex-col items-center gap-2 transform translate-y-2 group-hover/image:translate-y-0 transition-transform duration-300">
                <div className="p-2.5 bg-white/10 border border-white/10 text-white rounded-xl">
                  <CloudUpload className="h-5 w-5" />
                </div>
                <span className="text-xs font-semibold text-white">
                  Replace Image
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
              "h-full w-full flex flex-col items-center justify-center gap-3 transition-all duration-300 relative border border-dashed rounded-2xl",
              isHovered
                ? "border-primary/50 bg-primary/5"
                : "border-white/20 bg-white/5"
            )}
          >
            {isUploading ? (
              <div className="flex flex-col items-center gap-4 animate-in fade-in duration-300">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <div className="space-y-1 text-center">
                  <p className="text-xs font-semibold text-white">
                    Uploading...
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3 relative z-10 p-6 text-center">
                <div
                  className={cn(
                    "p-3 rounded-xl transition-all duration-300",
                    isHovered
                      ? "bg-primary/20 text-primary scale-110"
                      : "bg-white/5 text-white/40 border border-white/10"
                  )}
                >
                  <ImageIcon className="h-5 w-5" />
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-semibold text-white/90">
                    Click or drag image
                  </p>
                  <p className="text-xs text-white/40">
                    SVG, PNG, JPG or GIF (max. 5MB)
                  </p>
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
