"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Client Name",
    role: "CTO, Tech Company",
    content:
      "Frédéric's product mindset and attention to quality made a huge difference in our project delivery. His BDD approach caught issues before they reached production.",
    rating: 5,
  },
  {
    name: "Team Lead",
    role: "Engineering Manager",
    content:
      "Working with Frédéric was a pleasure. His technical leadership and ability to bridge product and engineering teams is exceptional.",
    rating: 5,
  },
  {
    name: "Project Manager",
    role: "Product Manager",
    content:
      "Frédéric understands that shipping reliable software is about more than just code. His quality-first approach aligns perfectly with product goals.",
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 overflow-x-hidden">
      <div className="container mx-auto px-4 md:px-8 lg:px-16 xl:px-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            What People <span className="text-neon-blue">Say</span>
          </h2>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            Feedback from colleagues and clients
          </p>

          <div className="grid gap-6 md:grid-cols-3 mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <GlassCard className="p-6 h-full flex flex-col">
                  <Quote className="w-8 h-8 text-neon-purple mb-4 opacity-50" />
                  <p className="text-gray-700 dark:text-gray-300 mb-6 flex-grow italic leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center gap-2 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-400">
                        ★
                      </span>
                    ))}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {testimonial.role}
                    </p>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
