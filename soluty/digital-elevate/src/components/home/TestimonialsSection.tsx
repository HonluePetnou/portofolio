import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Marie Dupont",
    role: "Directrice Marketing",
    company: "TechCorp",
    content: "Digitaly a transformé notre approche marketing. Notre trafic a augmenté de 300% en 6 mois et nos conversions ont doublé. Une équipe exceptionnelle !",
    rating: 5,
    avatar: "MD",
  },
  {
    name: "Pierre Martin",
    role: "CEO",
    company: "InnoStart",
    content: "L'automatisation mise en place par Digitaly nous fait gagner 20 heures par semaine. Un investissement qui s'est rentabilisé en 3 mois.",
    rating: 5,
    avatar: "PM",
  },
  {
    name: "Sophie Bernard",
    role: "Responsable IT",
    company: "GlobalRetail",
    content: "Notre nouveau site e-commerce a dépassé toutes nos attentes. L'équipe Digitaly est professionnelle, réactive et vraiment à l'écoute.",
    rating: 5,
    avatar: "SB",
  },
];

export function TestimonialsSection() {
  return (
    <section className="section-padding">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary font-semibold">Témoignages</span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-4 mb-6">
            Ce que nos{" "}
            <span className="text-gradient">clients disent de nous</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Découvrez les retours de nos clients qui nous font confiance pour leur transformation digitale.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative p-8 rounded-3xl bg-card border border-border card-shadow hover:card-shadow-hover transition-shadow duration-300"
            >
              {/* Quote icon */}
              <div className="absolute -top-4 right-8 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Quote className="text-primary" size={20} />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="text-yellow-400 fill-yellow-400" size={18} />
                ))}
              </div>

              {/* Content */}
              <p className="text-foreground mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-hero-gradient flex items-center justify-center">
                  <span className="text-primary-foreground font-semibold">
                    {testimonial.avatar}
                  </span>
                </div>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role}, {testimonial.company}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
