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

  const [publishedFilter, setPublishedFilter] = useState<"all" | "published" | "draft">("all");
  const [tagFilter, setTagFilter] = useState("");

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.append("search", searchQuery);
      if (publishedFilter !== "all") params.append("published_filter", publishedFilter === "published" ? "true" : "false");
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
      const dropdown = document.getElementById('published-dropdown');
      const button = event.target as HTMLElement;
      
      if (dropdown && !dropdown.contains(button) && !button.closest('button')) {
        dropdown.classList.add('hidden');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
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
    <div className="flex items-center justify-between mb-6 px-4">
      <div className="flex items-center gap-4">
        <div className={cn("p-3 rounded-xl shadow-lg", color)}>
          <Icon className="h-5 w-5 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-black tracking-tight uppercase">
            {label}
          </h3>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            {count} Assets Active
          </p>
        </div>
      </div>
    </div>
  );

  const ArticleRow = ({ article }: { article: Article }) => (
    <div className="group relative flex items-center gap-6 p-6 rounded-[2rem] bg-white dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/50 hover:border-primary/20 hover:shadow-2xl transition-all duration-500 mb-4">
      <div className="h-20 w-28 rounded-2xl overflow-hidden shrink-0 bg-slate-100 dark:bg-slate-800 relative">
        {article.coverImage ? (
          <img
            src={article.coverImage}
            className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
            alt={article.title}
            onError={(e) => {
              // Fallback to icon if image fails to load
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent) {
                parent.innerHTML = `<div class="absolute inset-0 flex items-center justify-center"><svg class="h-6 w-6 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg></div>`;
              }
            }}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <ImageIcon className="h-6 w-6 opacity-20" />
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h4 className="text-lg font-black tracking-tight break-words truncate group-hover:text-primary transition-colors">
              {article.title}
            </h4>
            <p className="text-[11px] text-slate-400 font-medium truncate mt-1 line-clamp-2">
              {article.excerpt}
            </p>
            <div className="flex items-center gap-4 mt-3">
              <div className="flex items-center gap-1.5 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                <Clock className="h-3 w-3" /> {article.readingTime} min read
              </div>
              {article.tags && article.tags.length > 0 && (
                <div className="flex items-center gap-1.5 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                  <Tag className="h-3 w-3" /> {article.tags[0]}
                  {article.tags.length > 1 && `+${article.tags.length - 1}`}
                </div>
              )}
              <div className={`flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest ${
                article.published ? "text-emerald-500" : "text-amber-500"
              }`}>
                {article.published ? (
                  <>
                    <CheckCircle2 className="h-3 w-3" />
                    Published
                  </>
                ) : (
                  <>
                    <FileEdit className="h-3 w-3" />
                    Draft
                  </>
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
      {/* Premium Header */}
      <div className="flex items-center justify-between flex-wrap gap-10 border-b border-slate-200 dark:border-slate-800 pb-12">
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-primary">
            <Sparkles className="h-6 w-6 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.5em]">
              Authority Content System
            </span>
          </div>
          <h1 className="text-6xl font-black tracking-tight italic">
            Article Repository
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative group/search">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within/search:text-primary transition-colors" />
            <Input
              placeholder="Filter by title or concept..."
              className="pl-12 h-14 w-80 rounded-2xl bg-white dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 font-bold focus:ring-primary shadow-xl"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
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
                size="lg"
                className="rounded-2xl shadow-2xl shadow-primary/30 h-14 px-10 text-sm font-black gap-3 bg-primary hover:scale-[1.02] active:scale-95 transition-all"
              >
                <Plus className="h-5 w-5" /> CREATE NEW ASSET
              </Button>
            </DialogTrigger>

            <DialogContent className="max-w-6xl max-h-[95vh] overflow-y-auto p-0 border-none bg-slate-950 text-slate-50 rounded-[3rem] shadow-2xl">
              <form onSubmit={handleSubmit} className="flex flex-col h-full">
                {/* Editor Header */}
                <div className="bg-slate-900/60 backdrop-blur-3xl border-b border-white/5 p-8 sticky top-0 z-50 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-2xl border border-primary/20">
                      <FileEdit className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-xl font-black">Strategic Workshop</h2>
                      <p className="text-[9px] font-black uppercase tracking-widest text-white/30">
                        Crafting high-conversion narratives
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center bg-white/5 border border-white/10 rounded-2xl p-1.5 mr-4">
                      <Button
                        type="button"
                        variant="ghost"
                        className={cn(
                          "h-10 px-6 rounded-xl font-black text-[9px] uppercase tracking-widest transition-all",
                          !formData.published
                            ? "bg-white text-slate-950 shadow-xl"
                            : "text-white/40",
                        )}
                        onClick={() =>
                          setFormData({ ...formData, published: false })
                        }
                      >
                        Draft
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        className={cn(
                          "h-10 px-6 rounded-xl font-black text-[9px] uppercase tracking-widest transition-all",
                          formData.published
                            ? "bg-emerald-500 text-white shadow-xl"
                            : "text-white/40",
                        )}
                        onClick={() =>
                          setFormData({ ...formData, published: true })
                        }
                      >
                        Ready
                      </Button>
                    </div>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="rounded-2xl font-black px-12 h-12 shadow-2xl shadow-primary/40 bg-primary hover:scale-105 transition-all"
                    >
                      {isSubmitting ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        "PUBLISH TO CLOUD"
                      )}
                    </Button>
                  </div>
                </div>

                <div className="p-12 space-y-16">
                  <Tabs
                    defaultValue="content"
                    onValueChange={setActiveTab}
                    value={activeTab}
                  >
                    <TabsList className="bg-white/5 p-1.5 rounded-[2rem] mb-12 w-fit border border-white/5">
                      <TabsTrigger
                        value="content"
                        className="rounded-2xl px-12 py-4 data-[state=active]:bg-white data-[state=active]:text-primary transition-all font-black uppercase text-[10px] tracking-widest gap-3"
                      >
                        <Layout className="h-4 w-4" /> Content
                      </TabsTrigger>
                      <TabsTrigger
                        value="strategy"
                        className="rounded-2xl px-12 py-4 data-[state=active]:bg-white data-[state=active]:text-primary transition-all font-black uppercase text-[10px] tracking-widest gap-3"
                      >
                        <Target className="h-4 w-4" /> Strategy
                      </TabsTrigger>
                      <TabsTrigger
                        value="seo"
                        className="rounded-2xl px-12 py-4 data-[state=active]:bg-white data-[state=active]:text-primary transition-all font-black uppercase text-[10px] tracking-widest gap-3"
                      >
                        <Globe className="h-4 w-4" /> SEO
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent
                      value="content"
                      className="space-y-20 animate-in slide-in-from-bottom-10"
                    >
                      <div className="grid md:grid-cols-[1fr_420px] gap-20 items-start">
                        <div className="space-y-12">
                          <div className="space-y-4">
                            <div className="flex justify-between items-end border-b border-white/5 pb-4">
                              <Label className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">
                                Primary Thought Label
                              </Label>
                              <Button
                                type="button"
                                variant="ghost"
                                onClick={handleAIGenerate}
                                disabled={isAiLoading || !formData.title}
                                className="h-9 px-6 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 text-[10px] font-black tracking-widest gap-3 uppercase italic transition-all border border-primary/20"
                              >
                                {isAiLoading ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                  <Sparkles className="h-4 w-4" />
                                )}
                                AI Synthesis
                              </Button>
                            </div>
                            <Input
                              className="text-6xl font-black bg-transparent border-none px-0 h-auto py-8 focus-visible:ring-0 placeholder:text-white/5 tracking-tighter"
                              placeholder="Your breakthrough title..."
                              value={formData.title}
                              onChange={(e) => updateTitle(e.target.value)}
                              required
                            />
                          </div>

                          <div className="space-y-6">
                            <Label className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">
                              Executive Abstract
                            </Label>
                            <Textarea
                              className="text-2xl bg-white/[0.02] border-white/5 rounded-[3rem] p-12 min-h-[160px] font-light leading-relaxed italic text-white/40 focus:border-white/10 transition-all shadow-2xl"
                              placeholder="Validate your expertise in 2 sentences..."
                              value={formData.excerpt}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  excerpt: e.target.value,
                                })
                              }
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-6">
                          <Label className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">
                            Asset Branding
                          </Label>
                          <ImageUpload
                            value={formData.coverImage}
                            onChange={(url) =>
                              setFormData({ ...formData, coverImage: url })
                            }
                            className="aspect-square"
                          />
                        </div>
                      </div>

                      <div className="space-y-16 max-w-5xl">
                        <div className="flex items-center justify-between border-b border-white/5 pb-8">
                          <h3 className="text-3xl font-black tracking-tighter italic flex items-center gap-4">
                            <Type className="h-10 w-10 text-primary" /> Body
                            Composition
                          </h3>
                          <Button
                            type="button"
                            onClick={addSection}
                            className="rounded-2xl h-14 px-10 gap-3 bg-white/5 hover:bg-white/10 border border-white/5 font-black uppercase text-[11px] tracking-widest"
                          >
                            <Plus className="h-5 w-5" /> Add Narrative Block
                          </Button>
                        </div>

                        <div className="space-y-8">
                          <Label className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 ml-2">
                            Opening Context Node
                          </Label>
                          <Textarea
                            className="bg-white/[0.01] border-white/5 rounded-[3rem] p-12 min-h-[200px] leading-[1.8] text-slate-400 text-xl font-light focus:border-white/10 transition-all shadow-xl"
                            placeholder="Establish the battlefield context..."
                            value={formData.content.intro}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                content: {
                                  ...formData.content,
                                  intro: e.target.value,
                                },
                              })
                            }
                          />
                        </div>

                        <div className="space-y-20">
                          {formData.content.sections.map((section, i) => (
                            <div
                              key={i}
                              className="group/section relative bg-white/[0.01] border border-white/5 rounded-[4rem] p-16 transition-all hover:bg-white/[0.03] hover:border-white/10 hover:shadow-3xl"
                            >
                              <div className="absolute -right-6 top-1/2 -translate-y-1/2 flex flex-col gap-4 opacity-0 group-hover/section:opacity-100 transition-all translate-x-6 group-hover/section:translate-x-0">
                                <Button
                                  type="button"
                                  size="icon"
                                  variant="secondary"
                                  className="h-14 w-14 rounded-3xl shadow-2xl bg-slate-900 border border-white/5"
                                  onClick={() => moveSection(i, "up")}
                                  disabled={i === 0}
                                >
                                  <ChevronUp className="h-6 w-6" />
                                </Button>
                                <Button
                                  type="button"
                                  size="icon"
                                  variant="secondary"
                                  className="h-14 w-14 rounded-3xl shadow-2xl bg-slate-900 border border-white/5"
                                  onClick={() => moveSection(i, "down")}
                                  disabled={
                                    i === formData.content.sections.length - 1
                                  }
                                >
                                  <ChevronDown className="h-6 w-6" />
                                </Button>
                                <Separator className="bg-white/10 mx-auto w-8" />
                                <Button
                                  type="button"
                                  size="icon"
                                  variant="destructive"
                                  className="h-14 w-14 rounded-3xl shadow-2xl bg-rose-500/20 text-rose-500 border border-rose-500/10 hover:bg-rose-500 hover:text-white transition-all"
                                  onClick={() => removeSection(i)}
                                >
                                  <Trash2 className="h-5 w-5" />
                                </Button>
                              </div>

                              <div className="grid lg:grid-cols-[1fr_380px] gap-20">
                                <div className="space-y-12">
                                  <div className="space-y-4">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-primary/50">
                                      H2 Narrative Header
                                    </Label>
                                    <Input
                                      value={section.heading}
                                      onChange={(e) =>
                                        updateSection(
                                          i,
                                          "heading",
                                          e.target.value,
                                        )
                                      }
                                      className="text-5xl font-black bg-transparent border-none px-0 h-auto p-0 focus-visible:ring-0 placeholder:text-white/5 tracking-tighter"
                                      placeholder="Block Title..."
                                    />
                                  </div>
                                  <div className="space-y-4">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-white/10 italic">
                                      Core Value Delivery
                                    </Label>
                                    <Textarea
                                      value={section.body}
                                      onChange={(e) =>
                                        updateSection(i, "body", e.target.value)
                                      }
                                      className="bg-transparent border-none p-0 min-h-[300px] leading-[1.8] text-slate-400 focus-visible:ring-0 text-2xl font-light"
                                      placeholder="Unfold the wisdom..."
                                    />
                                  </div>
                                </div>
                                <div className="space-y-8">
                                  <Label className="text-[10px] font-black uppercase tracking-widest text-white/10">
                                    Instructional Graphic
                                  </Label>
                                  <ImageUpload
                                    value={section.image || ""}
                                    onChange={(url) =>
                                      updateSection(i, "image", url)
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent
                      value="strategy"
                      className="space-y-20 animate-in slide-in-from-right-10 max-w-5xl"
                    >
                      <section className="space-y-12 bg-white/[0.02] border border-white/5 p-16 rounded-[4rem] relative overflow-hidden shadow-2xl">
                        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/20 blur-[150px] pointer-events-none" />
                        <h4 className="text-4xl font-black tracking-tighter italic flex items-center gap-5">
                          <ArrowRight className="h-10 w-10 text-primary" />{" "}
                          Conversion Hub
                        </h4>

                        <div className="grid md:grid-cols-2 gap-20">
                          <div className="space-y-10">
                            <Label className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 ml-1">
                              Engagement Terminal
                            </Label>
                            <div className="space-y-8 bg-slate-900/40 p-10 rounded-[2.5rem] border border-white/5 shadow-2xl">
                              <div className="space-y-4">
                                <Label className="text-[9px] font-black uppercase tracking-widest text-white/20">
                                  CTA text
                                </Label>
                                <Input
                                  value={formData.cta.text}
                                  onChange={(e) =>
                                    setFormData({
                                      ...formData,
                                      cta: {
                                        ...formData.cta,
                                        text: e.target.value,
                                      },
                                    })
                                  }
                                  className="bg-slate-950 border-white/5 rounded-2xl h-16 font-black px-8 uppercase tracking-widest text-[12px]"
                                  placeholder="e.g. INITIATE AUDIT"
                                />
                              </div>
                              <div className="space-y-4">
                                <Label className="text-[9px] font-black uppercase tracking-widest text-white/20">
                                  Destination target
                                </Label>
                                <div className="flex gap-4">
                                  <div className="bg-slate-950 border-white/5 border rounded-2xl flex items-center px-6">
                                    <LinkIcon className="h-5 w-5 text-white/10" />
                                  </div>
                                  <Input
                                    value={formData.cta.url}
                                    onChange={(e) =>
                                      setFormData({
                                        ...formData,
                                        cta: {
                                          ...formData.cta,
                                          url: e.target.value,
                                        },
                                      })
                                    }
                                    className="bg-slate-950 border-white/5 rounded-2xl h-16 flex-1 font-mono text-sm text-white/40 px-8"
                                    placeholder="/commands/deploy"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-10">
                            <Label className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 ml-1">
                              Contextual Proof Anchor
                            </Label>
                            <div className="bg-primary/5 p-10 rounded-[2.5rem] border border-primary/20 h-full flex flex-col justify-center gap-8 shadow-2xl">
                              <p className="text-sm text-primary/60 font-bold leading-relaxed italic">
                                Bridge this thought piece with a verified
                                deployment outcome to enhance authority score.
                              </p>
                              <Select
                                value={formData.relatedProjectId}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    relatedProjectId: e.target.value,
                                  })
                                }
                                className="h-16 rounded-2xl"
                              >
                                <SelectItem value="">
                                  No direct proof linkage
                                </SelectItem>
                                {projects.map((p) => (
                                  <SelectItem key={p.id} value={p.id}>
                                    {p.title}
                                  </SelectItem>
                                ))}
                              </Select>
                            </div>
                          </div>
                        </div>
                      </section>

                      <section className="grid grid-cols-2 gap-16">
                        <div className="space-y-6">
                          <Label className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 ml-4">
                            Categorization Tokens
                          </Label>
                          <div className="relative group/tag">
                            <Tag className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-white/20 group-focus-within/tag:text-primary transition-colors" />
                            <Input
                              value={formData.tags}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  tags: e.target.value,
                                })
                              }
                              className="bg-white/5 border-white/10 h-20 rounded-[2rem] pl-16 font-black text-lg tracking-tight shadow-xl"
                              placeholder="Architecture, DevOps, AI"
                            />
                          </div>
                        </div>
                        <div className="space-y-6">
                          <Label className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 ml-4">
                            Reading Latency (Target: 5-8)
                          </Label>
                          <div className="relative group/clock">
                            <Clock className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-white/20 group-focus-within/clock:text-primary transition-colors" />
                            <Input
                              type="number"
                              value={formData.readingTime}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  readingTime: parseInt(e.target.value),
                                })
                              }
                              className="bg-white/5 border-white/10 h-20 rounded-[2rem] pl-16 font-black text-2xl shadow-xl"
                            />
                          </div>
                        </div>
                      </section>
                    </TabsContent>

                    <TabsContent
                      value="seo"
                      className="space-y-20 animate-in slide-in-from-right-10 max-w-5xl"
                    >
                      {/* SEO Preview */}
                      <div className="space-y-8 bg-white p-16 rounded-[4rem] shadow-3xl relative border-[12px] border-slate-50">
                        <div className="flex items-center justify-between opacity-20 mb-4">
                          <p className="text-[10px] font-black uppercase tracking-widest italic">
                            Google Semantic Result
                          </p>
                          <Globe className="h-6 w-6" />
                        </div>
                        <div className="space-y-3 font-sans">
                          <div className="text-[15px] text-gray-500 flex items-center gap-1.5">
                            <span>portfolio.io</span>
                            <span className="text-gray-300">›</span>
                            <span>authority-hub</span>
                            <span className="text-gray-300">›</span>
                            <span className="text-primary font-bold">
                              {formData.slug || "asset-slug"}
                            </span>
                          </div>
                          <h3 className="text-[24px] text-[#1a0dab] font-medium leading-tight hover:underline cursor-pointer">
                            {formData.seo.metaTitle ||
                              formData.title ||
                              "Titre de l'article sur Google Authority"}
                          </h3>
                          <p className="text-[15px] text-gray-700 leading-relaxed max-w-2xl text-justify">
                            <span className="text-gray-400 mr-2">
                              {new Date().toLocaleDateString("en-US", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })}{" "}
                              —
                            </span>
                            {formData.seo.metaDescription ||
                              formData.excerpt ||
                              "Votre meta-description stratégique apparaîtra ici. Elle doit capturer l'intention de recherche."}
                          </p>
                        </div>
                      </div>

                      <div className="grid gap-16">
                        <div className="grid md:grid-cols-2 gap-16">
                          <div className="space-y-6">
                            <Label className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 ml-4">
                              Meta Title Strategy
                            </Label>
                            <Input
                              value={formData.seo.metaTitle}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  seo: {
                                    ...formData.seo,
                                    metaTitle: e.target.value,
                                  },
                                })
                              }
                              className="bg-white/5 border-white/10 h-20 rounded-[2rem] font-black text-2xl px-10 shadow-xl"
                            />
                          </div>
                          <div className="space-y-6">
                            <Label className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 ml-4">
                              Permanent Semantic Slug
                            </Label>
                            <Input
                              value={formData.slug}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  slug: slugify(e.target.value),
                                })
                              }
                              className="bg-white/5 border-white/10 h-20 rounded-[2rem] font-mono text-xs text-white/30 px-10 shadow-xl"
                            />
                          </div>
                        </div>

                        <div className="space-y-6">
                          <Label className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 ml-6">
                            Meta Description Override
                          </Label>
                          <Textarea
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
                            className="bg-white/5 border-white/10 rounded-[4rem] p-16 min-h-[160px] leading-relaxed text-slate-400 font-medium italic text-lg shadow-2xl"
                            placeholder="Draft to command high-quality search traffic..."
                          />
                        </div>
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
        <div className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-900/50 dark:to-slate-800/50 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 space-y-6 shadow-2xl backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary/10 rounded-2xl">
                <Filter className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">Advanced Filters</h3>
                <p className="text-sm text-muted-foreground">Refine your content discovery</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSearchQuery("");
                setPublishedFilter("all");
                setTagFilter("");
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
                placeholder="Search articles..."
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
            
            {/* Published Filter */}
            <div className="relative">
              <button
                onClick={() => {
                  const dropdown = document.getElementById('published-dropdown');
                  if (dropdown) {
                    dropdown.classList.toggle('hidden');
                  }
                }}
                className="w-full h-12 rounded-2xl font-medium border-0 bg-white dark:bg-slate-800 shadow-lg px-4 pr-10 text-left flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
              >
                <span className="flex items-center gap-2">
                  {publishedFilter === "all" && <><Layers className="h-4 w-4" /> All Articles</>}
                  {publishedFilter === "published" && <><Eye className="h-4 w-4" /> Published Only</>}
                  {publishedFilter === "draft" && <><FileEdit className="h-4 w-4" /> Drafts Only</>}
                </span>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </button>
              <div id="published-dropdown" className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 hidden z-50">
                <button
                  onClick={() => {
                    setPublishedFilter("all");
                    document.getElementById('published-dropdown')?.classList.add('hidden');
                  }}
                  className="w-full px-4 py-3 text-left hover:bg-slate-50 dark:hover:bg-slate-700 rounded-t-2xl flex items-center gap-2 transition-colors"
                >
                  <Layers className="h-4 w-4" /> All Articles
                </button>
                <button
                  onClick={() => {
                    setPublishedFilter("published");
                    document.getElementById('published-dropdown')?.classList.add('hidden');
                  }}
                  className="w-full px-4 py-3 text-left hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-2 transition-colors"
                >
                  <Eye className="h-4 w-4" /> Published Only
                </button>
                <button
                  onClick={() => {
                    setPublishedFilter("draft");
                    document.getElementById('published-dropdown')?.classList.add('hidden');
                  }}
                  className="w-full px-4 py-3 text-left hover:bg-slate-50 dark:hover:bg-slate-700 rounded-b-2xl flex items-center gap-2 transition-colors"
                >
                  <FileEdit className="h-4 w-4" /> Drafts Only
                </button>
              </div>
            </div>
            
            {/* Tag Filter */}
            <div className="relative group">
              <Tag className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors z-10" />
              <Input
                placeholder="Filter by tag..."
                value={tagFilter}
                onChange={(e) => setTagFilter(e.target.value)}
                className="pl-12 h-12 rounded-2xl font-medium border-0 bg-white dark:bg-slate-800 shadow-lg focus:ring-2 focus:ring-primary/20 transition-all"
              />
              {tagFilter && (
                <button
                  onClick={() => setTagFilter("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
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
          <TabsList className="bg-slate-100 dark:bg-slate-900/50 p-2 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 w-fit h-20">
            <TabsTrigger
              value="published"
              className="rounded-[2rem] px-14 h-full data-[state=active]:bg-primary data-[state=active]:text-white transition-all font-black uppercase text-xs tracking-widest gap-4"
            >
              <Eye className="h-5 w-5" /> Published (
              {publishedArticles.length})
            </TabsTrigger>
            <TabsTrigger
              value="drafts"
              className="rounded-[2rem] px-14 h-full data-[state=active]:bg-slate-900 dark:data-[state=active]:bg-white data-[state=active]:text-white dark:data-[state=active]:text-slate-950 transition-all font-black uppercase text-xs tracking-widest gap-4"
            >
              <FileEdit className="h-5 w-5" /> Drafts (
              {draftArticles.length})
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
                <div className="py-40 border-4 border-dashed border-slate-100 dark:border-slate-800/10 rounded-[4rem] flex flex-col items-center justify-center text-center opacity-20">
                  <Eye className="h-20 w-20 mb-10" />
                  <p className="text-2xl font-black italic tracking-tighter">
                    No published articles found.
                  </p>
                  <p className="text-[10px] font-bold uppercase tracking-widest mt-2">
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
                <div className="py-40 border-4 border-dashed border-slate-100 dark:border-slate-800/10 rounded-[4rem] flex flex-col items-center justify-center text-center opacity-20">
                  <FileEdit className="h-20 w-20 mb-10" />
                  <p className="text-2xl font-black italic tracking-tighter">
                    No draft articles found.
                  </p>
                  <p className="text-[10px] font-bold uppercase tracking-widest mt-2">
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
        <div className="py-60 border-8 border-dashed border-slate-50 dark:border-slate-900/40 rounded-[6rem] flex flex-col items-center justify-center text-center">
          <div className="p-10 bg-primary/5 rounded-[4rem] mb-12">
            <Layout className="h-28 w-28 text-primary/10" />
          </div>
          <h2 className="text-4xl font-black italic tracking-tighter text-slate-300 dark:text-slate-800 mb-4">
            Command Center Inactive.
          </h2>
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.5em] mb-12">
            Operational content nodes missing from neural network.
          </p>
          <Button
            onClick={() => setIsDialogOpen(true)}
            className="h-16 px-16 rounded-3xl font-black uppercase text-sm tracking-[0.4em] shadow-3xl hover:scale-105 active:scale-95 transition-all"
          >
            Ignite Knowledge Engine
          </Button>
        </div>
      )}
    </div>
  );
}
