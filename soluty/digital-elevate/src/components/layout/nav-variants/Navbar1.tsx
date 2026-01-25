import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import logoFull from "@/assets/logo-full.svg";

const navLinks = [
  { name: "Accueil", href: "/nav1" },
  { name: "Services", href: "/nav1" },
  { name: "À propos", href: "/nav1" },
  { name: "Contact", href: "/nav1" },
];

export function Navbar1() {
  // ... (Same logic as current Navbar)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const leftLinks = navLinks.slice(0, 2);
  const rightLinks = navLinks.slice(2, 4);

  return (
    <>
      <header className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
        <nav
          className={cn(
            "pointer-events-auto transition-all duration-300 mx-auto",
            "bg-brand-navy/90 backdrop-blur-md border border-white/10 shadow-2xl",
            "rounded-full px-6 py-3",
            "flex items-center gap-8 md:gap-12",
          )}
        >
          <div className="hidden md:flex items-center gap-8">
            {leftLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-sm font-mont font-medium text-white/80 hover:text-white transition-colors relative"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <Link to="/nav1" className="flex items-center shrink-0">
            <img
              src={logoFull}
              alt="Soluty"
              className="h-8 w-auto object-contain"
            />
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {rightLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-sm font-mont font-medium text-white/80 hover:text-white transition-colors relative"
              >
                {link.name}
              </Link>
            ))}
            <Button className="rounded-full bg-brand-blue hover:bg-brand-blue/90 text-white px-5 h-9 font-mont text-xs ml-4">
              Audit gratuit
            </Button>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-1 text-white"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </header>
      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-brand-navy/95 backdrop-blur-xl pt-32 px-6"
          >
            <div className="flex flex-col items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-2xl font-mont font-medium text-white/80 hover:text-brand-orange transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <Button className="w-full max-w-xs mt-4 bg-brand-orange hover:bg-brand-orange/90 rounded-full h-12 text-lg">
                Audit gratuit
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
