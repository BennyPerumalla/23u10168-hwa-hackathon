'use client'

const stages = [
  {
    number: 1,
    title: 'Forage & Discover',
    timeRange: '0–20 min',
    icon: '🔍',
    color: 'teal',
    description:
      'Dog sniffs, nudges, and paws through the silicone snuffle skirt to find hidden kibble. Engages natural foraging instincts — nose work burns mental energy fast.',
    details: [
      '12–20 flexible silicone flaps (size-dependent)',
      'Hides up to 1 cup of kibble or treats',
      'Flaps return to position — no reset needed',
      'Soft, quiet, paw-friendly material',
    ],
  },
  {
    number: 2,
    title: 'Lick & Chill',
    timeRange: '20–60 min',
    icon: '🧊',
    color: 'terracotta',
    description:
      'Frozen broth, yogurt, or pumpkin in the insulated lick seal. Licking releases endorphins, calms anxiety, and the double-wall insulation keeps it frozen 2–3× longer than a bowl.',
    details: [
      'Vacuum-sealed gel core holds freeze 2+ hours',
      '1.5–4 cup capacity (size-dependent)',
      'Textured surface prolongs licking',
      'Removable for easy filling & cleaning',
    ],
  },
  {
    number: 3,
    title: 'Wobble & Unlock',
    timeRange: '60+ min',
    icon: '⚖️',
    color: 'teal',
    description:
      'Bottom-weighted core wobbles unpredictably, dispensing 1–3 pieces per cycle. Dog learns to manipulate angle and force — problem-solving that sustains engagement past the freeze.',
    details: [
      'Self-righting weighted base (TPR + steel shot)',
      'Adjustable dispensing difficulty',
      'Works with kibble up to 15 mm',
      'No electronics — pure physics',
    ],
  },
]

export function ThreeStageTimeline() {
  return (
    <section id="timeline" className="section bg-cream" aria-labelledby="timeline-heading">
      <div className="container-custom">
        <header className="text-center max-w-3xl mx-auto mb-16">
          <h2 id="timeline-heading" className="heading-lg mb-4">
            How ThawVault Stretches Engagement to <span className="text-terracotta-600">2+ Hours</span>
          </h2>
          <p className="text-charcoal-600">
            Three distinct stages. Three different instincts. One continuous enrichment session.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {stages.map((stage) => (
            <article
              key={stage.number}
              className="card p-6 lg:p-8 flex flex-col h-full"
            >
              {/* Stage number + icon */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">{stage.icon}</span>
                <div>
                  <p className="text-sm font-semibold text-terracotta-600 uppercase tracking-wide">Stage {stage.number}</p>
                  <h3 className="font-heading text-xl font-bold text-charcoal-900">{stage.title}</h3>
                </div>
              </div>

              {/* Time badge */}
              <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-sm font-semibold mb-4">
                <span className="w-2 h-2 rounded-full bg-teal-600" aria-hidden="true"></span>
                <span>{stage.timeRange}</span>
              </div>

              {/* Description */}
              <p className="text-charcoal-600 leading-relaxed mb-6 flex-1">{stage.description}</p>

              {/* Details */}
              <ul className="space-y-3" role="list">
                {stage.details.map((detail, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <svg className="w-5 h-5 flex-shrink-0 mt-0.5 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-charcoal-700 text-sm">{detail}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}