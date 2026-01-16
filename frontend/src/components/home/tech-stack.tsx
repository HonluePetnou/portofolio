"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { cn } from "@/lib/utils";

const technologies = [
  { name: "React", category: "Frontend", color: "blue" },
  { name: "Next.js", category: "Frontend", color: "blue" },
  { name: "TypeScript", category: "Language", color: "blue" },
  { name: "FastAPI", category: "Backend", color: "blue" },
  { name: "Python", category: "Language", color: "purple" },
  { name: "Spring Boot", category: "Backend", color: "blue" },
  { name: "Cucumber", category: "QA/Testing", color: "purple" },
  { name: "Gemini AI", category: "AI Integration", color: "purple" },
  { name: "Firebase", category: "Cloud", color: "blue" },
  { name: "Jira / Confluence", category: "Management", color: "blue" },
];

export function TechStack() {
  return (
    <section className="py-20">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold text-foreground md:text-4xl">
          Tech Agnostic, Product Focused
        </h2>
        <p className="mt-4 text-muted">
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
              <span
                className={cn(
                  "text-lg font-semibold text-foreground transition-colors",
                  tech.color === "purple"
                    ? "group-hover:text-neon-purple"
                    : "group-hover:text-neon-blue"
                )}
              >
                {tech.name}
              </span>
              <span className="mt-1 text-xs text-muted">{tech.category}</span>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
