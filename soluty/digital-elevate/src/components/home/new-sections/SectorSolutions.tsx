import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  ShoppingBag,
  Stethoscope,
  Briefcase,
  GraduationCap,
  UtensilsCrossed,
  Truck,
  Factory,
} from "lucide-react";
import { Link } from "react-router-dom";

const sectors = [
  {
    id: "immobilier",
    title: "Immobilier",
    description: "Solutions digitales pour agences et promoteurs.",
    icon: Building2,
  },
  {
    id: "e-commerce",
    title: "E-commerce",
    description: "Plateformes de vente haute performance.",
    icon: ShoppingBag,
  },
  {
    id: "sante",
    title: "Santé & Bien-être",
    description: "Digitalisation du parcours patient et médical.",
    icon: Stethoscope,
  },
  {
    id: "finance",
    title: "Finance & Tech",
    description: "Applications fintech robustes et sécurisées.",
    icon: Briefcase,
  },
  {
    id: "education",
    title: "Éducation",
    description: "E-learning et gestion d'établissements.",
    icon: GraduationCap,
  },
  {
    id: "hotellerie",
    title: "Hôtellerie",
    description: "Systèmes de réservation et guest experience.",
    icon: UtensilsCrossed,
  },
  {
    id: "logistique",
    title: "Logistique",
    description: "Optimisation de flux et gestion de flotte.",
    icon: Truck,
  },
  {
    id: "industrie",
    title: "Industrie",
    description: "IoT et digitalisation des processus usine.",
    icon: Factory,
  },
];

export function SectorSolutions() {
  return (
    <section
      className="py-32 bg-brand-navy text-white relative overflow-hidden"
      data-theme="dark"
    >
      {/* Subtle Blue Glow in background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-blue/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-brand-orange font-bold tracking-[0.2em] uppercase text-xs mb-4 block font-mont">
              Expertise Sectorielle
            </span>
            <h2 className="text-4xl md:text-6xl font-extrabold font-mont leading-tight uppercase">
              Solutions{" "}
              <span className="text-transparent bg-clip-text bg-white border-2 border-white/20 px-6 py-1 rounded-full mx-2 hidden md:inline-block">
                Digitales
              </span>{" "}
              <br />
              pour <span className="text-brand-orange">votre Secteur</span>
            </h2>
          </div>
          <Link
            to="/service"
            className="text-white/60 hover:text-white transition-colors border-b border-white/20 pb-1 text-sm font-bold uppercase tracking-widest font-mont"
          >
            Voir tous les services
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {sectors.map((sector, i) => (
            <motion.div
              key={sector.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              viewport={{ once: true }}
              className="group bg-white/5 backdrop-blur-sm border border-white/10 p-7 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 relative shadow-xl"
            >
              <div className="mb-6 flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-brand-orange/10 flex items-center justify-center text-brand-orange group-hover:bg-brand-orange group-hover:text-white transition-all duration-300">
                  <sector.icon size={24} />
                </div>
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-brand-orange group-hover:border-brand-orange transition-all transform group-hover:rotate-45">
                  <ArrowUpRight size={18} className="text-white" />
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-bold font-mont text-white group-hover:text-brand-orange transition-colors uppercase tracking-tight">
                  {sector.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed font-sans line-clamp-2">
                  {sector.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
