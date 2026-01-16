import { HeroSection } from "@/components/home/hero-section";
import { AboutSection } from "@/components/home/about-section";
import { TechStack } from "@/components/home/tech-stack";
import { ProjectsSection } from "@/components/home/projects-section";
import { ExperienceSection } from "@/components/home/experience-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { BlogSection } from "@/components/home/blog-section";
import { ContactSection } from "@/components/home/contact-section";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <HeroSection />
      <AboutSection />
      <TechStack />
      <ProjectsSection />
      <ExperienceSection />
      <TestimonialsSection />
      <BlogSection />
      <ContactSection />
    </div>
  );
}
