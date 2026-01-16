"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { Briefcase, Calendar } from "lucide-react";

const experiences = [
  {
    role: "Senior Frontend Engineer & QA",
    company: "MELOAUD",
    period: "Feb 2025 – Present",
    description:
      "Leading frontend architecture and ensuring product reliability.",
    achievements: [
      "Ownership of frontend architecture and decision making",
      "Implemented BDD automation using Cucumber",
      "Close collaboration with product and backend teams",
    ],
  },
  {
    role: "Frontend Developer & Project Coordinator",
    company: "ADS LTD",
    period: "May 2025 – Nov 2025",
    description: "Managed frontend delivery and team coordination.",
    achievements: [
      "Developed complex React-based frontend interfaces",
      "Coordinated team tasks and tracked KPIs",
      "Delivered high-quality features under strict constraints",
    ],
  },
  {
    role: "Software Developer",
    company: "SOLUTY",
    period: "Software Agency",
    description:
      "Co-building software products with a focus on technical excellence.",
    achievements: [
      "Participated in full lifecycle of software product building",
      "Contributed to key technical and product decisions",
    ],
  },
];

export function ExperienceSection() {
  return (
    <section id="experience" className="py-20 scroll-mt-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Professional <span className="text-neon-blue">Experience</span>
        </h2>
        <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
          My journey in building reliable digital products
        </p>

        <div className="max-w-4xl mx-auto space-y-6">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <GlassCard className="p-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-full bg-neon-purple/20 flex-shrink-0">
                      <Briefcase className="w-6 h-6 text-neon-purple" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        {exp.role}
                      </h3>
                      <p className="text-neon-blue font-medium">
                        {exp.company}
                      </p>
                      <p className="text-gray-400 text-sm mt-2">
                        {exp.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400 bg-white/5 px-3 py-1.5 rounded-full w-fit">
                    <Calendar className="w-4 h-4" />
                    {exp.period}
                  </div>
                </div>
                <ul className="list-disc list-inside space-y-1 text-gray-300 ml-16">
                  {exp.achievements.map((item, i) => (
                    <li key={i} className="text-sm">
                      {item}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
