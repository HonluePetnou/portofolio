import { Layout } from "@/components/layout/Layout";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, BarChart3, Rocket, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FinalCTA } from "@/components/home/new-sections/FinalCTA";

const ProjectDetail = () => {
  const { id } = useParams();

  // In a real app, fetch data based on ID
  const project = {
    title: "Redesign Complet SaaS TechFlow",
    client: "TechFlow",
    sector: "SaaS B2B",
    description:
      "Comment nous avons transformé une plateforme vieillissante en leader du marché grâce à une UX repensée et une architecture React modernisée.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
    problem:
      "TechFlow perdait des parts de marché à cause d'une interface complexe et d'un temps de chargement lent. Le taux de churn augmentait dangereusement.",
    strategy:
      "Audit complet de l'expérience utilisateur suivi d'une refonte de l'interface (Design System) et d'une migration vers une architecture SPA React optimisée.",
    execution: [
      "Audit UX & User Research",
      "Création d'un Design System atomique",
      "Refonte Front-end (React + Tailwind)",
      "Optimisation des performances (Core Web Vitals)",
    ],
    results: [
      { value: "+150%", label: "Augmentation des Leads" },
      { value: "-40%", label: "Taux de Churn" },
      { value: "0.8s", label: "Temps de chargement" },
    ],
  };

  return (
    <Layout>
      {/* Cover */}
      <div className="relative h-[60vh] min-h-[500px]">
        <img
          src={project.image}
          alt="Cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-brand-navy/80" />
        <div className="absolute inset-0 flex items-center">
          <div className="container-custom text-white">
            <Link
              to="/realisations"
              className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-8 transition-colors"
            >
              <ArrowLeft size={20} /> Retour aux réalisations
            </Link>
            <span className="block text-brand-orange font-bold uppercase tracking-wider mb-4">
              {project.sector} • {project.client}
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold font-mont mb-6 max-w-4xl">
              {project.title}
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl">
              {project.description}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-16">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-16">
              {/* Challenge */}
              <div>
                <h2 className="text-3xl font-bold font-mont text-brand-navy mb-6 flex items-center gap-3">
                  <span className="bg-red-100 text-red-600 p-2 rounded-lg">
                    <BarChart3 size={24} />
                  </span>
                  Le Problème
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed bg-red-50 p-8 rounded-2xl border border-red-100">
                  {project.problem}
                </p>
              </div>

              {/* Strategy */}
              <div>
                <h2 className="text-3xl font-bold font-mont text-brand-navy mb-6 flex items-center gap-3">
                  <span className="bg-blue-100 text-brand-blue p-2 rounded-lg">
                    <Cpu size={24} />
                  </span>
                  Notre Stratégie
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed mb-8">
                  {project.strategy}
                </p>

                <div className="grid sm:grid-cols-2 gap-4">
                  {project.execution.map((step, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100"
                    >
                      <CheckCircle2 className="text-brand-orange shrink-0" />
                      <span className="font-medium text-brand-navy">
                        {step}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar Results */}
            <div className="lg:col-span-1">
              <div className="sticky top-32 bg-brand-navy text-white rounded-3xl p-8 shadow-2xl">
                <h3 className="text-xl font-bold font-mont mb-8 flex items-center gap-2">
                  <Rocket className="text-brand-orange" />
                  Résultats Clés
                </h3>
                <div className="space-y-8">
                  {project.results.map((res, i) => (
                    <div
                      key={i}
                      className="border-b border-white/10 pb-6 last:border-0 last:pb-0"
                    >
                      <div className="text-4xl font-extrabold text-brand-orange mb-1">
                        {res.value}
                      </div>
                      <div className="text-blue-200 text-sm font-medium uppercase tracking-wider">
                        {res.label}
                      </div>
                    </div>
                  ))}
                </div>
                <Button
                  className="w-full mt-10 bg-white text-brand-navy hover:bg-blue-50 font-bold h-12"
                  asChild
                >
                  <Link to="/contact">Je veux les mêmes résultats</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FinalCTA />
    </Layout>
  );
};

export default ProjectDetail;
