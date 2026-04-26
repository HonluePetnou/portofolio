"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, ChevronLeft, ChevronRight, FileText } from "lucide-react";
import { articlesService } from "@/lib/services/articles.service";
import type { Article } from "@/lib/types";

export default function BlogCalendarPage() {
  const router = useRouter();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadArticles = async () => {
      try {
        // Charger tous les articles (pas seulement published pour voir les scheduled)
        const allArticles = await articlesService.getAll();
        setArticles(allArticles);
      } catch (error) {
        console.error("Failed to load articles:", error);
      } finally {
        setLoading(false);
      }
    };

    loadArticles();
  }, []);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const getArticlesForDate = (date: Date) => {
    return articles.filter(article => {
      if (!article.publishedAt) return false;
      const articleDate = new Date(article.publishedAt);
      return articleDate.toDateString() === date.toDateString();
    });
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "draft": return "bg-gray-500";
      case "scheduled": return "bg-amber-500";
      case "published": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const upcomingArticles = articles
    .filter(article => article.status === "scheduled" && article.publishedAt)
    .sort((a, b) => new Date(a.publishedAt!).getTime() - new Date(b.publishedAt!).getTime())
    .slice(0, 5);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const days = getDaysInMonth(currentDate);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Calendrier Blog</h1>
          <p className="text-muted-foreground">
            Gérez vos articles planifiés et consultez le calendrier éditorial
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendrier */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  {currentDate.toLocaleDateString('fr-FR', {
                    month: 'long',
                    year: 'numeric'
                  })}
                </CardTitle>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigateMonth('prev')}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigateMonth('next')}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Jours de la semaine */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'].map(day => (
                  <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
                    {day}
                  </div>
                ))}
              </div>

              {/* Grille des jours */}
              <div className="grid grid-cols-7 gap-1">
                {days.map((date, index) => {
                  if (!date) {
                    return <div key={index} className="p-2"></div>;
                  }

                  const dayArticles = getArticlesForDate(date);
                  const isToday = date.toDateString() === new Date().toDateString();

                  return (
                    <div
                      key={index}
                      className={`p-2 border rounded-lg min-h-[80px] cursor-pointer hover:bg-muted/50 ${
                        isToday ? 'bg-primary/10 border-primary' : 'border-border'
                      }`}
                      onClick={() => {
                        // Optionnel : ouvrir un modal pour ce jour
                      }}
                    >
                      <div className="text-sm font-medium mb-1">
                        {date.getDate()}
                      </div>
                      <div className="space-y-1">
                        {dayArticles.slice(0, 2).map(article => (
                          <div
                            key={article.id}
                            className="text-xs p-1 rounded cursor-pointer hover:bg-background"
                            onClick={(e) => {
                              e.stopPropagation();
                              router.push(`/articles/${article.id}/edit`);
                            }}
                          >
                            <div className="flex items-center gap-1">
                              <div className={`w-2 h-2 rounded-full ${getStatusColor(article.status)}`}></div>
                              <span className="truncate">{article.title}</span>
                            </div>
                          </div>
                        ))}
                        {dayArticles.length > 2 && (
                          <div className="text-xs text-muted-foreground">
                            +{dayArticles.length - 2} autres
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* À venir */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>À venir</CardTitle>
            </CardHeader>
            <CardContent>
              {upcomingArticles.length === 0 ? (
                <p className="text-muted-foreground text-sm">
                  Aucun article planifié
                </p>
              ) : (
                <div className="space-y-3">
                  {upcomingArticles.map(article => (
                    <div
                      key={article.id}
                      className="flex items-start gap-3 p-3 border rounded-lg cursor-pointer hover:bg-muted/50"
                      onClick={() => router.push(`/articles/${article.id}/edit`)}
                    >
                      <FileText className="h-4 w-4 mt-0.5 text-muted-foreground" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {article.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString('fr-FR') : 'Date inconnue'}
                        </p>
                        <Badge
                          variant="secondary"
                          className={`text-xs mt-1 ${getStatusColor(article.status)}`}
                        >
                          {article.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

