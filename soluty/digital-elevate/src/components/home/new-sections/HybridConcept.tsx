import { motion } from "framer-motion";
import { Palette, Code2, Rocket, Shield, Zap } from "lucide-react";

export function HybridConcept() {
  const cards = [
    {
      title: "Marketing & Communication",
      description:
        "Stratégies d'acquisition data-driven pour une croissance exponentielle.",
      icon: Rocket,
      bgColor: "bg-brand-orange",
      colSpan: "md:col-span-2",
    },
    {
      title: "Design UI/UX",
      description:
        "Interfaces immersives qui convertissent les visiteurs en clients.",
      icon: Palette,
      bgColor: "bg-brand-blue",
      colSpan: "md:col-span-1",
    },
    {
      title: "Développement (MERN Stack)",
      description:
        "Architecture robuste et scalable pour des produits performants.",
      icon: Code2,
      bgColor: "bg-brand-navy",
      colSpan: "md:col-span-2",
    },
    {
      title: "Sécurité Informatique",
      description:
        "Protection avancée de vos données et conformité aux normes.",
      icon: Shield,
      bgColor: "bg-brand-blue",
      colSpan: "md:col-span-1",
    },
    {
      title: "Automatisation",
      description: "Workflows intelligents pour optimiser votre productivité.",
      icon: Zap,
      bgColor: "bg-brand-orange",
      colSpan: "md:col-span-3",
    },
  ];

  return (
    <section className="py-24 bg-slate-50" data-theme="light">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold font-mont text-brand-navy mb-6">
            L'Approche <span className="text-brand-orange">Hybride</span> 360°
          </h2>
          <p className="text-lg text-slate-600">
            Nous fusionnons créativité, technologie et stratégie pour créer un
            écosystème de croissance unique. Une synergie parfaite pour dominer
            votre marché.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className={`group relative overflow-hidden rounded-3xl p-8 hover:shadow-2xl transition-all duration-300 ${card.colSpan}`}
            >
              {/* Background with brand color */}
              <div
                className={`absolute inset-0 ${card.bgColor} opacity-5 group-hover:opacity-10 transition-opacity`}
              />

              <div className="relative z-10">
                <div
                  className={`w-14 h-14 rounded-2xl ${card.bgColor} flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 transition-transform`}
                >
                  <card.icon size={28} />
                </div>
                <h3 className="text-2xl font-bold text-brand-navy mb-4 font-mont">
                  {card.title}
                </h3>
                <p className="text-slate-600 leading-relaxed font-medium">
                  {card.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
