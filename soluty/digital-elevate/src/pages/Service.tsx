import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import {
  Lightbulb,
  Globe,
  TrendingUp,
  Database,
  Workflow,
  Shield,
  Mail,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const detailedServices = [
  {
    icon: Lightbulb,
    title: "Transformation digitale",
    description:
      "Définissez une stratégie numérique claire. Nous analysons vos processus et identifions les opportunités.",
  },
  {
    icon: Globe,
    title: "Web & E-commerce",
    description:
      "Des sites performants qui convertissent. Design responsive, UX optimisée et référencement naturel intégré.",
  },
  {
    icon: TrendingUp,
    title: "Marketing Performance",
    description:
      "Augmentez votre visibilité et générez des leads qualifiés avec nos stratégies marketing data-driven.",
  },
  {
    icon: Database,
    title: "CRM & Outils Internes",
    description:
      "Centralisez vos données et optimisez vos processus avec des outils adaptés à votre organisation.",
  },
  {
    icon: Workflow,
    title: "Automatisation (IA)",
    description:
      "Automatisez les tâches répétitives et gagnez en productivité avec des workflows intelligents.",
  },
  {
    icon: Shield,
    title: "Cybersécurité",
    description:
      "Protégez vos actifs numériques et assurez la pérennité de votre activité.",
  },
];

const Service = () => {
  return (
    <Layout>
      {/* Hero */}
      {/* Hero Section - Styled like image header */}
      <section
        className="relative pt-44 pb-32 bg-brand-navy overflow-hidden"
        data-theme="dark"
      >
        {/* Background Image / Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
            alt="Team working"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/90 to-transparent" />
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-6 bg-brand-orange" />
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-blue-200/60">
                WHAT WE OFFERS
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold font-mont text-white leading-tight mb-8">
              Nos <span className="text-brand-orange">Services</span>
            </h1>
            <p className="text-xl text-blue-100/80 leading-relaxed max-w-xl">
              Nous transformons vos idées complexes en solutions digitales
              performantes, centrées sur l'utilisateur et la conversion.
            </p>
          </div>
        </div>
      </section>

      {/* Detailed Services Grid */}
      <section className="py-32 bg-white" data-theme="light">
        <div className="container-custom">
          {/* Section Header - Styled like image */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-20">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-6 bg-brand-orange" />
                <span className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400">
                  OUR SERVICES
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-mont text-brand-navy leading-[1.1]">
                Des Solutions Sur-Mesure <br />
                <span className="text-brand-orange">Pour Votre Croissance</span>
              </h2>
            </div>
            <div className="lg:max-w-md">
              <p className="text-slate-500 text-lg leading-relaxed">
                Nous combinons expertise technique, design centré utilisateur et
                stratégie marketing pour propulser votre entreprise vers de
                nouveaux sommets.
              </p>
            </div>
          </div>

          {/* Service Cards Grid - Styled like image */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {detailedServices.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-white p-12 rounded-[2rem] shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-all duration-500 flex flex-col items-center text-center group border border-slate-50"
              >
                <div className="w-24 h-24 rounded-3xl bg-brand-orange/5 flex items-center justify-center text-brand-orange mb-8 group-hover:bg-brand-orange group-hover:text-white transition-all duration-500 transform group-hover:rotate-6 shadow-sm">
                  <service.icon size={44} strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-bold font-mont text-brand-navy mb-4 group-hover:text-brand-orange transition-colors">
                  {service.title}
                </h3>
                <p className="text-slate-500 leading-relaxed text-sm md:text-base">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
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
            Un projet ? Une question ?
          </h2>
          <Button
            size="lg"
            className="bg-brand-orange text-white hover:bg-brand-orange/90 font-bold px-12 h-16 rounded-full shadow-xl shadow-brand-orange/20 text-lg transition-transform hover:scale-105"
            asChild
          >
            <Link to="/contact">Parler à un expert</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Service;
