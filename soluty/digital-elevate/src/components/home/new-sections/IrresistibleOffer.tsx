import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight, Timer } from "lucide-react";
import { Link } from "react-router-dom";

export function IrresistibleOffer() {
  const benefits = [
    "Audit technique complet de votre présence actuelle",
    "Analyse concurrentielle de votre marché",
    "Roadmap stratégique sur-mesure",
    "Plan d'action prioritaire pour 30 jours",
  ];

  return (
    <section className="py-24 bg-brand-navy relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]" />

      <div className="container-custom relative z-10">
        <div className="bg-gradient-to-br from-brand-blue to-indigo-900 rounded-[2.5rem] p-8 md:p-16 shadow-2xl relative overflow-hidden border border-white/10">
          <div className="absolute top-0 right-0 bg-brand-orange text-white text-sm font-bold px-6 py-2 rounded-bl-2xl uppercase tracking-wider">
            Offre Limitée - 5 places / mois
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white font-medium border border-white/20">
                <Timer className="w-4 h-4 text-brand-orange" />
                <span>Valeur estimée : 1 500€</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-extrabold text-white font-mont leading-tight">
                Votre Diagnostic Digital <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-amber-400">
                  Offert pendant 7 jours
                </span>
              </h2>

              <p className="text-lg text-blue-100 leading-relaxed">
                Pourquoi gratuit ? Nous croyons en la preuve par la valeur.
                Testez notre expertise sans risque avant de vous engager. Si
                nous ne trouvons pas au moins 3 leviers de croissance, vous ne
                nous devez rien.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  size="lg"
                  className="bg-brand-orange hover:bg-brand-orange/90 text-white rounded-full px-8 h-14 text-lg font-mont shadow-lg shadow-brand-orange/20"
                  asChild
                >
                  <Link to="/contact">
                    Réserver mon créneau
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <div className="flex items-center gap-2 text-sm text-blue-200 px-4">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  2 places restantes cette semaine
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Check className="text-brand-orange" />
                Ce que vous obtenez :
              </h3>
              <ul className="space-y-4">
                {benefits.map((benefit, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-3 p-4 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-colors"
                  >
                    <div className="min-w-6 h-6 rounded-full bg-brand-blue flex items-center justify-center mt-0.5">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-blue-50 font-medium">{benefit}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
