"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FileText,
  Edit,
  Eye,
  Lightbulb,
  Sparkles,
  Twitter,
  Linkedin,
  Facebook,
  Send,
  Trash2,
  Bold,
  Italic,
  List,
  ListOrdered,
  Link2,
  Image,
  Code,
  Quote,
  X,
} from "lucide-react";

const mockArticles = [
  {
    id: 1,
    title: "The Future of Web Design in 2026",
    status: "published",
    date: "Oct 24, 2025",
    excerpt: "Exploring upcoming trends...",
  },
  {
    id: 2,
    title: "Building Scalable React Apps",
    status: "draft",
    date: "Nov 10, 2025",
    excerpt: "Best practices for...",
  },
  {
    id: 3,
    title: "TypeScript Tips & Tricks",
    status: "draft",
    date: "Nov 15, 2025",
    excerpt: "Advanced TypeScript...",
  },
];

const mockIdeas = [
  {
    id: 1,
    title: "How AI is Transforming Web Development",
    description:
      "Explore the impact of AI tools on modern development workflows",
  },
  {
    id: 2,
    title: "Micro-interactions: The Secret to Great UX",
    description: "Why small animations make a big difference",
  },
  {
    id: 3,
    title: "Server Components vs Client Components",
    description: "Understanding the new React paradigm",
  },
];

export default function BlogPage() {
  const [selectedArticle, setSelectedArticle] = useState<number | null>(null);
  const [editorContent, setEditorContent] = useState("");
  const [articleTitle, setArticleTitle] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  if (selectedArticle) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => setSelectedArticle(null)}>
              ← Back
            </Button>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">
                Edit Article
              </h2>
              <p className="text-muted-foreground">
                Write and publish your blog post
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Sparkles className="mr-2 h-4 w-4" /> AI Assist
            </Button>
            <Button variant="outline">Save Draft</Button>
            <Button>Publish</Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label>Article Title</Label>
                <Input
                  placeholder="Enter article title..."
                  value={articleTitle}
                  onChange={(e) => setArticleTitle(e.target.value)}
                  className="text-lg font-semibold"
                />
              </div>
              <div className="grid gap-2">
                <Label>Tags</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a tag..."
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && tagInput.trim()) {
                        e.preventDefault();
                        setTags([...tags, tagInput.trim()]);
                        setTagInput("");
                      }
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      if (tagInput.trim()) {
                        setTags([...tags, tagInput.trim()]);
                        setTagInput("");
                      }
                    }}
                  >
                    Add
                  </Button>
                </div>
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {tags.map((tag, idx) => (
                      <Badge
                        key={idx}
                        variant="secondary"
                        className="pl-3 pr-1 py-1"
                      >
                        {tag}
                        <button
                          onClick={() =>
                            setTags(tags.filter((_, i) => i !== idx))
                          }
                          className="ml-2 hover:text-destructive"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label>Content</Label>
                <Button variant="ghost" size="sm">
                  <Sparkles className="mr-2 h-3 w-3" /> Generate with AI
                </Button>
              </div>

              {/* Formatting Toolbar */}
              <div className="flex items-center gap-1 p-2 border rounded-md bg-muted/30 flex-wrap">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  title="Bold"
                >
                  <Bold className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  title="Italic"
                >
                  <Italic className="h-4 w-4" />
                </Button>
                <div className="w-px h-6 bg-border mx-1" />
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  title="Bullet List"
                >
                  <List className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  title="Numbered List"
                >
                  <ListOrdered className="h-4 w-4" />
                </Button>
                <div className="w-px h-6 bg-border mx-1" />
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  title="Insert Link"
                >
                  <Link2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  title="Insert Image"
                >
                  <Image className="h-4 w-4" />
                </Button>
                <div className="w-px h-6 bg-border mx-1" />
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  title="Code Block"
                >
                  <Code className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  title="Quote"
                >
                  <Quote className="h-4 w-4" />
                </Button>
              </div>

              <Textarea
                placeholder="Write your article content here..."
                className="min-h-[400px] font-mono text-sm"
                value={editorContent}
                onChange={(e) => setEditorContent(e.target.value)}
              />
            </div>

            <Card className="border-dashed">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-indigo-600" />
                  Auto-Generate Social Posts
                </CardTitle>
                <CardDescription>
                  Let AI create platform-specific posts based on this article
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant="outline"
                    className="cursor-pointer hover:bg-accent"
                  >
                    <Twitter className="h-3 w-3 mr-1" /> Twitter Thread
                  </Badge>
                  <Badge
                    variant="outline"
                    className="cursor-pointer hover:bg-accent"
                  >
                    <Linkedin className="h-3 w-3 mr-1" /> LinkedIn Post
                  </Badge>
                  <Badge
                    variant="outline"
                    className="cursor-pointer hover:bg-accent"
                  >
                    <Facebook className="h-3 w-3 mr-1" /> Facebook Update
                  </Badge>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  <Send className="mr-2 h-3 w-3" /> Generate Posts from Article
                </Button>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Blog Management</h2>
          <p className="text-muted-foreground">
            Manage articles and generate ideas with AI
          </p>
        </div>
      </div>

      <Tabs defaultValue="articles" className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
          <TabsTrigger value="articles" className="gap-2">
            <FileText className="h-4 w-4" /> Articles
          </TabsTrigger>
          <TabsTrigger value="ideas" className="gap-2">
            <Lightbulb className="h-4 w-4" /> AI Ideas
          </TabsTrigger>
        </TabsList>

        <TabsContent value="articles" className="space-y-4 mt-6">
          <div className="flex justify-end">
            <Button onClick={() => setSelectedArticle(999)}>
              <FileText className="mr-2 h-4 w-4" /> New Article
            </Button>
          </div>

          <div className="rounded-md border">
            <div className="p-4 grid grid-cols-12 text-sm font-medium text-muted-foreground border-b bg-muted/20">
              <div className="col-span-6">Title</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-2">Date</div>
              <div className="col-span-2 text-right">Actions</div>
            </div>
            {mockArticles.map((article) => (
              <div
                key={article.id}
                className="p-4 grid grid-cols-12 items-center text-sm border-b last:border-0 hover:bg-muted/50 transition-colors"
              >
                <div className="col-span-6">
                  <div className="font-medium">{article.title}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {article.excerpt}
                  </div>
                </div>
                <div className="col-span-2">
                  <Badge
                    variant={
                      article.status === "published" ? "default" : "secondary"
                    }
                  >
                    {article.status}
                  </Badge>
                </div>
                <div className="col-span-2 text-muted-foreground">
                  {article.date}
                </div>
                <div className="col-span-2 flex justify-end gap-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setSelectedArticle(article.id)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="ideas" className="space-y-4 mt-6">
          <Card className="border-dashed bg-linear-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-indigo-600" />
                AI Idea Generator
              </CardTitle>
              <CardDescription>
                Generate blog post ideas based on trending topics and your
                expertise
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter a topic or keyword..."
                  className="flex-1"
                />
                <Button>
                  <Sparkles className="mr-2 h-4 w-4" /> Generate Ideas
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {mockIdeas.map((idea) => (
              <Card key={idea.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center shrink-0">
                      <Lightbulb className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-base line-clamp-2">
                        {idea.title}
                      </CardTitle>
                      <CardDescription className="mt-2 line-clamp-2">
                        {idea.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex gap-2 pt-0">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => {
                      setArticleTitle(idea.title);
                      setSelectedArticle(999);
                    }}
                  >
                    <FileText className="mr-2 h-3 w-3" /> Use Idea
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
