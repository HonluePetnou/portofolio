import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-hero-gradient p-12 md:p-16 lg:p-20"
        >
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary-foreground rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-foreground rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
          </div>

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/20 mb-8"
            >
              <Sparkles size={16} className="text-primary-foreground" />
              <span className="text-sm font-medium text-primary-foreground">
                Commencez dès aujourd'hui
              </span>
            </motion.div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
              Prêt à transformer votre entreprise ?
            </h2>

            <p className="text-primary-foreground/80 text-lg mb-10 max-w-2xl mx-auto">
              Discutons de votre projet et découvrons ensemble comment le
              digital peut booster votre croissance. Audit gratuit et sans
              engagement.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="secondary"
                size="xl"
                asChild
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
              >
                <Link to="/contact">
                  Demander un audit gratuit
                  <ArrowRight size={20} />
                </Link>
              </Button>
              <Button variant="heroOutline" size="xl" asChild>
                <Link to="/service">Découvrir nos services</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
