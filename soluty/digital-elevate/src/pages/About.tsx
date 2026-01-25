import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { motion, AnimatePresence } from "framer-motion";
import {
  Target,
  Users,
  Zap,
  ShieldCheck,
  Linkedin,
  Instagram,
  Twitter,
  Globe,
  X,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const values = [
  {
    icon: Zap,
    title: "Performance",
    desc: "Nous ne cherchons pas juste à faire joli. Nous cherchons à faire performant. Chaque pixel doit servir votre croissance.",
  },
  {
    icon: ShieldCheck,
    title: "Transparence",
    desc: "Pas de jargon complexe, pas de frais cachés. Nous sommes vos partenaires, et la confiance est notre monnaie.",
  },
  {
    icon: Target,
    title: "Résultats",
    desc: "Nous sommes obsédés par les métriques (ROI, Conversion, Trafic). Si ça ne se mesure pas, ça ne compte pas.",
  },
  {
    icon: Users,
    title: "Proximité",
    desc: "Une équipe humaine, réactive et dévouée. Vous n'êtes pas un numéro de dossier, vous êtes un partenaire.",
  },
];

const team = [
  {
    id: 1,
    name: "Alexandre Martin",
    role: "Fondateur & Stratège",
    bio: "Avec plus de 10 ans d'expérience dans le conseil en transformation digitale, Alexandre aide les CEOs à naviguer dans la complexité technologique.",
    portfolio: "alexandremartin.dev",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1000&auto=format&fit=crop",
    socials: {
      linkedin: "#",
      twitter: "#",
      instagram: "#",
    },
  },
  {
    id: 2,
    name: "Sophie Dubois",
    role: "Head of Tech",
    bio: "Experte en architectures scalables et IA, Sophie supervise le pôle ingénierie et garantit la robustesse technique de chaque projet.",
    portfolio: "sophiedubois.tech",
    image:
      "https://images.unsplash.com/photo-1573496359-0796d9585341?q=80&w=1000&auto=format&fit=crop",
    socials: {
      linkedin: "#",
      globe: "#",
    },
  },
  {
    id: 3,
    name: "Marc Levy",
    role: "Directeur Artistique",
    bio: "Passionné par l'UX minimaliste et le design émotionnel, Marc transforme les fonctionnalités brutes en expériences mémorables.",
    portfolio: "marclevy.design",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1000&auto=format&fit=crop",
    socials: {
      instagram: "#",
      linkedin: "#",
    },
  },
];

const About = () => {
  const [selectedMember, setSelectedMember] = useState<(typeof team)[0] | null>(
    null,
  );

  return (
    <Layout>
      {/* Hero Section */}
      <section
        className="relative pt-44 pb-32 bg-brand-navy overflow-hidden"
        data-theme="dark"
      >
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
            alt="About Soluty"
            className="w-full h-full object-cover opacity-20 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/90 to-transparent" />
        </div>

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-6 bg-brand-orange" />
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-blue-200/60">
                WHO WE ARE
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold font-mont text-white leading-tight mb-8">
              À Propos <span className="text-brand-orange">De Nous</span>
            </h1>
            <p className="text-xl text-blue-100/80 leading-relaxed max-w-xl">
              Nous sommes une agence digitale née d'une ambition : fusionner
              créativité sans limites et rigueur technologique pour propulser
              nos partenaires.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Description */}
      <section className="py-32 bg-white" data-theme="light">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-20 items-center mb-32">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-square rounded-[2.5rem] overflow-hidden shadow-2xl"
            >
              <img
                src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop"
                alt="Our Workspace"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 p-10 bg-gradient-to-t from-brand-navy/80 to-transparent">
                <p className="text-white text-lg italic">
                  "L'innovation n'est pas une destination, c'est un voyage
                  continu."
                </p>
              </div>
            </motion.div>

            <div className="space-y-8">
              <div className="flex items-center gap-3">
                <div className="w-1 h-6 bg-brand-orange" />
                <span className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400">
                  NOTRE MISSION
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-mont text-brand-navy leading-[1.1]">
                Humaniser la <br />
                <span className="text-brand-orange">Technologie</span>
              </h2>
              <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
                <p>
                  Soluty a été fondée avec une vision claire : la technologie ne
                  doit jamais être un obstacle, mais un facilitateur de succès.
                  Nous aidons les entreprises à naviguer dans le paysage
                  numérique moderne avec confiance.
                </p>
                <div className="grid grid-cols-2 gap-8 pt-6">
                  <div>
                    <div className="text-4xl font-extrabold text-brand-navy font-mont mb-2">
                      150+
                    </div>
                    <div className="text-sm font-bold text-slate-400 uppercase">
                      Projets Livrés
                    </div>
                  </div>
                  <div>
                    <div className="text-4xl font-extrabold text-brand-navy font-mont mb-2">
                      98%
                    </div>
                    <div className="text-sm font-bold text-slate-400 uppercase">
                      Clients Heureux
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Values Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((val, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-[2rem] bg-slate-50 border border-slate-100 hover:shadow-xl transition-all group"
              >
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-brand-navy shadow-sm mb-6 group-hover:bg-brand-orange group-hover:text-white transition-all duration-500 transform group-hover:rotate-6">
                  <val.icon size={28} />
                </div>
                <h3 className="text-xl font-bold font-mont text-brand-navy mb-4">
                  {val.title}
                </h3>
                <p className="text-slate-500 leading-relaxed text-sm">
                  {val.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section
        className="py-32 bg-slate-50 relative overflow-hidden"
        data-theme="light"
      >
        {/* Subtle decoration */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-orange/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-1 h-6 bg-brand-orange" />
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400">
                EQUIPE
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold font-mont text-brand-navy mb-6">
              Les Visages de <span className="text-brand-orange">Soluty</span>
            </h2>
            <p className="text-lg text-slate-500">
              Une équipe multidisciplinaire d'experts passionnés, dédiée à votre
              succès sur le long terme.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {team.map((member) => (
              <motion.div
                key={member.id}
                layoutId={`member-${member.id}`}
                onClick={() => setSelectedMember(member)}
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] mb-6 shadow-lg shadow-black/5">
                  <img
                    src={member.image}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    alt={member.name}
                  />
                  <div className="absolute inset-0 bg-brand-navy/20 group-hover:bg-brand-navy/0 transition-colors duration-500" />

                  {/* Floating Plus Button */}
                  <div className="absolute bottom-6 right-6 w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-brand-navy shadow-xl opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <Plus size={24} />
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold font-mont text-brand-navy mb-1">
                    {member.name}
                  </h3>
                  <p className="text-brand-orange font-bold text-sm tracking-widest uppercase">
                    {member.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Member Details Modal */}
        <AnimatePresence>
          {selectedMember && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedMember(null)}
                className="absolute inset-0 bg-brand-navy/90 backdrop-blur-md"
              />

              <motion.div
                layoutId={`member-${selectedMember.id}`}
                className="relative w-full max-w-4xl bg-white rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row"
              >
                {/* Image */}
                <div className="md:w-5/12 aspect-[4/5] md:aspect-auto">
                  <img
                    src={selectedMember.image}
                    className="w-full h-full object-cover"
                    alt={selectedMember.name}
                  />
                </div>

                {/* Content */}
                <div className="md:w-7/12 p-10 md:p-16 flex flex-col">
                  <button
                    onClick={() => setSelectedMember(null)}
                    className="absolute top-8 right-8 w-12 h-12 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 hover:text-brand-orange hover:border-brand-orange transition-all"
                  >
                    <X size={24} />
                  </button>

                  <div>
                    <span className="text-sm font-bold text-brand-orange uppercase tracking-[0.2em] mb-4 block">
                      {selectedMember.role}
                    </span>
                    <h3 className="text-4xl md:text-5xl font-extrabold font-mont text-brand-navy mb-8">
                      {selectedMember.name}
                    </h3>
                    <p className="text-slate-600 text-lg leading-relaxed mb-10">
                      {selectedMember.bio}
                    </p>
                  </div>

                  <div className="space-y-8 mt-auto">
                    {/* Portfolio Link */}
                    <a
                      href={`https://${selectedMember.portfolio}`}
                      target="_blank"
                      className="flex items-center gap-4 group"
                    >
                      <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-brand-navy group-hover:bg-brand-orange group-hover:text-white transition-all">
                        <Globe size={20} />
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">
                          Portfolio
                        </p>
                        <p className="text-brand-navy font-bold">
                          {selectedMember.portfolio}
                        </p>
                      </div>
                    </a>

                    {/* Socials */}
                    <div className="flex gap-4">
                      {selectedMember.socials.linkedin && (
                        <a
                          href="#"
                          className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-[#0077b5] hover:text-white transition-all"
                        >
                          <Linkedin size={20} />
                        </a>
                      )}
                      {selectedMember.socials.twitter && (
                        <a
                          href="#"
                          className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-black hover:text-white transition-all"
                        >
                          <Twitter size={20} />
                        </a>
                      )}
                      {selectedMember.socials.instagram && (
                        <a
                          href="#"
                          className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-[#e4405f] hover:text-white transition-all"
                        >
                          <Instagram size={20} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </section>

      {/* CTA Section */}
      <section
        className="py-24 bg-brand-navy text-center text-white relative overflow-hidden"
        data-theme="dark"
      >
        <div className="absolute inset-0 bg-brand-orange/10 pointer-events-none" />
        <div className="container-custom relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold font-mont mb-8">
            Vous voulez intégrer <br /> notre aventure ?
          </h2>
          <Button
            size="lg"
            className="bg-brand-orange text-white hover:bg-brand-orange/90 font-bold px-12 h-16 rounded-full shadow-xl shadow-brand-orange/20 text-lg transition-transform hover:scale-105"
            asChild
          >
            <Link to="/contact">Rejoindre l'équipe</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default About;
