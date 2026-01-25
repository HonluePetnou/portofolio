import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import logoFull from "@/assets/logo-full.svg";

const navLinks = [
  { name: "Accueil", href: "/nav4" },
  { name: "Services", href: "/nav4" },
  { name: "Expertises", href: "/nav4" },
  { name: "À propos", href: "/nav4" },
  { name: "Carrières", href: "/nav4" },
  { name: "Contact", href: "/nav4" },
];

export function Navbar4() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center mix-blend-difference text-white">
        <Link to="/nav4" className="z-50">
          {/* Force white logo for mix-blend-difference effect context */}
          <img
            src={logoFull}
            alt="Soluty"
            className="h-10 w-auto brightness-0 invert"
          />
        </Link>

        {/* Minimal Menu Trigger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group z-50 flex items-center gap-3 focus:outline-none"
        >
          <span className="font-mont font-bold uppercase tracking-widest text-sm hidden md:block">
            {isOpen ? "Fermer" : "Menu"}
          </span>
          <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </div>
        </button>
      </header>

      {/* Full Screen Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ clipPath: "circle(0% at 100% 0%)" }}
            animate={{ clipPath: "circle(150% at 100% 0%)" }}
            exit={{ clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 bg-brand-navy flex items-center justify-center"
          >
            <div className="container mx-auto px-6 grid md:grid-cols-2 gap-20">
              <div className="hidden md:block space-y-8 self-end pb-20">
                <h3 className="text-white/40 font-mont uppercase tracking-widest">
                  Contact
                </h3>
                <p className="text-white text-xl font-light">
                  hello@soluty.agency
                  <br />
                  +33 1 23 45 67 89
                </p>
                <p className="text-white text-xl font-light">
                  12 Avenue des Champs
                  <br />
                  75008 Paris, France
                </p>
              </div>

              <nav className="flex flex-col space-y-4">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * i, duration: 0.5 }}
                  >
                    <Link
                      to={link.href}
                      className="group flex items-center gap-4 text-4xl md:text-6xl font-mont font-bold text-white hover:text-outline-orange transition-all"
                    >
                      <span className="text-sm font-light text-brand-blue opacity-0 group-hover:opacity-100 transition-opacity">
                        0{i + 1}
                      </span>
                      {link.name}
                      <ArrowUpRight className="opacity-0 group-hover:opacity-100 transition-opacity text-brand-orange h-12 w-12" />
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
