"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Plus,
  Pencil,
  Trash2,
  Loader2,
  FileText,
  Image as ImageIcon,
  Type,
  Link as LinkIcon,
  Eye,
  Clock,
  ChevronUp,
  ChevronDown,
  Globe,
  Target,
  ArrowRight,
  Sparkles,
  Layout,
  Wand2,
  Rocket,
  Search,
  FileEdit,
  Tag,
  Archive,
  CheckCircle2,
  Filter,
  X,
  Layers,
} from "lucide-react";
import { apiRequest } from "@/lib/api";
import { ImageUpload } from "@/components/shared/ImageUpload";
import { Select, SelectItem } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface ArticleSection {
  heading: string;
  body: string;
  image?: string;
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

interface Project {
  id: string;
  title: string;
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
  archived?: boolean;
  readingTime: number;
  createdAt: string;
}

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
  relatedProjectId: "",
  tags: "",
  seo: {
    metaTitle: "",
    metaDescription: "",
    keywords: "",
  },
  published: false,
  readingTime: 5,
};

export default function ArticlesPage() {
  const [activeTab, setActiveTab] = useState("mine");
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [myArticles, setMyArticles] = useState<Article[]>([]);
  const [allArticles, setAllArticles] = useState<Article[]>([]);
  const [archivedArticles, setArchivedArticles] = useState<Article[]>([]);

  const [isLoadingMine, setIsLoadingMine] = useState(true);
  const [isLoadingAll, setIsLoadingAll] = useState(false);
  const [isLoadingArchived, setIsLoadingArchived] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [slugStatus, setSlugStatus] = useState<
    "idle" | "checking" | "ok" | "taken text-destructive"
  >("idle");
  const [editingAsAdmin, setEditingAsAdmin] = useState(false);

  const [formData, setFormData] = useState(initialForm);

  const [isViewOpen, setIsViewOpen] = useState(false);
  const [viewProject, setViewProject] = useState<Project | null>(null);

  const [publishedFilter, setPublishedFilter] = useState<
    "all" | "published" | "draft"
  >("all");
  const [tagFilter, setTagFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [articles, setArticles] = useState<Article[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.append("search", searchQuery);
      if (publishedFilter !== "all")
        params.append(
          "published_filter",
          publishedFilter === "published" ? "true" : "false",
        );
      if (tagFilter) params.append("tag", tagFilter);

      const [articlesData, projectsData] = await Promise.all([
        apiRequest(`/articles?${params.toString()}`),
        apiRequest("/projects/me"),
      ]);
      setArticles(articlesData);
      setProjects(projectsData);
    } catch (err) {
      console.error("Failed to fetch data:", err);
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery, publishedFilter, tagFilter]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const dropdown = document.getElementById("published-dropdown");
      const button = event.target as HTMLElement;

      if (dropdown && !dropdown.contains(button) && !button.closest("button")) {
        dropdown.classList.add("hidden");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      ...formData,
      relatedProjectId: formData.relatedProjectId || null,
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
      fetchData();
    } catch (err) {
      console.error("Failed to save article:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (a: Article) => {
    setFormData({
      ...a,
      relatedProjectId: a.relatedProjectId || "",
      tags: a.tags?.join(", ") || "",
      seo: {
        ...a.seo,
        keywords: a.seo?.keywords?.join(", ") || "",
      },
      id: a.id,
    });
    setIsDialogOpen(true);
  };

  const togglePublished = async (article: Article) => {
    try {
      await apiRequest(`/articles/${article.id}`, {
        method: "PATCH",
        body: JSON.stringify({ published: !article.published }),
      });
      fetchData();
    } catch (err) {
      console.error("Failed to toggle status:", err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this strategic asset permanently?")) return;
    try {
      await apiRequest(`/articles/${id}`, { method: "DELETE" });
      fetchData();
    } catch (err) {
      console.error("Failed to delete article:", err);
    }
  };

  const resetForm = () => {
    setFormData(initialForm);
    setActiveTab("content");
  };

  const slugify = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const updateTitle = (val: string) => {
    setFormData((prev) => ({
      ...prev,
      title: val,
      slug: prev.id ? prev.slug : slugify(val),
      seo: { ...prev.seo, metaTitle: prev.seo.metaTitle || val },
    }));
  };

  const handleAIGenerate = async () => {
    if (!formData.title) return alert("Prompt required for AI activation.");
    setIsAiLoading(true);
    try {
      const data = await apiRequest("/ai/generate", {
        method: "POST",
        body: JSON.stringify({ prompt: formData.title }),
      });
      setFormData((prev) => ({
        ...prev,
        title: data.title,
        excerpt: data.excerpt,
        content: data.content,
        seo: {
          ...prev.seo,
          metaTitle: data.title,
          metaDescription: data.excerpt,
        },
      }));
    } catch (err) {
      console.error("AI node failure:", err);
    } finally {
      setIsAiLoading(false);
    }
  };

  const addSection = () => {
    setFormData((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        sections: [
          ...prev.content.sections,
          { heading: "", body: "", image: "" },
        ],
      },
    }));
  };

  const moveSection = (idx: number, direction: "up" | "down") => {
    const sections = [...formData.content.sections];
    if (direction === "up" && idx > 0)
      [sections[idx], sections[idx - 1]] = [sections[idx - 1], sections[idx]];
    else if (direction === "down" && idx < sections.length - 1)
      [sections[idx], sections[idx + 1]] = [sections[idx + 1], sections[idx]];
    setFormData({ ...formData, content: { ...formData.content, sections } });
  };

  const removeSection = (idx: number) => {
    const sections = formData.content.sections.filter((_, i) => i !== idx);
    setFormData({ ...formData, content: { ...formData.content, sections } });
  };

  const updateSection = (
    idx: number,
    field: keyof ArticleSection,
    value: string,
  ) => {
    const sections = [...formData.content.sections];
    sections[idx] = { ...sections[idx], [field]: value };
    setFormData({ ...formData, content: { ...formData.content, sections } });
  };

  const filteredArticles = useMemo(() => {
    // Articles are already filtered by the backend API
    return articles;
  }, [articles]);

  const draftArticles = useMemo(
    () => filteredArticles.filter((a) => !a.published),
    [filteredArticles],
  );
  const publishedArticles = useMemo(
    () => filteredArticles.filter((a) => a.published),
    [filteredArticles],
  );

  const TableHeader = ({ icon: Icon, label, count, color }: any) => (
    <div className="flex items-center justify-between mb-4 px-2">
      <div className="flex items-center gap-3">
        <div className={cn("p-2 rounded-lg bg-white/5 border border-white/10", color.replace('bg-', 'text-'))}>
          <Icon className="h-4 w-4" />
        </div>
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-white">
            {label}
          </h3>
          <p className="text-xs font-medium text-white/40">
            {count} Assets Active
          </p>
        </div>
      </div>
    </div>
  );

  const ArticleRow = ({ article }: { article: Article }) => (
    <div className="group relative flex items-center gap-5 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-[#0a0d1f]/60 hover:border-primary/30 hover:shadow-[0_8px_30px_rgba(250,91,7,0.15)] transition-all duration-500 mb-3 hover:-translate-y-1">
      <div className="h-16 w-24 rounded-xl overflow-hidden shrink-0 bg-white/5 border border-white/10 relative">
        {article.coverImage ? (
          <img
            src={article.coverImage}
            className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
            alt={article.title}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = "none";
              const parent = target.parentElement;
              if (parent) {
                parent.innerHTML = `<div class="absolute inset-0 flex items-center justify-center"><svg class="h-5 w-5 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg></div>`;
              }
            }}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <ImageIcon className="h-5 w-5 text-white/20" />
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0 py-1">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h4 className="text-base font-bold tracking-tight text-white/90 wrap-break-word truncate group-hover:text-primary transition-colors">
              {article.title}
            </h4>
            <p className="text-xs text-white/50 font-medium truncate mt-0.5 line-clamp-1">
              {article.excerpt}
            </p>
            <div className="flex items-center gap-4 mt-2.5">
              <div className="flex items-center gap-1.5 text-[10px] font-semibold text-white/40">
                <Clock className="h-3 w-3" /> {article.readingTime} min read
              </div>
              {article.tags && article.tags.length > 0 && (
                <div className="flex items-center gap-1.5 text-[10px] font-semibold text-white/40">
                  <Tag className="h-3 w-3" /> {article.tags[0]}
                  {article.tags.length > 1 && <span className="px-1.5 py-0.5 rounded-md bg-white/10 text-white/60">+{article.tags.length - 1}</span>}
                </div>
              )}
              <div
                className={`flex items-center gap-1 text-[10px] font-bold ${
                  article.published ? "text-emerald-400" : "text-amber-400"
                }`}
              >
                {article.published ? (
                  <><CheckCircle2 className="h-3 w-3" /> Published</>
                ) : (
                  <><FileEdit className="h-3 w-3" /> Draft</>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 transition-all duration-300">
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-primary hover:text-white hover:scale-110 transition-all"
          onClick={() => handleEdit(article)}
        >
          <Pencil className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "h-10 px-4 rounded-xl font-black text-[10px] uppercase tracking-widest gap-2 transition-all shadow-xl hover:scale-105",
            article.published
              ? "bg-amber-500/10 text-amber-500 hover:bg-amber-500 hover:text-white"
              : "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-white",
          )}
          onClick={() => togglePublished(article)}
        >
          {article.published ? (
            <>
              <Archive className="h-4 w-4" />
              Draft
            </>
          ) : (
            <>
              <CheckCircle2 className="h-4 w-4" />
              Publish
            </>
          )}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-xl bg-rose-100 dark:bg-rose-900/20 hover:bg-rose-500 hover:text-white hover:scale-110 transition-all"
          onClick={() => handleDelete(article.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto space-y-12 animate-in fade-in duration-700 pb-20">
      {/* Sleek Premium Header */}
      <div className="flex items-end justify-between flex-wrap gap-6 border-b border-white/5 pb-8">
        <div className="space-y-1.5 animate-in slide-in-from-left-4 fade-in duration-500">
          <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
            <Sparkles className="h-6 w-6 text-primary" />
            Article Repository
          </h1>
          <p className="text-sm text-white/50">
            Manage and publish your strategic content assets.
          </p>
        </div>

        <div className="flex items-center gap-4 animate-in slide-in-from-right-4 fade-in duration-500">
          <Dialog
            open={isDialogOpen}
            onOpenChange={(open) => {
              setIsDialogOpen(open);
              if (!open) resetForm();
            }}
          >
            <DialogTrigger asChild>
              <Button
                className="rounded-xl shadow-lg shadow-primary/25 h-11 px-6 text-sm font-semibold gap-2 bg-linear-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white hover:scale-[1.02] active:scale-[0.98] transition-transform duration-300 outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0d1f] border-0"
                aria-label="Create new article asset"
              >
                <Plus className="h-4 w-4" /> New Article
              </Button>
            </DialogTrigger>

            <DialogContent className="max-w-5xl max-h-[95vh] overflow-y-auto p-0 border border-white/10 bg-[#0a0d1f]/95 backdrop-blur-2xl text-white rounded-2xl shadow-2xl">
              <form onSubmit={handleSubmit} className="flex flex-col h-full">
                {/* Editor Header */}
                <div className="bg-[#0a0d1f]/80 backdrop-blur-2xl border-b border-white/5 p-6 sticky top-0 z-50 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                      <FileEdit className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold">{formData.id ? "Edit Article" : "New Article"}</h2>
                      <p className="text-xs text-white/40">
                        {formData.title || "Untitled asset"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center bg-white/5 border border-white/10 rounded-xl p-1 mr-2">
                      <Button
                        type="button"
                        variant="ghost"
                        className={cn(
                          "h-8 px-4 rounded-lg font-semibold text-xs transition-all",
                          !formData.published
                            ? "bg-white/10 text-white shadow"
                            : "text-white/40 hover:text-white"
                        )}
                        onClick={() => setFormData({ ...formData, published: false })}
                      >
                        Draft
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        className={cn(
                          "h-8 px-4 rounded-lg font-semibold text-xs transition-all",
                          formData.published
                            ? "bg-emerald-500/20 text-emerald-400 shadow border border-emerald-500/20"
                            : "text-white/40 hover:text-white"
                        )}
                        onClick={() => setFormData({ ...formData, published: true })}
                      >
                        Publish
                      </Button>
                    </div>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="rounded-lg font-semibold px-6 h-10 shadow-lg shadow-primary/20 bg-linear-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 transition-transform active:scale-95"
                    >
                      {isSubmitting ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        "Save Asset"
                      )}
                    </Button>
                  </div>
                </div>

                <div className="p-8 space-y-8">
                  <Tabs defaultValue="content" onValueChange={setActiveTab} value={activeTab}>
                    <TabsList className="bg-white/5 p-1 rounded-xl mb-8 w-fit border border-white/5 flex gap-1">
                      <TabsTrigger value="content" className="rounded-lg px-6 py-2 data-[state=active]:bg-white/10 data-[state=active]:text-white data-[state=inactive]:text-white/50 transition-all font-semibold text-xs gap-2">
                        <Layout className="h-3.5 w-3.5" /> Content
                      </TabsTrigger>
                      <TabsTrigger value="strategy" className="rounded-lg px-6 py-2 data-[state=active]:bg-white/10 data-[state=active]:text-white data-[state=inactive]:text-white/50 transition-all font-semibold text-xs gap-2">
                        <Target className="h-3.5 w-3.5" /> Strategy
                      </TabsTrigger>
                      <TabsTrigger value="seo" className="rounded-lg px-6 py-2 data-[state=active]:bg-white/10 data-[state=active]:text-white data-[state=inactive]:text-white/50 transition-all font-semibold text-xs gap-2">
                        <Globe className="h-3.5 w-3.5" /> SEO
                      </TabsTrigger>
                    </TabsList>

                    {/* CONTENT TAB */}
                    <TabsContent value="content" className="space-y-8 animate-in slide-in-from-bottom-4">
                      <div className="grid md:grid-cols-[1fr_280px] gap-8 items-start">
                        <div className="space-y-6">
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <Label className="text-xs font-semibold text-white/50">Article Title</Label>
                              <Button
                                type="button"
                                variant="ghost"
                                onClick={handleAIGenerate}
                                disabled={isAiLoading || !formData.title}
                                className="h-7 px-3 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 text-xs font-semibold gap-1.5 transition-all"
                              >
                                {isAiLoading ? <Loader2 className="h-3 w-3 animate-spin" /> : <Sparkles className="h-3 w-3" />}
                                AI Assist
                              </Button>
                            </div>
                            <Input
                              className="text-2xl font-bold bg-white/5 border-white/10 px-4 h-14 focus-visible:ring-primary rounded-xl placeholder:text-white/20"
                              placeholder="Your article title..."
                              value={formData.title}
                              onChange={(e) => updateTitle(e.target.value)}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-xs font-semibold text-white/50">Excerpt</Label>
                            <Textarea
                              className="bg-white/5 border-white/10 rounded-xl p-4 min-h-[100px] text-sm text-white/70 focus:border-white/20 transition-all placeholder:text-white/20 resize-none"
                              placeholder="Brief summary..."
                              value={formData.excerpt}
                              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                              required
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs font-semibold text-white/50">Cover Image</Label>
                          <ImageUpload
                            value={formData.coverImage}
                            onChange={(url) => setFormData({ ...formData, coverImage: url })}
                            className="aspect-video rounded-xl bg-white/5 border border-white/10"
                          />
                        </div>
                      </div>

                      <div className="space-y-8 border-t border-white/5 pt-8">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-semibold flex items-center gap-2">
                            <Type className="h-5 w-5 text-primary" /> Body Content
                          </h3>
                          <Button
                            type="button"
                            onClick={addSection}
                            className="rounded-lg h-9 px-4 gap-2 bg-white/5 hover:bg-white/10 border border-white/10 font-semibold text-xs transition-colors"
                          >
                            <Plus className="h-4 w-4" /> Add Section
                          </Button>
                        </div>

                        <div className="space-y-4">
                          <Label className="text-xs font-semibold text-white/50">Introduction</Label>
                          <Textarea
                            className="bg-white/5 border-white/10 rounded-xl p-4 min-h-[120px] text-sm text-white/80 focus:border-white/20 transition-all placeholder:text-white/20 resize-none"
                            placeholder="Hook your readers here..."
                            value={formData.content.intro}
                            onChange={(e) => setFormData({ ...formData, content: { ...formData.content, intro: e.target.value } })}
                          />
                        </div>

                        <div className="space-y-6">
                          {formData.content.sections.map((section, i) => (
                            <div key={i} className="group/section relative bg-white/5 border border-white/10 rounded-2xl p-6 transition-all hover:bg-white/10 hover:border-white/20">
                              <div className="absolute top-4 right-4 flex items-center gap-1 opacity-0 group-hover/section:opacity-100 transition-opacity">
                                <Button type="button" size="icon" variant="ghost" className="h-8 w-8 rounded-lg bg-white/5 hover:bg-white/10" onClick={() => moveSection(i, "up")} disabled={i === 0}>
                                  <ChevronUp className="h-4 w-4" />
                                </Button>
                                <Button type="button" size="icon" variant="ghost" className="h-8 w-8 rounded-lg bg-white/5 hover:bg-white/10" onClick={() => moveSection(i, "down")} disabled={i === formData.content.sections.length - 1}>
                                  <ChevronDown className="h-4 w-4" />
                                </Button>
                                <div className="w-px h-4 bg-white/10 mx-1" />
                                <Button type="button" size="icon" variant="ghost" className="h-8 w-8 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white transition-all" onClick={() => removeSection(i)}>
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>

                              <span className="inline-flex items-center text-[10px] font-bold text-primary/80 bg-primary/10 border border-primary/20 px-2 py-0.5 rounded uppercase tracking-wider mb-4">
                                Section {i + 1}
                              </span>

                              <div className="grid lg:grid-cols-[1fr_250px] gap-8">
                                <div className="space-y-4">
                                  <Input
                                    value={section.heading}
                                    onChange={(e) => updateSection(i, "heading", e.target.value)}
                                    className="text-xl font-bold bg-transparent border-b border-white/10 border-t-0 border-l-0 border-r-0 rounded-none px-0 h-10 focus-visible:ring-0 placeholder:text-white/20"
                                    placeholder="Section Heading..."
                                  />
                                  <Textarea
                                    value={section.body}
                                    onChange={(e) => updateSection(i, "body", e.target.value)}
                                    className="bg-transparent border-none p-0 min-h-[150px] text-sm text-white/70 focus-visible:ring-0 placeholder:text-white/20 resize-none"
                                    placeholder="Section content..."
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label className="text-xs font-semibold text-white/50">Section Image</Label>
                                  <ImageUpload
                                    value={section.image || ""}
                                    onChange={(url) => updateSection(i, "image", url)}
                                  />
                                </div>
                              </div>
                            </div>
                          ))}

                          {formData.content.sections.length === 0 && (
                            <button
                              type="button"
                              onClick={addSection}
                              className="w-full py-12 border-2 border-dashed border-white/10 rounded-2xl text-center hover:border-primary/30 hover:bg-primary/5 transition-all group/empty"
                            >
                              <Plus className="h-6 w-6 mx-auto mb-2 text-white/20 group-hover/empty:text-primary/60 transition-colors" />
                              <p className="text-xs font-semibold text-white/30 group-hover/empty:text-white/60 transition-colors">Add first section</p>
                            </button>
                          )}
                        </div>
                      </div>
                    </TabsContent>

                    {/* STRATEGY TAB */}
                    <TabsContent value="strategy" className="space-y-8 animate-in slide-in-from-right-4">
                      <div className="grid md:grid-cols-2 gap-8">
                        {/* CTA */}
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
                          <div className="flex items-center gap-2">
                            <ArrowRight className="h-4 w-4 text-primary" />
                            <h4 className="text-sm font-semibold text-white">Call to Action</h4>
                          </div>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label className="text-xs font-semibold text-white/50">Button Text</Label>
                              <Input
                                value={formData.cta.text}
                                onChange={(e) => setFormData({ ...formData, cta: { ...formData.cta, text: e.target.value } })}
                                className="bg-white/5 border-white/10 rounded-lg h-10 text-sm px-4"
                                placeholder="e.g. Get in Touch"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-xs font-semibold text-white/50">Destination URL</Label>
                              <div className="flex gap-2">
                                <div className="bg-white/5 border border-white/10 rounded-lg flex items-center px-3">
                                  <LinkIcon className="h-4 w-4 text-white/20" />
                                </div>
                                <Input
                                  value={formData.cta.url}
                                  onChange={(e) => setFormData({ ...formData, cta: { ...formData.cta, url: e.target.value } })}
                                  className="bg-white/5 border-white/10 rounded-lg h-10 flex-1 font-mono text-sm px-4"
                                  placeholder="/contact"
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Related & Settings */}
                        <div className="space-y-8">
                          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
                            <div className="flex items-center gap-2">
                              <Rocket className="h-4 w-4 text-primary" />
                              <h4 className="text-sm font-semibold text-white">Related Project</h4>
                            </div>
                            <Select
                              value={formData.relatedProjectId}
                              onChange={(e) => setFormData({ ...formData, relatedProjectId: e.target.value })}
                              className="h-10 rounded-lg bg-white/5 border-white/10 text-sm"
                            >
                              <SelectItem value="">None</SelectItem>
                              {projects.map((p) => (
                                <SelectItem key={p.id} value={p.id}>{p.title}</SelectItem>
                              ))}
                            </Select>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-primary" />
                                <h4 className="text-sm font-semibold text-white">Read Time</h4>
                              </div>
                              <Input
                                type="number"
                                value={formData.readingTime}
                                onChange={(e) => setFormData({ ...formData, readingTime: parseInt(e.target.value) })}
                                className="bg-white/5 border-white/10 rounded-lg h-10 font-bold px-4 text-center"
                                min={1} max={60}
                              />
                            </div>
                            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
                              <div className="flex items-center gap-2">
                                <Tag className="h-4 w-4 text-primary" />
                                <h4 className="text-sm font-semibold text-white">Tags</h4>
                              </div>
                              <Input
                                value={formData.tags}
                                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                                className="bg-white/5 border-white/10 rounded-lg h-10 text-sm px-4"
                                placeholder="React, UI..."
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    {/* SEO TAB */}
                    <TabsContent value="seo" className="space-y-8 animate-in slide-in-from-right-4">
                      {/* SEO Preview */}
                      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                        <div className="flex items-center justify-between mb-4">
                          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Google Preview</p>
                          <Globe className="h-4 w-4 text-slate-300" />
                        </div>
                        <div className="space-y-1 font-sans">
                          <div className="text-[13px] text-gray-500 flex items-center gap-1.5">
                            <span>portfolio.io</span>
                            <span className="text-gray-300">›</span>
                            <span className="text-primary font-medium">{formData.slug || "article-slug"}</span>
                          </div>
                          <h3 className="text-[18px] text-[#1a0dab] font-medium hover:underline cursor-pointer truncate">
                            {formData.seo.metaTitle || formData.title || "Your article title will appear here"}
                          </h3>
                          <p className="text-[13px] text-gray-600 leading-relaxed line-clamp-2">
                            <span className="text-gray-400 mr-2">{new Date().toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })} —</span>
                            {formData.seo.metaDescription || formData.excerpt || "Your meta description will appear here."}
                          </p>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                          <Label className="text-xs font-semibold text-white/50">Meta Title</Label>
                          <Input
                            value={formData.seo.metaTitle}
                            onChange={(e) => setFormData({ ...formData, seo: { ...formData.seo, metaTitle: e.target.value } })}
                            className="bg-white/5 border-white/10 rounded-lg h-10 text-sm px-4"
                            placeholder="SEO title..."
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs font-semibold text-white/50">URL Slug</Label>
                          <Input
                            value={formData.slug}
                            onChange={(e) => setFormData({ ...formData, slug: slugify(e.target.value) })}
                            className="bg-white/5 border-white/10 rounded-lg h-10 font-mono text-sm px-4 text-white/70"
                            placeholder="article-slug"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-xs font-semibold text-white/50">Meta Description</Label>
                        <Textarea
                          value={formData.seo.metaDescription}
                          onChange={(e) => setFormData({ ...formData, seo: { ...formData.seo, metaDescription: e.target.value } })}
                          className="bg-white/5 border-white/10 rounded-xl p-4 min-h-[100px] text-sm text-white/70 resize-none"
                          placeholder="Search snippet..."
                        />
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Filters */}
      {!isLoading && articles.length > 0 && (
        <div className="flex flex-col md:flex-row items-center gap-4 bg-white/5 backdrop-blur-xl border border-white/5 p-3 rounded-2xl shadow-xl animate-in slide-in-from-bottom-4 fade-in duration-500">
          <div className="flex-1 w-full relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40 group-focus-within:text-primary transition-colors" />
            <Input
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-11 h-11 rounded-xl font-medium border-0 bg-white/5 text-white placeholder:text-white/30 focus-visible:ring-2 focus-visible:ring-primary transition-all w-full"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:flex-none md:w-48">
              <button
                onClick={() => {
                  const dropdown = document.getElementById("published-dropdown");
                  if (dropdown) dropdown.classList.toggle("hidden");
                }}
                className="w-full h-11 rounded-xl font-medium border border-white/5 bg-white/5 hover:bg-white/10 px-4 flex items-center justify-between text-sm text-white transition-all"
              >
                <span className="flex items-center gap-2">
                  {publishedFilter === "all" && <><Layers className="h-4 w-4 text-white/40" /> All Articles</>}
                  {publishedFilter === "published" && <><Eye className="h-4 w-4 text-primary" /> Published</>}
                  {publishedFilter === "draft" && <><FileEdit className="h-4 w-4 text-amber-500" /> Drafts</>}
                </span>
                <ChevronDown className="h-4 w-4 text-white/40" />
              </button>
              <div
                id="published-dropdown"
                className="absolute top-full left-0 right-0 mt-2 bg-[#0a0d1f] rounded-xl shadow-xl border border-white/10 hidden z-50 overflow-hidden"
              >
                <button
                  onClick={() => { setPublishedFilter("all"); document.getElementById("published-dropdown")?.classList.add("hidden"); }}
                  className="w-full px-4 py-2.5 text-left hover:bg-white/5 flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
                >
                  <Layers className="h-4 w-4 text-white/40" /> All Articles
                </button>
                <button
                  onClick={() => { setPublishedFilter("published"); document.getElementById("published-dropdown")?.classList.add("hidden"); }}
                  className="w-full px-4 py-2.5 text-left hover:bg-white/5 flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
                >
                  <Eye className="h-4 w-4 text-primary" /> Published Only
                </button>
                <button
                  onClick={() => { setPublishedFilter("draft"); document.getElementById("published-dropdown")?.classList.add("hidden"); }}
                  className="w-full px-4 py-2.5 text-left hover:bg-white/5 flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
                >
                  <FileEdit className="h-4 w-4 text-amber-500" /> Drafts Only
                </button>
              </div>
            </div>

            <div className="relative flex-1 md:flex-none md:w-48 group">
              <Tag className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40 group-focus-within:text-primary transition-colors z-10" />
              <Input
                placeholder="Filter tag..."
                value={tagFilter}
                onChange={(e) => setTagFilter(e.target.value)}
                className="pl-11 h-11 rounded-xl font-medium border border-white/5 bg-white/5 text-white placeholder:text-white/30 focus-visible:ring-2 focus-visible:ring-primary transition-all w-full text-sm"
              />
              {tagFilter && (
                <button
                  onClick={() => setTagFilter("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {(searchQuery || publishedFilter !== "all" || tagFilter) && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setSearchQuery("");
                  setPublishedFilter("all");
                  setTagFilter("");
                }}
                className="h-11 w-11 rounded-xl text-white/40 hover:text-white hover:bg-white/5 transition-colors"
                title="Clear all filters"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Two Tables View via Tabs */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-60 gap-10">
          <div className="relative">
            <Loader2 className="h-24 w-24 animate-spin text-primary opacity-10" />
            <div className="absolute inset-0 blur-3xl bg-primary/20 rounded-full animate-pulse" />
          </div>
          <p className="text-[11px] font-black uppercase tracking-[0.8em] text-slate-500 italic">
            Syncing Knowledge Base...
          </p>
        </div>
      ) : (
        <Tabs defaultValue="published" className="space-y-12">
          <TabsList className="bg-white/5 p-1 rounded-xl border border-white/5 w-fit h-auto flex gap-1 animate-in slide-in-from-left-4 fade-in duration-500">
            <TabsTrigger
              value="published"
              className="rounded-lg px-6 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=inactive]:text-white/50 data-[state=inactive]:hover:text-white transition-all font-semibold text-sm gap-2"
            >
              <Eye className="h-4 w-4" /> Published ({publishedArticles.length})
            </TabsTrigger>
            <TabsTrigger
              value="drafts"
              className="rounded-lg px-6 py-2.5 data-[state=active]:bg-white/10 data-[state=active]:text-white data-[state=inactive]:text-white/50 data-[state=inactive]:hover:text-white transition-all font-semibold text-sm gap-2"
            >
              <FileEdit className="h-4 w-4" /> Drafts ({draftArticles.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="published"
            className="animate-in fade-in slide-in-from-left-4 duration-700"
          >
            <TableHeader
              label="Published Articles"
              count={publishedArticles.length}
              icon={Eye}
              color="bg-emerald-500"
            />
            <div className="min-h-[400px]">
              {publishedArticles.length > 0 ? (
                publishedArticles.map((a) => (
                  <ArticleRow key={a.id} article={a} />
                ))
              ) : (
                <div className="py-24 border border-dashed border-white/10 rounded-3xl flex flex-col items-center justify-center text-center bg-white/5 opacity-60">
                  <Eye className="h-10 w-10 mb-4 text-white/40" />
                  <p className="text-lg font-semibold tracking-tight text-white/80">
                    No published articles
                  </p>
                  <p className="text-sm text-white/40 mt-1">
                    Publish your first article to see it here.
                  </p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent
            value="drafts"
            className="animate-in fade-in slide-in-from-right-4 duration-700"
          >
            <TableHeader
              label="Draft Articles"
              count={draftArticles.length}
              icon={FileEdit}
              color="bg-primary"
            />
            <div className="min-h-[400px]">
              {draftArticles.length > 0 ? (
                draftArticles.map((a) => <ArticleRow key={a.id} article={a} />)
              ) : (
                <div className="py-24 border border-dashed border-white/10 rounded-3xl flex flex-col items-center justify-center text-center bg-white/5 opacity-60">
                  <FileEdit className="h-10 w-10 mb-4 text-white/40" />
                  <p className="text-lg font-semibold tracking-tight text-white/80">
                    No draft articles
                  </p>
                  <p className="text-sm text-white/40 mt-1">
                    Create your first draft to get started.
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      )}

      {/* Global Empty State */}
      {!isLoading && articles.length === 0 && (
        <div className="py-32 border border-dashed border-white/10 rounded-3xl flex flex-col items-center justify-center text-center bg-white/5">
          <div className="p-6 bg-primary/10 rounded-2xl mb-6">
            <Layout className="h-12 w-12 text-primary" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white mb-2">
            No articles yet
          </h2>
          <p className="text-sm text-white/50 mb-8 max-w-sm">
            You haven't created any articles. Click the button below to start building your content repository.
          </p>
          <Button
            onClick={() => setIsDialogOpen(true)}
            className="rounded-xl shadow-lg shadow-primary/25 h-11 px-8 text-sm font-semibold gap-2 bg-linear-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white hover:scale-[1.02] active:scale-[0.98] transition-transform duration-300 outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0d1f] border-0"
          >
            Create Your First Article
          </Button>
        </div>
      )}
    </div>
  );
}
