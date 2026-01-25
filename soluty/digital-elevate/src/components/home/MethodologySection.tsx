import { motion } from "framer-motion";
import { Search, Compass, Rocket, BarChart3 } from "lucide-react";

const steps = [
  {
    icon: Search,
    number: "01",
    title: "Audit",
    description: "Analyse approfondie de votre situation actuelle et identification des opportunités.",
  },
  {
    icon: Compass,
    number: "02",
    title: "Stratégie",
    description: "Élaboration d'une feuille de route personnalisée avec des objectifs clairs.",
  },
  {
    icon: Rocket,
    number: "03",
    title: "Mise en place",
    description: "Déploiement des solutions avec un accompagnement continu de notre équipe.",
  },
  {
    icon: BarChart3,
    number: "04",
    title: "Suivi",
    description: "Mesure des résultats et optimisation continue pour maximiser votre ROI.",
  },
];

export function MethodologySection() {
  return (
    <section className="section-padding bg-foreground text-background overflow-hidden">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary font-semibold">Notre méthodologie</span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-4 mb-6">
            Un processus éprouvé en{" "}
            <span className="text-primary">4 étapes</span>
          </h2>
          <p className="text-background/70 text-lg">
            Notre approche structurée garantit des résultats concrets et mesurables 
            pour votre transformation digitale.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-background/20 -translate-y-1/2" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative"
              >
                <div className="relative z-10 bg-background/5 backdrop-blur-sm border border-background/10 rounded-3xl p-8 hover:bg-background/10 transition-colors duration-300">
                  {/* Number badge */}
                  <div className="absolute -top-4 left-8 px-4 py-1 bg-hero-gradient rounded-full">
                    <span className="text-sm font-bold text-primary-foreground">{step.number}</span>
                  </div>
                  
                  <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mb-6 mt-4">
                    <step.icon className="text-primary" size={32} />
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-background/70">{step.description}</p>
                </div>

                {/* Connector dot for desktop */}
                <div className="hidden lg:flex absolute top-1/2 -right-4 w-8 h-8 rounded-full bg-primary items-center justify-center z-20 translate-x-1/2 -translate-y-1/2">
                  <div className="w-3 h-3 rounded-full bg-background" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
