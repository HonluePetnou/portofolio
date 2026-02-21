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
  Pencil,
  Trash2,
  Loader2,
  FileText,
  Image as ImageIcon,
  Type,
  Link as LinkIcon,
  Tag,
  Search,
  Eye,
  Clock,
} from "lucide-react";
import { apiRequest } from "@/lib/api";
import { ImageUpload } from "@/components/shared/ImageUpload";

interface ArticleSection {
  heading: string;
  body: string;
}

interface ArticleContent {
  intro: string;
  sections: ArticleSection[];
}

interface CTA {
  text: string;
  url: string;
}

interface SEO {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
}

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  content: ArticleContent;
  cta: CTA;
  relatedProjectId: string | null;
  tags: string[];
  seo: SEO;
  published: boolean;
  readingTime: number;
  createdAt: string;
}

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const initialForm = {
    id: null as string | null,
    title: "",
    slug: "",
    excerpt: "",
    coverImage: "",
    content: {
      intro: "",
      sections: [] as ArticleSection[],
    },
    cta: {
      text: "",
      url: "",
    },
    relatedProjectId: null as string | null,
    tags: "", // Input as string
    seo: {
      metaTitle: "",
      metaDescription: "",
      keywords: "", // Input as string
    },
    published: true,
    readingTime: 5,
  };

  const [formData, setFormData] = useState(initialForm);

  const fetchArticles = async () => {
    setIsLoading(true);
    try {
      const data = await apiRequest("/articles");
      setArticles(data);
    } catch (err) {
      console.error("Failed to fetch articles:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      ...formData,
      tags: formData.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      seo: {
        ...formData.seo,
        keywords: formData.seo.keywords
          .split(",")
          .map((k) => k.trim())
          .filter(Boolean),
      },
    };

    try {
      if (formData.id) {
        await apiRequest(`/articles/${formData.id}`, {
          method: "PATCH",
          body: JSON.stringify(payload),
        });
      } else {
        await apiRequest("/articles", {
          method: "POST",
          body: JSON.stringify(payload),
        });
      }
      setIsDialogOpen(false);
      resetForm();
      fetchArticles();
    } catch (err) {
      console.error("Failed to save article:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData(initialForm);
  };

  const handleEdit = (a: Article) => {
    setFormData({
      ...a,
      tags: a.tags?.join(", ") || "",
      seo: {
        ...a.seo,
        keywords: a.seo?.keywords?.join(", ") || "",
      },
      id: a.id,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this article?")) return;
    try {
      await apiRequest(`/articles/${id}`, { method: "DELETE" });
      fetchArticles();
    } catch (err) {
      console.error("Failed to delete article:", err);
    }
  };

  const addSection = () => {
    setFormData({
      ...formData,
      content: {
        ...formData.content,
        sections: [...formData.content.sections, { heading: "", body: "" }],
      },
    });
  };

  const removeSection = (index: number) => {
    const newSections = [...formData.content.sections];
    newSections.splice(index, 1);
    setFormData({
      ...formData,
      content: { ...formData.content, sections: newSections },
    });
  };

  const updateSection = (
    index: number,
    field: keyof ArticleSection,
    value: string,
  ) => {
    const newSections = [...formData.content.sections];
    newSections[index] = { ...newSections[index], [field]: value };
    setFormData({
      ...formData,
      content: { ...formData.content, sections: newSections },
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Articles de Blog
          </h2>
          <p className="text-muted-foreground">
            Gérez votre contenu éducatif et vos analyses d'expert.
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
              <Plus className="mr-2 h-4 w-4" /> Nouvel Article
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {formData.id ? "Modifier l'article" : "Créer un article"}
              </DialogTitle>
              <DialogDescription>
                Rédigez un contenu de haute qualité pour votre audience.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-8 py-4">
              {/* Basic Info */}
              <div className="space-y-4">
                <h4 className="font-semibold text-primary border-l-4 border-primary pl-2 flex items-center gap-2">
                  <Type className="h-4 w-4" /> Informations de base
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Titre de l'article</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      placeholder="Pourquoi votre site ne convertit pas"
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
                      placeholder="pourquoi-site-ne-convertit-pas"
                      required
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="excerpt">Extrait (Excerpt)</Label>
                  <Textarea
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) =>
                      setFormData({ ...formData, excerpt: e.target.value })
                    }
                    placeholder="Une courte introduction pour attirer l'attention..."
                    required
                  />
                </div>
              </div>

              {/* Cover Image */}
              <div className="space-y-4">
                <h4 className="font-semibold text-primary border-l-4 border-primary pl-2 flex items-center gap-2">
                  <ImageIcon className="h-4 w-4" /> Image de couverture
                </h4>
                <ImageUpload
                  value={formData.coverImage}
                  onChange={(url) =>
                    setFormData({ ...formData, coverImage: url })
                  }
                />
              </div>

              {/* Content Sections */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold text-primary border-l-4 border-primary pl-2 flex items-center gap-2">
                    <FileText className="h-4 w-4" /> Contenu de l'article
                  </h4>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addSection}
                  >
                    <Plus className="h-3 w-3 mr-1" /> Ajouter une section
                  </Button>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="intro">Introduction</Label>
                  <Textarea
                    id="intro"
                    value={formData.content.intro}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        content: { ...formData.content, intro: e.target.value },
                      })
                    }
                    placeholder="Introduction détaillée de l'article..."
                    className="min-h-[120px]"
                  />
                </div>

                <div className="space-y-6">
                  {formData.content.sections.map((section, i) => (
                    <Card key={i} className="relative bg-muted/20">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 text-destructive"
                        onClick={() => removeSection(i)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">
                          Section {i + 1}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid gap-2">
                          <Label className="text-xs">Titre de la section</Label>
                          <Input
                            value={section.heading}
                            onChange={(e) =>
                              updateSection(i, "heading", e.target.value)
                            }
                            placeholder="Le Problème Réel"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label className="text-xs">Corps du texte</Label>
                          <Textarea
                            value={section.body}
                            onChange={(e) =>
                              updateSection(i, "body", e.target.value)
                            }
                            placeholder="Contenu détaillé de cette section..."
                            className="min-h-[100px]"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="space-y-4">
                <h4 className="font-semibold text-primary border-l-4 border-primary pl-2 flex items-center gap-2">
                  <LinkIcon className="h-4 w-4" /> Appel à l'action (CTA)
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="ctaText">Texte du bouton</Label>
                    <Input
                      id="ctaText"
                      value={formData.cta.text}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          cta: { ...formData.cta, text: e.target.value },
                        })
                      }
                      placeholder="Réserver un audit gratuit"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="ctaUrl">URL du bouton</Label>
                    <Input
                      id="ctaUrl"
                      value={formData.cta.url}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          cta: { ...formData.cta, url: e.target.value },
                        })
                      }
                      placeholder="/contact"
                    />
                  </div>
                </div>
              </div>

              {/* metadata */}
              <div className="space-y-4">
                <h4 className="font-semibold text-primary border-l-4 border-primary pl-2 flex items-center gap-2">
                  <Tag className="h-4 w-4" /> Métadonnées & SEO
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="tags">
                      Tags (séparés par des virgules)
                    </Label>
                    <Input
                      id="tags"
                      value={formData.tags}
                      onChange={(e) =>
                        setFormData({ ...formData, tags: e.target.value })
                      }
                      placeholder="UX, Conversion, Growth"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="readingTime">
                      Temps de lecture (minutes)
                    </Label>
                    <Input
                      id="readingTime"
                      type="number"
                      value={formData.readingTime}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          readingTime: parseInt(e.target.value),
                        })
                      }
                    />
                  </div>
                </div>

                <div className="space-y-4 border p-4 rounded-lg bg-indigo-50/20">
                  <div className="grid gap-2">
                    <Label htmlFor="metaTitle">SEO Title</Label>
                    <Input
                      id="metaTitle"
                      value={formData.seo.metaTitle}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          seo: { ...formData.seo, metaTitle: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="metaDescription">SEO Description</Label>
                    <Textarea
                      id="metaDescription"
                      value={formData.seo.metaDescription}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          seo: {
                            ...formData.seo,
                            metaDescription: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="keywords">SEO Keywords (virgules)</Label>
                    <Input
                      id="keywords"
                      value={formData.seo.keywords}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          seo: { ...formData.seo, keywords: e.target.value },
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2 border p-3 rounded-lg bg-primary/5">
                <Switch
                  id="published"
                  checked={formData.published}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, published: checked })
                  }
                />
                <Label
                  htmlFor="published"
                  className="font-semibold text-primary"
                >
                  Publier l'article immédiatement
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
                  {formData.id ? "Mettre à jour" : "Enregistrer l'article"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20 flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="text-muted-foreground italic">
            Chargement des articles...
          </p>
        </div>
      ) : articles.length === 0 ? (
        <Card className="border-dashed py-20 bg-muted/10">
          <CardContent className="flex flex-col items-center">
            <FileText className="h-16 w-16 text-muted-foreground/20 mb-4" />
            <p className="text-muted-foreground mb-4 font-medium">
              Aucun article publié pour le moment.
            </p>
            <Button onClick={() => setIsDialogOpen(true)} variant="outline">
              Rédigez votre premier article
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {articles.map((a) => (
            <Card
              key={a.id}
              className="group relative flex flex-col overflow-hidden hover:shadow-xl transition-all duration-300 border-indigo-100/50"
            >
              <div className="flex flex-col md:flex-row h-full">
                {a.coverImage && (
                  <div className="md:w-1/3 aspect-video md:aspect-auto overflow-hidden bg-muted">
                    <img
                      src={a.coverImage}
                      alt={a.title}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                <div className="flex-1 flex flex-col">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant={a.published ? "default" : "secondary"}>
                        {a.published ? "Publié" : "Brouillon"}
                      </Badge>
                      <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-medium">
                        <Clock className="h-3 w-3" /> {a.readingTime} min
                      </div>
                    </div>
                    <CardTitle className="line-clamp-2 text-lg group-hover:text-primary transition-colors leading-snug">
                      {a.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2 text-xs">
                      {a.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 space-y-4 pt-0">
                    <div className="flex flex-wrap gap-1">
                      {a.tags?.slice(0, 3).map((t, idx) => (
                        <Badge
                          key={idx}
                          variant="outline"
                          className="text-[9px] bg-indigo-50/30 text-indigo-700 border-indigo-100 italic"
                        >
                          #{t}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex gap-2 pt-4 mt-auto border-t opacity-0 group-hover:opacity-100 transition-opacity justify-end">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 px-2 text-muted-foreground hover:text-primary"
                        onClick={() => handleEdit(a)}
                      >
                        <Pencil className="h-4 w-4 mr-1" /> Modifier
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 px-2 text-muted-foreground hover:text-destructive"
                        onClick={() => handleDelete(a.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" /> Supprimer
                      </Button>
                    </div>
                  </CardContent>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
