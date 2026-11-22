import { CartProvider } from '@/components/CartProvider'
import { CartDrawer } from '@/components/CartDrawer'
import { CartButton } from '@/components/CartButton'

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <CartProvider>
      {children}
      <CartDrawer />
      <CartButton />
    </CartProvider>
  )
}