"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { SectionHeader } from "@/components/shared/section-header";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";

const recentPosts = [
  {
    title: "Why Quality Assurance Is a Product Feature, Not a Phase",
    excerpt:
      "Shifting the mindset from 'catching bugs' to 'building reliability'. How BDD and automated testing create a safety net for rapid product iteration.",
    category: "Quality Assurance",
    date: "Oct 12, 2025",
    slug: "quality-assurance-product-feature",
  },
  {
    title: "Architecting Scalable Frontends with Next.js",
    excerpt:
      "Lessons learned from managing large-scale React applications. Component patterns, state management strategies, and performance optimization.",
    category: "Frontend Engineering",
    date: "Sep 28, 2025",
    slug: "architecting-scalable-frontends",
  },
  {
    title: "Integrating Gemini AI into Real-World Workflows",
    excerpt:
      "Moving beyond chatbots: How to use LLMs to solve specific business problems and enhance user decision-making.",
    category: "AI & APIs",
    date: "Aug 15, 2025",
    slug: "integrating-gemini-ai",
  },
];

export function BlogSection() {
  return (
    <section id="blog" className="py-24 scroll-mt-12 overflow-x-hidden">
      <div className="container mx-auto px-4 md:px-8 lg:px-16 xl:px-24">
        <SectionHeader
          title="Engineering Insights"
          subtitle="Latest thoughts on technology, product, and quality."
        />

        <div className="grid gap-6 md:grid-cols-3 mb-12">
          {recentPosts.map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link href={`/blog/${post.slug}`} className="block group h-full">
                <GlassCard className="h-full flex flex-col p-8 group-hover:border-neon-blue/30 transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <Badge
                      variant="outline"
                      className="text-xs text-neon-blue border-neon-blue/20 bg-neon-blue/5"
                    >
                      {post.category}
                    </Badge>
                    <span className="text-xs text-gray-500">{post.date}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-neon-blue transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm grow">
                    {post.excerpt}
                  </p>
                  <div className="mt-6 pt-4 border-t border-black/5 dark:border-white/5 flex items-center text-sm text-gray-700 dark:text-gray-300 group-hover:text-neon-blue transition-colors">
                    Read more <ArrowRight className="ml-2 h-3 w-3" />
                  </div>
                </GlassCard>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center">
          <Link href="/blog">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-8 py-3 rounded-full bg-neon-blue text-white font-semibold hover:shadow-[0_0_20px_rgba(14,165,233,0.4)] transition-all shadow-lg"
            >
              View All Posts
              <BookOpen className="w-5 h-5" />
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  );
}
