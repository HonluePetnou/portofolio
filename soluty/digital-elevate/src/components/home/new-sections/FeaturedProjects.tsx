import { motion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function FeaturedProjects() {
  const projects = [
    {
      client: "TechFlow",
      category: "SaaS B2B",
      title: "Redesign complet & +150% de leads",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
      tags: ["UX/UI", "React", "Growth"],
    },
    {
      client: "LuxeMaison",
      category: "E-commerce",
      title: "Expérience d'achat immersive 3D",
      image:
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
      tags: ["3D WebGL", "Shopify", "Branding"],
    },
    {
      client: "HealthCare+",
      category: "Application Mobile",
      title: "Digitalisation du parcours patient",
      image:
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop",
      tags: ["React Native", "Node.js", "Securité"],
    },
  ];

  return (
    <section className="py-24 bg-slate-50" data-theme="light">
      <div className="container-custom">
        <div className="flex justify-between items-end mb-16">
          <div>
            <h2 className="text-4xl md:text-5xl font-extrabold font-mont text-brand-navy mb-4">
              Nos Réalisations
            </h2>
            <p className="text-lg text-slate-600 max-w-xl">
              Chaque projet est une nouvelle opportunité de repousser les
              limites de la performance digitale.
            </p>
          </div>
          <Button
            variant="outline"
            className="hidden md:flex border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white rounded-full uppercase"
            asChild
          >
            <Link to="/realisations">Voir tout</Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-6">
                <div className="absolute inset-0 bg-brand-navy/20 group-hover:bg-transparent transition-colors z-10" />
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-20">
                  <ExternalLink size={20} />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex gap-3 text-xs font-bold uppercase tracking-wider text-brand-orange">
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <h3 className="text-2xl font-bold font-mont text-brand-navy group-hover:text-brand-blue transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-600">
                  {project.client} — {project.category}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
