import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import logoFull from "@/assets/logo-full.svg";

const navLinks = [
  { name: "Accueil", href: "/nav2" },
  { name: "Services", href: "/nav2" },
  { name: "À propos", href: "/nav2" },
  { name: "Contact", href: "/nav2" },
];

export function Navbar2() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-white/5",
        isScrolled
          ? "bg-brand-navy/95 backdrop-blur-md py-4"
          : "bg-transparent py-6",
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link to="/nav2" className="flex items-center gap-3">
          <div className="bg-white p-1 rounded-lg">
            <img src={logoFull} alt="Soluty" className="h-8 w-auto" />
          </div>
          <span className="font-mont font-bold text-xl text-white tracking-wide">
            SOLUTY
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="text-sm font-medium text-white/70 hover:text-brand-orange transition-colors uppercase tracking-widest"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Button
            variant="ghost"
            className="text-white hover:text-brand-orange hover:bg-transparent"
          >
            Se connecter
          </Button>
          <Button className="bg-brand-orange hover:bg-brand-orange/90 text-white rounded-none skew-x-[-10deg]">
            <span className="skew-x-[10deg] flex items-center gap-2">
              DEMARRER <ArrowRight size={16} />
            </span>
          </Button>
        </div>

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-white"
        >
          <Menu />
        </button>
      </div>
    </header>
  );
}
