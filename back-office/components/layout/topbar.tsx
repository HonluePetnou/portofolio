"use client";

import { usePathname, useRouter } from "next/navigation";
import { Bell, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { useEffect, useState } from "react";

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
  const router = useRouter();
  const title = titles[pathname] || "Dashboard";
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    setUsername(localStorage.getItem("username"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("username");
    router.push("/login");
  };

  return (
    <header className="flex h-16 items-center justify-between border-b bg-background/95 px-6 backdrop-blur supports-backdrop-filter:bg-background/60 sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-semibold">{title}</h1>
      </div>
      <div className="flex items-center gap-4">
        <ThemeSwitcher />

        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <Bell className="h-5 w-5" />
        </Button>

        <div className="flex items-center gap-2 border-l pl-4">
          <div className="h-8 w-8 rounded-full bg-linear-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-xs font-bold text-white uppercase">
            {username?.charAt(0) || "U"}
          </div>
          <div className="hidden flex-col md:flex">
            <span className="text-sm font-medium">{username || "User"}</span>
            <span className="text-xs text-muted-foreground">Admin</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-destructive"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
