import { ProjectCard, ProjectData } from "@/components/projects/project-card";
import { SectionHeader } from "@/components/shared/section-header";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | Honlue Petnou Frederic Armel",
  description:
    "Case studies of my work in Frontend Engineering, QA, and Product Development by Honlue Petnou Frederic Armel.",
};

const projects: ProjectData[] = [
  {
    title: "OneControl",
    description:
      "AI-integrated hackathon project optimizing resource management.",
    image: "/projects/onecontrol.png",
    stack: ["Gemini AI", "Next.js", "Python"],
    highlightedStack: "Gemini AI",
  },
  {
    title: "Feedly",
    description:
      "Health analytics application for personalized nutrition tracking.",
    image: "/projects/feedly.png",
    stack: ["FastAPI", "Python", "React", "PostgreSQL"],
    highlightedStack: "PostgreSQL",
  },
  {
    title: "Tech Portfolio Directory",
    description: "Aggregator for tech portfolios with advanced filtering.",
    image: "/projects/portfolio-directory.png",
    stack: ["Next.js", "Firebase", "Puppeteer", "Tailwind CSS"],
    highlightedStack: "Firebase",
  },
  {
    title: "Ubuntu App / Library Manager",
    description: "Desktop-grade library management system.",
    image: "/projects/ubuntu-lib.png", // Added image path
    stack: ["React", "Java EE", "Electron", "MySQL"],
    highlightedStack: "Electron",
  },
];

export default function ProjectsPage() {
  return (
    <div className="py-10 max-w-7xl mx-auto px-4 md:px-8">
      <Breadcrumbs items={[{ label: "Projects", href: "/projects" }]} />

      <SectionHeader
        title="Selected Projects"
        subtitle="Case studies in reliability and impact."
      />
      <div className="grid gap-8 md:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </div>
  );
}
