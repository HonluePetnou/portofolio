import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import logoFull from "@/assets/logo-full.svg";
import { AnimatePresence, motion } from "framer-motion";

const navLinks = [
  { name: "Accueil", href: "/" },
  { name: "Service", href: "/service" },
  { name: "Réalisations", href: "/realisations" },
  { name: "À Propos", href: "/a-propos" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<"light" | "dark">("dark");
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Theme detection script
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const theme = entry.target.getAttribute("data-theme") as
              | "light"
              | "dark";
            if (theme) setCurrentTheme(theme);
          }
        });
      },
      {
        rootMargin: "-80px 0px -80% 0px", // Check top area under navbar
        threshold: 0,
      },
    );

    const sections = document.querySelectorAll("[data-theme]");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [location.pathname]); // Re-run when route changes to observe new sections

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b",
        // Scrolled or over Light Section: Show background
        isScrolled || currentTheme === "light"
          ? "py-3 shadow-2xl border-white/5"
          : "py-6 border-transparent",

        // Background Color Logic
        currentTheme === "light"
          ? "bg-brand-navy" // Solid brand-navy on light sections
          : isScrolled
            ? "bg-slate-950/98 backdrop-blur-md" // Scrolled over dark
            : "bg-transparent", // Top over dark
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Brand */}
        <Link to="/" className="flex items-center group">
          <div className=" transition-transform group-hover:scale-105 shrink-0">
            <img
              src={logoFull}
              alt="Soluty"
              className="h-10 w-auto object-contain"
            />
          </div>
          <div className="text-4xl font-black font-mont tracking-tighter">
            <span className="text-brand-blue">olut</span>
            <span className="text-brand-orange">y</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={cn(
                "text-sm font-bold font-mont transition-colors uppercase tracking-widest relative py-1",
                location.pathname === link.href
                  ? "text-brand-orange"
                  : "text-white/80 hover:text-white",
              )}
            >
              {link.name}
              {location.pathname === link.href && (
                <motion.div
                  layoutId="navbar-indicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-orange"
                />
              )}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            to="/login"
            className="text-sm font-medium text-white/80 hover:text-brand-orange transition-colors font-mont uppercase tracking-wide"
          >
            Espace Client
          </Link>
          <Button
            asChild
            className="bg-brand-orange hover:bg-brand-orange/90 text-white rounded-none skew-x-[-10deg] h-12 px-6 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)] transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
          >
            <Link to="/contact">
              <span className="skew-x-[10deg] flex items-center gap-2 font-bold font-mont tracking-wider">
                DEMARRER <ArrowRight size={18} strokeWidth={3} />
              </span>
            </Link>
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-white p-2 hover:bg-white/10 rounded-full transition-colors"
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-brand-navy border-b border-white/10 overflow-hidden"
          >
            <div className="container mx-auto px-6 py-8 flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={cn(
                    "text-lg font-bold font-mont uppercase tracking-widest",
                    location.pathname === link.href
                      ? "text-brand-orange"
                      : "text-white",
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <div className="h-px bg-white/10 my-2" />
              <Link
                to="/login"
                className="text-white/80 font-mont uppercase tracking-wide"
              >
                Espace Client
              </Link>
              <Button
                asChild
                className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white rounded-none h-12 uppercase font-bold font-mont tracking-wider"
              >
                <Link to="/contact">Demarrer un projet</Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
