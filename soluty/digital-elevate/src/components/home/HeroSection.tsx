import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Star, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop",
    quote:
      "Soluty a complètement transformé notre acquisition client. Un ROI impressionnant.",
    author: "Sophie Martin, CEO TechStart",
    stat: "+145%",
    statLabel: "de Leads Qualifiés",
  },
  {
    image:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop",
    quote: "Une expertise technique rare alliée à une vraie vision business.",
    author: "Marc Dubois, CTO InnovationGroup",
    stat: "x3.5",
    statLabel: "Retour sur Investissement",
  },
  {
    image:
      "https://images.unsplash.com/photo-1553877615-30c73e6a2067?q=80&w=2070&auto=format&fit=crop",
    quote:
      "Le design de notre nouvelle plateforme a fait l'unanimité auprès de nos utilisateurs.",
    author: "Julie Ferrand, Product Director",
    stat: "-40%",
    statLabel: "Taux de Rebond",
  },
];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950 pt-16"
      data-theme="dark"
    >
      {/* Background Slider */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.3, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
        />
      </AnimatePresence>

      {/* Dark Overlay with Gradient */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-slate-950 via-slate-950/95 to-slate-950/60" />
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />

      {/* Texture Overlay */}
      <div className="absolute inset-0 z-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />

      <div className="container-custom relative z-10 grid lg:grid-cols-2 gap-12 items-center h-full py-12">
        {/* Main Content */}
        <div className="max-w-3xl space-y-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 mb-4"
          >
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full border-2 border-slate-900 bg-brand-orange/20 overflow-hidden"
                >
                  <img
                    src={`https://i.pravatar.cc/100?img=${i + 10}`}
                    alt="User"
                  />
                </div>
              ))}
            </div>
            <div className="text-sm text-blue-100 pl-3 font-medium">
              Rejoignez{" "}
              <span className="text-white font-bold">50+ entreprises</span>{" "}
              leaders.
            </div>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-extrabold font-mont text-white leading-[1.1]">
            Des solutions digitales qui <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-blue">
              parlent résultats
            </span>
            .
          </h1>

          <p className="text-xl text-blue-100 leading-relaxed font-light max-w-xl">
            Nous ne nous contentons pas de livrer du code ou du design. Nous
            livrons de la croissance, mesurable et durable, pour votre
            entreprise.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <Button
              size="lg"
              className="bg-brand-orange hover:bg-brand-orange/90 text-white font-bold rounded-full px-8 h-14 text-lg shadow-lg shadow-brand-orange/20 transition-all hover:scale-105"
              asChild
            >
              <Link to="/contact">Découvrir notre méthode</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 rounded-full px-8 h-14 text-lg font-bold bg-transparent transition-all"
              asChild
            >
              <Link to="/realisations">Voir les études de cas</Link>
            </Button>
          </div>

          {/* Progress Indicators */}
          <div className="flex gap-2 pt-8">
            {slides.map((_, idx) => (
              <div
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${idx === currentSlide ? "w-12 bg-brand-orange" : "w-3 bg-white/20"}`}
                onClick={() => setCurrentSlide(idx)}
              />
            ))}
          </div>
        </div>

        {/* Dynamic Testimonial/Stat Card */}
        <div className="relative mt-12 lg:mt-0 hidden lg:block">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 50, rotate: 2 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              exit={{ opacity: 0, x: -50, rotate: -2 }}
              transition={{ duration: 0.5 }}
              className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl"
            >
              <div className="absolute -top-6 -left-6 bg-brand-orange text-white p-4 rounded-2xl shadow-xl transform -rotate-6">
                <Quote className="w-8 h-8 fill-white/20" />
              </div>

              <div className="mb-8">
                <div className="text-6xl font-extrabold text-white mb-2 tracking-tight font-mont">
                  {slides[currentSlide].stat}
                </div>
                <div className="text-lg text-brand-orange font-bold uppercase tracking-wider">
                  {slides[currentSlide].statLabel}
                </div>
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent w-full mb-8" />

              <div>
                <p className="text-xl text-blue-100 italic mb-6 leading-relaxed">
                  "{slides[currentSlide].quote}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full border-2 border-brand-orange p-0.5">
                    <img
                      src={`https://i.pravatar.cc/150?u=${slides[currentSlide].author}`}
                      alt="Author"
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="text-white font-bold font-mont">
                      {slides[currentSlide].author.split(",")[0]}
                    </div>
                    <div className="text-sm text-brand-orange font-semibold">
                      {slides[currentSlide].author.split(",")[1]}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Decorative floating elements */}
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-6 -right-6 px-6 py-4 bg-brand-blue text-white rounded-2xl shadow-xl z-20 border border-white/10 transform rotate-3"
          >
            <div className="flex items-center gap-2 font-bold whitespace-nowrap">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              5.0/5 Trustpilot
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 20, 0] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute -top-10 -right-12 w-32 h-32 bg-brand-orange rounded-full blur-[80px] opacity-30 z-0 pointer-events-none"
          />
        </div>
      </div>
    </div>
  );
}
