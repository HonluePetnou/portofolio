import { Layout } from "@/components/layout/Layout";
import { useParams, Link } from "react-router-dom";
import {
  Building2,
  ShoppingBag,
  Briefcase,
  Factory,
  ArrowRight,
  XCircle,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const sectorData: Record<string, any> = {
  immobilier: {
    title: "Immobilier",
    icon: Building2,
    subtitle: "Digitalisez votre agence et captez plus de mandats.",
    problems: [
      "Sites obsolètes non responsive",
      "Gestion des leads chaotique",
      "Photos de mauvaise qualité",
      "Faible visibilité locale",
    ],
    solution:
      "Une plateforme immo tout-en-un : Site vitrine premium, visite virtuelle 3D, et automatisation de prise de RDV.",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1000&auto=format&fit=crop",
  },
  ecommerce: {
    title: "E-commerce",
    icon: ShoppingBag,
    subtitle: "Transformez vos visiteurs en clients fidèles.",
    problems: [
      "Taux de conversion bas",
      "Paniers abandonnés élevés",
      "Expérience mobile frustrante",
      "Manque de data tracking",
    ],
    solution:
      "Boutiques Shopify/WooCommerce haute performance, UX optimisée pour la conversion, et retargeting automatisé.",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?q=80&w=1000&auto=format&fit=crop",
  },
  // Default fallback
  generic: {
    title: "Solution Sectorielle",
    icon: Briefcase,
    subtitle: "Une approche sur-mesure pour votre industrie.",
    problems: [
      "Concurrence digitale accrue",
      "Outils inadaptés",
      "Perte de temps",
      "ROI faible",
    ],
    solution:
      "Analyse approfondie de votre métier pour déployer les leviers digitaux (Tech & Marketing) les plus pertinents.",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000&auto=format&fit=crop",
  },
};

const SectorDetail = () => {
  const { sector } = useParams();
  const data = sectorData[sector as string] || sectorData.generic;

  return (
    <Layout>
      {/* Hero */}
      <section className="relative pt-32 pb-24 bg-brand-navy overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <img
            src={data.image}
            alt={data.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/90 to-brand-navy/50 z-10" />

        <div className="container-custom relative z-20 text-white">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-orange/20 text-brand-orange border border-brand-orange/30 rounded-full font-bold mb-6 backdrop-blur-md">
            <data.icon size={18} />
            <span className="uppercase tracking-wider text-sm">
              Solution {data.title}
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold font-mont mb-6 max-w-4xl">
            {data.subtitle}
          </h1>
          <Button
            size="lg"
            className="bg-brand-orange hover:bg-brand-orange/90 text-white font-bold h-14 px-8 rounded-full"
            asChild
          >
            <Link to="/contact">Diagnostic {data.title} offert</Link>
          </Button>
        </div>
      </section>

      {/* Problems vs Solutions */}
      <section className="py-24 bg-white">
        <div className="container-custom grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold font-mont text-brand-navy mb-8">
              Pourquoi les approches classiques échouent
            </h2>
            <div className="space-y-4">
              {data.problems.map((prob: string, i: number) => (
                <div
                  key={i}
                  className="flex items-start gap-4 p-4 rounded-xl bg-red-50 text-red-800 border border-red-100"
                >
                  <XCircle className="shrink-0 mt-1" />
                  <span className="font-medium">{prob}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold font-mont text-brand-navy mb-8">
              L'Approche Soluty
            </h2>
            <div className="p-8 bg-brand-navy text-white rounded-3xl shadow-2xl">
              <p className="text-lg leading-relaxed mb-8 text-blue-100">
                {data.solution}
              </p>
              <div className="flex items-center gap-2 text-brand-orange font-bold uppercase tracking-wide">
                <CheckCircle /> Résultat Garanti
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-slate-50 text-center">
        <div className="container-custom">
          <h2 className="text-3xl font-bold font-mont text-brand-navy mb-8">
            Prêt à dominer le marché {data.title} ?
          </h2>
          <Button
            size="lg"
            className="bg-brand-blue text-white hover:bg-brand-blue/90 font-bold px-10 h-14 rounded-full"
            asChild
          >
            <Link to="/contact">
              Démarrer maintenant <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default SectorDetail;
