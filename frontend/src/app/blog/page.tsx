import { GlassCard } from "@/components/ui/glass-card";
import { SectionHeader } from "@/components/shared/section-header";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Honlue Petnou Frederic Armel",
  description:
    "Insights on Quality Assurance, Frontend Engineering, and Product Mindset by Honlue Petnou Frederic Armel.",
};

const categories = [
  "Quality Assurance",
  "Frontend Engineering",
  "AI & APIs",
  "Product & Agility",
];

const articles = [
  {
    title: "Why Quality Assurance Is a Product Feature, Not a Phase",
    excerpt:
      "Shifting the mindset from 'catching bugs' to 'building reliability'. How BDD and automated testing create a safety net for rapid product iteration.",
    category: "Quality Assurance",
    date: "Oct 12, 2025",
    readTime: "5 min read",
    slug: "quality-assurance-product-feature",
  },
  {
    title: "Architecting Scalable Frontends with Next.js",
    excerpt:
      "Lessons learned from managing large-scale React applications. Component patterns, state management strategies, and performance optimization.",
    category: "Frontend Engineering",
    date: "Sep 28, 2025",
    readTime: "8 min read",
    slug: "architecting-scalable-frontends",
  },
  {
    title: "Integrating Gemini AI into Real-World Workflows",
    excerpt:
      "Moving beyond chatbots: How to use LLMs to solve specific business problems and enhance user decision-making.",
    category: "AI & APIs",
    date: "Aug 15, 2025",
    readTime: "6 min read",
    slug: "integrating-gemini-ai",
  },
];

export default function BlogPage() {
  return (
    <div className="py-10 max-w-7xl mx-auto px-4 md:px-8">
      <Breadcrumbs items={[{ label: "Blog", href: "/blog" }]} />

      <SectionHeader
        title="Engineering Insights"
        subtitle="Thoughts on technology, product, and quality."
      />

      {/* Featured Article */}
      <div className="mb-20">
        <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-neon-blue" />
          Featured
        </h2>
        <Link href={`/blog/${articles[0].slug}`} className="block group">
          <GlassCard className="group-hover:bg-white/10 transition-colors p-8 md:p-12 border-neon-blue/20">
            <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between mb-4">
              <Badge className="bg-neon-blue/10 text-neon-blue border-neon-blue/20 w-fit">
                {articles[0].category}
              </Badge>
              <span className="text-sm text-gray-400">
                {articles[0].date} • {articles[0].readTime}
              </span>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 group-hover:text-neon-blue transition-colors">
              {articles[0].title}
            </h3>
            <p className="text-lg text-gray-300 mb-6 max-w-3xl">
              {articles[0].excerpt}
            </p>
            <div className="flex items-center text-neon-blue font-semibold group-hover:translate-x-2 transition-transform">
              Read Article <ArrowRight className="ml-2 h-4 w-4" />
            </div>
          </GlassCard>
        </Link>
      </div>

      {/* Categories Filter (Visual only for now) */}
      <div className="flex flex-wrap gap-2 mb-10 justify-center">
        {categories.map((cat) => (
          <button
            key={cat}
            className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Recent Articles Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {articles.slice(1).map((article) => (
          <Link
            key={article.slug}
            href={`/blog/${article.slug}`}
            className="block group h-full"
          >
            <GlassCard className="h-full flex flex-col p-8 hover:border-white/30">
              <div className="flex justify-between items-start mb-4">
                <Badge
                  variant="outline"
                  className="text-xs text-neon-purple border-neon-purple/20 bg-neon-purple/5"
                >
                  {article.category}
                </Badge>
                <span className="text-xs text-gray-500">{article.date}</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-neon-blue transition-colors">
                {article.title}
              </h3>
              <p className="text-gray-400 text-sm grow">{article.excerpt}</p>
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center text-sm text-gray-300 group-hover:text-white">
                Read more <ArrowRight className="ml-2 h-3 w-3" />
              </div>
            </GlassCard>
          </Link>
        ))}
      </div>
    </div>
  );
}
