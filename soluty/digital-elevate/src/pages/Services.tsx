import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  Lightbulb, 
  Globe, 
  TrendingUp, 
  Database, 
  Workflow, 
  Shield,
  CheckCircle2
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { CTASection } from "@/components/home/CTASection";

const services = [
  {
    icon: Lightbulb,
    title: "Transformation digitale & conseil",
    description: "Définissez une stratégie numérique claire et efficace pour votre entreprise. Nous analysons vos processus et identifions les opportunités de digitalisation.",
    href: "/services/transformation-digitale",
    color: "from-blue-500 to-cyan-500",
    features: ["Audit digital complet", "Roadmap stratégique", "Accompagnement au changement", "Formation des équipes"],
  },
  {
    icon: Globe,
    title: "Création de site web & e-commerce",
    description: "Des sites performants et esthétiques qui convertissent vos visiteurs en clients. Design responsive, UX optimisée et référencement naturel intégré.",
    href: "/services/creation-site-web",
    color: "from-purple-500 to-pink-500",
    features: ["Sites vitrine & corporate", "E-commerce sur-mesure", "Applications web", "Maintenance & évolution"],
  },
  {
    icon: TrendingUp,
    title: "Marketing digital",
    description: "Augmentez votre visibilité et générez des leads qualifiés avec nos stratégies marketing digitales performantes.",
    href: "/services/marketing-digital",
    color: "from-orange-500 to-red-500",
    features: ["SEO & SEA", "Social media marketing", "Email marketing", "Content marketing"],
  },
  {
    icon: Database,
    title: "CRM / ERP / Outils internes",
    description: "Centralisez vos données et optimisez vos processus avec des outils adaptés à votre organisation.",
    href: "/services/crm-erp",
    color: "from-green-500 to-emerald-500",
    features: ["Intégration Salesforce, HubSpot", "ERP sur-mesure", "Tableaux de bord", "Intégrations API"],
  },
  {
    icon: Workflow,
    title: "Automatisation & workflows",
    description: "Automatisez les tâches répétitives et gagnez en productivité avec des workflows intelligents.",
    href: "/services/automatisation",
    color: "from-indigo-500 to-violet-500",
    features: ["Zapier, Make, n8n", "Scripts personnalisés", "Chatbots & IA", "RPA"],
  },
  {
    icon: Shield,
    title: "Cybersécurité & Support",
    description: "Protégez vos données et assurez la continuité de vos opérations avec notre équipe d'experts.",
    href: "/services/cybersecurite",
    color: "from-slate-500 to-gray-600",
    features: ["Audit sécurité", "Protection des données", "Support technique 24/7", "Plan de continuité"],
  },
];

const Services = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="text-primary font-semibold">Nos services</span>
            <h1 className="text-4xl sm:text-5xl font-bold mt-4 mb-6">
              Des solutions digitales pour{" "}
              <span className="text-gradient">chaque besoin</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Découvrez notre gamme complète de services pour accompagner votre transformation 
              digitale et booster votre croissance.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services List */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="space-y-12">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`grid lg:grid-cols-2 gap-8 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className={`space-y-6 ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center`}>
                    <service.icon className="text-primary-foreground" size={32} />
                  </div>
                  <h2 className="text-3xl font-bold">{service.title}</h2>
                  <p className="text-muted-foreground text-lg">{service.description}</p>
                  
                  <div className="grid sm:grid-cols-2 gap-3">
                    {service.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2">
                        <CheckCircle2 className="text-primary shrink-0" size={18} />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button variant="default" asChild>
                    <Link to={service.href}>
                      En savoir plus
                      <ArrowRight size={18} />
                    </Link>
                  </Button>
                </div>

                <div className={`${index % 2 === 1 ? "lg:order-1" : ""}`}>
                  <div className={`aspect-[4/3] rounded-3xl bg-gradient-to-br ${service.color} p-1`}>
                    <div className="w-full h-full rounded-[22px] bg-card flex items-center justify-center">
                      <service.icon className="text-muted-foreground/20" size={120} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </Layout>
  );
};

export default Services;
