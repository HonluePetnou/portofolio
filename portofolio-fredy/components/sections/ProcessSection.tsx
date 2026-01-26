"use client";

import { motion } from "framer-motion";
import {
  Search,
  Lightbulb,
  PenTool,
  Rocket,
  MessageSquare,
  Monitor,
  BarChart3,
  Settings,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Immersion & Diagnostic",
    description: "L'Écoute, Audit & Briefing, Analyse de Marché.",
    icon: <Search className="w-6 h-6" />,
    color: "bg-blue-500",
  },
  {
    number: "02",
    title: "Stratégie & Idéation",
    description:
      "De la Vision à l'Excellence Stratégique (Conception, Architecture, Planification).",
    icon: <Lightbulb className="w-6 h-6" />,
    color: "bg-yellow-500",
  },
  {
    number: "03",
    title: "Création & Développement",
    description: "L'Exécution, Conception Agile.",
    icon: <PenTool className="w-6 h-6" />,
    color: "bg-green-500",
  },
  {
    number: "04",
    title: "Déploiement & Optimisation",
    description: "Mise en Ligne, Commentaires et améliorations.",
    icon: <Rocket className="w-6 h-6" />,
    color: "bg-purple-500",
  },
];

export function ProcessSection() {
  return (
    <section className="py-24 bg-gray-50 overflow-hidden" id="process">
      <div className="container mx-auto px-8 md:px-24 lg:px-40">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-secondary font-bold uppercase tracking-wider block mb-2">
            - Methodology
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            De la Vision à <span className="text-secondary">l'Excellence</span>
          </h2>
          <p className="text-gray-600 text-lg">
            Parce que chaque projet est unique, j'applique une méthode
            structurée en quatre étapes pour garantir des résultats performants.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative p-6 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all group"
            >
              {/* Connector Line (except for last item) */}
              {index !== steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-[2px] bg-gray-200 z-0" />
              )}

              <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center mb-4 group-hover:bg-secondary group-hover:text-primary transition-colors text-primary">
                {step.icon}
              </div>

              <div className="text-4xl font-bold text-gray-100 absolute top-4 right-4 group-hover:text-secondary/20 transition-colors">
                {step.number}
              </div>

              <h3 className="text-xl font-bold text-primary mb-3 relative z-10">
                {step.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed relative z-10">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Support Step */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-16 bg-primary rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden"
        >
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-secondary font-bold mb-4">
              <MessageSquare size={18} />
              <span>LIVRAISON FINALE & SUPPORT</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Un Accompagnement Continu
            </h3>
            <p className="max-w-2xl mx-auto text-gray-300">
              Mon travail ne s'arrête pas à la livraison. Je garantis un suivi
              pour assurer que votre solution continue de performer et d'évoluer
              avec votre entreprise.
            </p>
          </div>

          {/* Decorative Background */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        </motion.div>
      </div>
    </section>
  );
}
