// Blog Page Component
import { Layout } from "@/components/layout/Layout";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Mail, Calendar, User, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const blogPosts = [
  {
    id: 1,
    title: "Comment l'IA transforme le développement web en 2024",
    excerpt:
      "L'intelligence artificielle n'est plus une option mais un levier de productivité majeur pour les équipes techniques.",
    category: "Technologie",
    author: "Marc Dupont",
    date: "12 Janv 2024",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Optimiser son taux de conversion : les secrets de l'UX Design",
    excerpt:
      "Découvrez comment de petits changements d'interface peuvent avoir un impact massif sur vos ventes.",
    category: "Design",
    author: "Sarah Martin",
    date: "05 Janv 2024",
    image:
      "https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "SEO vs SEA : Quelle stratégie adopter pour sa croissance ?",
    excerpt:
      "Faut-il privilégier le long terme ou les résultats immédiats ? Analyse comparative des deux approches.",
    category: "Marketing",
    author: "Julien Leroy",
    date: "28 Déc 2023",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "La cybersécurité pour les PME : guide de survie",
    excerpt:
      "Les cyberattaques ne ciblent pas que les grands groupes. Apprenez à protéger vos actifs numériques simplement.",
    category: "Sécurité",
    author: "Thomas Berger",
    date: "15 Déc 2023",
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "Pourquoi choisir une architecture Headless en 2024 ?",
    excerpt:
      "Flexibilité, performance et scalabilité : les avantages du découplage front-end et back-end.",
    category: "Développement",
    author: "Marc Dupont",
    date: "02 Déc 2023",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: 6,
    title: "L'importance du branding dans le secteur B2B",
    excerpt:
      "Comment construire une image de marque forte et cohérente pour attirer et fidéliser des clients institutionnels.",
    category: "Stratégie",
    author: "Sarah Martin",
    date: "20 Nov 2023",
    image:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2000&auto=format&fit=crop",
  },
];

const categories = [
  "Tous",
  "Technologie",
  "Design",
  "Marketing",
  "Sécurité",
  "Développement",
  "Stratégie",
];

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("Tous");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = blogPosts.filter((post) => {
    const categoryMatch =
      activeCategory === "Tous" || post.category === activeCategory;
    const searchMatch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && searchMatch;
  });

  return (
    <Layout>
      {/* Hero Section */}
      <section
        className="relative pt-44 pb-32 bg-brand-navy overflow-hidden"
        data-theme="dark"
      >
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop"
            alt="Person blogging"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/90 to-transparent" />
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-6 bg-brand-orange" />
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-blue-200/60">
                INSIGHTS & NEWS
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold font-mont text-white leading-tight mb-8">
              Notre <span className="text-brand-orange">Blog</span>
            </h1>
            <p className="text-xl text-blue-100/80 leading-relaxed max-w-xl">
              Décryptage des tendances digitales, conseils d'experts et
              actualités technologiques pour booster votre vision business.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-32 bg-white" data-theme="light">
        <div className="container-custom">
          {/* Section Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-20">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-6 bg-brand-orange" />
                <span className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400">
                  ARTICLES RÉCENTS
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-mont text-brand-navy leading-[1.1]">
                Partage de <br />
                <span className="text-brand-orange">Connaissances</span>
              </h2>
            </div>
            <div className="lg:max-w-md w-full">
              <div className="relative">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Rechercher un article..."
                  className="w-full pl-12 pr-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-orange/20 transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Categories Filter */}
          <div className="flex flex-wrap gap-2 mb-16">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                  activeCategory === cat
                    ? "bg-brand-orange text-white shadow-lg"
                    : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Articles Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            <AnimatePresence mode="popLayout">
              {filteredPosts.map((post, i) => (
                <motion.article
                  layout
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="group bg-white overflow-hidden border border-slate-50 shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-all duration-500 flex flex-col"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute top-6 left-6">
                      <span className="px-4 py-1.5 bg-brand-navy/80 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-8 flex flex-col flex-grow">
                    <div className="flex items-center gap-6 mb-4 text-slate-400">
                      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider">
                        <Calendar size={14} className="text-brand-orange" />
                        {post.date}
                      </div>
                      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider">
                        <User size={14} className="text-brand-orange" />
                        {post.author}
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold font-mont text-brand-navy mb-4 group-hover:text-brand-orange transition-colors leading-tight">
                      <Link to={`/blog/${post.id}`}>{post.title}</Link>
                    </h3>

                    <p className="text-slate-500 leading-relaxed mb-8 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="mt-auto pt-6 border-t border-slate-50">
                      <Link
                        to={`/blog/${post.id}`}
                        className="inline-flex items-center gap-2 text-brand-navy font-bold hover:text-brand-orange transition-colors"
                      >
                        Lire la suite <ArrowRight size={18} />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-20 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
              <p className="text-slate-400">
                Aucun article ne correspond à votre recherche.
              </p>
              <Button
                variant="link"
                onClick={() => {
                  setActiveCategory("Tous");
                  setSearchQuery("");
                }}
                className="text-brand-orange font-bold mt-2"
              >
                Réinitialiser les filtres
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
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

      {/* Final CTA */}
      <section
        className="py-24 bg-brand-navy text-center text-white relative overflow-hidden"
        data-theme="dark"
      >
        <div className="absolute inset-0 bg-brand-orange/10 pointer-events-none" />
        <div className="container-custom relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold font-mont mb-8">
            Prêt à faire passer votre <br /> entreprise au niveau supérieur ?
          </h2>
          <Button
            size="lg"
            className="bg-brand-orange text-white hover:bg-brand-orange/90 font-bold px-12 h-16 rounded-full shadow-xl shadow-brand-orange/20 text-lg transition-transform hover:scale-105"
            asChild
          >
            <Link to="/contact">Discuter de votre projet</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
