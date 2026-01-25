import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  FolderPlus,
  FilePlus,
  PenTool,
  ArrowUpRight,
  TrendingUp,
  Eye,
  Users,
  Mail,
  MessageSquare,
} from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Projects
            </CardTitle>
            <FolderPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Articles Published
            </CardTitle>
            <FilePlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+4 this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Content Drafts
            </CardTitle>
            <PenTool className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">3 ready for review</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Unread Messages
            </CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">2 new inquiries</p>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Page Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,543</div>
            <div className="flex items-center text-xs text-green-600 dark:text-green-500">
              <TrendingUp className="h-3 w-3 mr-1" />
              +12.5% from last month
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Unique Visitors
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3,241</div>
            <div className="flex items-center text-xs text-green-600 dark:text-green-500">
              <TrendingUp className="h-3 w-3 mr-1" />
              +8.2% from last month
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Engagement Rate
            </CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68%</div>
            <div className="flex items-center text-xs text-green-600 dark:text-green-500">
              <TrendingUp className="h-3 w-3 mr-1" />
              +5.1% from last month
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions & Team */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Start something new today.</CardDescription>
          </CardHeader>
          <CardContent className="flex gap-4">
            <Button className="flex-1 bg-primary hover:bg-primary/90">
              <Plus className="mr-2 h-4 w-4" /> New Project
            </Button>
            <Button variant="secondary" className="flex-1">
              <PenTool className="mr-2 h-4 w-4" /> New Article
            </Button>
            <Button variant="outline" className="flex-1">
              <FilePlus className="mr-2 h-4 w-4" /> Add Content
            </Button>
          </CardContent>
        </Card>

        {/* Team Members */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Team Members</CardTitle>
            <CardDescription>Active collaborators</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: "John Founder", role: "Admin", status: "online" },
                { name: "Jane Smith", role: "Developer", status: "online" },
                { name: "Bob Johnson", role: "Designer", status: "away" },
              ].map((member, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-linear-to-tr from-primary to-accent flex items-center justify-center text-xs font-bold text-white">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {member.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {member.role}
                    </p>
                  </div>
                  <Badge
                    variant={
                      member.status === "online" ? "default" : "secondary"
                    }
                    className="text-xs"
                  >
                    {member.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            Latest updates across your workspace
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                text: "New project 'Alpha E-commerce' created",
                time: "2h ago",
                type: "project",
              },
              {
                text: "Article 'SEO Trends 2026' published",
                time: "5h ago",
                type: "blog",
              },
              {
                text: "Jane Smith updated team profile",
                time: "8h ago",
                type: "team",
              },
              {
                text: "New inquiry from Sarah Johnson",
                time: "1d ago",
                type: "inbox",
              },
              {
                text: "Content 'Product Launch' moved to Ready",
                time: "1d ago",
                type: "content",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-4 pb-4 border-b last:border-0 last:pb-0"
              >
                <div
                  className={`h-2 w-2 rounded-full ${
                    item.type === "project"
                      ? "bg-primary"
                      : item.type === "blog"
                        ? "bg-accent"
                        : item.type === "team"
                          ? "bg-green-500"
                          : item.type === "inbox"
                            ? "bg-yellow-500"
                            : "bg-purple-500"
                  }`}
                />
                <div className="flex-1 text-sm">{item.text}</div>
                <div className="text-xs text-muted-foreground">{item.time}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
