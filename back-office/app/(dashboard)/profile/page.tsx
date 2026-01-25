"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileGeneral } from "./_components/ProfileGeneral";
import { ProfileExperience } from "./_components/ProfileExperience";
import { ProfileStack } from "./_components/ProfileStack";
import { ProfileTestimonials } from "./_components/ProfileTestimonials";
import { ProfileSettings } from "./_components/ProfileSettings";
import { User, Briefcase, Layers, MessageSquare, Settings } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">My Profile</h2>
          <p className="text-muted-foreground">
            Manage your personal information and portfolio content.
          </p>
        </div>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-5 lg:w-[600px]">
          <TabsTrigger value="general" className="gap-2">
            <User className="h-4 w-4" />{" "}
            <span className="hidden sm:inline">General</span>
          </TabsTrigger>
          <TabsTrigger value="experience" className="gap-2">
            <Briefcase className="h-4 w-4" />{" "}
            <span className="hidden sm:inline">Experience</span>
          </TabsTrigger>
          <TabsTrigger value="stack" className="gap-2">
            <Layers className="h-4 w-4" />{" "}
            <span className="hidden sm:inline">Stack</span>
          </TabsTrigger>
          <TabsTrigger value="testimonials" className="gap-2">
            <MessageSquare className="h-4 w-4" />{" "}
            <span className="hidden sm:inline">Testimonials</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="gap-2">
            <Settings className="h-4 w-4" />{" "}
            <span className="hidden sm:inline">Settings</span>
          </TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="general">
            <ProfileGeneral />
          </TabsContent>
          <TabsContent value="experience">
            <ProfileExperience />
          </TabsContent>
          <TabsContent value="stack">
            <ProfileStack />
          </TabsContent>
          <TabsContent value="testimonials">
            <ProfileTestimonials />
          </TabsContent>
          <TabsContent value="settings">
            <ProfileSettings />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
