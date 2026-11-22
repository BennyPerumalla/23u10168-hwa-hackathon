'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { VARIANTS, formatPrice, type Variant, type VariantId, getVariantById } from '@/lib/product'
import { useCart } from './CartProvider'

const BUY_VARIANTS: VariantId[] = ['small', 'medium', 'large']

const initialQuantities: Record<VariantId, number> = {
  small: 1,
  medium: 1,
  large: 1,
  'two-pack': 1,
}

export function VariantSelector() {
  const { addItem, isHydrated } = useCart()
  const [selectedVariantId, setSelectedVariantId] = useState<VariantId>('medium')
  const [quantities, setQuantities] = useState<Record<VariantId, number>>(initialQuantities)
  const [mounted, setMounted] = useState(false)
  const [activeThumb, setActiveThumb] = useState(0)

  // Hydration guard
  useEffect(() => {
    setMounted(true)
    if (isHydrated && typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('thawvault-variant-qty')
        if (stored) {
          const parsed = JSON.parse(stored)
          if (parsed && typeof parsed === 'object') {
            setQuantities(prev => ({ ...prev, ...parsed }))
          }
        }
      } catch {
        // Ignore
      }
    }
  }, [isHydrated])

  // Persist quantities per variant
  useEffect(() => {
    if (mounted && typeof window !== 'undefined') {
      try {
        localStorage.setItem('thawvault-variant-qty', JSON.stringify(quantities))
      } catch {
        // Ignore
      }
    }
  }, [quantities, mounted])

  const variant = getVariantById(selectedVariantId)
  const quantity = quantities[selectedVariantId] || 1
  const lineTotal = variant ? variant.price * quantity : 0

  const handleQuantityChange = (delta: number) => {
    setQuantities(prev => ({
      ...prev,
      [selectedVariantId]: Math.max(1, Math.min(10, prev[selectedVariantId] + delta)),
    }))
  }

  const handleQuantityInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value) || 1
    setQuantities(prev => ({
      ...prev,
      [selectedVariantId]: Math.max(1, Math.min(10, val)),
    }))
  }

  const handleAddToCart = () => {
    if (variant) {
      addItem(variant.id, quantity)
    }
  }

  // All images for thumbnails (using variant images from product.ts)
  const thumbImages = variant?.images || ['/images/thawvault-p3.png', '/images/thawvault-p2.png', '/images/thawvault.png']

  if (!mounted) {
    return (
      <section id="variants" className="section bg-cream" aria-labelledby="buy-heading">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto animate-pulse space-y-8">
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="aspect-square bg-teal-100 rounded-3xl" />
              <div className="space-y-6">
                <div className="h-8 bg-teal-100 rounded w-3/4" />
                <div className="h-12 bg-teal-100 rounded w-1/2" />
                <div className="h-12 bg-teal-100 rounded w-full" />
                <div className="h-16 bg-teal-100 rounded w-full" />
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="variants" className="section bg-cream" aria-labelledby="buy-heading">
      <div className="container-custom">
        <header className="text-center max-w-3xl mx-auto mb-12">
          <h2 id="buy-heading" className="heading-lg mb-4">Choose Your ThawVault</h2>
          <p className="text-charcoal-600">All sizes include the complete 3-stage system. Pick the size that fits your dog.</p>
        </header>

        <div className="max-w-5xl mx-auto">
          {/* Buy Box: 2-column grid */}
          <div className="card overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Left: Image Gallery */}
              <div className="relative bg-teal-50">
                {/* Main Image */}
                <div className="aspect-square lg:aspect-[4/5] relative">
                  {variant?.images[0] && (
                    <Image
                      src={variant.images[0]}
                      alt={`${variant.name} - main view`}
                      fill
                      className="object-cover"
                      priority
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  )}

                  {/* Thumbnail strip */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 mb-4 flex gap-2 px-4">
                    {thumbImages.slice(0, 4).map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveThumb(idx)}
                        className={`w-16 h-16 lg:w-20 lg:h-20 rounded-xl overflow-hidden border-2 transition-all ${
                          activeThumb === idx ? 'border-terracotta-600' : 'border-teal-100 bg-white/80'
                        } hover:border-terracotta-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta-600`}
                        aria-label={`View image ${idx + 1}`}
                        aria-current={activeThumb === idx ? 'true' : 'false'}
                      >
                        <Image
                          src={img}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </button>
                    ))}
                  </div>

                  {/* Variant badge */}
                  {variant?.badge && (
                    <div className="absolute top-4 left-4">
                      <span className="bg-teal-600 text-white text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap">
                        {variant.badge}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Right: Product Info & Purchase */}
              <div className="p-6 lg:p-8 flex flex-col justify-between">
                {/* Variant selector cards */}
                <div className="mb-6">
                  <p className="text-sm font-medium text-charcoal-700 mb-3">Select Size</p>
                  <div className="grid grid-cols-3 gap-3" role="radiogroup" aria-label="ThawVault size">
                    {BUY_VARIANTS.map((vId) => {
                      const v = getVariantById(vId)
                      if (!v) return null
                      const isSelected = selectedVariantId === vId
                      return (
                        <button
                          key={vId}
                          onClick={() => {
                            setSelectedVariantId(vId)
                            setActiveThumb(0)
                          }}
                          className={`relative p-4 rounded-2xl text-center transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                            isSelected
                              ? 'border-2 border-terracotta-600 bg-terracotta-50 shadow-lg'
                              : 'border border-teal-100 bg-white hover:border-terracotta-300 hover:bg-terracotta-50'
                          }`}
                          role="radio"
                          aria-checked={isSelected}
                          aria-label={`${v.name} - ${formatPrice(v.price)}`}
                        >
                          <p className="font-heading font-semibold text-charcoal-900 mb-1">{v.name.split(' ')[1]}</p>
                          <p className="text-xs text-charcoal-500 mb-2">{v.weightRange}</p>
                          <p className="font-heading text-lg font-bold text-charcoal-900">{formatPrice(v.price)}</p>
                          {isSelected && (
                            <span className="absolute -top-2 -right-2 w-5 h-5 bg-terracotta-600 text-white rounded-full flex items-center justify-center text-xs">
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                            </span>
                          )}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Product title & description */}
                <div className="mb-6">
                  <h3 className="heading-md mb-2">{variant?.name}</h3>
                  <p className="text-charcoal-500 mb-4">{variant?.weightRange}</p>
                  <p className="text-charcoal-600 leading-relaxed">{variant?.description}</p>
                </div>

                {/* Live Price */}
                <div className="mb-6 p-4 bg-teal-50 rounded-2xl">
                  <div className="flex items-baseline justify-between gap-4 flex-wrap">
                    <div>
                      <span className="font-heading text-3xl sm:text-4xl font-bold text-charcoal-900">{formatPrice(lineTotal)}</span>
                      {quantity > 1 && (
                        <span className="ml-2 text-sm text-charcoal-500">({quantity} × {formatPrice(variant?.price || 0)} each)</span>
                      )}
                    </div>
                    {variant?.originalPrice && variant.id !== 'two-pack' && (
                      <div className="text-right">
                        <p className="text-sm text-charcoal-400 line-through">{formatPrice(variant.originalPrice * quantity)}</p>
                        <p className="text-sm font-medium text-terracotta-600">Save {formatPrice((variant.originalPrice - variant.price) * quantity)}</p>
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-charcoal-500 mt-2">SKU: <code className="font-mono text-charcoal-700 bg-teal-100 px-2 py-0.5 rounded">{variant?.id.toUpperCase()}-{quantity}</code></p>
                </div>

                {/* Quantity Stepper */}
                <div className="mb-6">
                  <label htmlFor="buy-qty" className="block text-sm font-medium text-charcoal-700 mb-3">Quantity</label>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-0 border border-teal-200 rounded-xl overflow-hidden bg-white">
                      <button
                        type="button"
                        onClick={() => handleQuantityChange(-1)}
                        className="px-5 py-4 hover:bg-teal-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta-600"
                        aria-label="Decrease quantity"
                      >
                        <svg className="w-6 h-6 text-charcoal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4"/></svg>
                      </button>
                      <input
                        type="number"
                        id="buy-qty"
                        value={quantity}
                        onChange={handleQuantityInput}
                        min={1}
                        max={10}
                        className="w-20 text-center border-0 focus:outline-none focus:ring-0 text-xl font-bold text-charcoal-900"
                        aria-label="Quantity"
                      />
                      <button
                        type="button"
                        onClick={() => handleQuantityChange(1)}
                        className="px-5 py-4 hover:bg-teal-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta-600"
                        aria-label="Increase quantity"
                      >
                        <svg className="w-6 h-6 text-charcoal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/></svg>
                      </button>
                    </div>
                    <span className="text-sm text-charcoal-500">Max 10 per variant</span>
                  </div>
                </div>

                {/* Add to Cart Button - Terracotta with visual feedback */}
                <button
                  onClick={handleAddToCart}
                  className="btn-terracotta w-full py-5 text-lg font-semibold flex items-center justify-center gap-3 transition-all hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98]"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
                  <span>Add to Cart — {formatPrice(lineTotal)}</span>
                </button>

                {/* Trust badges */}
                <div className="mt-8 pt-6 border-t border-teal-100 flex flex-wrap items-center justify-center gap-4 text-sm text-charcoal-500">
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-teal-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                    Free shipping on $75+
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-teal-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                    60-day guarantee
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-teal-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                    Vet-approved materials
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Comparison link */}
          <div className="mt-10 text-center">
            <a href="#compare" className="text-teal-600 hover:text-terracotta-600 font-medium underline transition-colors">
              View full comparison →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}