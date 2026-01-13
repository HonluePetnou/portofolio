import { SectionHeader } from "@/components/shared/section-header";

export default function BlogPostPage() {
  return (
    <div className="py-20 text-center">
      <SectionHeader
        title="Coming Soon"
        subtitle="This article is currently being written."
      />
      <p className="text-gray-400">Check back later for full content.</p>
    </div>
  );
}
