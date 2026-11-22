'use client'

import { useCart } from './CartProvider'
import { formatPrice } from '@/lib/product'

export function CartButton() {
  const { totalItems, subtotal, openCart, isHydrated } = useCart()

  if (!isHydrated) {
    return (
      <button className="fixed bottom-6 right-6 z-40 lg:bottom-8 lg:right-8 p-2 rounded-lg bg-gray-100 animate-pulse" aria-label="Cart (loading)" disabled>
        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
      </button>
    )
  }

  return (
    <button
      onClick={openCart}
      className="fixed bottom-6 right-6 z-40 lg:bottom-8 lg:right-8 p-3 rounded-xl bg-white shadow-xl border border-gray-200 hover:shadow-2xl hover:border-primary-200 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
      aria-label={`Cart${totalItems > 0 ? `, ${totalItems} items, ${formatPrice(subtotal)}` : ', empty'}`}
    >
      <svg className="w-7 h-7 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 min-w-6 h-6 bg-primary-600 text-white text-xs font-bold rounded-full flex items-center justify-center px-2">
          {totalItems > 99 ? '99+' : totalItems}
        </span>
      )}
    </button>
  )
}