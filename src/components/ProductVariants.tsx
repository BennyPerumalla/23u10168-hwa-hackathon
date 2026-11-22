'use client'

import Image from 'next/image'
import { VARIANTS, formatPrice, type Variant } from '@/lib/product'

export function ProductVariants() {
  return (
    <section id="compare" className="section bg-cream" aria-labelledby="compare-heading">
      <div className="container-custom">
        <header className="text-center max-w-3xl mx-auto mb-12">
          <h2 id="compare-heading" className="heading-lg mb-4">Compare All Sizes</h2>
          <p className="text-charcoal-600">Every variant includes the complete 3-stage system: snuffle skirt, frozen lick seal, and weighted core.</p>
        </header>

        <div className="overflow-x-auto">
          <table className="w-full text-left" role="table">
            <thead>
              <tr className="border-b-2 border-teal-200 bg-teal-50">
                <th className="p-4 lg:p-6 font-heading font-semibold text-charcoal-900">Feature</th>
                {VARIANTS.map((variant) => (
                  <th key={variant.id} className="p-4 lg:p-6 text-center">
                    <div className="flex flex-col items-center gap-2">
                      {variant.badge && (
                        <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-terracotta-100 text-terracotta-700">
                          {variant.badge}
                        </span>
                      )}
                      <p className="font-heading font-semibold text-charcoal-900">{variant.name}</p>
                      <p className="text-sm text-charcoal-500">{variant.weightRange}</p>
                      <p className="font-heading text-xl font-bold text-charcoal-900">{formatPrice(variant.price)}</p>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-teal-100">
              <tr>
                <td className="p-4 lg:p-6 font-medium text-charcoal-700">Best For</td>
                {VARIANTS.map((variant) => (
                  <td key={variant.id} className="p-4 lg:p-6 text-center text-charcoal-600">
                    {variant.id === 'small' && 'Small breeds & puppies (<15kg)'}
                    {variant.id === 'medium' && 'Most dogs under 15kg — our bestseller'}
                    {variant.id === 'large' && 'Large breeds 15kg+ & power chewers'}
                    {variant.id === 'two-pack' && 'Daily rotation / multi-dog homes'}
                  </td>
                ))}
              </tr>
              <tr className="bg-teal-50/50">
                <td className="p-4 lg:p-6 font-medium text-charcoal-700">Diameter</td>
                {VARIANTS.map((variant) => (
                  <td key={variant.id} className="p-4 lg:p-6 text-center font-mono text-charcoal-900">{variant.dimensions.diameter}</td>
                ))}
              </tr>
              <tr>
                <td className="p-4 lg:p-6 font-medium text-charcoal-700">Height</td>
                {VARIANTS.map((variant) => (
                  <td key={variant.id} className="p-4 lg:p-6 text-center font-mono text-charcoal-900">{variant.dimensions.height}</td>
                ))}
              </tr>
              <tr className="bg-teal-50/50">
                <td className="p-4 lg:p-6 font-medium text-charcoal-700">Lick Seal Capacity</td>
                {VARIANTS.map((variant) => (
                  <td key={variant.id} className="p-4 lg:p-6 text-center font-mono text-charcoal-900">{variant.dimensions.capacity}</td>
                ))}
              </tr>
              <tr>
                <td className="p-4 lg:p-6 font-medium text-charcoal-700">Snuffle Capacity</td>
                {VARIANTS.map((variant) => (
                  <td key={variant.id} className="p-4 lg:p-6 text-center text-charcoal-600">
                    {variant.id === 'small' && 'Up to 1 cup'}
                    {variant.id === 'medium' && 'Up to 1.5 cups'}
                    {variant.id === 'large' && 'Up to 2 cups'}
                    {variant.id === 'two-pack' && 'Up to 1.5 cups × 2'}
                  </td>
                ))}
              </tr>
              <tr className="bg-teal-50/50">
                <td className="p-4 lg:p-6 font-medium text-charcoal-700">Unit Weight</td>
                {VARIANTS.map((variant) => (
                  <td key={variant.id} className="p-4 lg:p-6 text-center font-mono text-charcoal-900">{variant.dimensions.weight}</td>
                ))}
              </tr>
              <tr>
                <td className="p-4 lg:p-6 font-medium text-charcoal-700">Freeze Hold (room temp)</td>
                {VARIANTS.map((variant) => (
                  <td key={variant.id} className="p-4 lg:p-6 text-center text-charcoal-600">
                    {variant.id === 'small' && '2+ hours'}
                    {variant.id === 'medium' && '2.5+ hours'}
                    {variant.id === 'large' && '3+ hours'}
                    {variant.id === 'two-pack' && '2.5+ hours each'}
                  </td>
                ))}
              </tr>
              <tr className="bg-teal-50/50">
                <td className="p-4 lg:p-6 font-medium text-charcoal-700">Kibble Size</td>
                {VARIANTS.map((variant) => (
                  <td key={variant.id} className="p-4 lg:p-6 text-center font-mono text-charcoal-900">≤ 15 mm / 0.6 in</td>
                ))}
              </tr>
              <tr>
                <td className="p-4 lg:p-6 font-medium text-charcoal-700">Cleaning</td>
                {VARIANTS.map((variant) => (
                  <td key={variant.id} className="p-4 lg:p-6 text-center text-charcoal-600">Top-rack dishwasher safe</td>
                ))}
              </tr>
              <tr className="bg-teal-50/50">
                <td className="p-4 lg:p-6 font-medium text-charcoal-700">Warranty</td>
                {VARIANTS.map((variant) => (
                  <td key={variant.id} className="p-4 lg:p-6 text-center text-charcoal-600">
                    {variant.id === 'large' ? 'Lifetime chew-damage warranty' : '60-day satisfaction guarantee'}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Quick pick cards */}
        <div className="mt-12 grid md:grid-cols-4 gap-6">
          {VARIANTS.map((variant) => (
            <article key={variant.id} className={`card p-6 text-center ${variant.popular ? 'ring-2 ring-terracotta-600 shadow-lg' : ''}`}>
              {variant.badge && (
                <span className="inline-block px-3 py-1 text-xs font-bold rounded-full bg-terracotta-100 text-terracotta-700 mb-3">
                  {variant.badge}
                </span>
              )}
              <div className="w-20 h-20 mx-auto mb-4 bg-teal-50 rounded-2xl flex items-center justify-center text-4xl">
                {variant.id === 'two-pack' ? '📦' : '🏔️'}
              </div>
              <h3 className="font-heading text-lg font-semibold text-charcoal-900 mb-1">{variant.name}</h3>
              <p className="text-sm text-charcoal-500 mb-3">{variant.weightRange}</p>
              <p className="font-heading text-2xl font-bold text-charcoal-900 mb-3">{formatPrice(variant.price)}</p>
              <p className="text-sm text-charcoal-500 mb-4">{variant.id === 'two-pack' ? 'Save $19 vs buying separately' : variant.features[0]}</p>
              <a
                href="#variants"
                className={`inline-flex items-center justify-center w-full py-2.5 px-4 rounded-lg text-sm font-semibold transition-colors ${
                  variant.popular ? 'btn-terracotta' : 'btn-outline'
                }`}
              >
                {variant.popular ? 'Buy Now' : 'Select'}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}