# ThawVault

Zero-electronics, 3-stage dog enrichment dome that keeps dogs busy for 1.5–2+ hours while owners are away.

**Three stages:**
1. **Silicone snuffle skirt** — hides kibble; engages foraging instincts (0–20 min)
2. **Insulated frozen lick seal** — holds broth/yogurt/pumpkin frozen 2.5+ hours; licking calms anxiety (20–60 min)
3. **Weighted slow-release core** — wobbles unpredictably, dispensing kibble slowly (60+ min)

---

## Storefront Features

- **Interactive Variant Selector** — 3 size cards (Small/Medium/Large) with live price/SKU, quantity stepper, terracotta Add to Cart with hover/active feedback
- **localStorage Cart Drawer** — slide-out drawer (max-w-[420px]) with blurred backdrop, free-shipping progress bar, compact items with thumbnails + +/-/remove, sticky subtotal/total + terracotta Checkout button
- **Responsive Checkout** — 2-col layout (7/5 cols on lg), inline validation (email, address, card), terracotta Submit, disabled loading state
- **Order Confirmation** — centered card with forest-teal checkmark, highlighted Order ID, delivery estimate, itemized receipt, shipping summary

---

## API: POST /api/orders

Creates an order from cart items. Validates customer info, shipping address, and cart items (valid variant IDs, positive quantities).

### Request

```json
POST /api/orders
Content-Type: application/json

{
  "customerName": "John Doe",
  "email": "john@example.com",
  "shippingAddress": {
    "firstName": "John",
    "lastName": "Doe",
    "addressLine1": "123 Main St",
    "addressLine2": "Apt 4B",
    "city": "San Francisco",
    "state": "CA",
    "postalCode": "94102",
    "country": "US",
    "phone": "+1 555 000 0000"
  },
  "cartItems": [
    { "variantId": "medium", "quantity": 1 }
  ]
}
```

### Responses

**201 Created**
```json
{
  "orderId": "TV-ABC123-XYZ789",
  "customerName": "John Doe",
  "email": "john@example.com",
  "shippingAddress": { ... },
  "items": [
    { "variantId": "medium", "name": "ThawVault Medium", "quantity": 1, "unitPrice": 8900, "lineTotal": 8900 }
  ],
  "subtotal": 8900,
  "tax": 712,
  "shipping": 0,
  "total": 9612,
  "currency": "USD",
  "status": "pending_payment",
  "createdAt": "2024-01-15T10:30:00.000Z"
}
```

**400 Bad Request** (field-level errors)
```json
{
  "errors": [
    { "field": "email", "message": "Enter a valid email address" },
    { "field": "shippingAddress.zip", "message": "Enter a valid US ZIP code" },
    { "field": "cartItems[0].variantId", "message": "Invalid variant ID: 'xl'. Valid options: small, medium, large, two-pack" }
  ]
}
```

---

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript (strict)
- **Styling:** Tailwind CSS
- **Fonts:** Plus Jakarta Sans (headings) + Inter (body) via `next/font`
- **State:** React Context + localStorage persistence

---

## Quick Start

```bash
# Install dependencies
npm install

# Run development server (http://localhost:3000)
npm run dev

# Production build
npm run build

# Start production server
npm start
```

---

## Live Demo

**Vercel URL:** `https://thawvault-shop-hackathon.vercel.app` *(update after deploy)*

---

## Project Structure

```
src/
├── app/
│   ├── api/orders/route.ts      # POST /api/orders
│   ├── checkout/page.tsx        # Checkout page (dynamic)
│   ├── layout.tsx               # Root layout, fonts, metadata
│   ├── page.tsx                 # Home page (Hero, Timeline, Materials, Variants, Reviews, FAQ)
│   └── globals.css              # Tailwind + custom components
├── components/
│   ├── Hero.tsx                 # Split hero with product image
│   ├── ThreeStageTimeline.tsx   # 3-column engagement timeline
│   ├── MaterialsSafety.tsx      # Spec cards + comparison table
│   ├── VariantSelector.tsx      # Buy box with variant cards
│   ├── ProductVariants.tsx      # Full comparison table
│   ├── Reviews.tsx              # 3-col review cards
│   ├── FAQAccordion.tsx         # 5-item animated accordion
│   ├── Footer.tsx               # Dark forest-teal footer
│   ├── Navbar.tsx               # Sticky header with cart button
│   ├── CartProvider.tsx         # Cart context + localStorage
│   ├── CartDrawer.tsx           # Slide-out cart drawer
│   ├── CartButton.tsx           # Floating cart FAB
│   └── CheckoutForm.tsx         # Checkout form + confirmation
├── lib/
│   └── product.ts               # Variant data, FAQs, helpers
└── public/images/
    ├── thawvault-p3.png         # Main product image
    ├── thawvault-p2.png
    └── thawvault.png
```