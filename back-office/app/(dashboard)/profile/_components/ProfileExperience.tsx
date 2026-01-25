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
import { Switch } from "@/components/ui/switch";
import { Plus, Pencil, Trash2, Building2 } from "lucide-react";

export function ProfileExperience() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Professional Experience</h3>
          <p className="text-sm text-muted-foreground">
            Manage your work history.
          </p>
        </div>
        <Dialog>
          <DialogTrigger>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Experience
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Experience</DialogTitle>
              <DialogDescription>
                Add a new role to your timeline.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label>Company Name</Label>
                <Input placeholder="e.g. Google" />
              </div>
              <div className="grid gap-2">
                <Label>Role / Title</Label>
                <Input placeholder="e.g. Senior Frontend Engineer" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Start Date</Label>
                  <Input type="date" />
                </div>
                <div className="grid gap-2">
                  <Label>End Date</Label>
                  <Input type="date" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Switch id="current-role" />
                <Label htmlFor="current-role">I currently work here</Label>
              </div>
              <div className="grid gap-2">
                <Label>Description</Label>
                <Textarea placeholder="Describe your responsibilities and achievements..." />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save Experience</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {/* Mock Experience Item */}
        {[1, 2].map((i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex gap-4">
                  <div className="h-12 w-12 rounded bg-muted flex items-center justify-center">
                    <Building2 className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">
                      Senior Frontend Engineer
                    </h4>
                    <div className="text-sm text-muted-foreground">
                      {i === 1 ? "Tech Corp Inc." : "Agency Studio"}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Jan 202{i} - Present
                    </div>
                    <p className="text-sm mt-3 leading-relaxed text-foreground/80">
                      Led the development of the new design system. Improved
                      performance by 40%. Mentored junior developers and
                      conducted code reviews.
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon">
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
