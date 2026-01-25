"use client";

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
import { Select, SelectItem } from "@/components/ui/select";
import { Plus, Filter, ExternalLink, Pencil, Trash2, User } from "lucide-react";

const projects = [
  {
    id: 1,
    name: "Soluty Agency Website",
    description:
      "A modern, responsive website for the agency showcasing our services and portfolio.",
    client: "Internal",
    status: "In Progress",
    stack: ["Next.js", "TypeScript", "TailwindCSS"],
    type: "Agency",
    assignedTo: ["John Doe", "Jane Smith"],
    link: "https://soluty.agency",
  },
  {
    id: 2,
    name: "Alpha E-commerce",
    description:
      "Full-featured e-commerce platform with payment integration and inventory management.",
    client: "Alpha Inc.",
    status: "Completed",
    stack: ["Shopify", "React", "Node.js"],
    type: "Client",
    assignedTo: ["John Doe"],
    link: "https://alpha-store.com",
  },
  {
    id: 3,
    name: "Personal Portfolio V2",
    description:
      "Redesigned personal portfolio with blog and project showcase.",
    client: "John",
    status: "Draft",
    stack: ["React", "Gatsby"],
    type: "Personal",
    assignedTo: ["John Doe"],
    link: null,
  },
];

export default function ProjectsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Projects</h2>
          <p className="text-muted-foreground">
            Manage ongoing and past projects.
          </p>
        </div>

        {/* Add Project Dialog */}
        <Dialog>
          <DialogTrigger>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> New Project
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Project</DialogTitle>
              <DialogDescription>
                Add a new project to your portfolio.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label>Project Name</Label>
                <Input placeholder="e.g. E-commerce Platform" />
              </div>

              <div className="grid gap-2">
                <Label>Description</Label>
                <Textarea
                  placeholder="Describe the project, its goals, and key features..."
                  className="min-h-[100px]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Client / Company</Label>
                  <Input placeholder="e.g. Acme Corp" />
                </div>
                <div className="grid gap-2">
                  <Label>Project Type</Label>
                  <Select>
                    <SelectItem value="client">Client Project</SelectItem>
                    <SelectItem value="agency">Agency Project</SelectItem>
                    <SelectItem value="personal">Personal Project</SelectItem>
                    <SelectItem value="opensource">Open Source</SelectItem>
                  </Select>
                </div>
              </div>

              <div className="grid gap-2">
                <Label>Tech Stack (comma-separated)</Label>
                <Input placeholder="e.g. Next.js, TypeScript, PostgreSQL" />
              </div>

              <div className="grid gap-2">
                <Label>Assigned Team Members</Label>
                <Select>
                  <SelectItem value="john">John Doe</SelectItem>
                  <SelectItem value="jane">Jane Smith</SelectItem>
                  <SelectItem value="bob">Bob Johnson</SelectItem>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Select team members working on this project
                </p>
              </div>

              <div className="grid gap-2">
                <Label>Project Link (optional)</Label>
                <Input placeholder="https://project-url.com" type="url" />
              </div>

              <div className="grid gap-2">
                <Label>Status</Label>
                <Select>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline">Cancel</Button>
              <Button>Create Project</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="h-8 border-dashed">
          <Filter className="mr-2 h-4 w-4" /> Filter
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Card
            key={project.id}
            className="hover:shadow-md transition-shadow group"
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <Badge
                  variant={
                    project.status === "Completed" ? "secondary" : "default"
                  }
                >
                  {project.status}
                </Badge>
                <Badge variant="outline">{project.type}</Badge>
              </div>
              <CardTitle className="mt-4">{project.name}</CardTitle>
              <CardDescription>{project.client}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground line-clamp-2">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1">
                {project.stack.map((tech, i) => (
                  <Badge key={i} variant="secondary" className="text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <User className="h-3 w-3" />
                <span>{project.assignedTo.join(", ")}</span>
              </div>

              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs text-indigo-600 hover:underline"
                >
                  <ExternalLink className="h-3 w-3" />
                  View Project
                </a>
              )}

              <div className="flex gap-2 pt-2 mt-2 border-t">
                <Button variant="ghost" size="sm" className="h-8 flex-1">
                  <Pencil className="h-3 w-3 mr-1" /> Edit
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
