"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { ExternalLink, Github } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export interface ProjectData {
  title: string;
  description: string;
  problem: string;
  solution: string;
  stack: string[];
  outcome: string;
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
    <GlassCard className="flex flex-col gap-6 h-full">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-neon-blue transition-colors">
            {project.title}
          </h3>
          <p className="text-gray-400 text-sm line-clamp-2">
            {project.description}
          </p>
        </div>
        <div className="flex gap-2">
          {project.links?.repo && (
            <Link
              href={project.links.repo}
              target="_blank"
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
            >
              <Github className="h-5 w-5" />
            </Link>
          )}
          {project.links?.demo && (
            <Link
              href={project.links.demo}
              target="_blank"
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
            >
              <ExternalLink className="h-5 w-5" />
            </Link>
          )}
        </div>
      </div>

      <div className="space-y-4 grow">
        <div>
          <h4 className="text-sm font-semibold text-neon-purple uppercase tracking-wider mb-1">
            Problem
          </h4>
          <p className="text-gray-300 text-sm">{project.problem}</p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-neon-blue uppercase tracking-wider mb-1">
            Solution
          </h4>
          <p className="text-gray-300 text-sm">{project.solution}</p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-green-400 uppercase tracking-wider mb-1">
            Outcome
          </h4>
          <p className="text-gray-300 text-sm">{project.outcome}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-white/10">
        {project.stack.map((tech) => (
          <Badge
            key={tech}
            variant="outline"
            className="bg-white/5 border-white/10 text-xs font-normal"
          >
            {tech}
          </Badge>
        ))}
      </div>
    </GlassCard>
  );
}
