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
    problem:
      "Inefficient manual tracking of resources led to waste and errors.",
    solution:
      "Integrated Gemini AI to predict usage patterns and automate reordering.",
    stack: ["Gemini AI", "Next.js", "Python"],
    outcome:
      "Secured 3rd place in Hackathon; demonstrated 20% potential efficiency gain.",
  },
  {
    title: "Feedly",
    description:
      "Health analytics application for personalized nutrition tracking.",
    problem:
      "Users struggled to correlate diet data with health metrics manually.",
    solution:
      "Built a FastAPI backend to process complex health data and serve real-time analytics.",
    stack: ["FastAPI", "Python", "React", "PostgreSQL"],
    outcome:
      "Successfully handled concurrent data streams for 500+ simulated users.",
  },
  {
    title: "Tech Portfolio Directory",
    description: "Aggregator for tech portfolios with advanced filtering.",
    problem:
      "Finding inspiration for portfolios was fragmented across many sites.",
    solution:
      "Developed a web scraper and a centralized directory with visual previews.",
    stack: ["Next.js", "Firebase", "Puppeteer", "Tailwind CSS"],
    outcome:
      "Indexed over 100+ top-tier portfolios with sub-second search latency.",
  },
];

export function ProjectsSection() {
  return (
    <section id="projects" className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Featured <span className="text-neon-purple">Projects</span>
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
