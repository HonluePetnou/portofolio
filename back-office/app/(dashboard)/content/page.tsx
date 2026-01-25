"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import {
  Plus,
  GripVertical,
  Twitter,
  Linkedin,
  Facebook,
  ArrowLeft,
  Pencil,
  Trash2,
  Copy,
  Check,
} from "lucide-react";

// Mock data structure
const initialTopics = [
  {
    id: 1,
    title: "Agency Culture & Team Life",
    status: "idea",
    posts: [
      {
        platform: "twitter",
        content: "Behind the scenes at Soluty Studio 🚀",
        status: "draft",
      },
      {
        platform: "linkedin",
        content: "How we built our remote-first culture...",
        status: "draft",
      },
    ],
  },
  {
    id: 2,
    title: "Next.js 15 Features",
    status: "writing",
    posts: [
      {
        platform: "twitter",
        content: "Next.js 15 is here! Thread 🧵",
        status: "draft",
      },
      {
        platform: "linkedin",
        content: "Deep dive into Next.js 15 Server Actions",
        status: "draft",
      },
      {
        platform: "facebook",
        content: "Check out the latest Next.js features!",
        status: "draft",
      },
    ],
  },
  {
    id: 3,
    title: "Product Launch Announcement",
    status: "ready",
    posts: [
      {
        platform: "twitter",
        content: "We're launching something big tomorrow! 🎉",
        status: "ready",
      },
      {
        platform: "linkedin",
        content: "Excited to announce our new product...",
        status: "ready",
      },
    ],
  },
  {
    id: 4,
    title: "Client Success Story",
    status: "published",
    posts: [
      {
        platform: "twitter",
        content: "How we helped @client achieve 10x growth",
        status: "published",
      },
      {
        platform: "linkedin",
        content: "Case Study: Transforming Client's Digital Presence",
        status: "published",
      },
    ],
  },
];

const columns = [
  { id: "idea", title: "Idea", color: "bg-blue-500" },
  { id: "writing", title: "Writing", color: "bg-yellow-500" },
  { id: "ready", title: "Ready", color: "bg-green-500" },
  { id: "published", title: "Published", color: "bg-purple-500" },
];

const platformIcons = {
  twitter: Twitter,
  linkedin: Linkedin,
  facebook: Facebook,
};

export default function ContentPage() {
  const [topics, setTopics] = useState(initialTopics);
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null);
  const [draggedItem, setDraggedItem] = useState<number | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleDragStart = (topicId: number) => {
    setDraggedItem(topicId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (status: string) => {
    if (draggedItem !== null) {
      setTopics(
        topics.map((topic) =>
          topic.id === draggedItem ? { ...topic, status } : topic,
        ),
      );
      setDraggedItem(null);
    }
  };

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const selectedTopicData = topics.find((t) => t.id === selectedTopic);

  if (selectedTopic && selectedTopicData) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSelectedTopic(null)}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <h2 className="text-2xl font-bold tracking-tight">
              {selectedTopicData.title}
            </h2>
            <p className="text-muted-foreground">
              Manage posts across platforms
            </p>
          </div>
          <Dialog>
            <DialogTrigger>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Add Post
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Platform Post</DialogTitle>
                <DialogDescription>
                  Add a new post for this topic
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label>Platform</Label>
                  <select className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm">
                    <option value="twitter">Twitter / X</option>
                    <option value="linkedin">LinkedIn</option>
                    <option value="facebook">Facebook</option>
                  </select>
                </div>
                <div className="grid gap-2">
                  <Label>Content</Label>
                  <Textarea
                    placeholder="Write your post content..."
                    className="min-h-[120px]"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button>Add Post</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {selectedTopicData.posts.map((post, idx) => {
            const Icon =
              platformIcons[post.platform as keyof typeof platformIcons];
            return (
              <Card key={idx}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Icon className="h-5 w-5" />
                      <CardTitle className="text-base capitalize">
                        {post.platform}
                      </CardTitle>
                    </div>
                    <Badge
                      variant={
                        post.status === "published" ? "secondary" : "default"
                      }
                    >
                      {post.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    {post.content}
                  </p>
                  <div className="flex gap-2 border-t pt-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() =>
                        copyToClipboard(post.content, `${selectedTopic}-${idx}`)
                      }
                    >
                      {copiedId === `${selectedTopic}-${idx}` ? (
                        <>
                          <Check className="h-3 w-3 mr-1 text-green-600" />{" "}
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3 mr-1" /> Copy
                        </>
                      )}
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Pencil className="h-3 w-3 mr-1" /> Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-10rem)] flex flex-col space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Content Studio</h2>
          <p className="text-muted-foreground">
            Organize content topics and manage platform-specific posts.
          </p>
        </div>
        <Dialog>
          <DialogTrigger>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> New Topic
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Content Topic</DialogTitle>
              <DialogDescription>Start a new content idea</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label>Topic Title</Label>
                <Input placeholder="e.g. Product Launch, Team Culture..." />
              </div>
              <div className="grid gap-2">
                <Label>Initial Status</Label>
                <select className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm">
                  <option value="idea">Idea</option>
                  <option value="writing">Writing</option>
                  <option value="ready">Ready</option>
                </select>
              </div>
            </div>
            <DialogFooter>
              <Button>Create Topic</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex-1 overflow-x-auto">
        <div className="flex gap-6 h-full min-w-max pb-4">
          {columns.map((col) => (
            <div
              key={col.id}
              className="w-80 flex flex-col gap-4"
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(col.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${col.color}`} />
                  <h3 className="font-semibold">{col.title}</h3>
                </div>
                <Badge variant="secondary" className="rounded-full">
                  {topics.filter((t) => t.status === col.id).length}
                </Badge>
              </div>
              <div className="bg-muted/50 p-3 rounded-lg flex-1 space-y-3 min-h-[200px]">
                {topics
                  .filter((topic) => topic.status === col.id)
                  .map((topic) => (
                    <Card
                      key={topic.id}
                      draggable
                      onDragStart={() => handleDragStart(topic.id)}
                      onClick={() => setSelectedTopic(topic.id)}
                      className={`cursor-pointer hover:shadow-md transition-all ${
                        draggedItem === topic.id ? "opacity-50" : ""
                      }`}
                    >
                      <CardHeader className="p-4">
                        <div className="flex items-start gap-3">
                          <GripVertical className="h-5 w-5 text-muted-foreground shrink-0 cursor-grab" />
                          <div className="flex-1 min-w-0">
                            <CardTitle className="text-sm font-medium line-clamp-2">
                              {topic.title}
                            </CardTitle>
                            <div className="flex gap-1 mt-2">
                              {topic.posts.map((post, idx) => {
                                const Icon =
                                  platformIcons[
                                    post.platform as keyof typeof platformIcons
                                  ];
                                return (
                                  <div
                                    key={idx}
                                    className="h-5 w-5 rounded bg-muted flex items-center justify-center"
                                  >
                                    <Icon className="h-3 w-3" />
                                  </div>
                                );
                              })}
                              <Badge
                                variant="outline"
                                className="text-xs ml-auto"
                              >
                                {topic.posts.length}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
