import { Link } from "react-router-dom";
import {
  Instagram,
  Linkedin,
  Twitter,
  MapPin,
  Mail,
  Phone,
} from "lucide-react";
import logoFull from "@/assets/logo-full.svg";

export function Footer() {
  return (
    <footer className="bg-gray-950 text-white pt-20 pb-10 border-t border-white/5">
      <div className="container-custom">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Brand & Slogan */}
          <div className="md:col-span-1 space-y-6">
            <Link to="/" className="flex items-center">
              <img
                src={logoFull}
                alt="Soluty"
                className="h-10 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-2xl font-mont font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-white">
              We Grow Your Business.
            </p>
            <p className="text-white/60 text-sm leading-relaxed">
              L'agence digitale qui transforme vos ambitions en résultats
              mesurables. Performance, Créativité, Technologie.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-blue transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-blue transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-blue transition-colors"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-mont font-bold text-lg mb-6 text-brand-orange">
              Agence
            </h4>
            <ul className="space-y-4 text-white/70">
              <li>
                <Link
                  to="/a-propos"
                  className="hover:text-white transition-colors"
                >
                  À propos
                </Link>
              </li>
              <li>
                <Link
                  to="/service"
                  className="hover:text-white transition-colors"
                >
                  Service
                </Link>
              </li>
              <li>
                <Link
                  to="/realisations"
                  className="hover:text-white transition-colors"
                >
                  Réalisations
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-white transition-colors">
                  Blog & Insights
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-white transition-colors"
                >
                  Carrières
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-mont font-bold text-lg mb-6 text-brand-orange">
              Expertises
            </h4>
            <ul className="space-y-4 text-white/70">
              <li>
                <Link
                  to="/service/marketing"
                  className="hover:text-white transition-colors"
                >
                  Marketing Digital
                </Link>
              </li>
              <li>
                <Link
                  to="/service/development"
                  className="hover:text-white transition-colors"
                >
                  Développement Web
                </Link>
              </li>
              <li>
                <Link
                  to="/service/design"
                  className="hover:text-white transition-colors"
                >
                  UI/UX Design
                </Link>
              </li>
              <li>
                <Link
                  to="/service/consulting"
                  className="hover:text-white transition-colors"
                >
                  Audit & Conseil
                </Link>
              </li>
              <li>
                <Link
                  to="/service/seo"
                  className="hover:text-white transition-colors"
                >
                  SEO / SEA
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-mont font-bold text-lg mb-6 text-brand-orange">
              Contact
            </h4>
            <ul className="space-y-4 text-white/70">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-brand-blue shrink-0 mt-1" />
                <span>
                  12 Avenue des Champs
                  <br />
                  75008 Paris, France
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} className="text-brand-blue shrink-0" />
                <span>+33 1 23 45 67 89</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="text-brand-blue shrink-0" />
                <span>hello@soluty.agency</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/40">
          <p>© 2024 Soluty Agency. Tous droits réservés.</p>
          <div className="flex items-center gap-6">
            <Link to="/legal" className="hover:text-white">
              Mentions Légales
            </Link>
            <Link to="/privacy" className="hover:text-white">
              Politique de Confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
