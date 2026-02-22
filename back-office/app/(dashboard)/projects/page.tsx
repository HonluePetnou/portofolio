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
} from "lucide-react";
import { apiRequest } from "@/lib/api";
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

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setError("Max 5 Mo par image.");
      return;
    }
    setError(null);
    setIsUploading(true);
    try {
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("auth_token")
          : null;
      const body = new FormData();
      body.append("file", file);
      body.append("folder", "projects");
      const res = await fetch(`${apiUrl}/media/upload`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body,
      });
      if (!res.ok)
        throw new Error(
          (await res.json().catch(() => ({}))).detail || "Upload échoué",
        );
      const data = await res.json();
      onChange([...value, `${apiUrl}${data.url}`]);
    } catch (err: any) {
      setError(err.message || "Erreur upload");
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
    <div className="space-y-3">
      <div className="flex flex-wrap gap-3">
        {value.map((url, idx) => (
          <div
            key={idx}
            className="relative group h-24 w-36 rounded-lg overflow-hidden border bg-muted shrink-0"
          >
            <img
              src={url}
              alt={`Screenshot ${idx + 1}`}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
              {idx > 0 && (
                <button
                  type="button"
                  onClick={() => move(idx, idx - 1)}
                  className="bg-white/20 hover:bg-white/30 text-white rounded p-1 text-xs"
                >
                  ←
                </button>
              )}
              {idx < value.length - 1 && (
                <button
                  type="button"
                  onClick={() => move(idx, idx + 1)}
                  className="bg-white/20 hover:bg-white/30 text-white rounded p-1 text-xs"
                >
                  →
                </button>
              )}
              <button
                type="button"
                onClick={() => remove(idx)}
                className="bg-destructive/80 hover:bg-destructive text-white rounded p-1"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
            <span className="absolute top-1 left-1 bg-black/60 text-white text-[9px] px-1 rounded">
              #{idx + 1}
            </span>
          </div>
        ))}

        {value.length < 5 && (
          <label
            className={`h-24 w-36 rounded-lg border-2 border-dashed flex flex-col items-center justify-center gap-1.5
              cursor-pointer shrink-0 transition-colors
              ${isUploading ? "opacity-50 cursor-not-allowed" : "hover:border-primary/50 hover:bg-muted/20"}`}
          >
            {isUploading ? (
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            ) : (
              <>
                <ImageIcon className="h-5 w-5 text-muted-foreground/60" />
                <span className="text-[10px] text-muted-foreground text-center leading-tight">
                  Ajouter
                  <br />
                  une capture
                </span>
              </>
            )}
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              className="hidden"
              disabled={isUploading}
              onChange={handleFile}
            />
          </label>
        )}
      </div>
      {error && <p className="text-xs text-destructive">{error}</p>}
      <div className="flex items-center justify-between">
        <p className="text-[10px] text-muted-foreground">
          {value.length < 3
            ? `Besoin d'encore ${3 - value.length} capture(s) (Minimum: 3)`
            : value.length === 5
              ? "Limite atteinte (Maximum: 5)"
              : `${value.length} capture(s) (Idéal: 3-5)`}
        </p>
        {value.length > 0 && (
          <p className="text-[9px] text-muted-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity">
            Glissez/déposez pour réorganiser (Bientôt dispo)
          </p>
        )}
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

  // ── Data ──────────────────────────────────────────────────────────────────

  const fetchMine = useCallback(async () => {
    setIsLoadingMine(true);
    try {
      const data = await apiRequest("/projects/me");
      setMyProjects(data);
    } catch (err) {
      console.error("Failed to fetch my projects:", err);
    } finally {
      setIsLoadingMine(false);
    }
  }, []);

  const fetchAll = useCallback(async () => {
    setIsLoadingAll(true);
    try {
      const data = await apiRequest("/projects/all");
      setAllProjects(data);
      setIsAdmin(true);
    } catch (err: any) {
      if (err?.message?.includes("403")) {
        setIsAdmin(false);
      }
    } finally {
      setIsLoadingAll(false);
    }
  }, []);

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
        className="relative flex flex-col overflow-hidden hover:shadow-xl transition-all duration-300"
      >
        <div className="h-44 w-full overflow-hidden bg-muted relative">
          {p.mainImage && !imgError ? (
            <img
              src={p.mainImage}
              alt={p.title}
              className="h-full w-full object-cover hover:scale-105 transition-transform duration-500"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="h-full w-full bg-linear-to-br from-indigo-50 to-primary/5 flex items-center justify-center">
              <ImageIcon className="h-10 w-10 text-muted-foreground/20" />
            </div>
          )}
          {p.screenshots?.length > 0 && (
            <span className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1">
              <ImageIcon className="h-2.5 w-2.5" />+{p.screenshots.length}
            </span>
          )}
        </div>

        <CardHeader className="pb-3 px-5 pt-4">
          <div className="flex justify-between items-start mb-1.5">
            <div className="flex gap-1.5">
              <Badge
                variant={p.isFeatured ? "default" : "secondary"}
                className={`text-[10px] ${p.isFeatured ? "bg-primary" : ""}`}
              >
                {p.isFeatured ? (
                  <>
                    <Star className="h-2.5 w-2.5 mr-1 fill-current" /> Featured
                  </>
                ) : (
                  "Standard"
                )}
              </Badge>
              {asAdmin && p.userId && (
                <Badge
                  variant="outline"
                  className="text-[9px] h-4.5 px-1.5 opacity-60"
                >
                  uid:{p.userId}
                </Badge>
              )}
            </div>
            {p.timeline && (
              <span className="text-[10px] font-medium text-muted-foreground bg-muted/50 px-2 py-0.5 rounded">
                {p.timeline}
              </span>
            )}
          </div>
          <CardTitle className="line-clamp-1 text-base hover:text-primary transition-colors">
            {p.title}
          </CardTitle>
          {(p.clientName || p.industry) && (
            <CardDescription className="text-xs">
              {p.clientName}
              {p.clientName && p.industry && (
                <span className="text-muted-foreground/30"> · </span>
              )}
              {p.industry}
            </CardDescription>
          )}
        </CardHeader>

        <CardContent className="flex-1 space-y-3 px-5 pb-4">
          <p className="text-xs text-muted-foreground line-clamp-2 italic">
            "{p.description?.objectives || "No objectives defined."}"
          </p>

          <div className="flex flex-wrap gap-1">
            {p.stack?.slice(0, 4).map((s, idx) => (
              <Badge
                key={idx}
                variant="outline"
                className="text-[9px] text-indigo-700 border-indigo-100"
              >
                {s}
              </Badge>
            ))}
            {p.stack?.length > 4 && (
              <Badge variant="outline" className="text-[9px]">
                +{p.stack.length - 4}
              </Badge>
            )}
          </div>

          {p.results?.length > 0 && (
            <div className="bg-indigo-50/30 p-2.5 rounded-lg border border-indigo-100/30 text-xs space-y-1">
              {p.results.slice(0, 2).map((r, idx) => (
                <div key={idx} className="flex justify-between items-center">
                  <span className="text-muted-foreground text-[10px] uppercase font-semibold tracking-wider">
                    {r.label}
                  </span>
                  <span className="font-bold text-indigo-700">{r.value}</span>
                </div>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between pt-1.5">
            <div className="flex -space-x-2">
              {p.interveners?.slice(0, 4).map((int, idx) => (
                <div
                  key={idx}
                  className="h-7 w-7 rounded-full border-2 border-background overflow-hidden bg-indigo-100 flex items-center justify-center text-[10px] font-bold text-indigo-700 shadow-sm"
                  title={`${int.name} (${int.role})`}
                >
                  {int.avatar ? (
                    <img
                      src={int.avatar}
                      alt={int.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    int.name.charAt(0).toUpperCase()
                  )}
                </div>
              ))}
              {p.interveners?.length > 4 && (
                <div className="h-7 w-7 rounded-full border-2 border-background bg-secondary flex items-center justify-center text-[10px] font-bold">
                  +{p.interveners.length - 4}
                </div>
              )}
            </div>

            <div className="flex gap-1.5">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full hover:bg-primary/5 hover:text-primary"
                onClick={() => handleEdit(p, asAdmin)}
              >
                <Pencil className="h-3.5 w-3.5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full text-red-400 hover:bg-red-50 hover:text-red-500 border-red-100"
                onClick={() => handleDelete(p.id, asAdmin)}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="space-y-6">
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
