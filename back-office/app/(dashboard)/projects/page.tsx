"use client";

import { useEffect, useState } from "react";
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
import {
  Plus,
  ExternalLink,
  Pencil,
  Trash2,
  User,
  Loader2,
  Github,
  Trophy,
  Users,
  Image as ImageIcon,
  CheckCircle2,
} from "lucide-react";
import { apiRequest } from "@/lib/api";
import { ImageUpload } from "@/components/shared/ImageUpload";

interface Intervener {
  name: string;
  role: string;
  avatar?: string;
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
  clientName: string;
  industry: string;
  services: string[];
  description: ProjectDescription;
  results: Result[];
  stack: string[];
  timeline: string;
  projectUrl: string;
  githubUrl: string;
  mainImage: string;
  screenshots: string[];
  interveners: Intervener[];
  isFeatured: boolean;
  createdAt: string;
}

const TEAM_MEMBERS = [
  { name: "Dieuba", role: "Developer" },
  { name: "Lontsie", role: "Backend Engineer" },
  { name: "Petnou", role: "Fullstack Developer" },
  { name: "Abogo", role: "Strategy & Creative" },
];

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const initialForm = {
    id: null as string | null,
    title: "",
    slug: "",
    clientName: "",
    industry: "",
    services: "",
    description: {
      problem: "",
      objectives: "",
      solution: "",
    },
    results: [] as Result[],
    stack: "",
    timeline: "",
    projectUrl: "",
    githubUrl: "",
    mainImage: "",
    screenshots: "",
    interveners: [] as Intervener[],
    isFeatured: false,
  };

  const [formData, setFormData] = useState(initialForm);

  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const data = await apiRequest("/projects");
      setProjects(data);
    } catch (err) {
      console.error("Failed to fetch projects:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      ...formData,
      services: formData.services
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      stack: formData.stack
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      screenshots: formData.screenshots
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    };

    try {
      if (formData.id) {
        await apiRequest(`/projects/${formData.id}`, {
          method: "PATCH",
          body: JSON.stringify(payload),
        });
      } else {
        await apiRequest("/projects", {
          method: "POST",
          body: JSON.stringify(payload),
        });
      }
      setIsDialogOpen(false);
      resetForm();
      fetchProjects();
    } catch (err) {
      console.error("Failed to save project:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData(initialForm);
  };

  const handleEdit = (p: Project) => {
    setFormData({
      ...p,
      services: p.services?.join(", ") || "",
      stack: p.stack?.join(", ") || "",
      screenshots: p.screenshots?.join(", ") || "",
      mainImage: p.mainImage || "",
      id: p.id,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      await apiRequest(`/projects/${id}`, { method: "DELETE" });
      fetchProjects();
    } catch (err) {
      console.error("Failed to delete project:", err);
    }
  };

  const addResult = () => {
    setFormData({
      ...formData,
      results: [...formData.results, { label: "", value: "" }],
    });
  };

  const removeResult = (index: number) => {
    const newResults = [...formData.results];
    newResults.splice(index, 1);
    setFormData({ ...formData, results: newResults });
  };

  const addIntervener = (member?: { name: string; role: string }) => {
    const newIntervener = member || { name: "", role: "", avatar: "" };
    setFormData({
      ...formData,
      interveners: [...formData.interveners, newIntervener],
    });
  };

  const removeIntervener = (index: number) => {
    const newInterveners = [...formData.interveners];
    newInterveners.splice(index, 1);
    setFormData({ ...formData, interveners: newInterveners });
  };

  const isMemberAdded = (name: string) => {
    return formData.interveners.some((i) => i.name === name);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Projects</h2>
          <p className="text-muted-foreground">
            Manage your portfolio projects and collaborations.
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
              <Plus className="mr-2 h-4 w-4" /> New Project
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {formData.id ? "Edit Project" : "Create New Project"}
              </DialogTitle>
              <DialogDescription>
                Fill in the project details below. Supports team collaboration
                and rich media.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-8 py-4">
              {/* Basic Info */}
              <div className="space-y-4">
                <h4 className="font-semibold text-primary border-l-4 border-primary pl-2">
                  Informations de base
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Titre du projet</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      placeholder="E-commerce Redesign"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="slug">Slug (URL)</Label>
                    <Input
                      id="slug"
                      value={formData.slug}
                      onChange={(e) =>
                        setFormData({ ...formData, slug: e.target.value })
                      }
                      placeholder="ecommerce-redesign"
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
                      placeholder="TechGrow Inc."
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="industry">Secteur d'activité</Label>
                    <Input
                      id="industry"
                      value={formData.industry}
                      onChange={(e) =>
                        setFormData({ ...formData, industry: e.target.value })
                      }
                      placeholder="Retail / Finance / Tech"
                    />
                  </div>
                </div>
              </div>

              {/* Media */}
              <div className="space-y-4">
                <h4 className="font-semibold text-primary border-l-4 border-primary pl-2 flex items-center gap-2">
                  <ImageIcon className="h-4 w-4" /> Media & Visuels
                </h4>
                <div className="grid gap-4">
                  <ImageUpload
                    label="Image principale (Mise en avant)"
                    value={formData.mainImage}
                    onChange={(url) =>
                      setFormData({ ...formData, mainImage: url })
                    }
                  />

                  <div className="grid gap-2">
                    <Label htmlFor="screenshots">
                      Captures d'écran (URLs séparées par des virgules)
                    </Label>
                    <Textarea
                      id="screenshots"
                      value={formData.screenshots}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          screenshots: e.target.value,
                        })
                      }
                      placeholder="url1, url2, url3..."
                      className="min-h-[80px]"
                    />
                    <div className="flex gap-2 items-center">
                      <ImageUpload
                        value=""
                        onChange={(url) => {
                          const current = formData.screenshots.trim();
                          const updated = current ? `${current}, ${url}` : url;
                          setFormData({ ...formData, screenshots: updated });
                        }}
                      />
                      <span className="text-xs text-muted-foreground opacity-70">
                        Uploader pour ajouter à la liste
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description Detail */}
              <div className="space-y-4">
                <h4 className="font-semibold text-primary border-l-4 border-primary pl-2 flex items-center gap-2">
                  <Trophy className="h-4 w-4" /> Étude de cas
                </h4>
                <div className="space-y-4 border p-4 rounded-lg bg-muted/30">
                  <div className="grid gap-2">
                    <Label htmlFor="problem">Le Problème</Label>
                    <Textarea
                      id="problem"
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
                      placeholder="Quel était le défi initial ?"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="objectives">Objectifs</Label>
                    <Textarea
                      id="objectives"
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
                      placeholder="Quels étaient les buts à atteindre ?"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="solution">La Solution</Label>
                    <Textarea
                      id="solution"
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
                      placeholder="Comment avez-vous résolu le problème ?"
                    />
                  </div>
                </div>
              </div>

              {/* Technical Links & Stack */}
              <div className="space-y-4">
                <h4 className="font-semibold text-primary border-l-4 border-primary pl-2 flex items-center gap-2">
                  <Github className="h-4 w-4" /> Technique & Liens
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="projectUrl">URL du projet (Live)</Label>
                    <Input
                      id="projectUrl"
                      value={formData.projectUrl}
                      onChange={(e) =>
                        setFormData({ ...formData, projectUrl: e.target.value })
                      }
                      placeholder="https://..."
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="githubUrl">URL GitHub</Label>
                    <Input
                      id="githubUrl"
                      value={formData.githubUrl}
                      onChange={(e) =>
                        setFormData({ ...formData, githubUrl: e.target.value })
                      }
                      placeholder="https://github.com/..."
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="stack">
                      Technologies (séparées par des virgules)
                    </Label>
                    <Input
                      id="stack"
                      value={formData.stack}
                      onChange={(e) =>
                        setFormData({ ...formData, stack: e.target.value })
                      }
                      placeholder="Next.js, Tailwind, PostgreSQL"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="timeline">Durée / Timeline</Label>
                    <Input
                      id="timeline"
                      value={formData.timeline}
                      onChange={(e) =>
                        setFormData({ ...formData, timeline: e.target.value })
                      }
                      placeholder="6 semaines"
                    />
                  </div>
                </div>
              </div>

              {/* Results */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold text-primary border-l-4 border-primary pl-2 flex items-center gap-2">
                    Impact & Résultats
                  </h4>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addResult}
                  >
                    <Plus className="h-3 w-3 mr-1" /> Ajouter un résultat
                  </Button>
                </div>
                <div className="grid gap-3">
                  {formData.results.map((res, i) => (
                    <div
                      key={i}
                      className="flex gap-2 items-end bg-muted/20 p-3 rounded-md"
                    >
                      <div className="flex-1 grid gap-1">
                        <Label className="text-xs">
                          Libellé (ex: Conversion)
                        </Label>
                        <Input
                          value={res.label}
                          onChange={(e) => {
                            const newRes = [...formData.results];
                            newRes[i].label = e.target.value;
                            setFormData({ ...formData, results: newRes });
                          }}
                        />
                      </div>
                      <div className="flex-1 grid gap-1">
                        <Label className="text-xs">Valeur (ex: +45%)</Label>
                        <Input
                          value={res.value}
                          onChange={(e) => {
                            const newRes = [...formData.results];
                            newRes[i].value = e.target.value;
                            setFormData({ ...formData, results: newRes });
                          }}
                        />
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeResult(i)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interveners */}
              <div className="space-y-4">
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
                    <Plus className="h-3 w-3 mr-1" /> Ajouter un membre
                    personnalisé
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2 mb-4 p-3 bg-indigo-50/50 rounded-lg border border-indigo-100">
                  <p className="w-full text-xs font-medium text-indigo-700 mb-2">
                    Ajouter un membre de l'équipe coeur :
                  </p>
                  {TEAM_MEMBERS.map((member) => (
                    <Button
                      key={member.name}
                      type="button"
                      variant={
                        isMemberAdded(member.name) ? "secondary" : "outline"
                      }
                      size="sm"
                      className="text-xs h-8"
                      disabled={isMemberAdded(member.name)}
                      onClick={() => addIntervener(member)}
                    >
                      {isMemberAdded(member.name) ? (
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                      ) : (
                        <Plus className="h-3 w-3 mr-1" />
                      )}
                      {member.name}
                    </Button>
                  ))}
                </div>

                <div className="grid gap-3">
                  {formData.interveners.map((int, i) => (
                    <div key={i} className="flex gap-2 items-end border-b pb-4">
                      <div className="flex-1 grid gap-1">
                        <Label className="text-xs">Nom</Label>
                        <Input
                          value={int.name}
                          onChange={(e) => {
                            const newInt = [...formData.interveners];
                            newInt[i].name = e.target.value;
                            setFormData({ ...formData, interveners: newInt });
                          }}
                        />
                      </div>
                      <div className="flex-1 grid gap-1">
                        <Label className="text-xs">Rôle</Label>
                        <Input
                          value={int.role}
                          onChange={(e) => {
                            const newInt = [...formData.interveners];
                            newInt[i].role = e.target.value;
                            setFormData({ ...formData, interveners: newInt });
                          }}
                        />
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeIntervener(i)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

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
                  className="font-semibold text-primary"
                >
                  Projet à l'affiche (Featured Project)
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
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {formData.id ? "Mettre à jour" : "Enregistrer le projet"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20 text-center flex-col gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-primary mx-auto" />
          <p className="text-muted-foreground">Chargement des projets...</p>
        </div>
      ) : projects.length === 0 ? (
        <Card className="border-dashed py-20 bg-muted/10">
          <CardContent className="flex flex-col items-center">
            <Users className="h-16 w-16 text-muted-foreground/20 mb-4" />
            <p className="text-muted-foreground mb-4 font-medium">
              Aucun projet trouvé.
            </p>
            <Button onClick={() => setIsDialogOpen(true)} variant="outline">
              Créez votre premier projet
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <Card
              key={p.id}
              className="group relative flex flex-col overflow-hidden hover:shadow-xl transition-all duration-300 border-indigo-100/50"
            >
              {p.mainImage && (
                <div className="h-48 w-full overflow-hidden bg-muted">
                  <img
                    src={p.mainImage}
                    alt={p.title}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}
              <CardHeader className="pb-3 px-5 pt-5">
                <div className="flex justify-between items-start mb-2">
                  <Badge
                    variant={p.isFeatured ? "default" : "secondary"}
                    className={p.isFeatured ? "bg-primary" : ""}
                  >
                    {p.isFeatured ? "Featured" : "Standard"}
                  </Badge>
                  <span className="text-[10px] font-medium text-muted-foreground bg-muted/50 px-2 py-1 rounded">
                    {p.timeline}
                  </span>
                </div>
                <CardTitle className="line-clamp-1 text-lg group-hover:text-primary transition-colors">
                  {p.title}
                </CardTitle>
                <CardDescription className="flex items-center gap-1 font-medium">
                  {p.clientName}{" "}
                  <span className="text-muted-foreground/30">•</span>{" "}
                  {p.industry}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 space-y-4 px-5 pb-5">
                <p className="text-xs text-muted-foreground line-clamp-2 italic">
                  "{p.description.objectives || "No objectives defined."}"
                </p>

                <div className="flex flex-wrap gap-1">
                  {p.stack?.slice(0, 4).map((s, idx) => (
                    <Badge
                      key={idx}
                      variant="outline"
                      className="text-[9px] bg-background/50 border-indigo-100 text-indigo-700"
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
                  <div className="bg-indigo-50/30 p-2.5 rounded-lg border border-indigo-100/30 text-xs space-y-1.5 shadow-sm">
                    {p.results.slice(0, 2).map((r, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between items-center"
                      >
                        <span className="text-muted-foreground text-[10px] uppercase font-semibold tracking-wider">
                          {r.label}
                        </span>
                        <span className="font-bold text-indigo-700">
                          {r.value}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between pt-2">
                  <div className="flex -space-x-2">
                    {p.interveners?.slice(0, 4).map((int, idx) => (
                      <div
                        key={idx}
                        className="h-7 w-7 rounded-full border-2 border-background bg-indigo-100 text-indigo-700 flex items-center justify-center text-[10px] font-bold shadow-sm"
                        title={`${int.name} (${int.role})`}
                      >
                        {int.name.charAt(0)}
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
                      className="h-8 w-8 rounded-full border-indigo-100 hover:bg-primary/5 hover:text-primary transition-colors"
                      onClick={() => handleEdit(p)}
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-full border-red-100 text-red-400 hover:bg-red-50 hover:text-red-500 transition-colors"
                      onClick={() => handleDelete(p.id)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
