'use client'

import Image from 'next/image'
import { VARIANTS } from '@/lib/product'

export function Hero() {
  const mediumPrice = VARIANTS.find(v => v.id === 'medium')?.price || 8900

  return (
    <section id="hero" className="relative section bg-cream" aria-labelledby="hero-heading">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Copy */}
          <div>
            {/* Trust badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-teal-50 px-4 py-1.5 text-sm font-medium text-teal-700 mb-6">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-teal-600"></span>
              </span>
              New: ThawVault 2.0 — Deeper freeze chamber, reinforced skirt
            </div>

            {/* Headline */}
            <h1 id="hero-heading" className="heading-xl mb-6">
              Keep Your Dog Busy for{' '}
              <span className="text-terracotta-600">1.5–2+ Hours</span>
              {' '}While You&apos;re Away
            </h1>

            {/* Subtext */}
            <p className="text-lg sm:text-xl text-charcoal-600 mb-10 max-w-xl leading-relaxed">
              The ThawVault is a zero-electronics, 3-stage enrichment dome combining a silicone snuffle skirt,
              insulated frozen lick seal, and weighted slow-release core for maximum engagement.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <a
                href="#variants"
                className="btn-terracotta text-lg px-8 py-4 w-full sm:w-auto text-center"
              >
                Get ThawVault — {`$${(mediumPrice / 100).toFixed(0)}`}
              </a>
              <a
                href="#timeline"
                className="btn-secondary text-lg px-8 py-4 w-full sm:w-auto text-center"
              >
                See How It Works
              </a>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center gap-6 text-sm font-medium text-charcoal-700">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-teal-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                <span>Free shipping on $75+</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-teal-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                <span>60-day guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-teal-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                <span>Vet-approved materials</span>
              </div>
            </div>
          </div>

          {/* Right: Product Image */}
          <div className="relative">
            <div className="aspect-[4/5] lg:aspect-[3/4] max-w-lg mx-auto lg:mx-0">
              <div className="relative w-full h-full rounded-3xl overflow-hidden bg-gradient-to-br from-teal-50 to-cream">
                <Image
                  src="/images/thawvault-p3.png"
                  alt="ThawVault 3-stage enrichment dome - hero view"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              {/* Floating feature badges */}
              <div className="absolute -top-4 -right-4 lg:-top-8 lg:-right-8">
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-teal-100 w-56">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center text-2xl">❄️</div>
                    <div>
                      <p className="font-semibold text-charcoal-900">Frozen 2.5+ hrs</p>
                      <p className="text-xs text-charcoal-500">Insulated gel core</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-terracotta-50 flex items-center justify-center text-2xl">🔍</div>
                    <div>
                      <p className="font-semibold text-charcoal-900">Forage 20 min</p>
                      <p className="text-xs text-charcoal-500">Silicone snuffle skirt</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center text-2xl">⚖️</div>
                    <div>
                      <p className="font-semibold text-charcoal-900">Wobble 60+ min</p>
                      <p className="text-xs text-charcoal-500">Weighted core unlock</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-4 left-4 lg:bottom-8 lg:left-8">
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-teal-100">
                  <p className="font-heading font-bold text-charcoal-900">Zero Electronics</p>
                  <p className="text-sm text-charcoal-500">No batteries. No apps. No charging. Ever.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}