import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Lightbulb,
  Globe,
  TrendingUp,
  Database,
  Workflow,
  Shield,
  Target,
  Users,
  Clock,
  Award,
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { CTASection } from "@/components/home/CTASection";

const servicesData: Record<
  string,
  {
    icon: typeof Lightbulb;
    title: string;
    subtitle: string;
    description: string;
    color: string;
    features: string[];
    benefits: { icon: typeof Target; title: string; description: string }[];
    useCases: { title: string; description: string }[];
  }
> = {
  "transformation-digitale": {
    icon: Lightbulb,
    title: "Transformation digitale & conseil",
    subtitle: "Définissez votre stratégie numérique",
    description:
      "Nous accompagnons les entreprises dans leur évolution numérique avec une approche sur-mesure. Notre méthodologie éprouvée vous permet d'identifier les opportunités de digitalisation et de mettre en place les solutions les plus adaptées à vos enjeux.",
    color: "from-blue-500 to-cyan-500",
    features: [
      "Audit complet de votre maturité digitale",
      "Définition d'une roadmap stratégique",
      "Identification des quick wins",
      "Accompagnement au changement",
      "Formation des équipes",
      "Suivi et optimisation continue",
    ],
    benefits: [
      {
        icon: Target,
        title: "Vision claire",
        description:
          "Une stratégie digitale alignée sur vos objectifs business",
      },
      {
        icon: Users,
        title: "Équipes engagées",
        description: "Formation et accompagnement de vos collaborateurs",
      },
      {
        icon: Clock,
        title: "Gain de temps",
        description: "Optimisation de vos processus et workflows",
      },
      {
        icon: Award,
        title: "Compétitivité",
        description: "Positionnement renforcé sur votre marché",
      },
    ],
    useCases: [
      {
        title: "PME industrielle",
        description:
          "Digitalisation des processus de production et mise en place d'un ERP sur-mesure. Résultat : +40% de productivité.",
      },
      {
        title: "Cabinet de conseil",
        description:
          "Transformation des méthodes de travail et adoption d'outils collaboratifs. Résultat : -30% de temps administratif.",
      },
    ],
  },
  "creation-site-web": {
    icon: Globe,
    title: "Création de site web & e-commerce",
    subtitle: "Des sites qui convertissent",
    description:
      "Nous concevons des sites web performants, esthétiques et optimisés pour la conversion. Notre approche UX-first garantit une expérience utilisateur optimale sur tous les devices.",
    color: "from-purple-500 to-pink-500",
    features: [
      "Design sur-mesure et responsive",
      "Optimisation SEO intégrée",
      "Performance et vitesse optimales",
      "CMS facile à gérer",
      "Intégration e-commerce",
      "Maintenance et évolution",
    ],
    benefits: [
      {
        icon: Target,
        title: "Conversion optimisée",
        description: "Des parcours utilisateurs pensés pour convertir",
      },
      {
        icon: Users,
        title: "Image de marque",
        description: "Un design qui reflète votre identité",
      },
      {
        icon: Clock,
        title: "Autonomie",
        description: "Gérez facilement votre contenu",
      },
      {
        icon: Award,
        title: "Visibilité",
        description: "Un référencement naturel optimisé",
      },
    ],
    useCases: [
      {
        title: "E-commerce mode",
        description:
          "Refonte complète avec nouvelle UX et optimisation conversion. Résultat : +85% de ventes en ligne.",
      },
      {
        title: "Site corporate B2B",
        description:
          "Création d'un site vitrine premium avec génération de leads. Résultat : +200% de demandes de contact.",
      },
    ],
  },
  "marketing-digital": {
    icon: TrendingUp,
    title: "Marketing digital",
    subtitle: "Boostez votre visibilité",
    description:
      "Nos experts en marketing digital élaborent des stratégies sur-mesure pour augmenter votre visibilité, générer des leads qualifiés et fidéliser vos clients.",
    color: "from-orange-500 to-red-500",
    features: [
      "SEO & référencement naturel",
      "Campagnes Google Ads & Social Ads",
      "Social media management",
      "Content marketing",
      "Email marketing automation",
      "Analytics et reporting",
    ],
    benefits: [
      {
        icon: Target,
        title: "ROI mesurable",
        description: "Des résultats concrets et mesurables",
      },
      {
        icon: Users,
        title: "Audience qualifiée",
        description: "Atteignez les bonnes personnes",
      },
      {
        icon: Clock,
        title: "Régularité",
        description: "Une présence digitale constante",
      },
      {
        icon: Award,
        title: "Notoriété",
        description: "Renforcez votre image de marque",
      },
    ],
    useCases: [
      {
        title: "Startup SaaS",
        description:
          "Stratégie inbound marketing et SEO. Résultat : 500% d'augmentation du trafic organique en 12 mois.",
      },
      {
        title: "Restaurant gastronomique",
        description:
          "Campagnes social media et influence. Résultat : Liste d'attente de 3 mois.",
      },
    ],
  },
  "crm-erp": {
    icon: Database,
    title: "CRM / ERP / Outils internes",
    subtitle: "Centralisez et optimisez",
    description:
      "Nous intégrons et personnalisons les meilleurs outils CRM et ERP du marché pour optimiser votre gestion commerciale, vos processus internes et votre relation client.",
    color: "from-green-500 to-emerald-500",
    features: [
      "Audit de vos besoins",
      "Intégration Salesforce, HubSpot, etc.",
      "Développement sur-mesure",
      "Migration de données",
      "Formation utilisateurs",
      "Support et maintenance",
    ],
    benefits: [
      {
        icon: Target,
        title: "Vue 360°",
        description: "Vision complète de vos clients et prospects",
      },
      {
        icon: Users,
        title: "Collaboration",
        description: "Équipes alignées et efficaces",
      },
      {
        icon: Clock,
        title: "Productivité",
        description: "Automatisation des tâches répétitives",
      },
      {
        icon: Award,
        title: "Décisions éclairées",
        description: "Données fiables et dashboards",
      },
    ],
    useCases: [
      {
        title: "Force de vente B2B",
        description:
          "Déploiement HubSpot CRM + automation. Résultat : +60% de productivité commerciale.",
      },
      {
        title: "Groupe de distribution",
        description:
          "ERP sur-mesure multi-sites. Résultat : -25% de coûts opérationnels.",
      },
    ],
  },
  automatisation: {
    icon: Workflow,
    title: "Automatisation & workflows",
    subtitle: "Gagnez du temps",
    description:
      "Automatisez vos tâches répétitives et créez des workflows intelligents pour gagner en productivité. Nous utilisons les meilleures technologies d'automatisation et d'IA.",
    color: "from-indigo-500 to-violet-500",
    features: [
      "Analyse des processus existants",
      "Automatisation Zapier, Make, n8n",
      "Scripts et intégrations personnalisées",
      "Chatbots et assistants IA",
      "RPA (Robotic Process Automation)",
      "Documentation et formation",
    ],
    benefits: [
      {
        icon: Target,
        title: "0 erreur",
        description: "Élimination des erreurs humaines",
      },
      {
        icon: Users,
        title: "Focus métier",
        description: "Équipes recentrées sur la valeur ajoutée",
      },
      {
        icon: Clock,
        title: "24/7",
        description: "Processus automatiques non-stop",
      },
      {
        icon: Award,
        title: "Scalabilité",
        description: "Croissance sans friction",
      },
    ],
    useCases: [
      {
        title: "Agence immobilière",
        description:
          "Automatisation du suivi leads et relances. Résultat : 15h/semaine économisées.",
      },
      {
        title: "E-commerce",
        description:
          "Gestion automatique des stocks et commandes. Résultat : 0 rupture de stock.",
      },
    ],
  },
  cybersecurite: {
    icon: Shield,
    title: "Cybersécurité & Support",
    subtitle: "Protégez votre entreprise",
    description:
      "La sécurité de vos données est primordiale. Nous vous accompagnons dans la mise en place d'une stratégie de cybersécurité robuste et d'un support technique réactif.",
    color: "from-slate-500 to-gray-600",
    features: [
      "Audit de sécurité complet",
      "Protection des données (RGPD)",
      "Plan de reprise d'activité (PRA)",
      "Surveillance et monitoring",
      "Support technique 24/7",
      "Formation sensibilisation",
    ],
    benefits: [
      {
        icon: Target,
        title: "Conformité",
        description: "Respect des normes et réglementations",
      },
      {
        icon: Users,
        title: "Confiance",
        description: "Clients et partenaires rassurés",
      },
      {
        icon: Clock,
        title: "Continuité",
        description: "Business sans interruption",
      },
      {
        icon: Award,
        title: "Réactivité",
        description: "Support technique disponible",
      },
    ],
    useCases: [
      {
        title: "Cabinet médical",
        description:
          "Mise en conformité RGPD et sécurisation des données patients. Résultat : 100% conformité.",
      },
      {
        title: "Groupe industriel",
        description:
          "Plan de continuité d'activité et monitoring 24/7. Résultat : 99.9% disponibilité.",
      },
    ],
  },
};

const ServiceDetail = () => {
  const { slug } = useParams();
  const service = servicesData[slug || ""];

  if (!service) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Service non trouvé</h1>
            <Button asChild>
              <Link to="/service">Voir tous les services</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const ServiceIcon = service.icon;

  return (
    <Layout>
      {/* Hero */}
      <section
        className={`pt-32 pb-20 bg-gradient-to-br ${service.color} relative overflow-hidden`}
      >
        <div className="absolute inset-0 bg-foreground/80" />
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to="/service"
              className="inline-flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground mb-8 transition-colors"
            >
              <ArrowLeft size={18} />
              Retour au service
            </Link>

            <div className="max-w-3xl">
              <div
                className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-8`}
              >
                <ServiceIcon className="text-primary-foreground" size={40} />
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-primary-foreground mb-4">
                {service.title}
              </h1>
              <p className="text-xl text-primary-foreground/80">
                {service.subtitle}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Description */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-6">
                Présentation du service
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                {service.description}
              </p>
              <Button variant="hero" size="lg" asChild>
                <Link to="/contact">
                  Demander un devis
                  <ArrowRight size={20} />
                </Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-xl font-semibold mb-6">Ce qui est inclus</h3>
              <div className="space-y-4">
                {service.features.map((feature, index) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-center gap-3 p-4 rounded-xl bg-muted"
                  >
                    <CheckCircle2 className="text-primary shrink-0" size={20} />
                    <span>{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">
              Les avantages pour votre entreprise
            </h2>
            <p className="text-muted-foreground">
              Découvrez les bénéfices concrets de notre accompagnement
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-card card-shadow"
              >
                <benefit.icon className="text-primary mb-4" size={32} />
                <h3 className="font-semibold mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">
              Exemples de réalisations
            </h2>
            <p className="text-muted-foreground">
              Des projets concrets avec des résultats mesurables
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {service.useCases.map((useCase, index) => (
              <motion.div
                key={useCase.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-8 rounded-3xl border border-border bg-card"
              >
                <h3 className="text-xl font-semibold mb-4">{useCase.title}</h3>
                <p className="text-muted-foreground">{useCase.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </Layout>
  );
};

export default ServiceDetail;
