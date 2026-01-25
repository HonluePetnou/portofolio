import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export function SocialProof() {
  const sectors = ["Startups", "PME & ETI", "Grands Comptes"];
  const metrics = [
    { value: "50+", label: "Clients accompagnés" },
    { value: "120%", label: "Croissance moyenne" },
    { value: "98%", label: "Taux de rétention" },
  ];

  return (
    <section
      className="py-20 bg-brand-navy border-b border-white/5 relative overflow-hidden"
      data-theme="dark"
    >
      <div className="absolute inset-0 bg-brand-blue/5 pointer-events-none" />
      <div className="container-custom relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left: Sectors */}
        <div className="space-y-6">
          <h2 className="text-3xl font-mont font-bold text-white uppercase tracking-wide">
            Ils nous font confiance
          </h2>
          <div className="flex flex-wrap gap-4">
            {sectors.map((sector, i) => (
              <motion.div
                key={sector}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm"
              >
                <CheckCircle2 className="text-brand-orange w-5 h-5" />
                <span className="text-white font-medium">{sector}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right: Metrics */}
        <div className="grid grid-cols-3 gap-8 border-l border-white/10 pl-8 md:pl-12">
          {metrics.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl font-bold text-brand-orange mb-2 font-mont">
                {item.value}
              </div>
              <div className="text-sm text-slate-400 uppercase tracking-wider font-medium">
                {item.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
