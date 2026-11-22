'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useCart } from './CartProvider'
import { formatPrice, getVariantById } from '@/lib/product'

interface FormErrors { [key: string]: string }
interface FormData {
  email: string; firstName: string; lastName: string; phone: string
  address: string; address2: string; city: string; state: string
  zip: string; country: string; cardNumber: string; cardExpiry: string
  cardCvc: string; terms: boolean
}
interface OrderItem { variantId: string; name: string; quantity: number; unitPrice: number; lineTotal: number }
interface OrderResponse { orderId: string; customerName: string; email: string; shippingAddress: any; items: OrderItem[]; subtotal: number; tax: number; shipping: number; total: number; currency: string; status: string; createdAt: string }

const initialFormData: FormData = { email: '', firstName: '', lastName: '', phone: '', address: '', address2: '', city: '', state: '', zip: '', country: 'US', cardNumber: '', cardExpiry: '', cardCvc: '', terms: false }

const US_STATES = [
  { value: 'AL', label: 'Alabama' }, { value: 'AK', label: 'Alaska' }, { value: 'AZ', label: 'Arizona' },
  { value: 'AR', label: 'Arkansas' }, { value: 'CA', label: 'California' }, { value: 'CO', label: 'Colorado' },
  { value: 'CT', label: 'Connecticut' }, { value: 'DE', label: 'Delaware' }, { value: 'FL', label: 'Florida' },
  { value: 'GA', label: 'Georgia' }, { value: 'HI', label: 'Hawaii' }, { value: 'ID', label: 'Idaho' },
  { value: 'IL', label: 'Illinois' }, { value: 'IN', label: 'Indiana' }, { value: 'IA', label: 'Iowa' },
  { value: 'KS', label: 'Kansas' }, { value: 'KY', label: 'Kentucky' }, { value: 'LA', label: 'Louisiana' },
  { value: 'ME', label: 'Maine' }, { value: 'MD', label: 'Maryland' }, { value: 'MA', label: 'Massachusetts' },
  { value: 'MI', label: 'Michigan' }, { value: 'MN', label: 'Minnesota' }, { value: 'MS', label: 'Mississippi' },
  { value: 'MO', label: 'Missouri' }, { value: 'MT', label: 'Montana' }, { value: 'NE', label: 'Nebraska' },
  { value: 'NV', label: 'Nevada' }, { value: 'NH', label: 'New Hampshire' }, { value: 'NJ', label: 'New Jersey' },
  { value: 'NM', label: 'New Mexico' }, { value: 'NY', label: 'New York' }, { value: 'NC', label: 'North Carolina' },
  { value: 'ND', label: 'North Dakota' }, { value: 'OH', label: 'Ohio' }, { value: 'OK', label: 'Oklahoma' },
  { value: 'OR', label: 'Oregon' }, { value: 'PA', label: 'Pennsylvania' }, { value: 'RI', label: 'Rhode Island' },
  { value: 'SC', label: 'South Carolina' }, { value: 'SD', label: 'South Dakota' }, { value: 'TN', label: 'Tennessee' },
  { value: 'TX', label: 'Texas' }, { value: 'UT', label: 'Utah' }, { value: 'VT', label: 'Vermont' },
  { value: 'VA', label: 'Virginia' }, { value: 'WA', label: 'Washington' }, { value: 'WV', label: 'West Virginia' },
  { value: 'WI', label: 'Wisconsin' }, { value: 'WY', label: 'Wyoming' },
]

const COUNTRIES = [
  { value: 'US', label: 'United States' },
  { value: 'CA', label: 'Canada' },
  { value: 'UK', label: 'United Kingdom' },
  { value: 'AU', label: 'Australia' },
]

const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
const validateCardNumber = (num: string) => /^\d{13,19}$/.test(num.replace(/\s/g, ''))
const validateExpiry = (exp: string) => /^(0[1-9]|1[0-2])\/\d{2}$/.test(exp)
const validateCvc = (cvc: string) => /^\d{3,4}$/.test(cvc)

function validateField(name: string, value: any, formData: FormData): string | null {
  switch (name) {
    case 'email': if (!value) return 'Email is required'; if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Enter a valid email address'; return null
    case 'firstName': case 'lastName': if (!value.trim()) return `${name === 'firstName' ? 'First' : 'Last'} name is required`; return null
    case 'address': if (!value.trim()) return 'Address is required'; return null
    case 'city': if (!value.trim()) return 'City is required'; return null
    case 'state': if (formData.country === 'US' && !value) return 'State is required'; return null
    case 'zip': if (!value.trim()) return 'ZIP/Postal code is required'; if (formData.country === 'US' && !/^\d{5}(-\d{4})?$/.test(value)) return 'Enter a valid US ZIP code'; return null
    case 'cardNumber': if (!value) return 'Card number is required'; if (!/^\d{13,19}$/.test(value.replace(/\s/g, ''))) return 'Enter a valid card number'; return null
    case 'cardExpiry': if (!value) return 'Expiry date is required'; if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(value)) return 'Use MM/YY format'; return null
    case 'cardCvc': if (!value) return 'CVC is required'; if (!/^\d{3,4}$/.test(value)) return 'Enter a valid CVC'; return null
    case 'terms': if (!value) return 'You must accept the terms'; return null
    default: return null
  }
}

export function CheckoutForm({ order, setOrder }: { order: any; setOrder: (o: any) => void }) {
  const { items, subtotal, totalItems, clearCart, isHydrated } = useCart()
  const [formData, setFormData] = useState<FormData>({ email: '', firstName: '', lastName: '', phone: '', address: '', address2: '', city: '', state: '', zip: '', country: 'US', cardNumber: '', cardExpiry: '', cardCvc: '', terms: false })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  if (!mounted || !isHydrated) {
    return <main className="min-h-screen bg-cream py-12 lg:py-20"><div className="container-custom"><div className="animate-pulse space-y-8 max-w-4xl mx-auto"><div className="h-8 bg-teal-100 rounded w-1/3" /><div className="grid lg:grid-cols-12 gap-8"><div className="lg:col-span-7"><div className="h-96 bg-teal-100 rounded-2xl" /></div><div className="lg:col-span-5"><div className="h-96 bg-teal-100 rounded-2xl" /></div></div></div></div></main>
  }

  if (items.length === 0) {
    return <main className="min-h-screen bg-cream py-12 lg:py-20 flex items-center justify-center"><div className="container-custom text-center max-w-md"><div className="w-20 h-20 mx-auto mb-6 bg-teal-100 rounded-full flex items-center justify-center"><svg className="w-10 h-10 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg></div><h1 className="heading-lg mb-3">Your cart is empty</h1><p className="text-charcoal-600 mb-8">Looks like you haven&apos;t added any ThawVaults yet.</p><Link href="#variants" className="btn-terracotta inline-block">Continue Shopping</Link></div></main>
  }

  if (order) {
    const deliveryDate = new Date(order.createdAt)
    deliveryDate.setDate(deliveryDate.getDate() + 3)
    return (
      <main className="min-h-screen bg-cream py-12 lg:py-20 flex items-center justify-center">
        <div className="container-custom"><div className="max-w-md mx-auto">
          <div className="card p-8 lg:p-12 text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-teal-600 rounded-full flex items-center justify-center"><svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/></svg></div>
            <h1 className="heading-lg mb-2">Order Confirmed!</h1>
            <p className="text-charcoal-600 mb-8">Thanks for your order. A confirmation email has been sent to <strong>{order.email}</strong>.</p>
            <div className="bg-teal-50 rounded-2xl p-6 mb-8"><p className="text-sm text-charcoal-500 mb-1">Order Number</p><code className="font-mono text-2xl font-bold text-teal-700 bg-white px-4 py-2 rounded-lg inline-block border border-teal-100">{order.orderId}</code></div>
            <div className="bg-terracotta-50 rounded-2xl p-6 mb-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-center sm:text-left">
              <div className="flex items-center gap-3"><div className="w-12 h-12 bg-terracotta-600 rounded-xl flex items-center justify-center"><svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg></div><div><p className="text-sm text-charcoal-500">Estimated Delivery</p><p className="font-heading font-bold text-charcoal-900">{deliveryDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p></div></div>
              <div className="flex items-center gap-3"><div className="w-12 h-12 bg-teal-600 rounded-xl flex items-center justify-center"><svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg></div><div><p className="text-sm text-charcoal-500">Ships By</p><p className="font-heading font-bold text-charcoal-900">Within 1 business day</p></div></div>
            </div>
            <div className="card bg-teal-50/50 border-teal-100 p-6 mb-8 text-left"><h2 className="heading-md mb-4">Itemized Receipt</h2><div className="space-y-3 mb-4">{order.items.map((item: any) => (<div key={item.variantId} className="flex items-center justify-between py-2 border-b border-teal-100 last:border-0"><div className="flex items-center gap-3"><div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0"><span className="text-lg">{item.variantId === 'two-pack' ? '📦' : '🏔️'}</span></div><div><p className="font-medium text-charcoal-900">{item.name}</p><p className="text-sm text-charcoal-500">Qty: {item.quantity} × {formatPrice(item.unitPrice)}</p></div></div><span className="font-semibold text-charcoal-900">{formatPrice(item.lineTotal)}</span></div>))}</div><div className="pt-2 border-t border-teal-200 space-y-2"><div className="flex justify-between text-sm"><span className="text-charcoal-600">Subtotal</span><span>{formatPrice(order.subtotal)}</span></div><div className="flex justify-between text-sm"><span className="text-charcoal-600">Shipping</span><span>{order.shipping === 0 ? 'Free' : formatPrice(order.shipping)}</span></div><div className="flex justify-between text-sm"><span className="text-charcoal-600">Tax (8%)</span><span>{formatPrice(order.tax)}</span></div><div className="flex justify-between text-lg font-bold border-t border-teal-200 pt-2"><span>Total</span><span>{formatPrice(order.total)}</span></div></div></div>
            <div className="card bg-terracotta-50 border-terracotta-100 p-6 mb-8 text-left"><h2 className="heading-md mb-4 flex items-center gap-2"><svg className="w-6 h-6 text-terracotta-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>Shipping Summary</h2><div className="grid sm:grid-cols-2 gap-4"><div><p className="text-sm text-charcoal-500">Ships Within</p><p className="font-bold text-charcoal-900">1 business day</p></div><div><p className="text-sm text-charcoal-500">Delivery Estimate</p><p className="font-bold text-charcoal-900">3–5 business days (US)</p></div><div><p className="text-sm text-charcoal-500">Free Shipping</p><p className="font-bold text-charcoal-900">On orders $75+</p></div><div><p className="text-sm text-charcoal-500">Returns</p><p className="font-bold text-charcoal-900">60-day guarantee</p></div></div></div>
            <div className="text-center mt-8"><Link href="#variants" className="btn-terracotta inline-block w-full max-w-xs">Continue Shopping</Link></div>
          </div></div></div>
      </main>
    )
  }

  const shipping = subtotal >= 7500 ? 0 : 999
  const tax = Math.round(subtotal * 0.08)
  const total = subtotal + shipping + tax

  const orderItems = items.map(item => {
    const variant = getVariantById(item.variantId as any)
    return { variantId: item.variantId, quantity: item.quantity }
  })

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  const validateCardNumber = (num: string) => /^\d{13,19}$/.test(num.replace(/\s/g, ''))
  const validateExpiry = (exp: string) => /^(0[1-9]|1[0-2])\/\d{2}$/.test(exp)
  const validateCvc = (cvc: string) => /^\d{3,4}$/.test(cvc)

  function validateField(name: string, value: any): string | null {
    switch (name) {
      case 'email': if (!value) return 'Email is required'; if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Enter a valid email address'; return null
      case 'firstName': case 'lastName': if (!value.trim()) return `${name === 'firstName' ? 'First' : 'Last'} name is required`; return null
      case 'address': if (!value.trim()) return 'Address is required'; return null
      case 'city': if (!value.trim()) return 'City is required'; return null
      case 'state': if (formData.country === 'US' && !value) return 'State is required'; return null
      case 'zip': if (!value.trim()) return 'ZIP/Postal code is required'; if (formData.country === 'US' && !/^\d{5}(-\d{4})?$/.test(value)) return 'Enter a valid US ZIP code'; return null
      case 'cardNumber': if (!value) return 'Card number is required'; if (!/^\d{13,19}$/.test(value.replace(/\s/g, ''))) return 'Enter a valid card number'; return null
      case 'cardExpiry': if (!value) return 'Expiry date is required'; if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(value)) return 'Use MM/YY format'; return null
      case 'cardCvc': if (!value) return 'CVC is required'; if (!/^\d{3,4}$/.test(value)) return 'Enter a valid CVC'; return null
      case 'terms': if (!value) return 'You must accept the terms'; return null
      default: return null
    }
  }

  return (
    <main className="min-h-screen bg-cream py-8 lg:py-16">
      <div className="container-custom">
        <header className="mb-8 lg:mb-12"><Link href="#variants" className="inline-flex items-center gap-2 text-charcoal-600 hover:text-terracotta-600 transition-colors font-medium"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg>Back to Shop</Link></header>
        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7"><form onSubmit={e => { e.preventDefault(); alert('submit') }} className="space-y-8" noValidate><p>Checkout form - implementation continues</p></form></div>
          <div className="lg:col-span-5"><aside className="sticky top-8"><div className="card p-6 lg:p-8 h-full"><h2 className="heading-md mb-6">Order Summary</h2><p>Order summary here</p></div></aside></div>
        </div>
      </div>
    </main>
  )
}