'use client'

import Link from 'next/link'
import { useCart } from './CartProvider'

const navLinks = [
  { href: '#variants', label: 'Shop' },
  { href: '#timeline', label: 'How It Works' },
  { href: '#materials', label: 'Materials' },
  { href: '#faq', label: 'FAQ' },
]

export function Navbar() {
  const { totalItems, openCart } = useCart()

  return (
    <header className="sticky top-0 z-50 w-full bg-cream/80 backdrop-blur-md border-b border-teal-100">
      <nav className="container-custom" aria-label="Main navigation">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-heading text-xl font-bold text-charcoal-900" aria-label="ThawVault Home">
            <span className="text-2xl">🏔️</span>
            ThawVault
          </Link>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-charcoal-700 hover:text-terracotta-600 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Cart button */}
          <button
            onClick={openCart}
            className="relative p-2 rounded-lg bg-white/90 hover:bg-white transition-colors shadow-sm border border-teal-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
            aria-label={`Shopping cart${totalItems > 0 ? `, ${totalItems} items` : ', empty'}`}
          >
            <svg className="w-6 h-6 text-charcoal-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 min-w-5 h-5 bg-terracotta-600 text-white text-xs font-bold rounded-full flex items-center justify-center px-1.5">
                {totalItems > 99 ? '99+' : totalItems}
              </span>
            )}
          </button>
        </div>
      </nav>
    </header>
  )
}