import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { SocialProof } from "@/components/home/new-sections/SocialProof";
import { HybridConcept } from "@/components/home/new-sections/HybridConcept";
import { SectorSolutions } from "@/components/home/new-sections/SectorSolutions";
import { FeaturedProjects } from "@/components/home/new-sections/FeaturedProjects";
import { Testimonials } from "@/components/home/new-sections/Testimonials";
import { BlogSection } from "@/components/home/new-sections/BlogSection";
import { FAQ } from "@/components/home/new-sections/FAQ";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <SocialProof />
      <HybridConcept />
      <SectorSolutions />
      <FeaturedProjects />
      <Testimonials />
      <BlogSection />
      <FAQ />
    </Layout>
  );
};

export default Index;
