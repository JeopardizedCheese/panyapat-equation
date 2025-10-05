import { Hero } from "@/components/landing/hero"
import { FeaturesGrid } from "@/components/landing/features-grid"
import { MathSection } from "@/components/landing/math-section"
import { Footer } from "@/components/landing/footer"

export default function HomePage() {
  return (
    <main className="bg-black text-white">
      <Hero />
      <FeaturesGrid/>
      <MathSection/>
      <Footer/>
    </main>
  )
}