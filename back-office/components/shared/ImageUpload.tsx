"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, X, Loader2, Image as ImageIcon } from "lucide-react";
import { apiRequest } from "@/lib/api";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  onRemove?: () => void;
}

export function ImageUpload({
  value,
  onChange,
  label,
  onRemove,
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      // Get token from localStorage
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
      // data.url is something like /uploads/filename.ext
      // We prepend the API URL
      onChange(`${apiUrl}${data.url}`);
    } catch (err) {
      console.error("Upload error:", err);
      alert("Erreur lors de l'upload de l'image.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      {label && <label className="text-sm font-medium">{label}</label>}

      <div className="flex flex-wrap gap-4 items-center">
        {value ? (
          <div className="relative h-32 w-48 rounded-md overflow-hidden border">
            <img
              src={value}
              alt="Uploaded"
              className="h-full w-full object-cover"
            />
            <button
              onClick={() => {
                onChange("");
                if (onRemove) onRemove();
              }}
              className="absolute top-1 right-1 bg-destructive text-destructive-foreground p-1 rounded-full shadow-md hover:bg-destructive/90 transition-colors"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-center h-32 w-48 rounded-md border-2 border-dashed border-muted-foreground/20 bg-muted/10 hover:bg-muted/20 transition-colors relative">
            {isUploading ? (
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            ) : (
              <div className="flex flex-col items-center gap-2">
                <Upload className="h-6 w-6 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  Cliquez pour uploader
                </span>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              disabled={isUploading}
            />
          </div>
        )}
      </div>
    </div>
  );
}
