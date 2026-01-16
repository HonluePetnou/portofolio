"use client";

import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/#about" },
  { name: "Projects", href: "/#projects" },
  { name: "Experience", href: "/#experience" },
  { name: "Blog", href: "/#blog" },
  { name: "Contact", href: "/#contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState("home");
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Determine the actual theme being used
  const currentTheme = theme === "system" ? systemTheme : theme;
  const isDark = currentTheme === "dark";

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (pathname !== "/") return;

    const handleScroll = () => {
      const sections = [
        "home",
        "about",
        "projects",
        "experience",
        "blog",
        "contact",
      ];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    // Only intercept and smooth scroll if we are already on the home page
    if (pathname === "/") {
      if (href === "/") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
        setActiveSection("home");
      } else if (href.startsWith("/#")) {
        e.preventDefault();
        const id = href.substring(2);
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    }
    // If on a sub-page, the default link behavior (<a>) will navigate to the home page and jump to the anchor
  };

  // Avoid hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <header className="fixed top-6 left-0 right-0 z-50 px-4">
      <div className="max-w-fit mx-auto">
        <nav
          className={cn(
            "flex items-center justify-between gap-6 px-6 py-4 rounded-full backdrop-blur-xl transition-all duration-300",
            isDark
              ? "bg-black/80 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
              : "bg-white/90 border border-gray-200/50 shadow-[0_8px_32px_rgba(0,0,0,0.08),0_0_1px_rgba(0,0,0,0.05)]"
          )}
        >
          {/* Nav Items */}
          <div className="flex items-center gap-1">
            {navItems.map((item) => {
              const sectionId =
                item.href === "/" ? "home" : item.href.substring(2);
              const isActive = pathname === "/" && activeSection === sectionId;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleClick(e, item.href)}
                  className={cn(
                    "relative px-6 py-2.5 text-[15px] font-medium transition-all cursor-pointer",
                    isDark
                      ? isActive
                        ? "text-white"
                        : "text-gray-400 hover:text-gray-200"
                      : isActive
                      ? "text-black"
                      : "text-gray-600 hover:text-gray-900"
                  )}
                >
                  {item.name}
                  {isActive && (
                    <>
                      {/* Glow effect layer (behind) */}
                      {isDark && (
                        <motion.div
                          layoutId="navbar-glow"
                          className="absolute top-0 left-1/2 -translate-x-1/2 h-0.5 w-16 rounded-full bg-white blur-sm opacity-80"
                          initial={false}
                          transition={{
                            type: "spring",
                            stiffness: 380,
                            damping: 30,
                          }}
                        />
                      )}
                      {/* Main indicator */}
                      <motion.div
                        layoutId="navbar-indicator"
                        className={cn(
                          "absolute top-0 left-1/2 -translate-x-1/2 h-0.5 w-12 rounded-full",
                          isDark
                            ? "bg-white shadow-[0_0_20px_rgba(255,255,255,0.8),0_0_40px_rgba(255,255,255,0.4),0_0_60px_rgba(255,255,255,0.2)]"
                            : "bg-black shadow-[0_4px_12px_rgba(0,0,0,0.25),0_2px_4px_rgba(0,0,0,0.15)]"
                        )}
                        initial={false}
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    </>
                  )}
                </a>
              );
            })}
          </div>

          {/* Theme Toggle */}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
