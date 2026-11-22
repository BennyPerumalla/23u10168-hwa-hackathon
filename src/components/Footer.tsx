export function Footer() {
  return (
    <footer className="bg-teal-950 text-teal-100 py-16 lg:py-20" role="contentinfo">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-12 lg:mb-16">
          {/* Brand column - wider */}
          <div className="lg:col-span-2 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl">🏔️</span>
              <span className="font-heading text-2xl font-bold text-white">ThawVault</span>
            </div>
            <p className="text-teal-300 max-w-xs mb-8 leading-relaxed">
              Zero-electronics dog enrichment that works. 3 stages. 2+ hours. One happy dog.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-teal-300 hover:text-white transition-colors" aria-label="Instagram">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a href="#" className="text-teal-300 hover:text-white transition-colors" aria-label="TikTok">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12.548 3.304c-.236-.561-.657-1.073-1.18-1.48a1.37 1.37 0 00-.951-.167c-.525.022-1.03.191-1.457.574-.788.706-1.288 1.668-1.521 2.782-.23.59-.043 1.206.427 1.658a3.246 3.246 0 00.82.253c.754.066 1.532.027 2.272-.212.77-.247 1.494-.662 2.128-1.239.622-.567 1.113-1.275 1.48-2.09a4.044 4.044 0 00-.24-1.11c-.15-.547-.525-1.028-1.145-1.288-.346-.144-.717-.224-1.085-.224-.414 0-.805.094-1.167.264-.612.293-1.112.78-1.445 1.435-.33.648-.44 1.36-.378 2.094.056.662.297 1.326.737 1.84.424.493.984.823 1.632.95.425.082.842.117 1.268.08.413-.037.816-.11 1.162-.307.376-.215.703-.52 1.005-.887.343-.413.614-.89.805-1.41.177-.47.257-.96.257-1.45 0-.784-.177-1.54-.56-2.167-.372-.612-.88-1.088-1.51-1.406-.56-.28-1.235-.383-2.02-.275z"/></svg>
              </a>
              <a href="#" className="text-teal-300 hover:text-white transition-colors" aria-label="Facebook">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"/></svg>
              </a>
              <a href="#" className="text-teal-300 hover:text-white transition-colors" aria-label="YouTube">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
            </div>
          </div>

          {/* Shop column */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-4">Shop</h4>
            <nav aria-label="Shop links">
              <ul className="space-y-3">
                <li><a href="#variants" className="text-teal-300 hover:text-white transition-colors">All Variants</a></li>
                <li><a href="#variants" className="text-teal-300 hover:text-white transition-colors">Small (Under 15 kg)</a></li>
                <li><a href="#variants" className="text-teal-300 hover:text-white transition-colors">Medium (Under 15 kg)</a></li>
                <li><a href="#variants" className="text-teal-300 hover:text-white transition-colors">Large / Power Chewer (15 kg+)</a></li>
                <li><a href="#variants" className="text-teal-300 hover:text-white transition-colors">2-Pack Rotation Bundle</a></li>
              </ul>
            </nav>
          </div>

          {/* Learn column */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-4">Learn</h4>
            <nav aria-label="Learn links">
              <ul className="space-y-3">
                <li><a href="#timeline" className="text-teal-300 hover:text-white transition-colors">How It Works</a></li>
                <li><a href="#materials" className="text-teal-300 hover:text-white transition-colors">Materials & Safety</a></li>
                <li><a href="#faq" className="text-teal-300 hover:text-white transition-colors">FAQ</a></li>
                <li><a href="/reviews" className="text-teal-300 hover:text-white transition-colors">Reviews</a></li>
                <li><a href="/blog" className="text-teal-300 hover:text-white transition-colors">Enrichment Blog</a></li>
              </ul>
            </nav>
          </div>

          {/* Support column */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-4">Support</h4>
            <nav aria-label="Support links">
              <ul className="space-y-3">
                <li><a href="/shipping" className="text-teal-300 hover:text-white transition-colors">Shipping Info</a></li>
                <li><a href="/returns" className="text-teal-300 hover:text-white transition-colors">Returns & Exchanges</a></li>
                <li><a href="/warranty" className="text-teal-300 hover:text-white transition-colors">Warranty</a></li>
                <li><a href="/contact" className="text-teal-300 hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="/wholesale" className="text-teal-300 hover:text-white transition-colors">Wholesale</a></li>
              </ul>
            </nav>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-teal-800 pt-8 lg:pt-12 flex flex-col md:flex-row items-center justify-between gap-4 lg:gap-8">
          <p className="text-teal-400 text-sm">
            © 2024 ThawVault. All rights reserved.
          </p>
          <div className="flex items-center gap-6 lg:gap-8 text-sm text-teal-400">
            <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="/terms" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="/accessibility" className="hover:text-white transition-colors">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  )
}