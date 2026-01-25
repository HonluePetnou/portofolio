"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Upload,
  Link as LinkIcon,
  Download,
  Plus,
  Trash2,
  Pencil,
  Globe,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Select, SelectItem } from "@/components/ui/select";

export function ProfileGeneral() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Hero Info */}
        <Card>
          <CardHeader>
            <CardTitle>Hero Information</CardTitle>
            <CardDescription>
              Main headline and introduction on your portfolio.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Display Name</Label>
              <Input defaultValue="John Doe" />
            </div>
            <div className="space-y-2">
              <Label>Tagline / Role</Label>
              <Input defaultValue="Software Engineer & Product Builder" />
            </div>
            <div className="space-y-2">
              <Label>Short Bio</Label>
              <Textarea
                placeholder="A brief introduction..."
                defaultValue="I build accessible, pixel-perfect, and performant web experiences."
                className="min-h-[100px]"
              />
            </div>
          </CardContent>
        </Card>

        {/* Avatar & Resume */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Avatar & Visuals</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-6">
              <div className="h-24 w-24 rounded-full bg-secondary flex items-center justify-center border-2 border-dashed border-muted-foreground/25">
                <Upload className="h-8 w-8 text-muted-foreground" />
              </div>
              <div className="space-y-2">
                <Button variant="outline" size="sm">
                  Change Picture
                </Button>
                <p className="text-xs text-muted-foreground">
                  JPG, PNG or GIF. Max 2MB.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Resume / CV</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-md bg-muted/20">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-red-100 flex items-center justify-center rounded text-red-600 font-bold text-xs">
                    PDF
                  </div>
                  <div>
                    <p className="text-sm font-medium">john_cv_2026.pdf</p>
                    <p className="text-xs text-muted-foreground">
                      Added 2 days ago
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
              <Button className="w-full" variant="outline">
                <Upload className="mr-2 h-4 w-4" /> Upload New Version
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Social Links */}
      {/* Social Links */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Social Presence</CardTitle>
            <CardDescription>Manage your social media links.</CardDescription>
          </div>
          <Dialog>
            <DialogTrigger>
              <Button variant="outline">
                <Plus className="mr-2 h-4 w-4" /> Add Link
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Social Link</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label>Platform</Label>
                  <Select>
                    <SelectItem value="linkedin">LinkedIn</SelectItem>
                    <SelectItem value="github">GitHub</SelectItem>
                    <SelectItem value="twitter">Twitter / X</SelectItem>
                    <SelectItem value="instagram">Instagram</SelectItem>
                    <SelectItem value="dribbble">Dribbble</SelectItem>
                    <SelectItem value="website">Personal Website</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>URL</Label>
                  <Input placeholder="https://..." />
                </div>
              </div>
              <DialogFooter>
                <Button>Add Link</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Dynamic List */}
          <div className="space-y-4">
            {[
              {
                platform: "LinkedIn",
                url: "https://linkedin.com/in/johndoe",
                icon: Globe,
              },
              {
                platform: "GitHub",
                url: "https://github.com/johndoe",
                icon: Globe,
              },
              {
                platform: "Twitter",
                url: "https://x.com/johndoe",
                icon: Globe,
              },
            ].map((link, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-3 border rounded-md bg-muted/20 group"
              >
                <div className="h-10 w-10 bg-background border flex items-center justify-center rounded-md">
                  <link.icon className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{link.platform}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {link.url}
                  </p>
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button size="lg">Save Changes</Button>
      </div>
    </div>
  );
}
