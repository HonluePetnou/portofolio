"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";

const experiences = [
  {
    role: "Senior Frontend Engineer & QA",
    company: "MELOAUD",
    period: "Feb 2025 – Present",
    description:
      "Leading frontend architecture and ensuring product reliability.",
    achievements: [
      "Ownership of frontend architecture and decision making.",
      "Implemented BDD automation using Cucumber for regression prevention.",
      "Close collaboration with product and backend teams to streamline delivery.",
    ],
  },
  {
    role: "Frontend Developer & Project Coordinator",
    company: "ADS LTD",
    period: "May 2025 – Nov 2025",
    description: "Managed frontend delivery and team coordination.",
    achievements: [
      "Developed complex React-based frontend interfaces.",
      "Coordinated team tasks and tracked KPIs for project success.",
      "delivered high-quality features under strict real-world constraints.",
    ],
  },
  {
    role: "Software Developer",
    company: "SOLUTY",
    period: "Software Agency",
    description:
      "Co-building software products with a focus on technical excellence.",
    achievements: [
      "Participated in the full lifecycle of software product building.",
      "Contributed to key technical and product decisions.",
    ],
  },
];

export function Timeline() {
  return (
    <div className="mt-20">
      <h2 className="mb-10 text-3xl font-bold text-white text-center">
        Professional Journey
      </h2>
      <div className="relative border-l border-white/10 ml-4 md:ml-10 pl-8 md:pl-12 space-y-12">
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Timeline Dot */}
            <span className="absolute -left-[45px] md:-left-[61px] top-6 h-6 w-6 rounded-full border-4 border-[#0a0a0a] bg-neon-purple shadow-[0_0_10px_rgba(217,70,239,0.5)]" />

            <GlassCard className="p-8">
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                  <p className="text-neon-blue font-medium">{exp.company}</p>
                </div>
                <span className="text-sm text-gray-400 font-mono bg-white/5 px-3 py-1 rounded-full w-fit">
                  {exp.period}
                </span>
              </div>
              <p className="text-gray-300 mb-4">{exp.description}</p>
              <ul className="list-disc list-outside ml-5 space-y-2 text-gray-400">
                {exp.achievements.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
