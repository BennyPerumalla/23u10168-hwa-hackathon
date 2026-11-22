'use client'

import Image from 'next/image'
import { useCart } from './CartProvider'
import { formatPrice, getVariantById } from '@/lib/product'
import Link from 'next/link'

export function CartDrawer() {
  const { items, removeItem, updateQuantity, subtotal, totalItems, closeCart, isCartOpen, isHydrated } = useCart()

  const shipping = subtotal >= 7500 ? 0 : 999
  const tax = Math.round(subtotal * 0.08)
  const total = subtotal + shipping + tax
  const freeShippingThreshold = 7500
  const freeShippingProgress = subtotal >= freeShippingThreshold ? 100 : Math.round((subtotal / freeShippingThreshold) * 100)

  if (!isHydrated || !isCartOpen) return null

  return (
    <>
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity"
        onClick={closeCart}
        aria-hidden="true"
      />
      <aside
        className="fixed right-0 top-0 z-50 h-full w-full max-w-[420px] bg-white shadow-2xl transform transition-transform duration-300 ease-out flex flex-col ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}"
        role="dialog"
        aria-label="Shopping cart"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-teal-100 bg-cream">
          <h2 className="font-heading text-lg font-bold text-charcoal-900">Your Cart</h2>
          <button
            onClick={closeCart}
            className="p-2 rounded-lg hover:bg-teal-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta-600"
            aria-label="Close cart"
          >
            <svg className="w-6 h-6 text-charcoal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Free shipping progress bar */}
        {subtotal > 0 && subtotal < freeShippingThreshold && (
          <div className="px-4 py-3 bg-terracotta-50 border-b border-teal-100">
            <div className="flex items-center justify-between text-xs text-terracotta-700 mb-2">
              <span>Add <span className="font-bold">{formatPrice(freeShippingThreshold - subtotal)}</span> for free shipping</span>
              <span>{freeShippingProgress}%</span>
            </div>
            <div className="h-1.5 bg-terracotta-100 rounded-full overflow-hidden">
              <div className="h-full bg-terracotta-600 transition-all duration-300" style={{ width: `${freeShippingProgress}%` }} />
            </div>
          </div>
        )}

        {subtotal >= freeShippingThreshold && (
          <div className="px-4 py-3 bg-teal-50 border-b border-teal-100 flex items-center gap-2 text-sm text-teal-700">
            <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
            <span className="font-medium">Free shipping unlocked! 🎉</span>
          </div>
        )}

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-center">
              <div className="w-20 h-20 bg-teal-50 rounded-2xl flex items-center justify-center mb-4">
                <svg className="w-10 h-10 text-teal-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
                </svg>
              </div>
              <p className="text-charcoal-900 font-medium mb-1">Your cart is empty</p>
              <p className="text-charcoal-500 text-sm mb-6">Add a ThawVault to get started</p>
              <Link
                href="#variants"
                onClick={closeCart}
                className="btn-terracotta w-full max-w-xs text-center"
              >
                Browse Variants
              </Link>
            </div>
          ) : (
            <ul className="space-y-3" role="list">
              {items.map((item) => {
                const variant = getVariantById(item.variantId as any)
                const lineTotal = (variant?.price || 0) * item.quantity
                return (
                  <li key={item.variantId} className="flex gap-3 p-3 bg-teal-50/50 rounded-xl hover:bg-teal-50 transition-colors">
                    <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 relative bg-white">
                      {variant?.images[0] ? (
                        <Image
                          src={variant.images[0]}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      ) : (
                        <span className="text-2xl absolute inset-0 flex items-center justify-center">{item.variantId === 'two-pack' ? '📦' : '🏔️'}</span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h4 className="font-medium text-charcoal-900 truncate">{variant?.name || item.variantId}</h4>
                          <p className="text-xs text-charcoal-500">{formatPrice(variant?.price || 0)} each</p>
                        </div>
                        <button
                          onClick={() => removeItem(item.variantId)}
                          className="p-1.5 text-charcoal-400 hover:text-terracotta-600 hover:bg-terracotta-50 rounded-lg transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta-600"
                          aria-label={`Remove ${variant?.name || item.variantId}`}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                        </button>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <label htmlFor={`cart-qty-${item.variantId}`} className="sr-only">Quantity</label>
                        <div className="flex items-center gap-1 border border-teal-200 rounded-lg overflow-hidden bg-white">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="px-3 py-2 text-charcoal-600 hover:bg-teal-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4"/></svg>
                          </button>
                          <span className="w-8 text-center text-sm font-medium text-charcoal-900">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                            disabled={item.quantity >= 10}
                            className="px-3 py-2 text-charcoal-600 hover:bg-teal-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            aria-label="Increase quantity"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/></svg>
                          </button>
                        </div>
                        <span className="font-semibold text-charcoal-900 ml-auto">{formatPrice(lineTotal)}</span>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          )}
        </div>

        {/* Sticky Summary & Checkout */}
        {items.length > 0 && (
          <div className="border-t border-teal-100 bg-white p-4 sticky bottom-0">
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-charcoal-600">Subtotal ({totalItems} items)</span>
                <span className="font-medium text-charcoal-900">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-charcoal-600">Shipping</span>
                <span className="font-medium">
                  {shipping === 0 ? (
                    <span className="text-teal-600 font-medium">Free</span>
                  ) : (
                    formatPrice(shipping)
                  )}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-charcoal-600">Estimated Tax (8%)</span>
                <span className="font-medium text-charcoal-900">{formatPrice(tax)}</span>
              </div>
              <div className="border-t border-teal-100 pt-2 flex justify-between text-lg font-bold text-charcoal-900">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
            <Link
              href="/checkout"
              className="btn-terracotta w-full py-4 text-center block text-lg"
              onClick={closeCart}
            >
              Checkout — {formatPrice(total)}
            </Link>
            <p className="text-center text-xs text-charcoal-500 mt-3">
              Secure checkout · 60-day guarantee · Free returns
            </p>
          </div>
        )}
      </aside>
    </>
  )
}