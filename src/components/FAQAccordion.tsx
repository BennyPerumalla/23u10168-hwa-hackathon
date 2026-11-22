'use client'

import { useState } from 'react'

const faqs = [
  {
    question: 'How long does ThawVault keep my dog busy?',
    answer: 'Most dogs engage for 1.5 to 2+ hours per session. The frozen lick seal extends licking time significantly, while the weighted core and snuffle skirt provide varied enrichment that prevents boredom.',
  },
  {
    question: 'What size should I get for my dog?',
    answer: 'Small: under 15 kg / 33 lbs (terriers, puppies, small breeds). Medium: under 15 kg / 33 lbs but higher drive (border collies, cattle dogs). Large/Power Chewer: 15 kg+ / 33+ lbs OR any aggressive chewer regardless of size. When in doubt, size up.',
  },
  {
    question: 'Is ThawVault really zero electronics?',
    answer: 'Yes. No batteries, no charging, no apps, no Bluetooth. Pure mechanical enrichment powered by thermodynamics (frozen core), physics (wobble mechanics), and instinct (foraging). It works anywhere — camping, travel, power outages.',
  },
  {
    question: 'What can I put in the frozen lick seal?',
    answer: 'Any dog-safe liquid or semi-liquid: bone broth, plain yogurt, pumpkin puree, mashed banana, peanut butter thinned with water, wet food blended with water. Freeze 4+ hours for best results. The insulated chamber keeps it frozen 2-3 hours at room temp.',
  },
  {
    question: 'Is ThawVault dishwasher safe?',
    answer: 'Yes, all components are top-rack dishwasher safe. The silicone skirt, lick seal, and core can all go in the dishwasher. The weighted core\'s TPR material withstands high heat. For the insulated seal, we recommend air drying upside down to prevent water trapping.',
  },
]

export function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="section bg-cream" aria-labelledby="faq-heading">
      <div className="container-custom">
        <header className="text-center max-w-3xl mx-auto mb-16">
          <h2 id="faq-heading" className="heading-lg mb-4">
            Questions? We&apos;ve Got Answers
          </h2>
          <p className="text-charcoal-600">
            Everything you need to know about ThawVault, from freezer to floor.
          </p>
        </header>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="group card overflow-hidden"
              open={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <summary
                className="flex items-center justify-between p-6 cursor-pointer list-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta-600 focus-visible:ring-offset-2 bg-white"
                aria-expanded={openIndex === index}
              >
                <span className="font-medium text-charcoal-900 pr-4 text-left">{faq.question}</span>
                <svg
                  className="w-6 h-6 text-charcoal-400 flex-shrink-0 transition-transform duration-300 group-open:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="animate-slide-down bg-teal-50/50 border-t border-teal-100">
                <div className="p-6">
                  <p className="text-charcoal-600 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            </details>
          ))}
        </div>
      </div>

      <style jsx>{`
        summary::-webkit-details-marker {
          display: none;
        }
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-down {
          animation: slide-down 0.25s ease-out;
        }
      `}</style>
    </section>
  )
}