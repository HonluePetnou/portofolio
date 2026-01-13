import { ProjectCard, ProjectData } from "@/components/projects/project-card";
import { SectionHeader } from "@/components/shared/section-header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | Frédéric Armel Petnou",
  description:
    "Case studies of my work in Frontend Engineering, QA, and Product Development.",
};

const projects: ProjectData[] = [
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
  {
    title: "Ubuntu App / Library Manager",
    description: "Desktop-grade library management system.",
    problem: "Legacy library software was clunky and platform-dependent.",
    solution:
      "Created a modern, cross-platform interface managing thousands of book records.",
    stack: ["React", "Java EE", "Electron", "MySQL"],
    outcome: "Reduced check-out time by 40% in user testing trials.",
  },
];

export default function ProjectsPage() {
  return (
    <div className="py-10">
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
