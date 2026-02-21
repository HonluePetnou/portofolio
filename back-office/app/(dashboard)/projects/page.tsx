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
} from "lucide-react";
import { apiRequest } from "@/lib/api";

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
  images: string[];
  interveners: Intervener[];
  isFeatured: boolean;
  createdAt: string;
}

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
    services: "", // String for input, will be split
    description: {
      problem: "",
      objectives: "",
      solution: "",
    },
    results: [] as Result[],
    stack: "", // String for input, will be split
    timeline: "",
    projectUrl: "",
    githubUrl: "",
    images: "", // String for input, will be split
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

    // Process string lists into arrays
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
      images: formData.images
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
      services: p.services.join(", "),
      stack: p.stack.join(", "),
      images: p.images.join(", "),
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

  // Helpers for nested JSON fields
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

  const addIntervener = () => {
    setFormData({
      ...formData,
      interveners: [
        ...formData.interveners,
        { name: "", role: "", avatar: "" },
      ],
    });
  };

  const removeIntervener = (index: number) => {
    const newInterveners = [...formData.interveners];
    newInterveners.splice(index, 1);
    setFormData({ ...formData, interveners: newInterveners });
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
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {formData.id ? "Edit Project" : "Create New Project"}
              </DialogTitle>
              <DialogDescription>
                Fill in the project details below. Supports team collaboration.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Project Title</Label>
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
                  <Label htmlFor="slug">Slug</Label>
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
                  <Label htmlFor="clientName">Client Name</Label>
                  <Input
                    id="clientName"
                    value={formData.clientName}
                    onChange={(e) =>
                      setFormData({ ...formData, clientName: e.target.value })
                    }
                    placeholder="TechGrow"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Input
                    id="industry"
                    value={formData.industry}
                    onChange={(e) =>
                      setFormData({ ...formData, industry: e.target.value })
                    }
                    placeholder="Retail"
                  />
                </div>
              </div>

              <div className="space-y-4 border p-4 rounded-lg bg-muted/30">
                <h4 className="font-medium text-sm">Description Detail</h4>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="problem">The Problem</Label>
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
                      placeholder="What was the initial challenge?"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="objectives">Objectives</Label>
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
                      placeholder="What were you trying to achieve?"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="solution">Solution</Label>
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
                      placeholder="How did you solve it?"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="projectUrl">Project URL</Label>
                  <Input
                    id="projectUrl"
                    value={formData.projectUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, projectUrl: e.target.value })
                    }
                    placeholder="https://client-site.com"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="githubUrl">GitHub URL</Label>
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
                  <Label htmlFor="stack">Stack (comma separated)</Label>
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
                  <Label htmlFor="timeline">Timeline</Label>
                  <Input
                    id="timeline"
                    value={formData.timeline}
                    onChange={(e) =>
                      setFormData({ ...formData, timeline: e.target.value })
                    }
                    placeholder="6 weeks"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label>Results / Metrics</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addResult}
                  >
                    <Plus className="h-3 w-3 mr-1" /> Add Result
                  </Button>
                </div>
                {formData.results.map((res, i) => (
                  <div key={i} className="flex gap-2 items-end">
                    <div className="flex-1 grid gap-1">
                      <Label className="text-xs">Label</Label>
                      <Input
                        value={res.label}
                        onChange={(e) => {
                          const newRes = [...formData.results];
                          newRes[i].label = e.target.value;
                          setFormData({ ...formData, results: newRes });
                        }}
                        placeholder="Conversion"
                      />
                    </div>
                    <div className="flex-1 grid gap-1">
                      <Label className="text-xs">Value</Label>
                      <Input
                        value={res.value}
                        onChange={(e) => {
                          const newRes = [...formData.results];
                          newRes[i].value = e.target.value;
                          setFormData({ ...formData, results: newRes });
                        }}
                        placeholder="+45%"
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

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label>Interveners (Collaborators)</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addIntervener}
                  >
                    <Plus className="h-3 w-3 mr-1" /> Add Team Member
                  </Button>
                </div>
                {formData.interveners.map((int, i) => (
                  <div key={i} className="flex gap-2 items-end border-b pb-4">
                    <div className="flex-1 grid gap-1">
                      <Label className="text-xs">Name</Label>
                      <Input
                        value={int.name}
                        onChange={(e) => {
                          const newInt = [...formData.interveners];
                          newInt[i].name = e.target.value;
                          setFormData({ ...formData, interveners: newInt });
                        }}
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="flex-1 grid gap-1">
                      <Label className="text-xs">Role</Label>
                      <Input
                        value={int.role}
                        onChange={(e) => {
                          const newInt = [...formData.interveners];
                          newInt[i].role = e.target.value;
                          setFormData({ ...formData, interveners: newInt });
                        }}
                        placeholder="Developer"
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

              <div className="flex items-center space-x-2 border p-3 rounded-lg">
                <Switch
                  id="isFeatured"
                  checked={formData.isFeatured}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, isFeatured: checked })
                  }
                />
                <Label htmlFor="isFeatured">
                  Featured Project (Show on Landing Page)
                </Label>
              </div>

              <DialogFooter>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {formData.id ? "Update Project" : "Create Project"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </div>
      ) : projects.length === 0 ? (
        <Card className="border-dashed py-20">
          <CardContent className="flex flex-col items-center">
            <p className="text-muted-foreground mb-4">No projects found.</p>
            <Button onClick={() => setIsDialogOpen(true)}>
              Add your first project
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <Card key={p.id} className="group relative flex flex-col">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant={p.isFeatured ? "default" : "secondary"}>
                    {p.isFeatured ? "Featured" : "Standard"}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {p.timeline}
                  </span>
                </div>
                <CardTitle className="line-clamp-1">{p.title}</CardTitle>
                <CardDescription className="flex items-center gap-1">
                  {p.clientName} • {p.industry}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {p.description.objectives || "No description provided."}
                </p>

                <div className="flex flex-wrap gap-1">
                  {p.stack.slice(0, 3).map((s, idx) => (
                    <Badge key={idx} variant="outline" className="text-[10px]">
                      {s}
                    </Badge>
                  ))}
                  {p.stack.length > 3 && (
                    <Badge variant="outline" className="text-[10px]">
                      +{p.stack.length - 3}
                    </Badge>
                  )}
                </div>

                {p.results.length > 0 && (
                  <div className="bg-muted/50 p-2 rounded text-xs space-y-1">
                    {p.results.slice(0, 2).map((r, idx) => (
                      <div key={idx} className="flex justify-between">
                        <span className="text-muted-foreground">{r.label}</span>
                        <span className="font-bold text-primary">
                          {r.value}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {p.interveners.slice(0, 3).map((int, idx) => (
                      <div
                        key={idx}
                        className="h-6 w-6 rounded-full border bg-background flex items-center justify-center text-[10px] font-bold"
                        title={`${int.name} (${int.role})`}
                      >
                        {int.name.charAt(0)}
                      </div>
                    ))}
                  </div>
                  <span className="text-[10px] text-muted-foreground">
                    {p.interveners.length} interveners
                  </span>
                </div>

                <div className="flex gap-2 pt-4 mt-auto border-t opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => handleEdit(p)}
                  >
                    <Pencil className="h-3 w-3 mr-1" /> Edit
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-destructive"
                    onClick={() => handleDelete(p.id)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
