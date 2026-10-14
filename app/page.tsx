import { HeroSection } from "@/components/home/HeroSection";
import { LeadershipSection } from "@/components/home/LeadershipSection";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { HeritageSection } from "@/components/home/HeritageSection";
import { ExperienceSection } from "@/components/home/ExperienceSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { ConstructionProcess } from "@/components/home/ConstructionProcess";
import { TrustSection } from "@/components/home/TrustSection";
import { FinalCtaSection } from "@/components/home/FinalCtaSection";

export default function HomePage() {
  return (
    <div className="relative">
      {/* Section 1: Cinematic Hero */}
      <HeroSection />

      {/* Section 2: Founder & Leadership Profile */}
      <LeadershipSection />

      {/* Section 3: Featured Projects Portfolio */}
      <FeaturedProjects />

      {/* Section 4: Heritage (Since 1987) */}
      <HeritageSection />

      {/* Section 5: Company Experience & Confirmed Metrics */}
      <ExperienceSection />

      {/* Section 6: Services (Eight Building Disciplines) */}
      <ServicesSection />

      {/* Section 7: Construction Process (6-Stage Methodology) */}
      <ConstructionProcess />

      {/* Section 8: Client Perspectives & Testimonials */}
      <TrustSection />

      {/* Section 9: Final Engagement CTA */}
      <FinalCtaSection />
    </div>
  );
}
