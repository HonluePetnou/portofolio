"use client";

import { GlassCard } from "@/components/ui/glass-card";
import {
  Code,
  Brain,
  Users,
  Search,
  LayoutTemplate,
  ShieldCheck,
} from "lucide-react";

const strengths = [
  {
    icon: Code,
    title: "Technical Leadership",
    description:
      "Guiding teams through complex technical challenges with clarity and confidence.",
  },
  {
    icon: Brain,
    title: "Product Thinking",
    description:
      "Aligning technical decisions with business goals and user needs.",
  },
  {
    icon: ShieldCheck,
    title: "Quality First",
    description:
      "Treating reliability and testing as non-negotiable product features.",
  },
  {
    icon: LayoutTemplate,
    title: "Frontend Architecture",
    description:
      "Designing scalable, maintainable, and performant frontend systems.",
  },
  {
    icon: Search,
    title: "Analytical Mindset",
    description:
      "Breaking down problems into solvable components with data-driven insights.",
  },
  {
    icon: Users,
    title: "Collaboration",
    description:
      "Bridging the gap between engineering, product, and design teams.",
  },
];

export function Strengths() {
  return (
    <div className="mt-20">
      <h2 className="mb-10 text-3xl font-bold text-white text-center">
        Personal Strengths
      </h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {strengths.map((item, index) => (
          <GlassCard
            key={index}
            className="flex flex-col items-center text-center p-6"
          >
            <div className="mb-4 p-3 rounded-full bg-white/5 text-neon-blue">
              <item.icon className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
            <p className="text-gray-400 text-sm">{item.description}</p>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
