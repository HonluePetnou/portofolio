"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { ExternalLink, Github } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export interface ProjectData {
  title: string;
  description: string;
  image: string;
  stack: string[];
  links?: {
    demo?: string;
    repo?: string;
  };
}

interface ProjectCardProps {
  project: ProjectData;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <GlassCard className="group flex flex-col p-0 overflow-hidden border-0 bg-transparent hover:bg-transparent shadow-none hover:shadow-none hover:-translate-y-2 transition-all duration-500">
      {/* Image Container */}
      <div className="relative aspect-16/10 w-full rounded-2xl overflow-hidden border border-white/10 mb-6">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Subtle Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="space-y-3">
        <h3 className="text-2xl font-bold text-white group-hover:text-neon-blue transition-colors">
          {project.title}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 pt-2">
          {project.stack.map((tech) => (
            <Badge
              key={tech}
              variant="outline"
              className="bg-neon-blue/10 border-neon-blue/20 text-neon-blue text-[11px] font-medium px-2.5 py-0.5"
            >
              {tech}
            </Badge>
          ))}
        </div>
      </div>
    </GlassCard>
  );
}
