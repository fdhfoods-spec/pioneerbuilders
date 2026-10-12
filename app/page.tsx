import { HeroSection } from "@/components/home/HeroSection";
import { HeritageSection } from "@/components/home/HeritageSection";
import { ExperienceSection } from "@/components/home/ExperienceSection";
import { BlueprintReveal } from "@/components/home/BlueprintReveal";
import { ServicesSection } from "@/components/home/ServicesSection";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { ConstructionProcess } from "@/components/home/ConstructionProcess";
import { LeadershipSection } from "@/components/home/LeadershipSection";
import { ProjectGallery } from "@/components/home/ProjectGallery";
import { TrustSection } from "@/components/home/TrustSection";
import { FinalCtaSection } from "@/components/home/FinalCtaSection";

export default function HomePage() {
  return (
    <div className="relative">
      {/* Section 2: Cinematic Hero */}
      <HeroSection />

      {/* Section 3: Heritage (Since 1987) */}
      <HeritageSection />

      {/* Section 4: Company Experience */}
      <ExperienceSection />

      {/* Section 5: Signature Blueprint-to-Building Transition */}
      <BlueprintReveal />

      {/* Section 6: Services (Seven Building Disciplines) */}
      <ServicesSection />

      {/* Section 7: Featured Projects Portfolio */}
      <FeaturedProjects />

      {/* Section 8: Construction Process (6-Stage Methodology) */}
      <ConstructionProcess />

      {/* Section 9: Leadership & Background */}
      <LeadershipSection />

      {/* Section 10: Architectural Project Gallery */}
      <ProjectGallery />

      {/* Section 11: Trust & Testimonials (Omitted until verified) */}
      <TrustSection />

      {/* Section 12: Final Engagement CTA */}
      <FinalCtaSection />
    </div>
  );
}
