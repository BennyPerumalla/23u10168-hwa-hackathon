'use client'

import { VARIANTS, getVariantById, formatPrice } from '@/lib/product'

const specCards = [
  {
    icon: '🥣',
    title: 'Snuffle Skirt',
    material: 'LFGB-Certified Platinum Silicone',
    specs: 'BPA-free, phthalate-free, lead-free, PVC-free',
    details: [
      'Platinum-cured (not peroxide) — no chemical off-gassing',
      'Passes LFGB §30 & 31 (stricter than FDA GRAS)',
      'Tear-resistant mesh core in Large variant',
      'One-piece molded flaps — no seams to trap bacteria',
      'Temperature range: -40°F to 450°F / -40°C to 230°C',
    ],
    certifications: ['LFGB', 'FDA 21 CFR 177.2600', 'CA Prop 65 Compliant'],
  },
  {
    icon: '❄️',
    title: 'Frozen Lick Seal',
    material: 'Double-Wall Insulated Silicone + Vacuum Gel Core',
    specs: 'Food-grade inner chamber, insulated air gap',
    details: [
      'Inner chamber: platinum silicone, direct food contact safe',
      'Vacuum-sealed gel core: non-toxic, holds freeze 2–3× longer',
      'Textured licking surface prolongs engagement',
      'Removable for filling — no funnels needed',
      'Wide opening for easy spoon access',
    ],
    certifications: ['LFGB', 'FDA 21 CFR 177.2600', 'NSF-51 Equivalent'],
  },
  {
    icon: '⚙️',
    title: 'Weighted Core',
    material: 'Food-Safe TPR + Encapsulated Steel Shot',
    specs: 'Encapsulated weight, single-piece molding',
    details: [
      'TPR body: food-safe additives only, shore 70A hardness',
      'Steel shot fully encapsulated — zero exposure risk',
      'Self-righting geometry for unpredictable wobble',
      'Dispenses 1–3 pieces per cycle (kibble ≤15 mm)',
      'Large variant: reinforced walls for power chewers',
    ],
    certifications: ['FDA 21 CFR 177.2600', 'REACH Compliant', 'ASTM F963'],
  },
  {
    icon: '🏠',
    title: 'Suction Base',
    material: 'Food-Grade Silicone with Micro-Suction Texture',
    specs: 'No adhesives, works on tile, hardwood, laminate',
    details: [
      'Micro-suction array — holds on smooth surfaces',
      'Releases with gentle peel — no residue',
      'Same LFGB platinum silicone as skirt',
      'Wide stance on Large variant for stability',
      'Dishwasher safe with rest of unit',
    ],
    certifications: ['LFGB', 'FDA 21 CFR 177.2600'],
  },
]

type VariantId = 'small' | 'medium' | 'large' | 'two-pack'

interface ComparisonRow {
  feature: string
  key: string
  type: 'check' | 'text'
  values: Record<VariantId, boolean | string>
}

const comparisonRows: ComparisonRow[] = [
  { feature: 'Material', key: 'material', type: 'text', values: { small: '', medium: '', large: '', 'two-pack': '' } },
  { feature: 'Food-Grade Certified', key: 'foodGrade', type: 'check', values: { small: true, medium: true, large: true, 'two-pack': true } },
  { feature: 'BPA / Phthalate Free', key: 'bpaFree', type: 'check', values: { small: true, medium: true, large: true, 'two-pack': true } },
  { feature: 'Dishwasher Safe (Top Rack)', key: 'dishwasher', type: 'check', values: { small: true, medium: true, large: true, 'two-pack': true } },
  { feature: 'Freezer Safe (-40°F)', key: 'freezer', type: 'check', values: { small: true, medium: true, large: true, 'two-pack': true } },
  { feature: 'Lifetime Chew Warranty', key: 'lifetimeWarranty', type: 'check', values: { small: false, medium: false, large: true, 'two-pack': false } },
  { feature: 'Diameter', key: 'diameter', type: 'text', values: { small: '4 in / 10 cm', medium: '5.5 in / 14 cm', large: '7 in / 18 cm', 'two-pack': '5.5 in / 14 cm (×2)' } },
  { feature: 'Lick Seal Capacity', key: 'capacity', type: 'text', values: { small: '1.5 cups / 350 ml', medium: '2.5 cups / 590 ml', large: '4 cups / 950 ml', 'two-pack': '2.5 cups / 590 ml (×2)' } },
  { feature: 'Freeze Hold (Room Temp)', key: 'freezeHold', type: 'text', values: { small: '2+ hours', medium: '2.5+ hours', large: '3+ hours', 'two-pack': '2.5+ hours each' } },
  { feature: 'Dog Weight Range', key: 'weightRange', type: 'text', values: { small: 'Under 15 kg', medium: 'Under 15 kg', large: '15 kg+', 'two-pack': 'Under 15 kg (rotation)' } },
]

export function MaterialsSafety() {
  return (
    <section id="materials" className="section bg-cream" aria-labelledby="materials-heading">
      <div className="container-custom">
        <header className="text-center max-w-3xl mx-auto mb-16">
          <h2 id="materials-heading" className="heading-lg mb-4">
            Materials That Meet the Highest Standard
          </h2>
          <p className="text-charcoal-600">
            Every component is food-grade, lab-tested, and built for daily use. No compromises.
          </p>
        </header>

        {/* 2x2 Spec Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {specCards.map((spec) => (
            <article key={spec.title} className="card p-6 h-full">
              <div className="text-4xl mb-3">{spec.icon}</div>
              <h3 className="font-heading text-lg font-bold text-charcoal-900 mb-1">{spec.title}</h3>
              <p className="text-sm text-terracotta-600 font-medium mb-3">{spec.material}</p>
              <p className="text-sm text-charcoal-500 mb-4">{spec.specs}</p>
              <ul className="space-y-2 mb-4" role="list">
                {spec.details.slice(0, 3).map((detail, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-charcoal-600">
                    <svg className="w-4 h-4 flex-shrink-0 mt-0.5 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-4 border-t border-teal-100">
                <p className="text-xs text-charcoal-500">+{spec.details.length - 3} more specs</p>
              </div>
            </article>
          ))}
        </div>

        {/* Horizontal-scroll Comparison Table */}
        <div className="card overflow-hidden mb-16">
          <div className="p-6 border-b border-teal-100">
            <h3 className="heading-md mb-1">Variant Comparison</h3>
            <p className="text-sm text-charcoal-500">Scroll horizontally on mobile to compare all sizes</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-left" role="table">
              <thead>
                <tr className="bg-teal-50 border-b border-teal-100">
                  <th className="p-4 font-heading font-semibold text-charcoal-900 sticky left-0 z-10 bg-teal-50">Feature</th>
                  {VARIANTS.map((variant) => (
                    <th key={variant.id} className="p-4 text-center sticky left-0 z-10 bg-teal-50">
                      <div className="flex flex-col items-center gap-1">
                        {variant.badge && (
                          <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-terracotta-100 text-terracotta-700">
                            {variant.badge}
                          </span>
                        )}
                        <p className="font-heading font-semibold text-charcoal-900">{variant.name}</p>
                        <p className="text-xs text-charcoal-500">{variant.weightRange}</p>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-teal-100">
                {comparisonRows.map((row) => (
                  <tr key={row.feature} className="hover:bg-teal-50/50">
                    <td className="p-4 font-medium text-charcoal-700 sticky left-0 z-10 bg-white">{row.feature}</td>
                    {VARIANTS.map((variant) => (
                      <td key={variant.id} className="p-4 text-center">
                        {row.type === 'check' ? (
                          row.values[variant.id] ? (
                            <svg className="w-6 h-6 mx-auto text-teal-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                          ) : (
                            <svg className="w-6 h-6 mx-auto text-charcoal-300" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/></svg>
                          )
                        ) : row.type === 'text' ? (
                          <span className="text-sm text-charcoal-900 font-mono">{row.values[variant.id]}</span>
                        ) : (
                          <span className="text-sm text-charcoal-900">{row.values[variant.id]}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Safety Badges */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-16">
          {[
            { label: 'LFGB Certified', description: 'European food-contact gold standard' },
            { label: 'BPA / Phthalate Free', description: 'Zero endocrine disruptors' },
            { label: 'Third-Party Lab Tested', description: 'Every batch, every component' },
            { label: 'Vet Reviewed', description: 'Enrichment protocol approved' },
            { label: '60-Day Guarantee', description: 'Full refund if dog doesn\'t love it' },
            { label: 'Lifetime Warranty (Large)', description: 'Chew-damage replacement' },
          ].map((badge, index) => (
            <div key={badge.label} className="card p-5 text-center">
              <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center mx-auto mb-3 text-teal-600 font-semibold text-sm leading-tight">
                {badge.label.split(' ').map(w => w[0]).join('')}
              </div>
              <p className="font-medium text-charcoal-900 text-sm mb-1">{badge.label}</p>
              <p className="text-xs text-charcoal-500">{badge.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}