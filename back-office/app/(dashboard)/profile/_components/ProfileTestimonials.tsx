"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import { Plus, MessageSquare, Star } from "lucide-react";

export function ProfileTestimonials() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Testimonials</h3>
          <p className="text-sm text-muted-foreground">
            What clients and colleagues say about you.
          </p>
        </div>
        <Dialog>
          <DialogTrigger>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Testimonial
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Testimonial</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label>Author Name</Label>
                <Input placeholder="e.g. Sarah Smith" />
              </div>
              <div className="grid gap-2">
                <Label>Role / Company</Label>
                <Input placeholder="e.g. CTO at StartupX" />
              </div>
              <div className="grid gap-2">
                <Label>Relationship</Label>
                <Input placeholder="e.g. Client" />
              </div>
              <div className="grid gap-2">
                <Label>Comment</Label>
                <Textarea
                  placeholder="The testimonial text..."
                  className="min-h-[100px]"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-start gap-4 pb-2">
              <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center font-bold text-indigo-700">
                {String.fromCharCode(64 + i)}
              </div>
              <div className="flex-1">
                <CardTitle className="text-base">
                  Client Name {String.fromCharCode(64 + i)}
                </CardTitle>
                <CardDescription>CEO of Company {i}</CardDescription>
              </div>
              <div className="flex text-yellow-500">
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground italic">
                "An absolute professional. Delivered the project ahead of
                schedule and the code quality was top-notch. Highly
                recommended!"
              </p>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Switch id={`visible-${i}`} checked={true} />
                  <Label htmlFor={`visible-${i}`} className="text-xs">
                    Visible
                  </Label>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground"
                >
                  Edit
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
