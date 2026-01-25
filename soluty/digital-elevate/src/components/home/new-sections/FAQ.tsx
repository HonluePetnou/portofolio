import { motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Quels sont vos délais de livraison ?",
      answer:
        "Les délais varient selon la complexité du projet. En moyenne, un site vitrine prend 2-3 semaines, une application web 6-8 semaines, et une stratégie marketing complète 4-6 semaines. Nous vous fournissons un planning détaillé dès le début.",
    },
    {
      question: "Proposez-vous un accompagnement après la livraison ?",
      answer:
        "Absolument ! Nous offrons une maintenance continue, des mises à jour régulières, et un support technique réactif. Chaque projet inclut une période de garantie et nous proposons des contrats de maintenance adaptés à vos besoins.",
    },
    {
      question: "Comment se déroule le processus de collaboration ?",
      answer:
        "Nous commençons par un diagnostic gratuit de 7 jours pour comprendre vos besoins. Ensuite, nous définissons ensemble une roadmap claire avec des jalons précis. Vous avez un accès direct à notre équipe via Slack/WhatsApp et des points hebdomadaires.",
    },
    {
      question: "Quels sont vos tarifs ?",
      answer:
        "Nos tarifs sont adaptés à chaque projet. Un site vitrine commence à partir de 2000€, une application web à partir de 8000€, et nos services marketing sont facturés mensuellement à partir de 1500€. Contactez-nous pour un devis personnalisé gratuit.",
    },
    {
      question: "Travaillez-vous avec des startups et PME ?",
      answer:
        "Oui ! Nous accompagnons aussi bien les startups en phase de lancement que les PME établies. Nous adaptons nos solutions et nos tarifs à votre stade de développement et proposons des options de paiement flexibles.",
    },
    {
      question: "Quelles technologies utilisez-vous ?",
      answer:
        "Nous utilisons les technologies les plus performantes du marché : React, Next.js, Node.js pour le développement, Figma pour le design, et des outils marketing avancés comme Google Ads, Meta Ads, et des plateformes d'automation (Make, Zapier).",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-brand-navy text-white" data-theme="dark">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-brand-orange font-bold tracking-wider uppercase text-sm"
            >
              FAQ
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-extrabold font-mont text-white mt-4 mb-6"
            >
              Questions Fréquentes
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-blue-100 text-lg"
            >
              Tout ce que vous devez savoir sur nos services et notre façon de
              travailler.
            </motion.p>
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-white/10 transition-colors"
                >
                  <span className="text-lg font-bold text-white pr-8">
                    {faq.question}
                  </span>
                  <div
                    className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      openIndex === index
                        ? "bg-brand-orange text-white"
                        : "bg-white/20 text-white"
                    }`}
                  >
                    {openIndex === index ? (
                      <Minus size={20} />
                    ) : (
                      <Plus size={20} />
                    )}
                  </div>
                </button>

                <motion.div
                  initial={false}
                  animate={{
                    height: openIndex === index ? "auto" : 0,
                    opacity: openIndex === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-8 pb-6 pt-2">
                    <p className="text-blue-100 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <p className="text-blue-100 mb-4">Vous avez d'autres questions ?</p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-brand-orange text-white rounded-full font-bold hover:bg-brand-orange/90 transition-colors shadow-lg hover:shadow-xl"
            >
              Contactez-nous
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
