import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, Instagram, Linkedin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoFull from "@/assets/logo-full.svg";

const navLinks = [
  { name: "Accueil", href: "/nav5" },
  { name: "Services", href: "/nav5" },
  { name: "À propos", href: "/nav5" },
  { name: "Contact", href: "/nav5" },
];

export function Navbar5() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top Bar - Contact Info */}
      <div className="bg-brand-navy text-white text-xs py-2 px-6 flex justify-between items-center border-b border-white/5">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2 text-white/70 hover:text-brand-orange transition-colors cursor-pointer">
            <Phone size={12} /> +33 1 23 45 67 89
          </span>
          <span className="flex items-center gap-2 text-white/70 hover:text-brand-orange transition-colors cursor-pointer">
            <Mail size={12} /> contact@soluty.com
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Linkedin
            size={14}
            className="hover:text-brand-blue cursor-pointer"
          />
          <Twitter size={14} className="hover:text-sky-400 cursor-pointer" />
          <Instagram size={14} className="hover:text-pink-500 cursor-pointer" />
        </div>
      </div>

      {/* Main Nav */}
      <nav
        className={`transition-all duration-300 ${isScrolled ? "bg-white/90 backdrop-blur-md shadow-lg py-3" : "bg-white py-5"}`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Link to="/nav5" className="flex items-center">
            <img src={logoFull} alt="Soluty" className="h-10 w-auto" />
          </Link>

          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-sm font-mont font-semibold text-brand-navy hover:text-brand-blue uppercase tracking-wide transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <Button className="rounded-md bg-brand-navy hover:bg-brand-blue text-white shadow-xl shadow-brand-blue/20">
            Contactez-nous
          </Button>
        </div>
      </nav>
    </header>
  );
}
