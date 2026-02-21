"use client";

import { useRef, useState } from "react";
import { Loader2, Upload, X, UserCircle } from "lucide-react";

interface AvatarUploadProps {
  value: string;
  onChange: (url: string) => void;
  /** Subfolder on the backend: testimonials | articles | projects | general */
  folder?: "testimonials" | "articles" | "projects" | "general";
  /** Display as a small circular avatar (default) or wide banner */
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
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Client-side guard: 5 MB
    if (file.size > 5 * 1024 * 1024) {
      setError("Le fichier dépasse 5 Mo.");
      return;
    }

    setError(null);
    setIsUploading(true);

    try {
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("auth_token")
          : null;
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
        throw new Error(data.detail || "Upload échoué");
      }

      const data = await res.json();
      // Prepend API base so the <img> src works
      onChange(`${apiUrl}${data.url}`);
    } catch (err: any) {
      setError(err.message || "Erreur lors de l'upload.");
    } finally {
      setIsUploading(false);
      // Reset input so same file can be re-selected after a clear
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const handleClear = () => {
    onChange("");
    setError(null);
  };

  // ── Avatar variant (circular, 64×64) ──────────────────────────────────────
  if (variant === "avatar") {
    return (
      <div className="flex flex-col gap-1.5">
        <div className="relative inline-flex">
          {/* Circle */}
          <div
            className="h-16 w-16 rounded-full border-2 border-dashed border-muted-foreground/30 bg-muted/20
                        flex items-center justify-center overflow-hidden cursor-pointer
                        hover:border-primary/60 transition-colors group"
            onClick={() => !isUploading && inputRef.current?.click()}
            title="Cliquez pour uploader une photo"
          >
            {value ? (
              <img
                src={value}
                alt="Avatar"
                className="h-full w-full object-cover"
              />
            ) : isUploading ? (
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            ) : (
              <div className="flex flex-col items-center gap-0.5 text-muted-foreground group-hover:text-primary transition-colors">
                <UserCircle className="h-6 w-6" />
                <span className="text-[9px] font-medium">Photo</span>
              </div>
            )}
          </div>

          {/* Remove button */}
          {value && !isUploading && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-destructive text-white
                         flex items-center justify-center shadow hover:bg-destructive/80 transition-colors"
              title="Supprimer la photo"
            >
              <X className="h-2.5 w-2.5" />
            </button>
          )}

          {/* Upload overlay spinner if uploading and has existing image */}
          {value && isUploading && (
            <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center">
              <Loader2 className="h-5 w-5 animate-spin text-white" />
            </div>
          )}
        </div>

        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="hidden"
          onChange={handleFileChange}
          disabled={isUploading}
        />

        {error && (
          <p className="text-[10px] text-destructive leading-tight max-w-[200px]">
            {error}
          </p>
        )}
      </div>
    );
  }

  // ── Banner variant (wide rectangle, reuses existing ImageUpload style) ─────
  return (
    <div className="space-y-2">
      <div
        className={`relative rounded-lg border-2 border-dashed overflow-hidden flex items-center justify-center cursor-pointer transition-colors
          ${value ? "border-transparent h-40" : "border-muted-foreground/25 bg-muted/10 hover:bg-muted/20 h-40"}`}
        onClick={() => !isUploading && !value && inputRef.current?.click()}
      >
        {value ? (
          <>
            <img
              src={value}
              alt="Uploaded"
              className="w-full h-full object-cover"
            />
            {!isUploading && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleClear();
                }}
                className="absolute top-2 right-2 bg-destructive text-white p-1 rounded-full shadow hover:bg-destructive/80 transition-colors"
              >
                <X className="h-3 w-3" />
              </button>
            )}
            {isUploading && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-white" />
              </div>
            )}
          </>
        ) : isUploading ? (
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        ) : (
          <div
            className="flex flex-col items-center gap-2 text-muted-foreground"
            onClick={() => inputRef.current?.click()}
          >
            <Upload className="h-6 w-6" />
            <span className="text-xs">Cliquez pour uploader une image</span>
            <span className="text-[10px] text-muted-foreground/60">
              JPEG, PNG, WebP · Max 5 Mo
            </span>
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={handleFileChange}
        disabled={isUploading}
      />

      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
