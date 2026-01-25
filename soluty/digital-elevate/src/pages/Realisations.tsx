import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Filter, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

// Mock Data
const projects = [
  {
    id: "techflow-saas",
    title: "TechFlow SaaS Redesign",
    client: "TechFlow",
    sector: "SaaS B2B",
    type: "Développement",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
    result: "+150% Leads",
    tags: ["React", "UX/UI"],
  },
  {
    id: "luxemaison-ecommerce",
    title: "LuxeMaison 3D Experience",
    client: "LuxeMaison",
    sector: "E-commerce",
    type: "Design",
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
    result: "Tx Conv. x3",
    tags: ["3D", "Shopify"],
  },
  {
    id: "immo-prestige",
    title: "ImmoPrestige Platform",
    client: "ImmoPrestige",
    sector: "Immobilier",
    type: "Développement",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1000&auto=format&fit=crop",
    result: "-40% Gestion",
    tags: ["MERN", "Automation"],
  },
  {
    id: "biofarm-branding",
    title: "BioFarm Rebranding",
    client: "BioFarm",
    sector: "Agro / PME",
    type: "Marketing",
    image:
      "https://images.unsplash.com/photo-1625246333195-24d2050f031b?q=80&w=1000&auto=format&fit=crop",
    result: "+200% Notoriété",
    tags: ["Branding", "Social Ads"],
  },
  {
    id: "datasync-saas",
    title: "DataSync Optimization",
    client: "DataSync",
    sector: "SaaS B2B",
    type: "Développement",
    image:
      "https://images.unsplash.com/photo-1551288049-bbbda5366991?q=80&w=2070&auto=format&fit=crop",
    result: "3x Rapide",
    tags: ["Big Data", "Cloud"],
  },
  {
    id: "fashionhub-shop",
    title: "FashionHub Headless",
    client: "FashionHub",
    sector: "E-commerce",
    type: "Développement",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop",
    result: "+120% Ventes",
    tags: ["Next.js", "Shopify"],
  },
  {
    id: "smartlisting-prop",
    title: "SmartListing AI",
    client: "SmartListing",
    sector: "Immobilier",
    type: "Design",
    image:
      "https://images.unsplash.com/photo-1554469384-e58fac16e23a?q=80&w=1000&auto=format&fit=crop",
    result: "95% Croissance",
    tags: ["AI", "UI/UX"],
  },
  {
    id: "ecogarden-pme",
    title: "EcoGarden Automation",
    client: "EcoGarden",
    sector: "Agro / PME",
    type: "Marketing",
    image:
      "https://images.unsplash.com/photo-1523301343968-6a6ebf63c674?q=80&w=2070&auto=format&fit=crop",
    result: "x2 Efficacité",
    tags: ["Growth", "SEO"],
  },
];

const sectors = ["Tous", "SaaS B2B", "E-commerce", "Immobilier", "Agro / PME"];
const types = ["Tous", "Développement", "Design", "Marketing"];

const Realisations = () => {
  const [activeSector, setActiveSector] = useState("Tous");
  const [activeType, setActiveType] = useState("Tous");

  const filteredProjects = projects.filter((project) => {
    const sectorMatch =
      activeSector === "Tous" || project.sector === activeSector;
    const typeMatch = activeType === "Tous" || project.type === activeType;
    return sectorMatch && typeMatch;
  });

  return (
    <Layout>
      {/* Hero Section - Styled like Expertise/Image header */}
      <section
        className="relative pt-44 pb-32 bg-brand-navy overflow-hidden"
        data-theme="dark"
      >
        {/* Background Image / Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop"
            alt="Office space"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/90 to-transparent" />
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-6 bg-brand-orange" />
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-blue-200/60">
                OUR CASE STUDIES
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold font-mont text-white leading-tight mb-8">
              Nos <span className="text-brand-orange">Réalisations</span>
            </h1>
            <p className="text-xl text-blue-100/80 leading-relaxed max-w-xl">
              Nous transformons les défis technologiques en avantages
              concurrentiels. Découvrez l'impact de nos solutions sur mesure.
            </p>
          </div>
        </div>
      </section>

      {/* Grid Content */}
      <section className="py-32 bg-white" data-theme="light">
        <div className="container-custom">
          {/* Section Header - Styled like Expertise/Image */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-20">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-6 bg-brand-orange" />
                <span className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400">
                  REALISATIONS
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-mont text-brand-navy leading-[1.1]">
                Des Succès <br />
                <span className="text-brand-orange">Mesurables</span>
              </h2>
            </div>
            <div className="lg:max-w-md">
              <p className="text-slate-500 text-lg leading-relaxed">
                Chaque projet est une aventure unique. Nous nous engageons sur
                le long terme pour assurer la pérennité et l'évolution de vos
                produits digitaux.
              </p>
            </div>
          </div>
          {/* Filter Bar */}
          <div className="flex flex-col md:flex-row gap-8 mb-16 justify-between items-start md:items-center">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-400 uppercase tracking-wider">
                <Filter size={16} /> Secteurs
              </div>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {sectors.map((sector) => (
                  <button
                    key={sector}
                    onClick={() => setActiveSector(sector)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      activeSector === sector
                        ? "bg-brand-orange text-white shadow-lg"
                        : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                    }`}
                  >
                    {sector}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-400 uppercase tracking-wider">
                <Filter size={16} /> Expertise
              </div>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {types.map((type) => (
                  <button
                    key={type}
                    onClick={() => setActiveType(type)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      activeType === type
                        ? "bg-brand-orange text-white shadow-lg"
                        : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  layout
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="group relative bg-white rounded-3xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_30px_70px_rgba(0,0,0,0.12)] transition-all duration-500 border border-slate-50 flex flex-col"
                >
                  {/* Image Container */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    {/* Badge Overlay */}
                    <div className="absolute top-6 left-6 flex gap-2">
                      <span className="px-4 py-1.5 bg-brand-navy/80 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
                        {project.type}
                      </span>
                    </div>
                    {/* Hover Button */}
                    <div className="absolute inset-0 bg-brand-navy/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-[2px]">
                      <Button
                        className="rounded-full bg-white text-brand-navy hover:bg-brand-orange hover:text-white font-bold h-14 px-8 text-base transition-all transform hover:scale-105"
                        asChild
                      >
                        <Link to={`/realisations/${project.id}`}>
                          Voir l'étude de cas
                        </Link>
                      </Button>
                    </div>
                  </div>

                  <div className="p-5 md:p-6 flex flex-col flex-grow">
                    <div className="flex flex-col mb-4">
                      <div className="text-[10px] font-bold text-brand-orange uppercase tracking-wider mb-2">
                        {project.sector}
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-lg font-bold font-mont text-brand-navy leading-tight">
                          {project.client}
                        </h3>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">
                            IMPACT:
                          </span>
                          <span className="text-sm font-black text-brand-navy font-mont">
                            {project.result}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
                      <p className="text-slate-500 font-medium text-[10px] italic line-clamp-1 pr-2">
                        "{project.title}"
                      </p>
                      <Link
                        to={`/realisations/${project.id}`}
                        className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-brand-orange group-hover:text-white transition-all duration-500 transform group-hover:rotate-12 shadow-sm shrink-0"
                      >
                        <ArrowUpRight size={18} strokeWidth={2.5} />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-20 text-slate-400">
              Aucun projet ne correspond à ces filtres.
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section - Styled like image */}
      <section className="pb-32 bg-white" data-theme="light">
        <div className="container-custom">
          <div className="bg-gradient-to-r from-brand-orange to-orange-500 rounded-[2.5rem] p-8 md:p-12 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-10 shadow-2xl shadow-brand-orange/20">
            <div className="flex items-center gap-8 text-center lg:text-left">
              <div className="hidden sm:flex w-20 h-20 rounded-full bg-white/20 backdrop-blur-md items-center justify-center text-white shrink-0">
                <Mail size={40} strokeWidth={1.5} />
              </div>
              <h3 className="text-3xl md:text-4xl font-extrabold text-white font-mont leading-tight">
                Subscribe to <br /> Newsletter
              </h3>
            </div>

            <div className="flex flex-col sm:flex-row w-full lg:w-auto gap-4">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow lg:w-[400px] px-8 py-5 rounded-full bg-white text-brand-navy focus:outline-none placeholder:text-slate-400 font-medium"
              />
              <button className="px-10 py-5 bg-brand-navy text-white rounded-full font-bold hover:bg-slate-900 transition-all active:scale-95 shadow-lg whitespace-nowrap">
                Subscribe !
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-24 bg-brand-navy text-center text-white relative overflow-hidden"
        data-theme="dark"
      >
        <div className="absolute inset-0 bg-brand-orange/10 pointer-events-none" />
        <div className="container-custom relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold font-mont mb-8">
            Convaincu par notre expertise ?
          </h2>
          <Button
            size="lg"
            className="bg-brand-orange text-white hover:bg-brand-orange/90 font-bold px-12 h-16 rounded-full shadow-xl shadow-brand-orange/20 text-lg transition-transform hover:scale-105"
            asChild
          >
            <Link to="/contact">Démarrer votre projet</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Realisations;
