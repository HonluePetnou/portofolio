"use client";

import { useEffect, useState, useCallback } from "react";
import { apiRequest } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Copy, 
  CheckCircle2, 
  ExternalLink, 
  Clock, 
  Tag, 
  Share2, 
  Linkedin, 
  Twitter, 
  Facebook,
  MessageSquare,
  TrendingUp,
  Hash,
  AtSign,
  Image as ImageIcon,
  Archive,
  ArchiveRestore,
  CheckCircle
} from "lucide-react";

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  content: any;
  cta: any;
  relatedProjectId: string | null;
  tags: string[];
  seo: any;
  published: boolean;
  readingTime: number;
  createdAt: string;
  archived?: boolean;
}

interface SocialContent {
  linkedin: string;
  twitter: string;
  facebook: string;
}

export default function SocialMediaPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [archivedArticles, setArchivedArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingArchived, setIsLoadingArchived] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [socialContent, setSocialContent] = useState<SocialContent | null>(null);
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});
  const [allCopied, setAllCopied] = useState(false);
  const [archiving, setArchiving] = useState(false);
  const [unarchiving, setUnarchiving] = useState(false);
  const [activeView, setActiveView] = useState<"active" | "archived">("active");

  const fetchArticles = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await apiRequest("/articles?published_filter=true&archived=false");
      setArticles(data);
    } catch (err) {
      console.error("Failed to fetch articles:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchArchivedArticles = useCallback(async () => {
    setIsLoadingArchived(true);
    try {
      const data = await apiRequest("/articles?published_filter=true&archived=true");
      setArchivedArticles(data);
    } catch (err) {
      console.error("Failed to fetch archived articles:", err);
    } finally {
      setIsLoadingArchived(false);
    }
  }, []);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  useEffect(() => {
    if (activeView === "archived") {
      fetchArchivedArticles();
    }
  }, [activeView, fetchArchivedArticles]);

  const generateSocialContent = (article: Article): SocialContent => {
    const baseUrl = "https://yourportfolio.com"; // Replace with your actual domain
    const articleUrl = `${baseUrl}/blog/${article.slug}`;
    
    // LinkedIn content (professional, detailed)
    const linkedinContent = `🚀 Just published a new article: "${article.title}"

${article.excerpt}

In this article, I explore:
${article.tags.map(tag => `• ${tag}`).join('\n')}

📖 Read the full article here: ${articleUrl}

#webdevelopment #tech #blogging ${article.tags.map(tag => `#${tag.replace(/\s+/g, '')}`).join(' ')}`;

    // Twitter content (concise, engaging)
    const twitterContent = `🚀 New Article Alert!

"${article.title}"

${article.excerpt.substring(0, 100)}...

🔗 Read more: ${articleUrl}

${article.tags.map(tag => `#${tag.replace(/\s+/g, '')}`).join(' ')} #tech #webdev`;

    // Facebook content (friendly, conversational)
    const facebookContent = `🎉 Excited to share my latest article with you all!

"${article.title}"

${article.excerpt}

Whether you're a developer, designer, or tech enthusiast, there's something in this for you. I'd love to hear your thoughts!

👉 Read the full article here: ${articleUrl}

#NewArticle #TechBlog #WebDevelopment ${article.tags.map(tag => `#${tag.replace(/\s+/g, '')}`).join(' ')}`;

    return {
      linkedin: linkedinContent,
      twitter: twitterContent,
      facebook: facebookContent
    };
  };

  const handleArticleClick = (article: Article) => {
    setSelectedArticle(article);
    setSocialContent(generateSocialContent(article));
  };

  const copyToClipboard = async (content: string, platform: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedStates(prev => ({ ...prev, [platform]: true }));
      setTimeout(() => {
        setCopiedStates(prev => ({ ...prev, [platform]: false }));
      }, 2000);
      
      // Check if all platforms have been copied
      const platforms: (keyof SocialContent)[] = ['linkedin', 'twitter', 'facebook'];
      const allStates = { ...copiedStates, [platform]: true };
      const allCopiedNow = platforms.every(p => allStates[p]);
      
      if (allCopiedNow) {
        setAllCopied(true);
      }
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const archiveArticle = async () => {
    if (!selectedArticle) return;
    
    setArchiving(true);
    try {
      // Update the article to mark it as archived
      await apiRequest(`/articles/${selectedArticle.id}/archive?archived=true`, {
        method: 'PATCH'
      });
      
      // Update local state
      setArticles(prev => prev.filter(article => article.id !== selectedArticle.id));
      setArchivedArticles(prev => [...prev, { ...selectedArticle, archived: true }]);
      
      // Close dialog and reset state
      setSelectedArticle(null);
      setSocialContent(null);
      setAllCopied(false);
      setCopiedStates({});
      
      // Show success message (you could add a toast here)
      console.log("Article archived successfully!");
    } catch (err) {
      console.error("Failed to archive article:", err);
    } finally {
      setArchiving(false);
    }
  };

  const unarchiveArticle = async (article: Article) => {
    setUnarchiving(true);
    try {
      // Update the article to mark it as unarchived
      await apiRequest(`/articles/${article.id}/archive?archived=false`, {
        method: 'PATCH'
      });
      
      // Update local state
      setArchivedArticles(prev => prev.filter(a => a.id !== article.id));
      setArticles(prev => [...prev, { ...article, archived: false }]);
      
      // Show success message
      console.log("Article unarchived successfully!");
    } catch (err) {
      console.error("Failed to unarchive article:", err);
    } finally {
      setUnarchiving(false);
    }
  };

  const ArchivedArticleCard = ({ article }: { article: Article }) => {
  return (
    <Card className="relative opacity-75 border-orange-200 dark:border-orange-800">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="h-16 w-20 rounded-lg overflow-hidden shrink-0 bg-slate-100 dark:bg-slate-800">
            {article.coverImage ? (
              <img
                src={article.coverImage}
                alt={article.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center">
                <ImageIcon className="h-6 w-6 text-muted-foreground" />
              </div>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-semibold line-clamp-1">
                    {article.title}
                  </h3>
                  <Badge variant="secondary" className="bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300">
                    <Archive className="h-3 w-3 mr-1" />
                    Archived
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                  {article.excerpt}
                </p>
                
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {article.readingTime} min read
                  </div>
                  
                  {article.tags.length > 0 && (
                    <div className="flex items-center gap-1">
                      <Tag className="h-3 w-3" />
                      {article.tags[0]}
                      {article.tags.length > 1 && `+${article.tags.length - 1}`}
                    </div>
                  )}
                  
                  <div className="flex items-center gap-1">
                    <Archive className="h-3 w-3" />
                    Previously shared
                  </div>
                </div>
              </div>
              
              <Button
                size="sm"
                onClick={() => unarchiveArticle(article)}
                disabled={unarchiving}
                className="gap-2 bg-green-500 hover:bg-green-600 text-white"
              >
                {unarchiving ? (
                  <>
                    <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                    Restoring...
                  </>
                ) : (
                  <>
                    <ArchiveRestore className="h-4 w-4" />
                    Restore
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const SocialContentCard = ({ 
    platform, 
    content, 
    icon: Icon, 
    color, 
    characterLimit 
  }: { 
    platform: keyof SocialContent; 
    content: string; 
    icon: any; 
    color: string; 
    characterLimit?: number;
  }) => {
    const isCopied = copiedStates[platform];
    const contentLength = content.length;
    const isOverLimit = characterLimit && contentLength > characterLimit;

    return (
      <Card className="relative">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${color}`}>
                <Icon className="h-5 w-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg capitalize">{platform}</CardTitle>
                <CardDescription>
                  {characterLimit && (
                    <span className={isOverLimit ? "text-red-500" : "text-muted-foreground"}>
                      {contentLength}/{characterLimit} characters
                    </span>
                  )}
                </CardDescription>
              </div>
            </div>
            <Button
              size="sm"
              onClick={() => copyToClipboard(content, platform)}
              className={`gap-2 ${isCopied ? "bg-green-500 hover:bg-green-600" : ""}`}
            >
              {isCopied ? (
                <>
                  <CheckCircle2 className="h-4 w-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  Copy
                </>
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <textarea
              value={content}
              readOnly
              className={`w-full h-32 p-3 rounded-lg border resize-none text-sm font-mono ${
                isOverLimit ? "border-red-500 bg-red-50 dark:bg-red-950/10" : "border-slate-200 dark:border-slate-700"
              }`}
            />
            {isOverLimit && (
              <div className="absolute top-2 right-2 text-xs text-red-500 bg-white dark:bg-slate-800 px-2 py-1 rounded">
                Too long!
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading articles...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3 text-primary">
          <Share2 className="h-8 w-8" />
          <h1 className="text-4xl font-bold">Social Media Content Generator</h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Generate ready-to-share social media content for your published articles
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center">
        <div className="bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
          <div className="flex gap-1">
            <button
              onClick={() => setActiveView("active")}
              className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
                activeView === "active"
                  ? "bg-white dark:bg-slate-900 text-primary shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <TrendingUp className="h-4 w-4" />
              Active Articles ({articles.length})
            </button>
            <button
              onClick={() => setActiveView("archived")}
              className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
                activeView === "archived"
                  ? "bg-white dark:bg-slate-900 text-primary shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Archive className="h-4 w-4" />
              Archived ({archivedArticles.length})
            </button>
          </div>
        </div>
      </div>

      {/* Active Articles */}
      {activeView === "active" && (
        <div className="grid gap-6">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <TrendingUp className="h-6 w-6" />
            Ready to Share
          </h2>
          
          {articles.length === 0 ? (
            <Card className="p-12 text-center">
              <MessageSquare className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">No articles ready to share</h3>
              <p className="text-muted-foreground">Publish some articles first to generate social media content.</p>
            </Card>
          ) : (
            <div className="grid gap-4">
              {articles.map((article) => (
                <Card 
                  key={article.id} 
                  className="hover:shadow-lg transition-all cursor-pointer group"
                  onClick={() => handleArticleClick(article)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="h-16 w-20 rounded-lg overflow-hidden shrink-0 bg-slate-100 dark:bg-slate-800">
                        {article.coverImage ? (
                          <img
                            src={article.coverImage}
                            alt={article.title}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center">
                            <ImageIcon className="h-6 w-6 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold group-hover:text-primary transition-colors truncate">
                          {article.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                          {article.excerpt}
                        </p>
                        
                        <div className="flex items-center gap-4 mt-3">
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {article.readingTime} min read
                          </div>
                          
                          {article.tags.length > 0 && (
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Tag className="h-3 w-3" />
                              {article.tags[0]}
                              {article.tags.length > 1 && `+${article.tags.length - 1}`}
                            </div>
                          )}
                          
                          <Badge variant="secondary" className="text-xs">
                            <ExternalLink className="h-3 w-3 mr-1" />
                            Click to generate
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Archived Articles */}
      {activeView === "archived" && (
        <div className="grid gap-6">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <Archive className="h-6 w-6" />
            Previously Shared
          </h2>
          
          {isLoadingArchived ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : archivedArticles.length === 0 ? (
            <Card className="p-12 text-center">
              <Archive className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">No archived articles</h3>
              <p className="text-muted-foreground">Articles will appear here after you've shared them on social media.</p>
            </Card>
          ) : (
            <div className="grid gap-4">
              {archivedArticles.map((article) => (
                <ArchivedArticleCard key={article.id} article={article} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Social Content Dialog */}
      <Dialog open={!!selectedArticle} onOpenChange={() => {
        setSelectedArticle(null);
        setSocialContent(null);
        setAllCopied(false);
        setCopiedStates({});
      }}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <Share2 className="h-6 w-6" />
              Social Media Content
            </DialogTitle>
            <DialogDescription>
              Ready-to-share content for "{selectedArticle?.title}"
            </DialogDescription>
          </DialogHeader>
          
          {selectedArticle && socialContent && (
            <div className="space-y-6">
              {/* Article Preview */}
              <Card className="bg-slate-50 dark:bg-slate-800">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-16 rounded-lg overflow-hidden shrink-0">
                      {selectedArticle.coverImage ? (
                        <img
                          src={selectedArticle.coverImage}
                          alt={selectedArticle.title}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center bg-slate-200 dark:bg-slate-700">
                          <ImageIcon className="h-4 w-4 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold truncate">{selectedArticle.title}</h4>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {selectedArticle.excerpt}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Social Media Content */}
              <Tabs defaultValue="linkedin" className="space-y-4">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="linkedin" className="gap-2">
                    <Linkedin className="h-4 w-4" />
                    LinkedIn
                  </TabsTrigger>
                  <TabsTrigger value="twitter" className="gap-2">
                    <Twitter className="h-4 w-4" />
                    Twitter
                  </TabsTrigger>
                  <TabsTrigger value="facebook" className="gap-2">
                    <Facebook className="h-4 w-4" />
                    Facebook
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="linkedin" className="space-y-4">
                  <SocialContentCard
                    platform="linkedin"
                    content={socialContent.linkedin}
                    icon={Linkedin}
                    color="bg-blue-600"
                  />
                </TabsContent>
                
                <TabsContent value="twitter" className="space-y-4">
                  <SocialContentCard
                    platform="twitter"
                    content={socialContent.twitter}
                    icon={Twitter}
                    color="bg-sky-500"
                    characterLimit={280}
                  />
                </TabsContent>
                
                <TabsContent value="facebook" className="space-y-4">
                  <SocialContentCard
                    platform="facebook"
                    content={socialContent.facebook}
                    icon={Facebook}
                    color="bg-blue-700"
                  />
                </TabsContent>
              </Tabs>

              {/* Archive Section */}
              <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${allCopied ? "bg-green-100 dark:bg-green-900/20" : "bg-slate-100 dark:bg-slate-700"}`}>
                    {allCopied ? (
                      <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                    ) : (
                      <Archive className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">
                      {allCopied ? "Ready to archive!" : "Copy all platforms first"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {allCopied 
                        ? "All content copied. Archive this article to remove it from the social media queue."
                        : "Copy content from all platforms to enable archiving."
                      }
                    </p>
                  </div>
                </div>
                <Button
                  onClick={archiveArticle}
                  disabled={!allCopied || archiving}
                  className={`gap-2 ${allCopied ? "bg-orange-500 hover:bg-orange-600" : ""}`}
                >
                  {archiving ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Archiving...
                    </>
                  ) : (
                    <>
                      <Archive className="h-4 w-4" />
                      Archive Article
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
