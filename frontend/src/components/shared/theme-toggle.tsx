"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className={cn("p-2 h-9 w-9", className)} />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "relative p-2 rounded-full transition-colors hover:bg-white/10 flex items-center justify-center",
        className
      )}
      aria-label="Toggle theme"
    >
      <Sun
        className={cn(
          "h-5 w-5 transition-all",
          isDark ? "scale-0 rotate-90" : "scale-100 rotate-0 text-pink-400"
        )}
      />
      <Moon
        className={cn(
          "absolute h-5 w-5 transition-all text-blue-400",
          isDark ? "scale-100 rotate-0" : "scale-0 -rotate-90"
        )}
      />
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
