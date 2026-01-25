import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoFull from "@/assets/logo-full.svg";

const navLinks = [
  { name: "Accueil", href: "/nav3" },
  { name: "Services", href: "/nav3" },
  { name: "À propos", href: "/nav3" },
  { name: "Contact", href: "/nav3" },
];

export function Navbar3() {
  return (
    <header className="fixed top-8 left-0 right-0 z-50 px-6 pointer-events-none">
      <div className="container mx-auto flex items-center justify-between">
        {/* Isolated Logo */}
        <Link
          to="/nav3"
          className="pointer-events-auto bg-brand-navy/80 backdrop-blur-md p-3 rounded-2xl border border-white/10 shadow-lg hover:scale-105 transition-transform"
        >
          <img src={logoFull} alt="Soluty" className="h-8 w-auto" />
        </Link>

        {/* Floating Links Island */}
        <nav className="pointer-events-auto hidden md:flex items-center gap-1 bg-brand-navy/80 backdrop-blur-md p-2 rounded-full border border-white/10 shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="px-5 py-2 rounded-full text-sm font-mont font-medium text-white transition-all hover:bg-brand-blue"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Action Button Island */}
        <div className="pointer-events-auto flex items-center gap-3">
          <button className="h-12 w-12 flex items-center justify-center rounded-full bg-brand-navy/80 backdrop-blur-md border border-white/10 text-white hover:bg-white/10 transition-colors">
            <Search size={20} />
          </button>
          <Button className="h-12 rounded-full bg-brand-orange hover:bg-brand-orange/90 text-white px-6 font-mont shadow-lg">
            Let's Talk
          </Button>
        </div>
      </div>
    </header>
  );
}
