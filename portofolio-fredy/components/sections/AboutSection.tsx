"use client";

import { motion } from "framer-motion";
import { Download, ChevronsRight } from "lucide-react";

export function AboutSection() {
  return (
    <section className="bg-primary py-32 text-white overflow-hidden" id="about">
      <div className="container mx-auto px-8 md:px-24 lg:px-40">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left Content - Bio */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div>
              <span className="text-secondary font-medium uppercase tracking-wider mb-2 block">
                - À Propos
              </span>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                Architecte de <span className="text-secondary">Solutions</span>
              </h2>
            </div>

            <div className="space-y-4 text-gray-300 leading-relaxed text-lg">
              <p>
                Mon approche est celle d’un{" "}
                <strong className="text-white">Lead Creative Strategist</strong>{" "}
                qui refuse le hasard : chaque concept créatif que je déploie est
                une réponse directe à un défi business, de la création à la
                croissance d’entreprise.
              </p>
              <p>
                Plus qu'un créatif, je me définis comme un architecte de
                solutions technologiques innovantes. La différence réside dans
                ma capacité à parler le langage des ingénieurs (code), des
                créatifs (design) et des managers (stratégie).
              </p>
              <p>
                J'aide les Micro-entreprises, PME et les entrepreneurs ambitieux
                à transformer leur présence digitale en un véritable moteur
                d’impact et de croissance durable.
              </p>
              <p className="italic text-secondary/80 border-l-4 border-secondary pl-4">
                "Maîtriser un outil n'est qu'une étape ; savoir l'utiliser pour
                générer de la valeur est ma priorité."
              </p>
            </div>

            <div className="pt-6">
              <button className="flex items-center gap-2 border border-secondary text-secondary px-8 py-3 rounded-full hover:bg-secondary hover:text-primary transition-all font-semibold">
                Download CV <Download size={18} />
              </button>
            </div>
          </motion.div>

          {/* Right Content - Timeline/Resume */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 rounded-3xl p-8 border border-white/10"
          >
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <span className="bg-secondary w-8 h-1 rounded-full block"></span>
              Parcours & Éducation
            </h3>

            <div className="space-y-8">
              {/* 2026 */}
              <div className="relative pl-8 border-l border-white/20">
                <div className="absolute -left-1.5 top-1.5 w-3 h-3 bg-secondary rounded-full shadow-[0_0_10px_rgba(252,163,17,0.5)]"></div>
                <span className="text-secondary font-mono text-sm">2026</span>
                <h4 className="text-xl font-bold mt-1">
                  Analyste des Affaires & TI
                </h4>
                <p className="text-gray-400 text-sm">
                  Yaoundé Higher School of Economics and Management (YSEM)
                </p>
              </div>

              {/* 2025 */}
              <div className="relative pl-8 border-l border-white/20">
                <div className="absolute -left-1.5 top-1.5 w-3 h-3 bg-secondary rounded-full"></div>
                <span className="text-secondary font-mono text-sm">2025</span>
                <h4 className="text-xl font-bold mt-1">Economie & Gestion</h4>
                <p className="text-gray-400 text-sm">
                  Yaoundé Higher School of Economics and Management (YSEM)
                </p>
                <div className="mt-2 text-sm text-gray-300 bg-white/5 p-3 rounded-lg">
                  <strong>Freelance & Entrepreneur Digital</strong>
                  <br />
                  Prestataire de service (NOFIA SA, SOLUTY, FUNIFY)
                </div>
              </div>

              {/* 2024 */}
              <div className="relative pl-8 border-l border-white/20">
                <div className="absolute -left-1.5 top-1.5 w-3 h-3 bg-white/50 rounded-full"></div>
                <span className="text-secondary font-mono text-sm">2024</span>
                <h4 className="text-xl font-bold mt-1">
                  Freelance Marketing Numérique
                </h4>
                <p className="text-gray-400 text-sm">
                  Design Graphique & Stratégie
                </p>
              </div>

              {/* 2023 */}
              <div className="relative pl-8 border-l border-white/20">
                <div className="absolute -left-1.5 top-1.5 w-3 h-3 bg-white/50 rounded-full"></div>
                <span className="text-secondary font-mono text-sm">2023</span>
                <h4 className="text-xl font-bold mt-1">Baccalauréat D</h4>
                <p className="text-gray-400 text-sm">
                  Lycée Classique de Bangangté
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  Designer Indépendant & Prestataire
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
