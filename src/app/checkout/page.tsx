'use client'

export const dynamic = 'force-dynamic'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useCart } from '@/components/CartProvider'
import { formatPrice, getVariantById, type Variant } from '@/lib/product'

interface FormErrors {
  [key: string]: string
}

interface FormData {
  email: string
  firstName: string
  lastName: string
  phone: string
  address: string
  address2: string
  city: string
  state: string
  zip: string
  country: string
  cardNumber: string
  cardExpiry: string
  cardCvc: string
  terms: boolean
}

interface OrderItem {
  variantId: string
  name: string
  quantity: number
  unitPrice: number
  lineTotal: number
}

interface OrderResponse {
  orderId: string
  customerName: string
  email: string
  shippingAddress: any
  items: OrderItem[]
  subtotal: number
  tax: number
  shipping: number
  total: number
  currency: string
  status: string
  createdAt: string
}

const initialFormData: FormData = {
  email: '',
  firstName: '',
  lastName: '',
  phone: '',
  address: '',
  address2: '',
  city: '',
  state: '',
  zip: '',
  country: 'US',
  cardNumber: '',
  cardExpiry: '',
  cardCvc: '',
  terms: false,
}

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

export default function CheckoutPage() {
  const { items, subtotal, totalItems, clearCart, isHydrated } = useCart()
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [order, setOrder] = useState<OrderResponse | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Hydration guard
  if (!mounted || !isHydrated) {
    return (
      <main className="min-h-screen bg-gray-50 py-12 lg:py-20">
        <div className="container-custom">
          <div className="animate-pulse space-y-8 max-w-4xl mx-auto">
            <div className="h-8 bg-gray-200 rounded w-1/3" />
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="h-96 bg-gray-200 rounded-xl" />
              </div>
              <div className="h-96 bg-gray-200 rounded-xl" />
            </div>
          </div>
        </div>
      </main>
    )
  }

  // Empty cart state
  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-gray-50 py-12 lg:py-20 flex items-center justify-center">
        <div className="container-custom text-center max-w-md">
          <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
            </svg>
          </div>
          <h1 className="font-display text-3xl font-bold text-gray-900 mb-3">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">Looks like you haven&apos;t added any ThawVaults yet.</p>
          <Link href="/" className="btn-primary inline-block">
            Continue Shopping
          </Link>
        </div>
      </main>
    )
  }

  // Success confirmation state
  if (order) {
    return (
      <main className="min-h-screen bg-gray-50 py-12 lg:py-20">
        <div className="container-custom max-w-3xl">
          <div className="text-center mb-12">
            <div className="w-20 h-20 mx-auto mb-6 bg-secondary-100 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
              </svg>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Order Confirmed!</h1>
            <p className="text-lg text-gray-600">Thanks for your order. A confirmation email has been sent to <strong>{order.email}</strong>.</p>
          </div>

          <div className="card p-6 mb-8">
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
              <span className="font-medium text-gray-900">Order Number</span>
              <code className="font-mono text-lg font-bold text-primary-600 bg-primary-50 px-3 py-1 rounded">{order.orderId}</code>
            </div>
            <div className="grid sm:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Placed</p>
                <p className="font-medium">{new Date(order.createdAt).toLocaleDateString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}</p>
              </div>
              <div>
                <p className="text-gray-500">Status</p>
                <p className="font-medium text-secondary-600">{order.status.replace('_', ' ')}</p>
              </div>
              <div>
                <p className="text-gray-500">Items</p>
                <p className="font-medium">{order.items.reduce((sum, i) => sum + i.quantity, 0)}</p>
              </div>
            </div>
          </div>

          <div className="card p-6 mb-8">
            <h2 className="font-display text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
            <div className="space-y-3">
              {order.items.map((item) => (
                <div key={item.variantId} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">{item.variantId === 'two-pack' ? '📦' : '🏔️'}</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity} × {formatPrice(item.unitPrice)}</p>
                    </div>
                  </div>
                  <span className="font-semibold text-gray-900">{formatPrice(item.lineTotal)}</span>
                </div>
              ))}
              <div className="pt-2 border-t border-gray-200 space-y-2">
                <div className="flex justify-between text-sm"><span className="text-gray-600">Subtotal</span><span>{formatPrice(order.subtotal)}</span></div>
                <div className="flex justify-between text-sm"><span className="text-gray-600">Shipping</span><span>{order.shipping === 0 ? 'Free' : formatPrice(order.shipping)}</span></div>
                <div className="flex justify-between text-sm"><span className="text-gray-600">Tax (8%)</span><span>{formatPrice(order.tax)}</span></div>
                <div className="flex justify-between text-lg font-bold border-t border-gray-200 pt-2"><span>Total</span><span>{formatPrice(order.total)}</span></div>
              </div>
            </div>
          </div>

          <div className="card p-6 bg-primary-50 border-primary-200">
            <h3 className="font-display font-semibold text-primary-800 mb-2">What happens next?</h3>
            <ul className="text-sm text-primary-700 space-y-2" role="list">
              <li className="flex items-start gap-2"><svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>We&apos;ll email your receipt and order details</li>
              <li className="flex items-start gap-2"><svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>Your ThawVault ships within 1 business day</li>
              <li className="flex items-start gap-2"><svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>Tracking info will arrive via email</li>
              <li className="flex items-start gap-2"><svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>60-day satisfaction guarantee starts on delivery</li>
            </ul>
          </div>

          <div className="text-center mt-8">
            <Link href="/" className="btn-primary inline-block">Continue Shopping</Link>
          </div>
        </div>
      </main>
    )
  }

  // Compute totals
  const shipping = subtotal >= 7500 ? 0 : 999
  const tax = Math.round(subtotal * 0.08)
  const total = subtotal + shipping + tax

  // Prepare order items for API
  const orderItems = items.map(item => {
    const variant = getVariantById(item.variantId as any)
    return {
      variantId: item.variantId,
      quantity: item.quantity,
    }
  })

  // Validation functions
  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  const validateCardNumber = (num: string) => /^\d{13,19}$/.test(num.replace(/\s/g, ''))
  const validateExpiry = (exp: string) => /^(0[1-9]|1[0-2])\/\d{2}$/.test(exp)
  const validateCvc = (cvc: string) => /^\d{3,4}$/.test(cvc)

  const validateField = (name: string, value: any): string | null => {
    switch (name) {
      case 'email':
        if (!value) return 'Email is required'
        if (!validateEmail(value)) return 'Enter a valid email address'
        return null
      case 'firstName':
      case 'lastName':
        if (!value.trim()) return `${name === 'firstName' ? 'First' : 'Last'} name is required`
        return null
      case 'address':
        if (!value.trim()) return 'Address is required'
        return null
      case 'city':
        if (!value.trim()) return 'City is required'
        return null
      case 'state':
        if (formData.country === 'US' && !value) return 'State is required'
        return null
      case 'zip':
        if (!value.trim()) return 'ZIP/Postal code is required'
        if (formData.country === 'US' && !/^\d{5}(-\d{4})?$/.test(value)) return 'Enter a valid US ZIP code'
        return null
      case 'cardNumber':
        if (!value) return 'Card number is required'
        if (!validateCardNumber(value)) return 'Enter a valid card number'
        return null
      case 'cardExpiry':
        if (!value) return 'Expiry date is required'
        if (!validateExpiry(value)) return 'Use MM/YY format'
        return null
      case 'cardCvc':
        if (!value) return 'CVC is required'
        if (!validateCvc(value)) return 'Enter a valid CVC'
        return null
      case 'terms':
        if (!value) return 'You must accept the terms'
        return null
      default:
        return null
    }
  }

  const handleChange = (name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error on change
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleBlur = (name: keyof FormData) => {
    setTouched(prev => ({ ...prev, [name]: true }))
    const error = validateField(name, formData[name])
    if (error) {
      setErrors(prev => ({ ...prev, [name]: error }))
    }
  }

  const validateAll = (): boolean => {
    const newErrors: FormErrors = {}
    const requiredFields = [
      'email', 'firstName', 'lastName', 'address', 'city',
      'cardNumber', 'cardExpiry', 'cardCvc', 'terms'
    ]
    if (formData.country === 'US') requiredFields.push('state', 'zip')

    requiredFields.forEach(field => {
      const error = validateField(field, formData[field as keyof FormData])
      if (error) newErrors[field] = error
    })
    setErrors(newErrors)
    setTouched(Object.fromEntries(requiredFields.map(f => [f, true])))
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateAll()) return

    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          shippingAddress: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            addressLine1: formData.address,
            addressLine2: formData.address2,
            city: formData.city,
            state: formData.state,
            postalCode: formData.zip,
            country: formData.country,
            phone: formData.phone,
          },
          cartItems: orderItems,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        if (data.errors) {
          // Field-level errors from server
          const serverErrors: FormErrors = {}
          data.errors.forEach((err: any) => {
            serverErrors[err.field] = err.message
          })
          setErrors(serverErrors)
          setTouched(Object.fromEntries(Object.keys(serverErrors).map(k => [k, true])))
        } else {
          setSubmitError(data.message || 'Something went wrong. Please try again.')
        }
        setIsSubmitting(false)
        return
      }

      // Success!
      setOrder(data)
      clearCart()
    } catch {
      setSubmitError('Network error. Please check your connection and try again.')
      setIsSubmitting(false)
    }
  }

  // Format card number input
  const formatCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 16)
    return digits.replace(/(.{4})/g, '$1 ').trim()
  }

  const formatExpiry = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 4)
    if (digits.length >= 3) return `${digits.slice(0, 2)}/${digits.slice(2)}`
    return digits
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12 lg:py-20">
      <div className="container-custom">
        {/* Progress indicator */}
        <div className="hidden md:flex items-center justify-center gap-4 mb-10">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full flex items-center justify-center font-semibold bg-primary-600 text-white">1</div>
            <div className="w-16 h-1 mx-2 bg-primary-600" />
          </div>
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full flex items-center justify-center font-semibold bg-primary-600 text-white">2</div>
            <div className="w-16 h-1 mx-2 bg-primary-600" />
          </div>
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full flex items-center justify-center font-semibold bg-primary-600 text-white">3</div>
          </div>
          <div className="flex flex-col items-center ml-2">
            <span className="text-xs text-gray-500 font-medium">Contact</span>
            <span className="text-xs text-gray-500 font-medium">Shipping</span>
            <span className="text-xs text-gray-500 font-medium">Payment</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="card p-6 sm:p-8" noValidate>
              {submitError && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm flex items-start gap-3" role="alert">
                  <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm8.707-7.707a1 1 0 00-1.414-1.414L10 10.586 7.707 8.293a1 1 0 00-1.414 1.414l2.293 2.293-2.293 2.293a1 1 0 101.414 1.414l4-4z" clipRule="evenodd"/></svg>
                  <p>{submitError}</p>
                </div>
              )}

              {/* Contact Section */}
              <fieldset className="mb-10">
                <legend className="font-display text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                  Contact Information
                </legend>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="label">Email <span className="text-red-500">*</span></label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      onBlur={() => handleBlur('email')}
                      className={`input-field ${touched.email && errors.email ? 'border-red-500 focus:ring-red-500' : ''}`}
                      placeholder="you@example.com"
                      autoComplete="email"
                      disabled={isSubmitting}
                    />
                    {touched.email && errors.email && <p className="mt-1 text-sm text-red-600" role="alert">{errors.email}</p>}
                  </div>
                  <div>
                    <label htmlFor="phone" className="label">Phone (optional)</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      className="input-field"
                      placeholder="+1 (555) 000-0000"
                      autoComplete="tel"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
              </fieldset>

              {/* Shipping Section */}
              <fieldset className="mb-10">
                <legend className="font-display text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
                  Shipping Address
                </legend>
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="firstName" className="label">First Name <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleChange('firstName', e.target.value)}
                      onBlur={() => handleBlur('firstName')}
                      className={`input-field ${touched.firstName && errors.firstName ? 'border-red-500 focus:ring-red-500' : ''}`}
                      placeholder="John"
                      autoComplete="given-name"
                      disabled={isSubmitting}
                    />
                    {touched.firstName && errors.firstName && <p className="mt-1 text-sm text-red-600" role="alert">{errors.firstName}</p>}
                  </div>
                  <div>
                    <label htmlFor="lastName" className="label">Last Name <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleChange('lastName', e.target.value)}
                      onBlur={() => handleBlur('lastName')}
                      className={`input-field ${touched.lastName && errors.lastName ? 'border-red-500 focus:ring-red-500' : ''}`}
                      placeholder="Doe"
                      autoComplete="family-name"
                      disabled={isSubmitting}
                    />
                    {touched.lastName && errors.lastName && <p className="mt-1 text-sm text-red-600" role="alert">{errors.lastName}</p>}
                  </div>
                </div>
                <div className="mb-4">
                  <label htmlFor="address" className="label">Address <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleChange('address', e.target.value)}
                    onBlur={() => handleBlur('address')}
                    className={`input-field ${touched.address && errors.address ? 'border-red-500 focus:ring-red-500' : ''}`}
                    placeholder="123 Main Street"
                    autoComplete="street-address"
                    disabled={isSubmitting}
                  />
                  {touched.address && errors.address && <p className="mt-1 text-sm text-red-600" role="alert">{errors.address}</p>}
                </div>
                <div className="mb-4">
                  <label htmlFor="address2" className="label">Apartment, suite, etc. (optional)</label>
                  <input
                    type="text"
                    id="address2"
                    value={formData.address2}
                    onChange={(e) => handleChange('address2', e.target.value)}
                    className="input-field"
                    placeholder="Apt 4B"
                    autoComplete="address-line2"
                    disabled={isSubmitting}
                  />
                </div>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="city" className="label">City <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      id="city"
                      value={formData.city}
                      onChange={(e) => handleChange('city', e.target.value)}
                      onBlur={() => handleBlur('city')}
                      className={`input-field ${touched.city && errors.city ? 'border-red-500 focus:ring-red-500' : ''}`}
                      placeholder="San Francisco"
                      autoComplete="address-level2"
                      disabled={isSubmitting}
                    />
                    {touched.city && errors.city && <p className="mt-1 text-sm text-red-600" role="alert">{errors.city}</p>}
                  </div>
                  <div>
                    <label htmlFor="state" className="label">{formData.country === 'US' ? 'State <span className="text-red-500">*</span>' : 'State / Province'}</label>
                    <select
                      id="state"
                      value={formData.state}
                      onChange={(e) => handleChange('state', e.target.value)}
                      onBlur={() => handleBlur('state')}
                      className={`input-field ${touched.state && errors.state ? 'border-red-500 focus:ring-red-500' : ''}`}
                      disabled={isSubmitting}
                    >
                      <option value="">Select state</option>
                      {US_STATES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                    </select>
                    {touched.state && errors.state && <p className="mt-1 text-sm text-red-600" role="alert">{errors.state}</p>}
                  </div>
                  <div>
                    <label htmlFor="zip" className="label">ZIP / Postal Code <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      id="zip"
                      value={formData.zip}
                      onChange={(e) => handleChange('zip', e.target.value)}
                      onBlur={() => handleBlur('zip')}
                      className={`input-field ${touched.zip && errors.zip ? 'border-red-500 focus:ring-red-500' : ''}`}
                      placeholder="94102"
                      autoComplete="postal-code"
                      disabled={isSubmitting}
                    />
                    {touched.zip && errors.zip && <p className="mt-1 text-sm text-red-600" role="alert">{errors.zip}</p>}
                  </div>
                </div>
                <div className="mt-4">
                  <label htmlFor="country" className="label">Country</label>
                  <select
                    id="country"
                    value={formData.country}
                    onChange={(e) => handleChange('country', e.target.value)}
                    className="input-field"
                    disabled={isSubmitting}
                  >
                    {COUNTRIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                  </select>
                </div>
              </fieldset>

              {/* Payment Section */}
              <fieldset className="mb-8">
                <legend className="font-display text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/></svg>
                  Payment
                </legend>
                <div className="mb-4">
                  <label htmlFor="cardNumber" className="label">Card Number <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    id="cardNumber"
                    value={formData.cardNumber}
                    onChange={(e) => handleChange('cardNumber', formatCardNumber(e.target.value))}
                    onBlur={() => handleBlur('cardNumber')}
                    className={`input-field ${touched.cardNumber && errors.cardNumber ? 'border-red-500 focus:ring-red-500' : ''}`}
                    placeholder="4242 4242 4242 4242"
                    autoComplete="cc-number"
                    maxLength={19}
                    disabled={isSubmitting}
                  />
                  {touched.cardNumber && errors.cardNumber && <p className="mt-1 text-sm text-red-600" role="alert">{errors.cardNumber}</p>}
                </div>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="cardExpiry" className="label">Expiry <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      id="cardExpiry"
                      value={formData.cardExpiry}
                      onChange={(e) => handleChange('cardExpiry', formatExpiry(e.target.value))}
                      onBlur={() => handleBlur('cardExpiry')}
                      className={`input-field ${touched.cardExpiry && errors.cardExpiry ? 'border-red-500 focus:ring-red-500' : ''}`}
                      placeholder="MM/YY"
                      autoComplete="cc-exp"
                      maxLength={5}
                      disabled={isSubmitting}
                    />
                    {touched.cardExpiry && errors.cardExpiry && <p className="mt-1 text-sm text-red-600" role="alert">{errors.cardExpiry}</p>}
                  </div>
                  <div>
                    <label htmlFor="cardCvc" className="label">CVC <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      id="cardCvc"
                      value={formData.cardCvc}
                      onChange={(e) => handleChange('cardCvc', e.target.value.replace(/\D/g, '').slice(0, 4))}
                      onBlur={() => handleBlur('cardCvc')}
                      className={`input-field ${touched.cardCvc && errors.cardCvc ? 'border-red-500 focus:ring-red-500' : ''}`}
                      placeholder="123"
                      autoComplete="cc-csc"
                      maxLength={4}
                      disabled={isSubmitting}
                    />
                    {touched.cardCvc && errors.cardCvc && <p className="mt-1 text-sm text-red-600" role="alert">{errors.cardCvc}</p>}
                  </div>
                  <div>
                    <label htmlFor="countryPayment" className="label">Country</label>
                    <select
                      id="countryPayment"
                      value={formData.country}
                      onChange={(e) => handleChange('country', e.target.value)}
                      className="input-field"
                      disabled={isSubmitting}
                    >
                      {COUNTRIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                    </select>
                  </div>
                </div>
              </fieldset>

              {/* Terms */}
              <div className="mb-8">
                <div className={`flex items-start gap-3 p-4 rounded-xl ${touched.terms && errors.terms ? 'bg-red-50 border border-red-200' : 'bg-gray-50'}`}>
                  <input
                    type="checkbox"
                    id="terms"
                    checked={formData.terms}
                    onChange={(e) => handleChange('terms', e.target.checked)}
                    onBlur={() => handleBlur('terms')}
                    className={`mt-1 w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500 ${touched.terms && errors.terms ? 'border-red-500' : ''}`}
                    disabled={isSubmitting}
                    required
                  />
                  <label htmlFor="terms" className="text-sm text-gray-600">
                    I agree to the <a href="#" className="text-primary-600 hover:underline">Terms of Service</a> and <a href="#" className="text-primary-600 hover:underline">Privacy Policy</a>
                    <span className="text-red-500">*</span>
                  </label>
                </div>
                {touched.terms && errors.terms && <p className="mt-1 text-sm text-red-600" role="alert">{errors.terms}</p>}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`btn-primary w-full py-4 text-lg flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/></svg>
                    Processing...
                  </>
                ) : (
                  `Place Order — ${formatPrice(total)}`
                )}
              </button>

              <p className="text-center text-sm text-gray-500 mt-6">
                Secured by 256-bit SSL encryption · 60-day guarantee · Free returns
              </p>
            </form>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <aside className="sticky top-24">
              <div className="card p-6">
                <h2 className="font-display text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>

                <ul className="space-y-4 mb-6" role="list">
                  {items.map((item) => {
                    const variant = getVariantById(item.variantId as any)
                    const lineTotal = (variant?.price || 0) * item.quantity
                    return (
                      <li key={item.variantId} className="flex gap-3">
                        <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden relative">
                          {variant?.images[0] ? (
                            <Image
                              src={variant.images[0]}
                              alt=""
                              fill
                              className="object-cover"
                              sizes="64px"
                            />
                          ) : (
                            <span className="text-2xl">{item.variantId === 'two-pack' ? '📦' : '🏔️'}</span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 truncate">{variant?.name || item.variantId}</p>
                          <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                        </div>
                        <span className="font-semibold text-gray-900 whitespace-nowrap">{formatPrice(lineTotal)}</span>
                      </li>
                    )
                  })}
                </ul>

                <div className="border-t border-gray-200 pt-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal ({totalItems} items)</span>
                    <span className="font-medium">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">
                      {shipping === 0 ? (
                        <span className="text-primary-600">Free</span>
                      ) : (
                        formatPrice(shipping)
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Estimated Tax (8%)</span>
                    <span className="font-medium">{formatPrice(tax)}</span>
                  </div>
                  {shipping > 0 && (
                    <p className="text-xs text-primary-600 text-center bg-primary-50 rounded-lg p-2">
                      Add {formatPrice(7500 - subtotal)} more for free shipping!
                    </p>
                  )}
                  <div className="border-t border-gray-200 pt-3 flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-primary-50 rounded-xl">
                  <p className="text-sm text-primary-800 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/></svg>
                    60-day satisfaction guarantee · Free returns
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </main>
  )
}