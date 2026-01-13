"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";

const technologies = [
  { name: "React", category: "Frontend" },
  { name: "Next.js", category: "Frontend" },
  { name: "TypeScript", category: "Language" },
  { name: "FastAPI", category: "Backend" },
  { name: "Spring Boot", category: "Backend" },
  { name: "Cucumber", category: "QA/Testing" },
  { name: "Gemini AI", category: "AI Integration" },
  { name: "Firebase", category: "Cloud" },
  { name: "Jira / Confluence", category: "Management" },
];

export function TechStack() {
  return (
    <section className="py-20">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold text-white md:text-4xl">
          Tech Agnostic, Product Focused
        </h2>
        <p className="mt-4 text-gray-400">
          The right tools for reliable, scalable solutions.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 max-w-5xl mx-auto">
        {technologies.map((tech, index) => (
          <motion.div
            key={tech.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            viewport={{ once: true }}
          >
            <GlassCard className="flex flex-col items-center justify-center py-6 text-center group cursor-default">
              <span className="text-lg font-semibold text-white group-hover:text-neon-blue transition-colors">
                {tech.name}
              </span>
              <span className="mt-1 text-xs text-gray-500">
                {tech.category}
              </span>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
