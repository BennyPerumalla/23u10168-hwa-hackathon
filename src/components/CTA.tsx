'use client'

import { VARIANTS } from '@/lib/product'

export function CTA() {
  const mediumVariant = VARIANTS.find(v => v.id === 'medium')
  const price = mediumVariant ? `$${(mediumVariant.price / 100).toFixed(0)}` : '$89'

  return (
    <section className="py-20 lg:py-28 bg-primary-600" aria-labelledby="cta-heading">
      <div className="container-custom text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary-500/20 px-4 py-1.5 text-sm font-medium text-primary-100 mb-6">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            Limited stock — ships within 1 business day
          </div>
          <h2 id="cta-heading" className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Ready to Transform Your Dog&apos;s Alone Time?
          </h2>
          <p className="text-primary-100 text-lg mb-8 leading-relaxed">
            Join 50,000+ dog parents who&apos;ve discovered the power of zero-electronics enrichment.
            60-day satisfaction guarantee — if your dog doesn&apos;t love it, we&apos;ll take it back.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#variants"
              className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-4 text-lg font-semibold text-primary-600 shadow-lg hover:bg-primary-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors duration-200 w-full sm:w-auto"
            >
              Get Your ThawVault — {price}
            </a>
            <a
              href="#faq"
              className="inline-flex items-center justify-center rounded-lg border-2 border-white px-8 py-4 text-lg font-semibold text-white hover:bg-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors duration-200 w-full sm:w-auto"
            >
              Still Have Questions?
            </a>
          </div>
          <p className="mt-8 text-primary-200 text-sm">
            Free US shipping on $75+ · 60-day returns · Lifetime warranty on Large variant
          </p>
        </div>
      </div>
    </section>
  )
}