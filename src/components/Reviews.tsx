'use client'

const reviews = [
  {
    name: 'Sarah M.',
    dog: 'Luna, Border Collie (2 yrs)',
    rating: 5,
    text: 'Luna usually destroys toys in minutes. ThawVault kept her busy for 2.5 hours on the first try! The frozen seal is a game changer for hot summer days — she comes out of her crate calm instead of frantic.',
    variant: 'Medium',
    verified: true,
  },
  {
    name: 'Mike R.',
    dog: 'Bear, German Shepherd (4 yrs)',
    rating: 5,
    text: 'Finally something that works for Bear\'s separation anxiety. He actually looks forward to me leaving now because he knows ThawVault time means frozen peanut butter. The weighted core is genius — he has to think to get the kibble out.',
    variant: 'Large / Power Chewer',
    verified: true,
  },
  {
    name: 'Jennifer K.',
    dog: 'Pip, Corgi (3 yrs)',
    rating: 5,
    text: 'The snuffle skirt is Pip\'s favorite part. She\'ll spend 45 minutes just foraging through the silicone flaps before even touching the frozen center. Worth every penny — we bought the 2-pack so one\'s always ready.',
    variant: '2-Pack Rotation Bundle',
    verified: true,
  },
  {
    name: 'David L.',
    dog: 'Mochi, French Bulldog (1 yr)',
    rating: 5,
    text: 'Mochi is a power chewer despite being small. The Large variant\'s reinforced skirt has survived 3 months of daily use. The lifetime warranty gave us confidence to try it. Best enrichment purchase we\'ve made.',
    variant: 'Large / Power Chewer',
    verified: true,
  },
  {
    name: 'Amanda T.',
    dog: 'Scout, Australian Shepherd (5 yrs)',
    rating: 5,
    text: 'Scout is high-drive and gets bored fast. The three stages actually work in sequence — she doesn\'t just skip to the core. The rotation bundle means zero downtime between freezes. Her separation anxiety has improved dramatically.',
    variant: '2-Pack Rotation Bundle',
    verified: true,
  },
  {
    name: 'Chris P.',
    dog: 'Barnaby, Golden Retriever (2 yrs)',
    rating: 4,
    text: 'Great product, Barnaby loves it. Only 4 stars because the Large takes up significant freezer space — we had to reorganize. But the engagement time is real. He\'s calm for 2+ hours which is all we needed.',
    variant: 'Large / Power Chewer',
    verified: true,
  },
]

export function Reviews() {
  return (
    <section id="reviews" className="section bg-cream" aria-labelledby="reviews-heading">
      <div className="container-custom">
        <header className="text-center max-w-3xl mx-auto mb-16">
          <h2 id="reviews-heading" className="heading-lg mb-4">
            Trusted by 50,000+ Dog Parents
          </h2>
          <p className="text-charcoal-600">
            Real results from real dogs. No sponsored posts, just happy pups.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {reviews.map((review, index) => (
            <article
              key={index}
              className="card p-6 hover:shadow-lg transition-shadow h-full"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${i < review.rating ? 'text-amber-500' : 'text-charcoal-200'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                ))}
              </div>
              <p className="text-charcoal-600 mb-4 leading-relaxed flex-1">&ldquo;{review.text}&rdquo;</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-charcoal-900">{review.name}</p>
                  <p className="text-sm text-charcoal-500">{review.dog}</p>
                </div>
                {review.verified && (
                  <span className="flex items-center gap-1 text-xs text-teal-600 bg-teal-50 px-2 py-1 rounded-full">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                    Verified
                  </span>
                )}
              </div>
              <div className="mt-4 pt-4 border-t border-teal-100">
                <span className="inline-flex items-center gap-1 text-sm text-charcoal-500">
                  <span className="px-2 py-0.5 bg-teal-100 text-teal-700 rounded text-xs font-medium">{review.variant}</span>
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* CTA to reviews page */}
        <div className="text-center mt-12">
          <a href="/reviews" className="btn-outline">
            Read All 2,800+ Reviews
          </a>
        </div>
      </div>
    </section>
  )
}