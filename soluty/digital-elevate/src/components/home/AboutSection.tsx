import { motion } from "framer-motion";
import { CheckCircle2, Users, Award, Target } from "lucide-react";

const features = [
  "Expertise reconnue en transformation digitale",
  "Approche personnalisée et sur-mesure",
  "Équipe de 30+ experts certifiés",
  "Accompagnement de A à Z",
];

const highlights = [
  {
    icon: Users,
    value: "30+",
    label: "Experts dédiés",
  },
  {
    icon: Award,
    value: "15+",
    label: "Certifications",
  },
  {
    icon: Target,
    value: "100%",
    label: "Sur-mesure",
  },
];

export function AboutSection() {
  return (
    <section className="section-padding bg-surface-muted">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Image/Visual */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden">
              <div className="aspect-[4/3] bg-gradient-to-br from-primary/10 to-accent/10 p-8">
                <div className="w-full h-full rounded-2xl bg-card shadow-lg flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-20 h-20 mx-auto rounded-2xl bg-hero-gradient flex items-center justify-center">
                      <Users className="text-primary-foreground" size={40} />
                    </div>
                    <h3 className="text-2xl font-bold">Notre équipe</h3>
                    <p className="text-muted-foreground">Passionnés par le digital</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="absolute -bottom-6 -right-6 bg-card rounded-2xl shadow-xl p-6 max-w-xs"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Award className="text-primary" size={24} />
                </div>
                <div>
                  <div className="text-2xl font-bold">12 ans</div>
                  <div className="text-sm text-muted-foreground">d'expertise</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <span className="text-primary font-semibold">Qui sommes-nous ?</span>
              <h2 className="text-3xl sm:text-4xl font-bold">
                Une agence digitale qui{" "}
                <span className="text-gradient">comprend vos enjeux</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Depuis plus de 12 ans, nous accompagnons les entreprises de toutes tailles 
                dans leur transformation numérique. Notre mission : rendre le digital accessible, 
                performant et générateur de valeur pour votre activité.
              </p>
            </div>

            {/* Features list */}
            <div className="space-y-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2 className="text-primary shrink-0" size={20} />
                  <span className="text-foreground">{feature}</span>
                </motion.div>
              ))}
            </div>

            {/* Highlights */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              {highlights.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="text-center p-4 rounded-2xl bg-card shadow-sm"
                >
                  <item.icon className="mx-auto text-primary mb-2" size={24} />
                  <div className="text-2xl font-bold">{item.value}</div>
                  <div className="text-xs text-muted-foreground">{item.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
