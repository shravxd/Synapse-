import { HeroSection } from "@/components/home/hero-section"
import { StatsSection } from "@/components/home/stats-section"
import { HowItWorks } from "@/components/home/how-it-works"
import { CategoriesSection } from "@/components/home/categories-section"
import { TrendingInfluencers } from "@/components/home/trending-influencers"
import { CtaSection } from "@/components/home/cta-section"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <CategoriesSection />
      <TrendingInfluencers />
      <HowItWorks />
      <CtaSection />
    </>
  )
}
