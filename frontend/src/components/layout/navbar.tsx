"use client";

import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Menu, X } from "lucide-react";

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
  const [isOpen, setIsOpen] = useState(false);
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
    setIsOpen(false);
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
  };

  // Avoid hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <header className="fixed top-2 inset-x-0 z-50 px-4 pointer-events-none w-screen">
      <div className="flex justify-center w-full">
        <nav
          className={cn(
            "pointer-events-auto flex items-center justify-between gap-2 md:gap-6 px-4 md:px-6 py-3 md:py-4 rounded-full backdrop-blur-xl transition-all duration-300 max-w-full",
            isDark
              ? "bg-black/80 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
              : "bg-white/90 border border-gray-200/50 shadow-[0_8px_32px_rgba(0,0,0,0.08),0_0_1px_rgba(0,0,0,0.05)]"
          )}
        >
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 hover:bg-white/10 rounded-full transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center gap-1">
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

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[-1] lg:hidden"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.2 }}
              className={cn(
                "absolute top-20 left-4 right-4 p-6 rounded-3xl border lg:hidden overflow-hidden",
                isDark
                  ? "bg-gray-900/90 border-white/10 shadow-2xl"
                  : "bg-white/95 border-gray-200 shadow-xl text-black"
              )}
            >
              <div className="flex flex-col gap-4">
                {navItems.map((item) => {
                  const sectionId =
                    item.href === "/" ? "home" : item.href.substring(2);
                  const isActive =
                    pathname === "/" && activeSection === sectionId;
                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={(e) => handleClick(e, item.href)}
                      className={cn(
                        "text-lg font-medium py-2 transition-colors",
                        isActive
                          ? "text-neon-blue"
                          : isDark
                          ? "text-gray-400"
                          : "text-gray-600"
                      )}
                    >
                      {item.name}
                    </a>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
