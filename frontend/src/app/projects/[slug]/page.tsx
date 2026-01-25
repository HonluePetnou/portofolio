import { SectionHeader } from "@/components/shared/section-header";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";

export default function ProjectDetailsPage({
  params,
}: {
  params: { slug: string };
}) {
  // In a real app, you'd fetch project data based on params.slug
  // For now, we'll use placeholder content
  const projectTitle = params.slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 md:px-8">
      <Breadcrumbs
        items={[
          { label: "Projects", href: "/projects" },
          { label: projectTitle, href: `/projects/${params.slug}` },
        ]}
      />

      <div className="mb-12">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Projects
        </Link>

        <SectionHeader
          title={projectTitle}
          subtitle="A detailed look at the problem, solution, and outcome."
          className="text-left mb-0"
        />
      </div>

      <div className="grid md:grid-cols-[1fr_350px] gap-12">
        <div className="space-y-12">
          {/* Main Content would go here */}
          <div className="aspect-video w-full rounded-[40px] bg-white/5 border border-white/10 flex items-center justify-center">
            <span className="text-gray-500 italic">Project Preview Image</span>
          </div>

          <div className="prose prose-invert max-w-none">
            <h2 className="text-2xl font-bold text-white mb-4">
              The Challenge
            </h2>
            <p className="text-gray-400 leading-relaxed">
              Details about the technical and product challenges faced during
              development. This section covers the initial problem statement and
              the constraints involved.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">
              The Strategy
            </h2>
            <p className="text-gray-400 leading-relaxed">
              How we approached the problem, the architectural decisions made,
              and the specific technologies chosen to overcome obstacles.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">
              The Impact
            </h2>
            <p className="text-gray-400 leading-relaxed">
              Measurable results, user feedback, and the overall outcome of the
              project.
            </p>
          </div>
        </div>

        <aside className="space-y-8">
          <div className="p-8 rounded-[32px] bg-white/5 border border-white/10 backdrop-blur-md">
            <h3 className="font-bold mb-6 uppercase tracking-widest text-[11px] text-gray-500">
              Technology Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {["Next.js", "TypeScript", "Tailwind CSS", "Gemini AI"].map(
                (tech) => (
                  <Badge
                    key={tech}
                    variant="outline"
                    className="bg-neon-blue/10 border-neon-blue/20 text-neon-blue"
                  >
                    {tech}
                  </Badge>
                ),
              )}
            </div>

            <div className="mt-10 space-y-4">
              <button className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-neon-blue text-white font-bold transition-all hover:shadow-[0_0_20px_rgba(14,165,233,0.4)]">
                Live Demo <ExternalLink className="w-4 h-4" />
              </button>
              <button className="w-full flex items-center justify-center gap-2 py-3 rounded-full border border-white/10 text-white font-medium hover:bg-white/5 transition-all">
                View Repository <Github className="w-4 h-4" />
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
