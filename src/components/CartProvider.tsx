'use client'

import { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react'
import { VARIANTS, type Variant } from '@/lib/product'

interface CartItem {
  variantId: string
  quantity: number
}

interface CartContextType {
  items: CartItem[]
  addItem: (variantId: string, quantity: number) => void
  removeItem: (variantId: string) => void
  updateQuantity: (variantId: string, quantity: number) => void
  clearCart: () => void
  totalItems: number
  subtotal: number
  isCartOpen: boolean
  openCart: () => void
  closeCart: () => void
  isHydrated: boolean
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const CART_STORAGE_KEY = 'thawvault-cart'

function loadCartFromStorage(): CartItem[] {
  if (typeof window === 'undefined') return []
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      if (Array.isArray(parsed)) return parsed
    }
  } catch {
    // Ignore parse errors
  }
  return []
}

function saveCartToStorage(items: CartItem[]) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
  } catch {
    // Ignore quota errors
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)

  // Hydrate from localStorage on mount
  useEffect(() => {
    const storedItems = loadCartFromStorage()
    setItems(storedItems)
    setIsHydrated(true)
  }, [])

  // Persist to localStorage whenever items change
  useEffect(() => {
    if (isHydrated) {
      saveCartToStorage(items)
    }
  }, [items, isHydrated])

  const addItem = useCallback((variantId: string, quantity: number) => {
    setItems(prev => {
      const existing = prev.find(item => item.variantId === variantId)
      if (existing) {
        return prev.map(item =>
          item.variantId === variantId
            ? { ...item, quantity: Math.min(10, item.quantity + quantity) }
            : item
        )
      }
      return [...prev, { variantId, quantity }]
    })
    setIsCartOpen(true)
  }, [])

  const removeItem = useCallback((variantId: string) => {
    setItems(prev => prev.filter(item => item.variantId !== variantId))
  }, [])

  const updateQuantity = useCallback((variantId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(variantId)
      return
    }
    setItems(prev => prev.map(item =>
      item.variantId === variantId ? { ...item, quantity: Math.min(10, quantity) } : item
    ))
  }, [removeItem])

  const clearCart = useCallback(() => {
    setItems([])
  }, [])

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = items.reduce((sum, item) => {
    const variant = VARIANTS.find(v => v.id === item.variantId)
    return sum + (variant?.price || 0) * item.quantity
  }, 0)

  return (
    <CartContext.Provider value={{
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      totalItems,
      subtotal,
      isCartOpen,
      openCart: () => setIsCartOpen(true),
      closeCart: () => setIsCartOpen(false),
      isHydrated,
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}