"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectItem } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { X, Plus } from "lucide-react";

export function ProfileStack() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Tech Stack Management</CardTitle>
          <CardDescription>
            Add the technologies you use. These will be filterable on your
            portfolio.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Add New Skill */}
          <div className="flex gap-4 items-end bg-muted/30 p-4 rounded-lg border">
            <div className="grid gap-2 flex-1">
              <span className="text-sm font-medium">Technology Name</span>
              <Input placeholder="e.g. React Native" />
            </div>
            <div className="grid gap-2 w-48">
              <span className="text-sm font-medium">Category</span>
              <Select>
                <SelectItem value="frontend">Frontend</SelectItem>
                <SelectItem value="backend">Backend</SelectItem>
                <SelectItem value="design">Design</SelectItem>
                <SelectItem value="tools">Tools & DevOps</SelectItem>
              </Select>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                category: "Frontend",
                items: ["React", "Next.js", "TailwindCSS", "TypeScript"],
              },
              {
                category: "Backend",
                items: ["Node.js", "PostgreSQL", "Supabase"],
              },
              { category: "Design", items: ["Figma", "Adobe XD"] },
              { category: "Tools", items: ["Git", "Docker", "VS Code"] },
            ].map((group) => (
              <div key={group.category} className="space-y-3">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  {group.category}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <Badge
                      key={item}
                      variant="secondary"
                      className="pl-3 pr-1 py-1 flex gap-2 text-sm"
                    >
                      {item}
                      <button className="hover:text-destructive transition-colors">
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
