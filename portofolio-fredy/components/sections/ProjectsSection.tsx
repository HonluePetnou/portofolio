"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { MoveRight } from "lucide-react";

const categories = [
  "All",
  "App Design",
  "Web Design",
  "Dashboard",
  "Wireframe",
];

const projects = [
  {
    category: "App Design",
    title: "Beauty Product - Ecommerce",
    subtitle: "Mobile App Solution",
    image:
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800&auto=format&fit=crop",
  },
  {
    category: "App Design",
    title: "Coffee Shop App",
    subtitle: "Mobile App Solution",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop",
  },
  {
    category: "Web Design",
    title: "Healthcare Dashboard",
    subtitle: "Web Application",
    image:
      "https://images.unsplash.com/photo-1542744094-3a31f272c490?q=80&w=800&auto=format&fit=crop",
  },
  {
    category: "Web Design",
    title: "Fashion Store",
    subtitle: "Web Application",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800&auto=format&fit=crop",
  },
];

export function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter(
          (p) =>
            p.category === activeCategory ||
            (activeCategory === "Web Design" && p.category === "Web Design"),
        ); // Simplified logic

  return (
    <section className="py-32 bg-gray-50" id="projects">
      <div className="container mx-auto px-8 md:px-24 lg:px-40">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <span className="text-gray-500 font-medium uppercase tracking-wider">
              - My Portfolio
            </span>
            <h2 className="text-4xl font-bold text-primary mt-2">
              My Latest Projects
            </h2>
          </div>
          <button className="hidden md:flex items-center gap-2 bg-primary text-white px-6 py-2 rounded-full hover:bg-primary/90 transition-colors">
            View In Dribbble <MoveRight size={16} />
          </button>
        </div>

        {/* Categories */}
        <div className="flex overflow-x-auto gap-4 mb-12 pb-4 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full font-medium whitespace-nowrap transition-all ${
                activeCategory === category
                  ? "bg-secondary text-primary"
                  : "bg-white text-gray-500 hover:bg-gray-100"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              layout
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="group bg-white p-4 rounded-3xl shadow-sm hover:shadow-xl transition-all"
            >
              <div className="relative h-[300px] lg:h-[400px] w-full bg-gray-100 rounded-2xl overflow-hidden mb-6">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="flex justify-between items-end px-2">
                <div>
                  <h3 className="text-xl font-bold text-primary">
                    {project.title}
                  </h3>
                  <p className="text-gray-500">{project.subtitle}</p>
                </div>
                <button className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all">
                  <MoveRight size={18} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
