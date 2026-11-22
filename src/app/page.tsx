import { CartProvider } from '@/components/CartProvider'
import { Navbar } from '@/components/Navbar'
import { Hero } from '@/components/Hero'
import { ThreeStageTimeline } from '@/components/ThreeStageTimeline'
import { MaterialsSafety } from '@/components/MaterialsSafety'
import { VariantSelector } from '@/components/VariantSelector'
import { ProductVariants } from '@/components/ProductVariants'
import { Reviews } from '@/components/Reviews'
import { FAQAccordion } from '@/components/FAQAccordion'
import { CTA } from '@/components/CTA'
import { Footer } from '@/components/Footer'
import { CartDrawer } from '@/components/CartDrawer'

export default function HomePage() {
  return (
    <CartProvider>
      <Navbar />
      <main className="min-h-screen">
        <Hero />
        <ThreeStageTimeline />
        <MaterialsSafety />
        <VariantSelector />
        <ProductVariants />
        <Reviews />
        <FAQAccordion />
        <CTA />
        <Footer />
        <CartDrawer />
      </main>
    </CartProvider>
  )
}