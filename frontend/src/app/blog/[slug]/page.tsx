import { SectionHeader } from "@/components/shared/section-header";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar } from "lucide-react";

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  // In a real app, you'd fetch blog data based on params.slug
  const postTitle = params.slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <div className="py-10 max-w-4xl mx-auto px-4 md:px-8">
      <Breadcrumbs
        items={[
          { label: "Blog", href: "/blog" },
          { label: postTitle, href: `/blog/${params.slug}` },
        ]}
      />

      <div className="mb-12">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Insights
        </Link>

        <div className="flex gap-4 mb-6 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            Oct 12, 2025
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />5 min read
          </span>
        </div>

        <SectionHeader title={postTitle} className="text-left mb-0" />
      </div>

      <article className="prose prose-invert prose-lg max-w-none">
        <div className="aspect-video w-full rounded-[40px] bg-white/5 border border-white/10 flex items-center justify-center mb-12">
          <span className="text-gray-500 italic">Article Illustration</span>
        </div>

        <p className="text-xl text-gray-300 leading-relaxed mb-8">
          Detailed thoughts on {postTitle} will be presented here. This article
          explores the deep intersections of quality engineering and product
          strategy.
        </p>

        <h2 className="text-2xl font-bold text-white mb-4">Introduction</h2>
        <p className="text-gray-400 leading-relaxed mb-6">
          Setting the stage for a discussion on modern engineering practices.
          Why {postTitle} matters in today's rapid-scaling environment.
        </p>

        <div className="p-8 rounded-[32px] bg-neon-blue/5 border border-neon-blue/20 my-10 italic text-gray-300">
          "Quality is not an act, it is a habit. When integrated into the
          product lifecycle, it becomes a competitive advantage."
        </div>

        <h2 className="text-2xl font-bold text-white mb-4">Core Principles</h2>
        <p className="text-gray-400 leading-relaxed mb-6">
          Exploring the fundamental pillars that make this approach successful.
          Emphasis on automation, collaboration, and continuous feedback loops.
        </p>
      </article>
    </div>
  );
}
