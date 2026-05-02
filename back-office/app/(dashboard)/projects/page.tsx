"use client";

import { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectItem } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Plus,
  Pencil,
  Trash2,
  Loader2,
  Github,
  Trophy,
  Users,
  Image as ImageIcon,
  CheckCircle2,
  ExternalLink,
  X,
  Star,
  UserCircle,
  ShieldCheck,
  Briefcase,
  ChevronUp,
  ChevronDown,
  Search,
} from "lucide-react";
import { apiRequest } from "@/lib/api";
import { cn } from "@/lib/utils";
import { AvatarUpload } from "@/components/shared/AvatarUpload";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Intervener {
  name: string;
  role: string;
  avatar?: string | null;
}

interface Result {
  label: string;
  value: string;
}

interface ProjectDescription {
  problem: string;
  objectives: string;
  solution: string;
}

interface Project {
  id: string;
  title: string;
  slug: string;
  clientName?: string;
  industry?: string;
  services: string[];
  description: ProjectDescription;
  results: Result[];
  stack: string[];
  timeline?: string;
  projectUrl?: string;
  githubUrl?: string;
  mainImage?: string;
  screenshots: string[];
  interveners: Intervener[];
  isFeatured: boolean;
  userId?: number;
  createdAt: string;
}

type Tab = "mine" | "all";

// ─── Constants ────────────────────────────────────────────────────────────────

const slugify = (str: string) =>
  str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

// ─── Screenshot multi-upload strip ────────────────────────────────────────────

function ScreenshotUploader({
  value,
  onChange,
}: {
  value: string[];
  onChange: (urls: string[]) => void;
}) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hIdx, setHIdx] = useState<number | null>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
      const body = new FormData();
      body.append("file", file);
      body.append("folder", "projects");
      const res = await fetch(`${apiUrl}/media/upload`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body,
      });
      if (!res.ok) throw new Error("Narrative disruption: Upload failed.");
      const data = await res.json();
      onChange([...value, `${apiUrl}${data.url}`]);
    } catch (err: any) {
      setError(err.message || "Strategic capture error");
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  };

  const remove = (idx: number) => onChange(value.filter((_, i) => i !== idx));
  const move = (from: number, to: number) => {
    const arr = [...value];
    const [item] = arr.splice(from, 1);
    arr.splice(to, 0, item);
    onChange(arr);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        {value.map((url, idx) => (
          <div
            key={idx}
            className="relative group/shot h-28 w-44 rounded-xl overflow-hidden border border-white/10 bg-white/5 transition-transform duration-300 hover:scale-105"
            onMouseEnter={() => setHIdx(idx)}
            onMouseLeave={() => setHIdx(null)}
          >
            <img
              src={url}
              alt={`Capture ${idx + 1}`}
              className="h-full w-full object-cover transition-transform duration-500 group-hover/shot:scale-110"
            />
            {/* Control Overlay */}
            <div className="absolute inset-0 bg-[#0a0d1f]/60 backdrop-blur-sm opacity-0 group-hover/shot:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
              {idx > 0 && (
                <button
                  type="button"
                  onClick={() => move(idx, idx - 1)}
                  className="bg-white/10 hover:bg-white/20 text-white rounded-lg p-2 transition-all"
                >
                  <ChevronUp className="h-4 w-4 -rotate-90" />
                </button>
              )}
              {idx < value.length - 1 && (
                <button
                  type="button"
                  onClick={() => move(idx, idx + 1)}
                  className="bg-white/10 hover:bg-white/20 text-white rounded-lg p-2 transition-all"
                >
                  <ChevronDown className="h-4 w-4 -rotate-90" />
                </button>
              )}
              <button
                type="button"
                onClick={() => remove(idx)}
                className="bg-rose-500/20 hover:bg-rose-500 text-white rounded-lg p-2 transition-all"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            {/* Index Badge */}
            <span className="absolute top-2 left-2 bg-[#0a0d1f]/80 backdrop-blur-md text-[10px] font-semibold text-white px-2 py-0.5 rounded-md border border-white/10">
              {idx + 1}
            </span>
          </div>
        ))}

        {value.length < 5 && (
          <label
            className={cn(
              "h-28 w-44 rounded-xl border border-dashed flex flex-col items-center justify-center gap-2 cursor-pointer shrink-0 transition-all duration-300",
              isUploading
                ? "opacity-50 cursor-not-allowed border-white/10 bg-white/5"
                : "border-white/20 bg-white/5 hover:border-primary/50 hover:bg-primary/5"
            )}
          >
            {isUploading ? (
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
            ) : (
              <>
                <div className="p-2 bg-white/5 rounded-lg text-white/40 transition-colors">
                  <ImageIcon className="h-4 w-4" />
                </div>
                <div className="text-center">
                  <span className="block text-xs font-semibold text-white/60">
                    Add Asset
                  </span>
                </div>
              </>
            )}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              disabled={isUploading}
              onChange={handleFile}
            />
          </label>
        )}
      </div>

      {error && (
        <p className="text-xs text-rose-500 font-semibold">
          {error}
        </p>
      )}

      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={cn(
                  "h-1 w-3 rounded-full transition-all duration-500",
                  i < value.length ? "bg-primary" : "bg-white/10",
                )}
              />
            ))}
          </div>
          <p className="text-xs font-semibold text-white/40">
            {value.length < 3
              ? `${3 - value.length} more image${3 - value.length === 1 ? '' : 's'} needed`
              : value.length === 5
                ? "Maximum 5 screenshots"
                : `${value.length} / 5 screenshots`}
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

const initialForm = {
  id: null as string | null,
  title: "",
  slug: "",
  clientName: "",
  industry: "",
  services: "",
  description: { problem: "", objectives: "", solution: "" },
  results: [] as Result[],
  stack: "",
  timeline: "",
  projectUrl: "",
  githubUrl: "",
  mainImage: "",
  screenshots: [] as string[],
  interveners: [] as Intervener[],
  isFeatured: false,
  slugManual: false,
};

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("mine");
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [myProjects, setMyProjects] = useState<Project[]>([]);
  const [allProjects, setAllProjects] = useState<Project[]>([]);

  const [isLoadingMine, setIsLoadingMine] = useState(true);
  const [isLoadingAll, setIsLoadingAll] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [slugStatus, setSlugStatus] = useState<
    "idle" | "checking" | "ok" | "taken text-destructive"
  >("idle");
  const [editingAsAdmin, setEditingAsAdmin] = useState(false);

  const [formData, setFormData] = useState(initialForm);

  const [isViewOpen, setIsViewOpen] = useState(false);
  const [viewProject, setViewProject] = useState<Project | null>(null);

  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [industryFilter, setIndustryFilter] = useState("");
  const [featuredFilter, setFeaturedFilter] = useState<
    "all" | "featured" | "not-featured"
  >("all");

  // ── Data ──────────────────────────────────────────────────────────────────

  const fetchMine = useCallback(async () => {
    setIsLoadingMine(true);
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.append("search", searchQuery);
      if (industryFilter) params.append("industry", industryFilter);
      if (featuredFilter !== "all")
        params.append(
          "is_featured",
          featuredFilter === "featured" ? "true" : "false",
        );

      const data = await apiRequest(`/projects/me?${params.toString()}`);
      setMyProjects(data);
    } catch (err) {
      console.error("Failed to fetch my projects:", err);
    } finally {
      setIsLoadingMine(false);
    }
  }, [searchQuery, industryFilter, featuredFilter]);

  const fetchAll = useCallback(async () => {
    setIsLoadingAll(true);
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.append("search", searchQuery);
      if (industryFilter) params.append("industry", industryFilter);
      if (featuredFilter !== "all")
        params.append(
          "is_featured",
          featuredFilter === "featured" ? "true" : "false",
        );

      const data = await apiRequest(`/projects/all?${params.toString()}`);
      setAllProjects(data);
      setIsAdmin(true);
    } catch (err: any) {
      if (err?.message?.includes("403")) {
        setIsAdmin(false);
      }
    } finally {
      setIsLoadingAll(false);
    }
  }, [searchQuery, industryFilter, featuredFilter]);

  useEffect(() => {
    fetchMine();
    fetchAll();
  }, [fetchMine, fetchAll]);

  // ── Slug auto-generation & availability check ─────────────────────────────

  const updateSlug = (title: string) => {
    if (formData.slugManual) return;
    setFormData((prev) => ({ ...prev, slug: slugify(title) }));
  };

  useEffect(() => {
    const slug = formData.slug;
    if (!slug || slug.length < 2) {
      setSlugStatus("idle");
      return;
    }
    setSlugStatus("checking");
    const timer = setTimeout(async () => {
      try {
        const params = formData.id ? `?exclude_id=${formData.id}` : "";
        const res = await apiRequest(`/projects/check-slug/${slug}${params}`);
        setSlugStatus(res.available ? "ok" : "taken text-destructive");
      } catch {
        setSlugStatus("idle");
      }
    }, 450);
    return () => clearTimeout(timer);
  }, [formData.slug, formData.id]);

  // ── CRUD ──────────────────────────────────────────────────────────────────

  const resetForm = () => {
    setFormData(initialForm);
    setEditingAsAdmin(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (slugStatus.includes("taken")) return;
    if (formData.screenshots.length < 3) return;
    setIsSubmitting(true);

    const payload = {
      ...formData,
      services:
        typeof formData.services === "string"
          ? formData.services
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean)
          : formData.services,
      stack:
        typeof formData.stack === "string"
          ? formData.stack
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean)
          : formData.stack,
      mainImage: formData.mainImage || null,
      clientName: formData.clientName || null,
      industry: formData.industry || null,
      timeline: formData.timeline || null,
      projectUrl: formData.projectUrl || null,
      githubUrl: formData.githubUrl || null,
    };

    const { id, slugManual, ...rest } = payload;

    try {
      if (formData.id) {
        const patchUrl = editingAsAdmin
          ? `/projects/admin/${formData.id}`
          : `/projects/${formData.id}`;
        await apiRequest(patchUrl, {
          method: "PATCH",
          body: JSON.stringify(rest),
        });
      } else {
        await apiRequest("/projects", {
          method: "POST",
          body: JSON.stringify(rest),
        });
      }
      setIsDialogOpen(false);
      resetForm();
      fetchMine();
      if (isAdmin) fetchAll();
    } catch (err) {
      console.error("Failed to save project:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (p: Project, asAdmin = false) => {
    setEditingAsAdmin(asAdmin);
    setFormData({
      id: p.id,
      title: p.title,
      slug: p.slug,
      clientName: p.clientName || "",
      industry: p.industry || "",
      services: p.services?.join(", ") || "",
      description: p.description || {
        problem: "",
        objectives: "",
        solution: "",
      },
      results: p.results || [],
      stack: p.stack?.join(", ") || "",
      timeline: p.timeline || "",
      projectUrl: p.projectUrl || "",
      githubUrl: p.githubUrl || "",
      mainImage: p.mainImage || "",
      screenshots: p.screenshots || [],
      interveners: p.interveners || [],
      isFeatured: p.isFeatured,
      slugManual: true,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string, asAdmin = false) => {
    if (!confirm("Supprimer ce projet ?")) return;
    try {
      const deleteUrl = asAdmin ? `/projects/admin/${id}` : `/projects/${id}`;
      await apiRequest(deleteUrl, { method: "DELETE" });
      fetchMine();
      if (isAdmin) fetchAll();
    } catch (err) {
      console.error("Failed to delete project:", err);
    }
  };

  const addResult = () =>
    setFormData({
      ...formData,
      results: [...formData.results, { label: "", value: "" }],
    });

  const removeResult = (i: number) =>
    setFormData({
      ...formData,
      results: formData.results.filter((_, idx) => idx !== i),
    });

  const addIntervener = (member?: { name: string; role: string }) =>
    setFormData({
      ...formData,
      interveners: [
        ...formData.interveners,
        {
          name: member?.name || "",
          role: member?.role || "",
          avatar: null,
        },
      ],
    });

  const removeIntervener = (i: number) =>
    setFormData({
      ...formData,
      interveners: formData.interveners.filter((_, idx) => idx !== i),
    });

  // ── Helpers ─────────────────────────────────────────────────────────────────

  const ProjectCard = ({
    p,
    asAdmin = false,
  }: {
    p: Project;
    asAdmin?: boolean;
  }) => {
    const [imgError, setImgError] = useState(false);

    return (
      <div
        key={p.id}
        className="group/card relative flex flex-col overflow-hidden bg-white/5 border border-white/10 rounded-2xl cursor-pointer transition-all duration-500 hover:-translate-y-1 hover:border-white/20 hover:shadow-2xl hover:shadow-primary/10"
        onClick={() => {
          setViewProject(p);
          setIsViewOpen(true);
        }}
      >
        {/* Image */}
        <div className="h-52 w-full overflow-hidden relative">
          {p.mainImage && !imgError ? (
            <img
              src={p.mainImage}
              alt={p.title}
              className="h-full w-full object-cover transition-transform duration-700 group-hover/card:scale-105"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="h-full w-full bg-linear-to-br from-[#0a0d1f] to-indigo-950/60 flex items-center justify-center">
              <ImageIcon className="h-10 w-10 text-white/10" />
            </div>
          )}

          {/* Gradient overlay */}
          <div className="absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-[#0a0d1f] via-[#0a0d1f]/40 to-transparent" />

          {/* Top badges */}
          <div className="absolute top-3 left-3 flex gap-2 z-20">
            {p.isFeatured ? (
              <span className="bg-amber-400 text-amber-950 text-[10px] font-bold px-2.5 py-1 rounded-full">
                Featured
              </span>
            ) : (
              <span className="bg-white/10 backdrop-blur-md text-white/60 text-[10px] font-semibold px-2.5 py-1 rounded-full border border-white/10">
                Project
              </span>
            )}
          </div>

          {p.timeline && (
            <div className="absolute top-3 right-3 z-20">
              <span className="text-[10px] font-semibold text-white/60 bg-white/10 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                {p.timeline}
              </span>
            </div>
          )}

          {/* Title anchored over image */}
          <div className="absolute bottom-4 left-4 right-4 z-20">
            <h3 className="text-xl font-bold text-white leading-tight mb-1 drop-shadow-xl">
              {p.title}
            </h3>
            <div className="flex items-center gap-2 text-[11px] text-white/50">
              <span className="text-primary/80 font-semibold">{p.clientName || "Personal"}</span>
              {p.industry && (
                <>
                  <span className="h-px w-4 bg-white/20" />
                  <span>{p.industry}</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 flex flex-col justify-between px-5 pb-5 pt-3 space-y-4">
          <p className="text-xs text-white/40 line-clamp-2 leading-relaxed border-l border-primary/30 pl-3">
            {p.description?.objectives || "No objectives defined."}
          </p>

          <div className="flex flex-wrap gap-1.5">
            {p.stack?.slice(0, 3).map((s: string, idx: number) => (
              <span
                key={idx}
                className="text-[10px] font-semibold text-white/60 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full"
              >
                {s}
              </span>
            ))}
            {p.stack && p.stack.length > 3 && (
              <span className="text-[10px] font-semibold text-white/30 px-2 py-1">
                +{p.stack.length - 3}
              </span>
            )}
          </div>

          <div className="pt-3 border-t border-white/5 flex items-end justify-between gap-2">
            {/* Intervenants list */}
            <div className="flex flex-col gap-1.5 flex-1 min-w-0">
              {p.interveners?.slice(0, 2).map((int: Intervener, idx: number) => (
                <div key={idx} className="flex items-center gap-2">
                  {/* Avatar */}
                  <div className="h-6 w-6 rounded-full border border-white/10 bg-white/10 flex items-center justify-center text-[10px] font-bold text-primary shrink-0 overflow-hidden">
                    {int.avatar ? (
                      <img src={int.avatar} alt={int.name} className="h-full w-full object-cover" />
                    ) : (
                      <span>{int.name.charAt(0).toUpperCase()}</span>
                    )}
                  </div>
                  {/* Name + Role */}
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="text-[11px] font-semibold text-white/70 truncate">{int.name}</span>
                    <span className="text-white/20 text-[10px]">·</span>
                    <span className="text-[10px] text-white/35 truncate">{int.role}</span>
                  </div>
                </div>
              ))}
              {p.interveners && p.interveners.length > 2 && (
                <span className="text-[10px] text-white/25 font-medium pl-8">
                  +{p.interveners.length - 2} more
                </span>
              )}
            </div>

            {/* Action buttons — appear on hover */}
            <div className="flex gap-2 opacity-0 group-hover/card:opacity-100 translate-y-2 group-hover/card:translate-y-0 transition-all duration-300 shrink-0">
              <button
                className="h-7 w-7 rounded-lg bg-white/5 border border-white/10 text-white/40 hover:text-primary hover:border-primary/40 hover:bg-primary/10 transition-all flex items-center justify-center"
                onClick={(e) => { e.stopPropagation(); handleEdit(p, asAdmin); }}
              >
                <Pencil className="h-3 w-3" />
              </button>
              <button
                className="h-7 w-7 rounded-lg bg-white/5 border border-white/10 text-white/40 hover:text-rose-400 hover:border-rose-400/40 hover:bg-rose-500/10 transition-all flex items-center justify-center"
                onClick={(e) => { e.stopPropagation(); handleDelete(p.id, asAdmin); }}
              >
                <Trash2 className="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ── Project Detail View ──────────────────────────────────────────────────

  const ProjectDetailDialog = () => {
    if (!viewProject) return null;
    const p: Project = viewProject;

    return (
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="max-w-6xl w-[95vw] max-h-[95vh] overflow-y-auto overflow-x-hidden p-0 gap-0 border-none shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] bg-card text-card-foreground rounded-2xl">
          {/* Header Banner with parallax-like effect */}
          <div className="relative h-64 md:h-[400px] w-full overflow-hidden">
            {p.mainImage ? (
              <img
                src={p.mainImage}
                alt={p.title}
                className="h-full w-full object-cover scale-105"
              />
            ) : (
              <div className="h-full w-full bg-linear-to-br from-indigo-900 via-slate-900 to-primary/20 flex items-center justify-center">
                <ImageIcon className="h-24 w-24 text-white/10" />
              </div>
            )}

            {/* Multi-layered overlays for depth */}
            <div className="absolute inset-0 bg-linear-to-b from-transparent via-slate-950/20 to-slate-950" />
            <div className="absolute inset-0 bg-linear-to-r from-slate-950 via-slate-950/40 to-transparent" />

            {/* Content anchored to bottom-left */}
            <div className="absolute bottom-10 left-10 right-10 z-10 space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <Badge className="bg-primary/20 hover:bg-primary/30 text-primary-foreground border-primary/30 backdrop-blur-md px-3 py-1 text-[10px] uppercase font-black tracking-[0.2em]">
                  {p.industry || "Project"}
                </Badge>
                {p.isFeatured && (
                  <Badge
                    variant="secondary"
                    className="bg-amber-400 text-amber-950 border-none px-3 py-1 text-[10px] font-black tracking-wider flex items-center gap-1"
                  >
                    <Star className="h-3 w-3 fill-current" /> FEATURED WORK
                  </Badge>
                )}
                {p.timeline && (
                  <span className="text-xs font-bold text-white/60 bg-white/5 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10">
                    {p.timeline}
                  </span>
                )}
              </div>

              <h2 className="text-4xl md:text-6xl font-black tracking-tighter drop-shadow-2xl max-w-3xl leading-[0.9]">
                {p.title}
              </h2>

              {p.clientName && (
                <p className="text-xl md:text-2xl font-medium text-white/70 italic tracking-tight font-serif">
                  — {p.clientName}
                </p>
              )}
            </div>
          </div>

          <div className="grid lg:grid-cols-[1fr_320px] gap-0 relative">
            <div className="p-10 space-y-16">
              {/* Screenshots Gallery Section (Grid instead of horizontal scroll) */}
              {p.screenshots && p.screenshots.length > 0 && (
                <section className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h4 className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] flex items-center gap-3">
                      <span className="h-px w-8 bg-white/20" /> Visual Showcase
                    </h4>
                    <span className="text-[10px] text-white/20 font-mono">
                      {p.screenshots.length} CAPTURES
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {p.screenshots?.map((src: string, i: number) => (
                      <div
                        key={i}
                        className={`relative aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/5 group/img ${
                          i === 0 && p.screenshots.length % 2 !== 0
                            ? "md:col-span-2"
                            : ""
                        }`}
                      >
                        <img
                          src={src}
                          className="h-full w-full object-cover transition-all duration-700 group-hover/img:scale-110"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-slate-950/60 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity" />
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Core Content Grid */}
              <div className="space-y-20">
                {/* Case Study Section */}
                <section className="relative">
                  <div className="absolute -left-10 top-0 bottom-0 w-1 bg-linear-to-b from-primary/50 to-transparent rounded-full opacity-50" />

                  <h4 className="text-2xl font-black tracking-tight mb-8 flex items-center gap-3 italic">
                    <Trophy className="h-6 w-6 text-primary" /> The Narrative
                  </h4>

                  <div className="space-y-12 max-w-2xl">
                    <div className="space-y-4">
                      <h5 className="text-xs uppercase font-black text-primary/60 tracking-widest">
                        Challenge & Objectives
                      </h5>
                      <p className="text-lg text-muted-foreground leading-relaxed font-light">
                        {p.description?.objectives || "Not specified."}
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12">
                      <div className="space-y-3">
                        <h5 className="text-[10px] uppercase font-black text-rose-500 tracking-widest flex items-center gap-2">
                          Core Problem{" "}
                          <span className="h-px flex-1 bg-rose-500/20" />
                        </h5>
                        <p className="text-muted-foreground leading-relaxed text-sm italic border-l-2 border-rose-500/30 pl-4 py-1">
                          {p.description?.problem || "Not specified."}
                        </p>
                      </div>
                      <div className="space-y-3">
                        <h5 className="text-[10px] uppercase font-black text-emerald-500 tracking-widest flex items-center gap-2">
                          Engineering Solution{" "}
                          <span className="h-px flex-1 bg-emerald-500/20" />
                        </h5>
                        <p className="text-muted-foreground leading-relaxed text-sm italic border-l-2 border-emerald-500/30 pl-4 py-1">
                          {p.description?.solution || "Not specified."}
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Impact / Results Section */}
                {p.results && p.results.length > 0 && (
                  <section className="space-y-8">
                    <h4 className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] flex items-center gap-3">
                      <span className="h-px w-8 bg-white/20" /> Performance
                      Metrics
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {p.results?.map(
                        (r: { label: string; value: string }, i: number) => (
                          <div
                            key={i}
                            className="bg-white/5 border border-white/10 p-6 rounded-3xl hover:bg-white/10 transition-colors group/res"
                          >
                            <p className="text-[9px] text-white/40 font-black uppercase tracking-widest mb-2 group-hover/res:text-primary transition-colors">
                              {r.label}
                            </p>
                            <p className="text-3xl font-black tracking-tighter text-white">
                              {r.value}
                            </p>
                          </div>
                        ),
                      )}
                    </div>
                  </section>
                )}
              </div>
            </div>

            {/* Sticky Sidebar (Right) */}
            <aside className="border-l border-border bg-muted/50 backdrop-blur-2xl p-8 space-y-12">
              {/* Stack & Tech */}
              <div className="space-y-10">
                <div className="space-y-4">
                  <h5 className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">
                    Stack
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {p.stack?.map((s: string, i: number) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-indigo-500/10 text-indigo-400 rounded-full text-[10px] font-black border border-indigo-500/20"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h5 className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">
                    Services
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {p.services?.map((s: string, i: number) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-white/5 text-white/60 rounded-full text-[10px] font-bold border border-white/5"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <Separator className="bg-white/5" />

                {/* External Actions */}
                <div className="space-y-4">
                  {p.projectUrl && (
                    <a
                      href={p.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between gap-2 h-12 w-full px-5 rounded-2xl bg-primary text-primary-foreground text-sm font-black shadow-[0_10px_30px_-10px_rgba(var(--primary-rgb),0.5)] hover:translate-y-[-2px] transition-all"
                    >
                      <span>LIVE PREVIEW</span>
                      <ExternalLink className="h-4 w-4 opacity-70 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </a>
                  )}
                  {p.githubUrl && (
                    <a
                      href={p.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between gap-2 h-12 w-full px-5 rounded-2xl bg-white/5 text-white text-sm font-black border border-white/10 hover:bg-white/10 transition-all"
                    >
                      <span>SOURCE CODE</span>
                      <Github className="h-4 w-4 opacity-50 transition-opacity group-hover:opacity-100" />
                    </a>
                  )}
                </div>
              </div>

              {/* Strategic Team */}
              {p.interveners && p.interveners.length > 0 && (
                <div className="space-y-6 pt-6 border-t border-white/5">
                  <h5 className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">
                    Strategists
                  </h5>
                  <div className="space-y-4">
                    {p.interveners?.map((int: Intervener, i: number) => (
                      <div
                        key={i}
                        className="flex items-center gap-4 group/user"
                      >
                        <div className="h-11 w-11 rounded-2xl bg-linear-to-br from-primary/20 to-indigo-900/40 border border-white/10 overflow-hidden flex items-center justify-center text-xs font-black group-hover/user:scale-105 transition-transform">
                          {int.avatar ? (
                            <img
                              src={int.avatar}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <span className="text-primary">
                              {int.name.charAt(0)}
                            </span>
                          )}
                        </div>
                        <div className="space-y-0.5">
                          <p className="text-sm font-black text-white/90 tracking-tight">
                            {int.name}
                          </p>
                          <p className="text-xs font-medium text-white/40 tracking-tight">
                            {int.role}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="space-y-6">
      <ProjectDetailDialog />
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white">Projects</h2>
          <p className="text-sm text-white/40">
            Manage your portfolio projects and team collaborations.
          </p>
        </div>

        <Dialog
          open={isDialogOpen}
          onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}
        >
          <DialogTrigger asChild>
            <Button
              onClick={resetForm}
              className="rounded-xl font-semibold px-5 h-10 gap-2 shadow-lg shadow-primary/20 bg-linear-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 transition-transform active:scale-95 border-0 text-white"
            >
              <Plus className="h-4 w-4" /> New Project
            </Button>
          </DialogTrigger>

          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0 border border-white/10 bg-[#0a0d1f]/95 backdrop-blur-2xl text-white rounded-2xl shadow-2xl">
            <form onSubmit={handleSubmit} className="flex flex-col h-full">
              {/* Editor Header */}
              <div className="bg-[#0a0d1f]/80 backdrop-blur-2xl border-b border-white/5 p-6 sticky top-0 z-50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                    <Briefcase className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold">{formData.id ? "Edit Project" : "New Project"}</h2>
                    <p className="text-xs text-white/40">
                      {formData.title || "Untitled project"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    type="button"
                    className="h-8 px-4 rounded-lg font-semibold text-xs transition-all text-white/40 hover:text-white"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting || slugStatus.includes("taken") || formData.screenshots.length < 3}
                    className="rounded-lg font-semibold px-6 h-10 shadow-lg shadow-primary/20 bg-linear-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 transition-transform active:scale-95 border-0 text-white"
                  >
                    {isSubmitting ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : formData.screenshots.length < 3 ? (
                      "Needs 3 Images"
                    ) : formData.id ? (
                      "Update Project"
                    ) : (
                      "Create Project"
                    )}
                  </Button>
                </div>
              </div>

              <div className="p-8 space-y-10">
                {/* 1. Basic Info */}
                <section className="space-y-6">
                  <div className="flex items-center gap-2 border-b border-white/5 pb-2">
                    <h4 className="text-sm font-semibold text-white">Basic Information</h4>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="title" className="text-xs font-semibold text-white/50">Project Title</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => {
                          setFormData({ ...formData, title: e.target.value });
                          updateSlug(e.target.value);
                        }}
                        placeholder="Portfolio v2"
                        className="bg-white/5 border-white/10 rounded-xl px-4 h-12 focus-visible:ring-primary transition-all placeholder:text-white/20"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="slug" className="text-xs font-semibold text-white/50 flex items-center gap-2">
                        Slug (URL)
                        {slugStatus === "checking" && <Loader2 className="h-3 w-3 animate-spin text-white/40" />}
                        {slugStatus === "ok" && <CheckCircle2 className="h-3 w-3 text-emerald-500" />}
                        {slugStatus.includes("taken") && <X className="h-3 w-3 text-rose-500" />}
                      </Label>
                      <Input
                        id="slug"
                        value={formData.slug}
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value, slugManual: true })}
                        placeholder="portfolio-v2"
                        className={cn(
                          "bg-white/5 border-white/10 rounded-xl px-4 h-12 font-mono text-sm transition-all placeholder:text-white/20",
                          slugStatus.includes("taken") && "border-rose-500/50 text-rose-500 focus-visible:ring-rose-500"
                        )}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="clientName" className="text-xs font-semibold text-white/50">Client Name</Label>
                      <Input
                        id="clientName"
                        value={formData.clientName}
                        onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                        placeholder="Soluty Studio"
                        className="bg-white/5 border-white/10 rounded-xl px-4 h-12 focus-visible:ring-primary transition-all placeholder:text-white/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="industry" className="text-xs font-semibold text-white/50">Industry</Label>
                      <Input
                        id="industry"
                        value={formData.industry}
                        onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                        placeholder="Digital / Design"
                        className="bg-white/5 border-white/10 rounded-xl px-4 h-12 focus-visible:ring-primary transition-all placeholder:text-white/20"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="services" className="text-xs font-semibold text-white/50">Services (comma separated)</Label>
                      <Input
                        id="services"
                        value={formData.services}
                        onChange={(e) => setFormData({ ...formData, services: e.target.value })}
                        placeholder="UI Design, React"
                        className="bg-white/5 border-white/10 rounded-xl px-4 h-12 focus-visible:ring-primary transition-all placeholder:text-white/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="timeline" className="text-xs font-semibold text-white/50">Project Duration</Label>
                      <div className="flex gap-2">
                        <Select
                          value={
                            ["1 semaine", "2 semaines", "1 mois", "3 mois", "6 mois", "1 an"].includes(formData.timeline || "")
                              ? formData.timeline
                              : formData.timeline ? "custom" : ""
                          }
                          onChange={(e) => {
                            const val = e.target.value;
                            if (val === "custom") {
                              setFormData({ ...formData, timeline: "" });
                            } else {
                              setFormData({ ...formData, timeline: val });
                            }
                          }}
                          className="bg-white/5 border-white/10 rounded-xl h-12 focus-visible:ring-primary transition-all w-48 text-sm"
                        >
                          <SelectItem value="" disabled>Select...</SelectItem>
                          <SelectItem value="1 semaine">1 week</SelectItem>
                          <SelectItem value="2 semaines">2 weeks</SelectItem>
                          <SelectItem value="1 mois">1 month</SelectItem>
                          <SelectItem value="3 mois">3 months</SelectItem>
                          <SelectItem value="6 mois">6 months</SelectItem>
                          <SelectItem value="1 an">1 year</SelectItem>
                          <SelectItem value="custom">Custom...</SelectItem>
                        </Select>

                        {(!["1 semaine", "2 semaines", "1 mois", "3 mois", "6 mois", "1 an"].includes(formData.timeline || "") || formData.timeline === "") && (
                          <Input
                            value={formData.timeline}
                            onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                            placeholder="e.g. 5 days"
                            className="bg-white/5 border-white/10 rounded-xl h-12 focus-visible:ring-primary transition-all flex-1"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </section>

                {/* 2. Media */}
                <section className="space-y-6">
                  <div className="flex items-center gap-2 border-b border-white/5 pb-2">
                    <ImageIcon className="h-4 w-4 text-primary" />
                    <h4 className="text-sm font-semibold text-white">Media & Visuals</h4>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs font-semibold text-white/50">Banner Image</Label>
                    <AvatarUpload
                      value={formData.mainImage}
                      onChange={(url) => setFormData({ ...formData, mainImage: url })}
                      folder="projects"
                      variant="banner"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className={cn("text-xs font-semibold", formData.screenshots.length < 3 ? "text-rose-500" : "text-white/50")}>
                      Screenshots (Min. 3)
                    </Label>
                    <ScreenshotUploader
                      value={formData.screenshots}
                      onChange={(urls) => setFormData({ ...formData, screenshots: urls })}
                    />
                  </div>
                </section>

                {/* 3. Case Study */}
                <section className="space-y-6">
                  <div className="flex items-center gap-2 border-b border-white/5 pb-2">
                    <Trophy className="h-4 w-4 text-primary" />
                    <h4 className="text-sm font-semibold text-white">Case Study</h4>
                  </div>
                  <div className="space-y-6 bg-white/5 border border-white/10 p-6 rounded-2xl">
                    <div className="space-y-2">
                      <Label className="text-xs font-semibold text-white/50">Objectives</Label>
                      <Textarea
                        value={formData.description.objectives}
                        onChange={(e) => setFormData({ ...formData, description: { ...formData.description, objectives: e.target.value } })}
                        placeholder="Project goals..."
                        className="bg-white/5 border-white/10 rounded-xl p-4 min-h-[100px] text-sm focus:border-white/20 transition-all placeholder:text-white/20 resize-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="text-xs font-semibold text-white/50">Problem</Label>
                        <Textarea
                          value={formData.description.problem}
                          onChange={(e) => setFormData({ ...formData, description: { ...formData.description, problem: e.target.value } })}
                          placeholder="Pain points..."
                          className="bg-white/5 border-white/10 rounded-xl p-4 min-h-[120px] text-sm focus:border-white/20 transition-all placeholder:text-white/20 resize-none"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs font-semibold text-white/50">Solution</Label>
                        <Textarea
                          value={formData.description.solution}
                          onChange={(e) => setFormData({ ...formData, description: { ...formData.description, solution: e.target.value } })}
                          placeholder="How we solved it..."
                          className="bg-white/5 border-white/10 rounded-xl p-4 min-h-[120px] text-sm focus:border-white/20 transition-all placeholder:text-white/20 resize-none"
                        />
                      </div>
                    </div>
                  </div>
                </section>

                {/* 4. Tech */}
                <section className="space-y-6">
                  <div className="flex items-center gap-2 border-b border-white/5 pb-2">
                    <Github className="h-4 w-4 text-primary" />
                    <h4 className="text-sm font-semibold text-white">Tech & Links</h4>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-xs font-semibold text-white/50">Live URL</Label>
                      <Input
                        value={formData.projectUrl}
                        onChange={(e) => setFormData({ ...formData, projectUrl: e.target.value })}
                        placeholder="https://..."
                        className="bg-white/5 border-white/10 rounded-xl px-4 h-12 focus-visible:ring-primary transition-all placeholder:text-white/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-semibold text-white/50">GitHub URL</Label>
                      <Input
                        value={formData.githubUrl}
                        onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                        placeholder="https://github.com/..."
                        className="bg-white/5 border-white/10 rounded-xl px-4 h-12 focus-visible:ring-primary transition-all placeholder:text-white/20"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-semibold text-white/50">Stack (comma separated)</Label>
                    <Input
                      value={formData.stack}
                      onChange={(e) => setFormData({ ...formData, stack: e.target.value })}
                      placeholder="Next.js, FastAPI"
                      className="bg-white/5 border-white/10 rounded-xl px-4 h-12 focus-visible:ring-primary transition-all placeholder:text-white/20"
                    />
                  </div>
                </section>

                {/* 5. Team */}
                <section className="space-y-6">
                  <div className="flex justify-between items-center border-b border-white/5 pb-2">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-primary" />
                      <h4 className="text-sm font-semibold text-white">Team & Members</h4>
                    </div>
                    <Button
                      type="button"
                      onClick={() => addIntervener()}
                      className="rounded-lg h-8 px-3 gap-1 bg-white/5 hover:bg-white/10 border border-white/10 font-semibold text-xs transition-colors"
                    >
                      <Plus className="h-3 w-3" /> Add Member
                    </Button>
                  </div>

                  <div className="grid gap-4">
                    {formData.interveners.map((int, i) => (
                      <div key={i} className="flex gap-6 items-center bg-white/5 p-4 rounded-2xl border border-white/10 group">
                        <AvatarUpload
                          value={int.avatar ?? ""}
                          onChange={(url) => {
                            const arr = [...formData.interveners];
                            arr[i].avatar = url || null;
                            setFormData({ ...formData, interveners: arr });
                          }}
                          folder="projects"
                          variant="avatar"
                        />
                        <div className="flex-1 grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label className="text-xs font-semibold text-white/50">Name</Label>
                            <Input
                              value={int.name}
                              onChange={(e) => {
                                const arr = [...formData.interveners];
                                arr[i].name = e.target.value;
                                setFormData({ ...formData, interveners: arr });
                              }}
                              className="bg-white/5 border-white/10 rounded-xl px-4 h-10 focus-visible:ring-primary transition-all"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-xs font-semibold text-white/50">Role</Label>
                            <Input
                              value={int.role}
                              onChange={(e) => {
                                const arr = [...formData.interveners];
                                arr[i].role = e.target.value;
                                setFormData({ ...formData, interveners: arr });
                              }}
                              className="bg-white/5 border-white/10 rounded-xl px-4 h-10 focus-visible:ring-primary transition-all"
                            />
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="text-white/40 hover:text-rose-400 hover:bg-rose-500/10 transition-all self-end mb-1"
                          onClick={() => removeIntervener(i)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </section>

                <div className="flex items-center space-x-3 border border-white/10 p-4 rounded-2xl bg-white/5">
                  <Switch
                    id="isFeatured"
                    checked={formData.isFeatured}
                    onCheckedChange={(checked) => setFormData({ ...formData, isFeatured: checked })}
                  />
                  <Label htmlFor="isFeatured" className="text-sm font-semibold text-white cursor-pointer">
                    Feature on Portfolio
                  </Label>
                </div>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
            <Input
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11 rounded-xl bg-white/5 border-white/10 text-sm text-white placeholder:text-white/30 focus-visible:ring-primary/40 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Industry Filter */}
          <div className="relative">
            <Briefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
            <Input
              placeholder="Filter by industry..."
              value={industryFilter}
              onChange={(e) => setIndustryFilter(e.target.value)}
              className="pl-10 h-11 rounded-xl bg-white/5 border-white/10 text-sm text-white placeholder:text-white/30 focus-visible:ring-primary/40 transition-all"
            />
            {industryFilter && (
              <button
                onClick={() => setIndustryFilter("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Featured Filter */}
          <div className="relative">
            <select
              value={featuredFilter}
              onChange={(e) => setFeaturedFilter(e.target.value as "all" | "featured" | "not-featured")}
              className="w-full h-11 rounded-xl bg-white/5 border border-white/10 text-sm text-white px-4 pr-10 appearance-none cursor-pointer focus:ring-2 focus:ring-primary/40 transition-all"
            >
              <option value="all">All Projects</option>
              <option value="featured">Featured Only</option>
              <option value="not-featured">Standard Projects</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-white/10 pb-0">
        <button
          onClick={() => setActiveTab("mine")}
          className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold border-b-2 transition-all -mb-px ${
            activeTab === "mine"
              ? "border-primary text-primary"
              : "border-transparent text-white/40 hover:text-white/70"
          }`}
        >
          <Briefcase className="h-4 w-4" />
          My Projects
          {myProjects.length > 0 && (
            <span className={`ml-1 text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
              activeTab === "mine" ? "bg-primary/20 text-primary" : "bg-white/10 text-white/40"
            }`}>
              {myProjects.length}
            </span>
          )}
        </button>

        {isAdmin && (
          <button
            onClick={() => setActiveTab("all")}
            className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold border-b-2 transition-all -mb-px ${
              activeTab === "all"
                ? "border-primary text-primary"
                : "border-transparent text-white/40 hover:text-white/70"
            }`}
          >
            <ShieldCheck className="h-4 w-4" />
            All Projects
            {allProjects.length > 0 && (
              <span className={`ml-1 text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                activeTab === "all" ? "bg-primary/20 text-primary" : "bg-white/10 text-white/40"
              }`}>
                {allProjects.length}
              </span>
            )}
          </button>
        )}
      </div>

      {/* Grid */}
      {activeTab === "mine" ? (
        <>
          {isLoadingMine ? (
            <div className="flex justify-center py-20 flex-col items-center gap-4">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground italic">
                Chargement de vos projets...
              </p>
            </div>
          ) : myProjects.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <div className="p-5 bg-white/5 rounded-2xl border border-white/10">
                <UserCircle className="h-10 w-10 text-white/20" />
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-white/40">No projects yet</p>
                <p className="text-xs text-white/20 mt-1">Click below to create your first project</p>
              </div>
              <Button
                onClick={() => setIsDialogOpen(true)}
                className="rounded-xl font-semibold px-5 h-10 gap-2 bg-linear-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 border-0 text-white"
              >
                <Plus className="h-4 w-4" /> New Project
              </Button>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {myProjects.map((p) => (
                <ProjectCard key={p.id} p={p} asAdmin={false} />
              ))}
            </div>
          )}
        </>
      ) : (
        <>
          {isLoadingAll ? (
            <div className="flex justify-center py-20 flex-col items-center gap-4">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground italic">
                Chargement global...
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {allProjects.map((p) => (
                <ProjectCard key={p.id} p={p} asAdmin={true} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
