"use client";

import { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  Filter,
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

const TEAM_MEMBERS = [
  { name: "Dieuba", role: "Developer" },
  { name: "Lontsie", role: "Backend Engineer" },
  { name: "Petnou", role: "Fullstack Developer" },
  { name: "Abogo", role: "Strategy & Creative" },
];

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
            className="relative group/shot h-28 w-44 rounded-2xl overflow-hidden border border-white/5 bg-slate-900 shadow-xl shrink-0 transition-transform duration-500 hover:scale-[1.02]"
            onMouseEnter={() => setHIdx(idx)}
            onMouseLeave={() => setHIdx(null)}
          >
            <img
              src={url}
              alt={`Capture ${idx + 1}`}
              className="h-full w-full object-cover transition-transform duration-700 group-hover/shot:scale-110"
            />
            {/* Control Overlay */}
            <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px] opacity-0 group-hover/shot:opacity-100 transition-opacity flex items-center justify-center gap-2">
              {idx > 0 && (
                <button
                  type="button"
                  onClick={() => move(idx, idx - 1)}
                  className="bg-white/10 hover:bg-white/20 text-white rounded-xl p-2 transition-all"
                >
                  <ChevronUp className="h-3.5 w-3.5 -rotate-90" />
                </button>
              )}
              {idx < value.length - 1 && (
                <button
                  type="button"
                  onClick={() => move(idx, idx + 1)}
                  className="bg-white/10 hover:bg-white/20 text-white rounded-xl p-2 transition-all"
                >
                  <ChevronDown className="h-3.5 w-3.5 -rotate-90" />
                </button>
              )}
              <button
                type="button"
                onClick={() => remove(idx)}
                className="bg-rose-500/20 hover:bg-rose-500 text-white rounded-xl p-2 transition-all"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
            {/* Index Badge */}
            <span className="absolute top-2 left-2 bg-slate-950/80 backdrop-blur-md text-[9px] font-black text-white/50 px-2 py-0.5 rounded-lg border border-white/5 uppercase tracking-tighter">
              ASET-{idx + 1}
            </span>
          </div>
        ))}

        {value.length < 5 && (
          <label
            className={cn(
              "h-28 w-44 rounded-[2rem] border-2 border-dashed flex flex-col items-center justify-center gap-2 cursor-pointer shrink-0 transition-all duration-500 relative overflow-hidden group/add",
              isUploading
                ? "opacity-50 cursor-not-allowed"
                : "border-white/10 bg-white/[0.02] hover:border-primary/50 hover:bg-primary/5",
            )}
          >
            {/* Glow Background */}
            <div className="absolute inset-0 bg-primary/20 blur-3xl opacity-0 group-hover/add:opacity-40 transition-opacity duration-1000" />

            {isUploading ? (
              <Loader2 className="h-6 w-6 animate-spin text-primary relative z-10" />
            ) : (
              <>
                <div className="p-3 bg-white/5 rounded-2xl group-hover/add:bg-primary group-hover/add:text-white transition-all transform group-hover/add:scale-110 group-hover/add:rotate-3 relative z-10">
                  <ImageIcon className="h-5 w-5 text-white/40 group-hover/add:text-white" />
                </div>
                <div className="text-center space-y-0.5 relative z-10">
                  <span className="block text-[10px] font-black text-white/20 group-hover/add:text-white/60 uppercase tracking-widest leading-none">
                    Capture
                  </span>
                  <span className="block text-[9px] font-bold text-white/5 uppercase tracking-tighter">
                    New Asset
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
        <p className="text-[10px] text-rose-500 font-bold uppercase tracking-widest">
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
                  i < value.length ? "bg-primary" : "bg-white/5",
                )}
              />
            ))}
          </div>
          <p className="text-[9px] font-black text-white/20 uppercase tracking-widest">
            {value.length < 3
              ? `Need ${3 - value.length} more pieces of proof`
              : value.length === 5
                ? "Evidence limit reached"
                : `${value.length} Visual Artifacts committed`}
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
  const [featuredFilter, setFeaturedFilter] = useState<"all" | "featured" | "not-featured">("all");

  // ── Data ──────────────────────────────────────────────────────────────────

  const fetchMine = useCallback(async () => {
    setIsLoadingMine(true);
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.append("search", searchQuery);
      if (industryFilter) params.append("industry", industryFilter);
      if (featuredFilter !== "all") params.append("is_featured", featuredFilter === "featured" ? "true" : "false");
      
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
      if (featuredFilter !== "all") params.append("is_featured", featuredFilter === "featured" ? "true" : "false");
      
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

  const isMemberAdded = (name: string) =>
    formData.interveners.some((i) => i.name === name);

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
      <Card
        key={p.id}
        className="group/card relative flex flex-col overflow-hidden bg-slate-900 shadow-2xl transition-all duration-700 cursor-pointer border-none hover:-translate-y-2"
        onClick={() => {
          setViewProject(p);
          setIsViewOpen(true);
        }}
      >
        {/* Animated Border Glow (only visible on hover) */}
        <div className="absolute inset-0 p-[2px] rounded-xl transition-all duration-700 opacity-0 group-hover/card:opacity-100 bg-linear-to-br from-primary via-indigo-500 to-rose-500" />

        <div className="relative flex flex-col h-full w-full bg-slate-950 rounded-[10px] overflow-hidden z-10 transition-all duration-700">
          {/* Image Showcase with Overlays */}
          <div className="h-56 w-full overflow-hidden relative">
            {p.mainImage && !imgError ? (
              <img
                src={p.mainImage}
                alt={p.title}
                className="h-full w-full object-cover transition-transform duration-1000 group-hover/card:scale-110 group-hover/card:rotate-1"
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="h-full w-full bg-linear-to-br from-slate-900 to-indigo-950 flex items-center justify-center">
                <ImageIcon className="h-16 w-16 text-white/5" />
              </div>
            )}

            {/* Gradient Overlays for depth */}
            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-slate-950 via-slate-950/40 to-transparent" />
            <div className="absolute inset-0 bg-slate-950/10 group-hover/card:bg-transparent transition-colors duration-700" />

            {/* Floating Badges */}
            <div className="absolute top-5 left-5 flex gap-2 z-20">
              <Badge
                className={`${
                  p.isFeatured
                    ? "bg-amber-400 text-amber-950 shadow-[0_0_20px_rgba(251,191,36,0.5)]"
                    : "bg-slate-950/40 text-white border-white/10 backdrop-blur-xl"
                } text-[10px] font-black tracking-[0.1em] px-3 py-1 border-none transition-transform duration-500 group-hover/card:translate-x-1`}
              >
                {p.isFeatured ? "PREMIUM CASE" : "PROJECT"}
              </Badge>
            </div>

            {p.timeline && (
              <div className="absolute top-5 right-5 z-20">
                <span className="text-[10px] font-black text-white/90 bg-slate-950/40 backdrop-blur-xl px-3 py-1 rounded-sm border border-white/10 tracking-widest transition-transform duration-500 group-hover/card:-translate-x-1">
                  {p.timeline.toUpperCase()}
                </span>
              </div>
            )}

            {/* Title anchored over image with transition */}
            <div className="absolute bottom-6 left-6 right-6 z-20 transform transition-transform duration-700 group-hover/card:-translate-y-2">
              <CardTitle className="text-2xl font-black tracking-tighter text-white leading-none mb-2 drop-shadow-2xl">
                {p.title}
              </CardTitle>
              <div className="flex items-center gap-3 text-[11px] font-bold text-white/50 uppercase tracking-[0.2em]">
                <span className="text-primary/80">
                  {p.clientName || "Direct Client"}
                </span>
                {p.industry && (
                  <>
                    <span className="h-px w-6 bg-white/20" />
                    <span className="italic">{p.industry}</span>
                  </>
                )}
              </div>
            </div>
          </div>

          <CardContent className="flex-1 flex flex-col justify-between px-6 pb-6 pt-2 space-y-6">
            <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed italic border-l-2 border-primary/40 pl-4 py-1">
              {p.description?.objectives ||
                "Evolutionary architecture & design objectives."}
            </p>

            <div className="flex flex-wrap gap-2">
              {p.stack?.slice(0, 3).map((s: string, idx: number) => (
                <span
                  key={idx}
                  className="text-[10px] font-black text-slate-300 bg-white/5 border border-white/10 px-3 py-1 rounded-sm uppercase tracking-wider hover:bg-primary/20 hover:border-primary/40 transition-colors"
                >
                  {s}
                </span>
              ))}
              {p.stack && p.stack.length > 3 && (
                <span className="text-[10px] font-black text-white/20 px-1 py-1 uppercase tracking-wider">
                  +{p.stack.length - 3} OTHER
                </span>
              )}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/5">
              <div className="flex -space-x-3">
                {p.interveners
                  ?.slice(0, 4)
                  .map((int: Intervener, idx: number) => (
                    <div
                      key={idx}
                      className="h-10 w-10 rounded-2xl border-2 border-slate-950 overflow-hidden bg-slate-900 flex items-center justify-center text-xs font-black text-primary shadow-2xl relative group/avatar transition-all duration-500 group-hover/card:translate-y-[-4px]"
                      style={{ transitionDelay: `${idx * 100}ms` }}
                      title={`${int.name} (${int.role})`}
                    >
                      {int.avatar ? (
                        <img
                          src={int.avatar}
                          alt={int.name}
                          className="h-full w-full object-cover grayscale group-hover/avatar:grayscale-0 transition-all"
                        />
                      ) : (
                        <span>{int.name.charAt(0).toUpperCase()}</span>
                      )}
                      <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover/avatar:opacity-100 transition-opacity" />
                    </div>
                  ))}
              </div>

              {/* Action Tray that pops up on hover */}
              <div className="flex gap-2 transform translate-y-4 opacity-0 group-hover/card:translate-y-0 group-hover/card:opacity-100 transition-all duration-500 ease-out">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 rounded-2xl bg-slate-900 border-white/5 text-white/60 hover:bg-primary/20 hover:text-primary hover:border-primary/40 shadow-2xl"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEdit(p, asAdmin);
                  }}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 rounded-2xl bg-slate-900 border-white/5 text-rose-500/60 hover:bg-rose-500/20 hover:text-rose-500 hover:border-rose-500/40 shadow-2xl"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(p.id, asAdmin);
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    );
  };

  // ── Project Detail View ──────────────────────────────────────────────────

  const ProjectDetailDialog = () => {
    if (!viewProject) return null;
    const p: Project = viewProject;

    return (
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="max-w-6xl w-[95vw] max-h-[95vh] overflow-y-auto overflow-x-hidden p-0 gap-0 border-none shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] bg-slate-950 text-slate-50 rounded-2xl">
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
                      <p className="text-lg text-slate-300 leading-relaxed font-light">
                        {p.description?.objectives || "Not specified."}
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12">
                      <div className="space-y-3">
                        <h5 className="text-[10px] uppercase font-black text-rose-500 tracking-widest flex items-center gap-2">
                          Core Problem{" "}
                          <span className="h-px flex-1 bg-rose-500/20" />
                        </h5>
                        <p className="text-slate-400 leading-relaxed text-sm italic border-l-2 border-rose-500/30 pl-4 py-1">
                          {p.description?.problem || "Not specified."}
                        </p>
                      </div>
                      <div className="space-y-3">
                        <h5 className="text-[10px] uppercase font-black text-emerald-500 tracking-widest flex items-center gap-2">
                          Engineering Solution{" "}
                          <span className="h-px flex-1 bg-emerald-500/20" />
                        </h5>
                        <p className="text-slate-400 leading-relaxed text-sm italic border-l-2 border-emerald-500/30 pl-4 py-1">
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
            <aside className="border-l border-white/5 bg-slate-900/50 backdrop-blur-2xl p-8 space-y-12">
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
          <h2 className="text-2xl font-bold tracking-tight">Projets</h2>
          <p className="text-sm text-muted-foreground">
            Gérez vos projets portfolio et collaborations d'équipe.
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
            <Button onClick={resetForm}>
              <Plus className="mr-2 h-4 w-4" /> Nouveau projet
            </Button>
          </DialogTrigger>

          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {formData.id ? "Modifier le projet" : "Créer un projet"}
              </DialogTitle>
              <DialogDescription>
                Idéalement 3 à 5 captures d'écran haute qualité.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-8 py-4">
              {/* ── 1. Informations de base ── */}
              <section className="space-y-4">
                <h4 className="font-semibold text-primary border-l-4 border-primary pl-2">
                  Informations de base
                </h4>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Titre du projet</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => {
                        setFormData({ ...formData, title: e.target.value });
                        updateSlug(e.target.value);
                      }}
                      placeholder="Portfolio v2"
                      required
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="slug">
                      Slug (URL)
                      {slugStatus === "checking" && (
                        <span className="ml-2 text-muted-foreground text-[10px] italic">
                          Vérification...
                        </span>
                      )}
                      {slugStatus === "ok" && (
                        <span className="ml-2 text-green-500 text-[10px] font-bold">
                          ✓ OK
                        </span>
                      )}
                      {slugStatus.includes("taken") && (
                        <span className="ml-2 text-destructive text-[10px] font-bold">
                          ✗ Prix
                        </span>
                      )}
                    </Label>
                    <Input
                      id="slug"
                      value={formData.slug}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          slug: e.target.value,
                          slugManual: true,
                        })
                      }
                      placeholder="portfolio-v2"
                      className={
                        slugStatus.includes("taken")
                          ? "border-destructive text-destructive"
                          : ""
                      }
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="clientName">Nom du client</Label>
                    <Input
                      id="clientName"
                      value={formData.clientName}
                      onChange={(e) =>
                        setFormData({ ...formData, clientName: e.target.value })
                      }
                      placeholder="Soluty Studio"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="industry">Secteur</Label>
                    <Input
                      id="industry"
                      value={formData.industry}
                      onChange={(e) =>
                        setFormData({ ...formData, industry: e.target.value })
                      }
                      placeholder="Digital / Design"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="services">Services (virgules)</Label>
                    <Input
                      id="services"
                      value={formData.services}
                      onChange={(e) =>
                        setFormData({ ...formData, services: e.target.value })
                      }
                      placeholder="UI Design, React"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="timeline">Durée du projet</Label>
                    <div className="flex gap-2">
                      <Select
                        value={
                          [
                            "1 semaine",
                            "2 semaines",
                            "1 mois",
                            "3 mois",
                            "6 mois",
                            "1 an",
                          ].includes(formData.timeline || "")
                            ? formData.timeline
                            : formData.timeline
                              ? "custom"
                              : ""
                        }
                        onChange={(e) => {
                          const val = e.target.value;
                          if (val === "custom") {
                            setFormData({ ...formData, timeline: "" });
                          } else {
                            setFormData({ ...formData, timeline: val });
                          }
                        }}
                        className="w-[180px]"
                      >
                        <option value="" disabled>
                          Choisir...
                        </option>
                        <SelectItem value="1 semaine">1 semaine</SelectItem>
                        <SelectItem value="2 semaines">2 semaines</SelectItem>
                        <SelectItem value="1 mois">1 mois</SelectItem>
                        <SelectItem value="3 mois">3 mois</SelectItem>
                        <SelectItem value="6 mois">6 mois</SelectItem>
                        <SelectItem value="1 an">1 an</SelectItem>
                        <SelectItem value="custom">Personnalisé...</SelectItem>
                      </Select>

                      {(![
                        "1 semaine",
                        "2 semaines",
                        "1 mois",
                        "3 mois",
                        "6 mois",
                        "1 an",
                      ].includes(formData.timeline || "") ||
                        formData.timeline === "") && (
                        <Input
                          value={formData.timeline}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              timeline: e.target.value,
                            })
                          }
                          placeholder="Ex: 5 jours, 2 ans..."
                          className="flex-1"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </section>

              {/* ── 2. Media ── */}
              <section className="space-y-4">
                <h4 className="font-semibold text-primary border-l-4 border-primary pl-2 flex items-center gap-2">
                  <ImageIcon className="h-4 w-4" /> Media & Visuels
                </h4>

                <div className="grid gap-2">
                  <Label>Image principale (Bandeau)</Label>
                  <AvatarUpload
                    value={formData.mainImage}
                    onChange={(url) =>
                      setFormData({ ...formData, mainImage: url })
                    }
                    folder="projects"
                    variant="banner"
                  />
                </div>

                <div className="grid gap-2">
                  <Label
                    className={
                      formData.screenshots.length < 3 ? "text-destructive" : ""
                    }
                  >
                    Captures d'écran (3 min.)
                  </Label>
                  <ScreenshotUploader
                    value={formData.screenshots}
                    onChange={(urls) =>
                      setFormData({ ...formData, screenshots: urls })
                    }
                  />
                </div>
              </section>

              {/* ── 3. Étude de cas ── */}
              <section className="space-y-4">
                <h4 className="font-semibold text-primary border-l-4 border-primary pl-2 flex items-center gap-2">
                  <Trophy className="h-4 w-4" /> Étude de cas
                </h4>
                <div className="space-y-4 border p-4 rounded-lg bg-muted/30">
                  <div className="grid gap-2">
                    <Label>Objectifs</Label>
                    <Textarea
                      value={formData.description.objectives}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: {
                            ...formData.description,
                            objectives: e.target.value,
                          },
                        })
                      }
                      placeholder="Buts du projet..."
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label>Problème</Label>
                      <Textarea
                        value={formData.description.problem}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            description: {
                              ...formData.description,
                              problem: e.target.value,
                            },
                          })
                        }
                        placeholder="Points de douleur..."
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label>Solution</Label>
                      <Textarea
                        value={formData.description.solution}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            description: {
                              ...formData.description,
                              solution: e.target.value,
                            },
                          })
                        }
                        placeholder="Comment on a fait..."
                      />
                    </div>
                  </div>
                </div>
              </section>

              {/* ── 4. Technique ── */}
              <section className="space-y-4">
                <h4 className="font-semibold text-primary border-l-4 border-primary pl-2 flex items-center gap-2">
                  <Github className="h-4 w-4" /> Technique & Liens
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label>URL Live</Label>
                    <Input
                      value={formData.projectUrl}
                      onChange={(e) =>
                        setFormData({ ...formData, projectUrl: e.target.value })
                      }
                      placeholder="https://..."
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>GitHub</Label>
                    <Input
                      value={formData.githubUrl}
                      onChange={(e) =>
                        setFormData({ ...formData, githubUrl: e.target.value })
                      }
                      placeholder="https://github.com/..."
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label>Stack (virgules)</Label>
                  <Input
                    value={formData.stack}
                    onChange={(e) =>
                      setFormData({ ...formData, stack: e.target.value })
                    }
                    placeholder="Next.js, FastAPI"
                  />
                </div>
              </section>

              {/* ── 5. Équipe ── */}
              <section className="space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold text-primary border-l-4 border-primary pl-2 flex items-center gap-2">
                    <Users className="h-4 w-4" /> Équipe & Intervenants
                  </h4>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addIntervener()}
                  >
                    <Plus className="h-3 w-3 mr-1" /> Manuel
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2 p-3 bg-muted/20 rounded-lg border">
                  <p className="w-full text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1 px-1">
                    Équipe cœur
                  </p>
                  {TEAM_MEMBERS.map((m) => (
                    <Button
                      key={m.name}
                      type="button"
                      variant={isMemberAdded(m.name) ? "secondary" : "outline"}
                      size="sm"
                      className="text-xs h-8 px-3 rounded-full"
                      disabled={isMemberAdded(m.name)}
                      onClick={() => addIntervener(m)}
                    >
                      {isMemberAdded(m.name) ? (
                        <CheckCircle2 className="h-3 w-3 mr-1 text-green-500" />
                      ) : (
                        <Plus className="h-3 w-3 mr-1" />
                      )}
                      {m.name}
                    </Button>
                  ))}
                </div>

                <div className="grid gap-3">
                  {formData.interveners.map((int, i) => (
                    <div
                      key={i}
                      className="flex gap-4 items-center bg-muted/10 p-4 rounded-xl border group"
                    >
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
                      <div className="flex-1 grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <Label className="text-[10px] text-muted-foreground px-1">
                            Nom
                          </Label>
                          <Input
                            value={int.name}
                            onChange={(e) => {
                              const arr = [...formData.interveners];
                              arr[i].name = e.target.value;
                              setFormData({ ...formData, interveners: arr });
                            }}
                            className="bg-background"
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-[10px] text-muted-foreground px-1">
                            Rôle
                          </Label>
                          <Input
                            value={int.role}
                            onChange={(e) => {
                              const arr = [...formData.interveners];
                              arr[i].role = e.target.value;
                              setFormData({ ...formData, interveners: arr });
                            }}
                            className="bg-background"
                          />
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground hover:text-destructive self-end mb-1"
                        onClick={() => removeIntervener(i)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </section>

              <div className="flex items-center space-x-2 border p-3 rounded-lg bg-primary/5">
                <Switch
                  id="isFeatured"
                  checked={formData.isFeatured}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, isFeatured: checked })
                  }
                />
                <Label
                  htmlFor="isFeatured"
                  className="font-semibold text-primary cursor-pointer"
                >
                  Mettre en avant sur le portfolio
                </Label>
              </div>

              <DialogFooter className="sticky bottom-0 bg-background pt-4 border-t">
                <Button
                  variant="ghost"
                  type="button"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Annuler
                </Button>
                <Button
                  type="submit"
                  disabled={
                    isSubmitting ||
                    slugStatus.includes("taken") ||
                    formData.screenshots.length < 3
                  }
                >
                  {isSubmitting && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {formData.screenshots.length < 3
                    ? "Besoin de 3 captures"
                    : formData.id
                      ? "Mettre à jour"
                      : "Créer le projet"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-900/50 dark:to-slate-800/50 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 space-y-6 shadow-2xl backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary/10 rounded-2xl">
              <Filter className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground">Project Filters</h3>
              <p className="text-sm text-muted-foreground">Find your perfect project showcase</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSearchQuery("");
              setIndustryFilter("");
              setFeaturedFilter("all");
            }}
            className="text-xs font-medium hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="h-4 w-4 mr-1" />
            Clear All
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Search */}
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors z-10" />
            <Input
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 rounded-2xl font-medium border-0 bg-white dark:bg-slate-800 shadow-lg focus:ring-2 focus:ring-primary/20 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          
          {/* Industry Filter */}
          <div className="relative group">
            <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors z-10" />
            <Input
              placeholder="Industry..."
              value={industryFilter}
              onChange={(e) => setIndustryFilter(e.target.value)}
              className="pl-12 h-12 rounded-2xl font-medium border-0 bg-white dark:bg-slate-800 shadow-lg focus:ring-2 focus:ring-primary/20 transition-all"
            />
            {industryFilter && (
              <button
                onClick={() => setIndustryFilter("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
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
              className="w-full h-12 rounded-2xl font-medium border-0 bg-white dark:bg-slate-800 shadow-lg px-4 pr-10 appearance-none cursor-pointer focus:ring-2 focus:ring-primary/20 transition-all"
            >
              <option value="all">🌟 All Projects</option>
              <option value="featured">⭐ Featured Only</option>
              <option value="not-featured">📁 Standard Projects</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b pb-0">
        <button
          onClick={() => setActiveTab("mine")}
          className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium border-b-2 transition-colors -mb-px ${
            activeTab === "mine"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <Briefcase className="h-4 w-4" />
          Mes projets
          {myProjects.length > 0 && (
            <Badge variant="secondary" className="text-[10px] h-4 px-1">
              {myProjects.length}
            </Badge>
          )}
        </button>

        {isAdmin && (
          <button
            onClick={() => setActiveTab("all")}
            className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium border-b-2 transition-colors -mb-px ${
              activeTab === "all"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <ShieldCheck className="h-4 w-4" />
            Tous les projets
            {allProjects.length > 0 && (
              <Badge variant="secondary" className="text-[10px] h-4 px-1">
                {allProjects.length}
              </Badge>
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
            <Card className="border-dashed py-20 bg-muted/10 flex flex-col items-center">
              <UserCircle className="h-16 w-16 text-muted-foreground/20 mb-4" />
              <p className="text-muted-foreground mb-4">
                Vous n'avez pas encore de projet.
              </p>
              <Button onClick={() => setIsDialogOpen(true)} variant="outline">
                Nouveau projet
              </Button>
            </Card>
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
