import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      text: "Soluty a complètement transformé notre présence digitale. L'équipe est réactive, créative et orientée résultats. Nous avons vu notre taux de conversion augmenter de 150% en 3 mois.",
      author: "Sophie Martin",
      role: "Directrice Marketing",
      avatar: "https://i.pravatar.cc/100?img=5",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop",
      trustedClients: [
        "https://i.pravatar.cc/100?img=6",
        "https://i.pravatar.cc/100?img=7",
        "https://i.pravatar.cc/100?img=8",
        "https://i.pravatar.cc/100?img=9",
      ],
    },
    {
      id: 2,
      text: "Une expertise technique rare combinée à une vraie compréhension business. Le ROI est impressionnant et l'accompagnement est au top du début à la fin du projet.",
      author: "Thomas Dubois",
      role: "CEO TechStart",
      avatar: "https://i.pravatar.cc/100?img=13",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
      trustedClients: [
        "https://i.pravatar.cc/100?img=10",
        "https://i.pravatar.cc/100?img=11",
        "https://i.pravatar.cc/100?img=14",
        "https://i.pravatar.cc/100?img=15",
      ],
    },
    {
      id: 3,
      text: "Le design de notre nouvelle plateforme a fait l'unanimité auprès de nos utilisateurs. Soluty a su allier esthétique moderne et performance technique. Un vrai partenaire de croissance.",
      author: "Marie Leclerc",
      role: "Product Manager",
      avatar: "https://i.pravatar.cc/100?img=12",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
      trustedClients: [
        "https://i.pravatar.cc/100?img=1",
        "https://i.pravatar.cc/100?img=2",
        "https://i.pravatar.cc/100?img=3",
        "https://i.pravatar.cc/100?img=4",
      ],
    },
  ];

  const currentTestimonial = testimonials[currentIndex];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  return (
    <section
      className="relative py-24 bg-brand-navy text-white overflow-hidden"
      data-theme="dark"
    >
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-32 h-32 bg-brand-blue/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-brand-orange/30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-brand-blue rounded-full" />
        <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-brand-orange rounded-full" />
        <div className="absolute bottom-1/4 left-1/2 w-2 h-2 bg-brand-blue rounded-full" />
      </div>

      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block mb-6"
          >
            <span className="px-6 py-2 rounded-full bg-brand-orange text-white text-sm font-bold font-mont uppercase tracking-wider">
              Témoignages Clients
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold font-mont"
          >
            Ce que disent nos clients
          </motion.h2>
        </div>

        {/* Testimonial Slider */}
        <div className="grid lg:grid-cols-2 gap-8 items-center max-w-6xl mx-auto">
          {/* Left - Image Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`image-${currentIndex}`}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden border-4 border-white/10 shadow-2xl">
                <img
                  src={currentTestimonial.image}
                  alt={currentTestimonial.author}
                  className="w-full h-[500px] object-cover"
                />

                {/* Trusted Clients Badge */}
                <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-3 flex items-center gap-3 shadow-xl">
                  <span className="text-brand-navy font-bold text-sm font-mont">
                    Clients de confiance
                  </span>
                  <div className="flex -space-x-2">
                    {currentTestimonial.trustedClients.map((client, i) => (
                      <img
                        key={i}
                        src={client}
                        alt="Client"
                        className="w-8 h-8 rounded-full border-2 border-white object-cover"
                      />
                    ))}
                    <div className="w-8 h-8 rounded-full bg-brand-orange flex items-center justify-center text-white text-xs font-bold border-2 border-white">
                      +
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative dots pattern */}
              <div className="absolute -bottom-4 -left-4 w-24 h-24 opacity-50">
                <div className="grid grid-cols-6 gap-2">
                  {[...Array(36)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1 h-1 bg-brand-blue rounded-full"
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Right - Testimonial Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`content-${currentIndex}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="relative bg-gradient-to-br from-brand-blue to-brand-orange rounded-3xl p-10 md:p-12 shadow-2xl"
            >
              <Quote className="w-16 h-16 text-white/30 mb-6" />

              {/* Rating */}
              <div className="flex gap-1 mb-6">
                {[...Array(currentTestimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className="fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-white text-lg md:text-xl leading-relaxed mb-8">
                "{currentTestimonial.text}"
              </p>

              {/* Author Info */}
              <div className="flex items-center gap-4">
                <img
                  src={currentTestimonial.avatar}
                  alt={currentTestimonial.author}
                  className="w-14 h-14 rounded-full object-cover border-2 border-white/30"
                />
                <div>
                  <div className="text-white font-bold text-lg font-mont">
                    {currentTestimonial.author}
                  </div>
                  <div className="text-white/80 text-sm">
                    {currentTestimonial.role}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center items-center gap-4 mt-12">
          <button
            onClick={prevTestimonial}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors border border-white/20"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? "w-8 bg-brand-orange"
                    : "w-2 bg-white/30"
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextTestimonial}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors border border-white/20"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
