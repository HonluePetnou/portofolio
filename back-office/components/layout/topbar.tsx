"use client";

import { usePathname } from "next/navigation";
import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "@/components/theme-switcher";

const titles: Record<string, string> = {
  "/dashboard": "Overview",
  "/profile": "My Profile",
  "/projects": "Projects",
  "/content": "Content Studio",
  "/blog": "Blog Management",
  "/inbox": "Inbox",
  "/settings": "Settings",
};

export function Topbar() {
  const pathname = usePathname();
  const title = titles[pathname] || "Dashboard";

  return (
    <header className="flex h-16 items-center justify-between border-b bg-background/95 px-6 backdrop-blur supports-backdrop-filter:bg-background/60 sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-semibold">{title}</h1>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative">{/* Search Placeholder */}</div>

        <ThemeSwitcher />

        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <Bell className="h-5 w-5" />
        </Button>

        <div className="flex items-center gap-2 border-l pl-4">
          <div className="h-8 w-8 rounded-full bg-linear-to-tr from-primary to-accent" />
          <div className="hidden flex-col md:flex">
            <span className="text-sm font-medium">John Founder</span>
            <span className="text-xs text-muted-foreground">Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
}
