"use client";

import { useEffect, useState } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Trash2, Reply, ArrowLeft, Clock } from "lucide-react";
import { apiRequest } from "@/lib/api";

type ContactStatus = "NEW" | "READ" | "REPLIED" | "ARCHIVED";
type PriorityLevel = "LOW" | "MEDIUM" | "HIGH";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  subject: string;
  message: string;
  service?: string | null;
  budget?: number | null;
  status: ContactStatus;
  priority: PriorityLevel;
  internalNotes?: string | null;
  createdAt: string;
  updatedAt: string;
  starred?: boolean;
}

function formatRelativeDate(iso: string): string {
  const created = new Date(iso);
  const diffMs = Date.now() - created.getTime();
  const diffMinutes = Math.floor(diffMs / 60000);
  if (diffMinutes < 60) return `${diffMinutes || 1} min ago`;
  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  return created.toLocaleDateString();
}

export default function InboxPage() {
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data: ContactMessage[] = await apiRequest("/admin/contact");
        setMessages(data);
      } catch (e: any) {
        console.error(e);
        setError(e?.message ?? "Failed to load inbox.");
      } finally {
        setIsLoading(false);
      }
    };

    void load();
  }, []);

  const toggleStar = (id: string) => {
    setMessages(
      messages.map((msg) =>
        msg.id === id ? { ...msg, starred: !msg.starred } : msg,
      ),
    );
  };

  const markAsRead = async (id: string) => {
    const target = messages.find((m) => m.id === id);
    if (!target || target.status === "READ") {
      setSelectedMessage(id);
      return;
    }

    try {
      const updated: ContactMessage = await apiRequest(`/admin/contact/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ status: "READ" as ContactStatus }),
      });
      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, status: updated.status } : m)),
      );
    } catch (e) {
      console.error(e);
    }

    setSelectedMessage(id);
  };

  const deleteMessage = async (id: string) => {
    try {
      await apiRequest(`/admin/contact/${id}`, { method: "DELETE" });
      setMessages((prev) => prev.filter((msg) => msg.id !== id));
      if (selectedMessage === id) {
        setSelectedMessage(null);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const unreadCount = messages.filter((m) => m.status === "NEW").length;
  const selectedMsg = messages.find((m) => m.id === selectedMessage);

  if (selectedMessage && selectedMsg) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSelectedMessage(null)}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <h2 className="text-2xl font-bold tracking-tight">
              {selectedMsg.subject}
            </h2>
            <p className="text-muted-foreground text-sm">
              From: {selectedMsg.name} ({selectedMsg.email})
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Reply className="mr-2 h-4 w-4" /> Reply
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => toggleStar(selectedMsg.id)}
            >
              <Star
                className={`h-4 w-4 ${selectedMsg.starred ? "fill-yellow-400 text-yellow-400" : ""}`}
              />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => deleteMessage(selectedMsg.id)}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                  {selectedMsg.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <CardTitle className="text-base">
                    {selectedMsg.name}
                  </CardTitle>
                  <CardDescription>{selectedMsg.email}</CardDescription>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                {formatRelativeDate(selectedMsg.createdAt)}
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="prose prose-sm max-w-none">
              <p className="text-foreground leading-relaxed">
                {selectedMsg.message}
              </p>
            </div>

            <div className="border-t pt-6">
              <h3 className="font-semibold mb-4">Reply</h3>
              <div className="space-y-4">
                <Textarea
                  placeholder="Type your reply..."
                  className="min-h-[150px]"
                />
                <div className="flex justify-end gap-2">
                  <Button variant="outline">Save Draft</Button>
                  <Button>
                    <Reply className="mr-2 h-4 w-4" /> Send Reply
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Inbox</h2>
          <p className="text-muted-foreground">
            Manage messages from your portfolio contact form
          </p>
        </div>
        <Badge variant="default" className="text-base px-3 py-1">
          {unreadCount} Unread
        </Badge>
      </div>

      {isLoading && (
        <p className="text-muted-foreground text-sm">Loading inbox...</p>
      )}
      {error && !isLoading && (
        <p className="text-sm text-destructive">{error}</p>
      )}

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All ({messages.length})</TabsTrigger>
          <TabsTrigger value="unread">Unread ({unreadCount})</TabsTrigger>
          <TabsTrigger value="starred">
            Starred ({messages.filter((m) => m.starred).length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4 mt-6">
          <div className="space-y-2">
            {messages.map((msg) => (
              <Card
                key={msg.id}
                className={`cursor-pointer transition-all hover:shadow-md ${msg.status === "NEW" ? "border-l-4 border-l-indigo-500 bg-accent/30" : ""}`}
                onClick={() => {
                  void markAsRead(msg.id);
                }}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center font-semibold text-sm shrink-0">
                      {msg.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <h3
                            className={`font-semibold ${msg.status === "NEW" ? "text-foreground" : "text-muted-foreground"}`}
                          >
                            {msg.name}
                          </h3>
                          {msg.status === "NEW" && (
                            <Badge variant="default" className="text-xs">
                              New
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">
                            {formatRelativeDate(msg.createdAt)}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleStar(msg.id);
                            }}
                          >
                            <Star
                              className={`h-4 w-4 ${msg.starred ? "fill-yellow-400 text-yellow-400" : ""}`}
                            />
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm mb-1">{msg.subject}</p>
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        {msg.message}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="unread" className="space-y-4 mt-6">
          <div className="space-y-2">
            {messages
              .filter((m) => m.status === "NEW")
              .map((msg) => (
                <Card
                  key={msg.id}
                  className="cursor-pointer transition-all hover:shadow-md border-l-4 border-l-indigo-500 bg-accent/30"
                  onClick={() => {
                    setSelectedMessage(msg.id);
                    markAsRead(msg.id);
                  }}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center font-semibold text-sm shrink-0">
                        {msg.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{msg.name}</h3>
                            <Badge variant="default" className="text-xs">
                              New
                            </Badge>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {formatRelativeDate(msg.createdAt)}
                          </span>
                        </div>
                        <p className="text-sm font-medium mb-1">
                          {msg.subject}
                        </p>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {msg.message}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="starred" className="space-y-4 mt-6">
          <div className="space-y-2">
            {messages
              .filter((m) => m.starred)
              .map((msg) => (
                <Card
                  key={msg.id}
                  className="cursor-pointer transition-all hover:shadow-md"
                  onClick={() => {
                    setSelectedMessage(msg.id);
                    markAsRead(msg.id);
                  }}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center font-semibold text-sm shrink-0">
                        {msg.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold">{msg.name}</h3>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">
                              {formatRelativeDate(msg.createdAt)}
                            </span>
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          </div>
                        </div>
                        <p className="text-sm mb-1">{msg.subject}</p>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {msg.message}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
