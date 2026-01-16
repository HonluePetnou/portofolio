"use client";

import { motion } from "framer-motion";
import { ProjectCard, ProjectData } from "@/components/projects/project-card";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const featuredProjects: ProjectData[] = [
  {
    title: "OneControl",
    description:
      "AI-integrated hackathon project optimizing resource management.",
    image: "/projects/onecontrol.png",
    stack: ["Gemini AI", "Next.js", "Python"],
  },
  {
    title: "Feedly",
    description:
      "Health analytics application for personalized nutrition tracking.",
    image: "/projects/feedly.png",
    stack: ["FastAPI", "Python", "React", "PostgreSQL"],
  },
  {
    title: "Tech Portfolio Directory",
    description: "Aggregator for tech portfolios with advanced filtering.",
    image: "/projects/portfolio-directory.png",
    stack: ["Next.js", "Firebase", "Puppeteer", "Tailwind CSS"],
  },
];

export function ProjectsSection() {
  return (
    <section id="projects" className="py-20 scroll-mt-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Featured <span className="text-neon-blue">Projects</span>
        </h2>
        <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
          Case studies in reliability and impact
        </p>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Link href="/projects">
            <button className="group flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-all text-white font-medium">
              View All Projects
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
