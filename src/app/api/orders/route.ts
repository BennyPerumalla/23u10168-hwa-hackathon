import { NextRequest, NextResponse } from 'next/server';
import { VALID_VARIANT_IDS, getVariantById, type VariantId } from '@/lib/product';

export const runtime = 'nodejs';

interface CartItem {
  variantId: string;
  quantity: number;
}

interface ShippingAddress {
  firstName: string;
  lastName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone?: string;
}

interface OrderRequest {
  customerName: string;
  email: string;
  shippingAddress: ShippingAddress;
  cartItems: CartItem[];
}

interface ValidationError {
  field: string;
  message: string;
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validateCartItems(cartItems: CartItem[]): ValidationError[] {
  const errors: ValidationError[] = [];

  if (!Array.isArray(cartItems) || cartItems.length === 0) {
    errors.push({ field: 'cartItems', message: 'Cart must contain at least one item' });
    return errors;
  }

  cartItems.forEach((item, index) => {
    const prefix = `cartItems[${index}]`;

    if (!item.variantId || typeof item.variantId !== 'string') {
      errors.push({ field: `${prefix}.variantId`, message: 'Variant ID is required' });
    } else if (!VALID_VARIANT_IDS.includes(item.variantId as VariantId)) {
      errors.push({
        field: `${prefix}.variantId`,
        message: `Invalid variant ID: "${item.variantId}". Valid options: ${VALID_VARIANT_IDS.join(', ')}`,
      });
    }

    if (typeof item.quantity !== 'number' || !Number.isInteger(item.quantity)) {
      errors.push({ field: `${prefix}.quantity`, message: 'Quantity must be an integer' });
    } else if (item.quantity <= 0) {
      errors.push({ field: `${prefix}.quantity`, message: 'Quantity must be greater than 0' });
    } else if (item.quantity > 10) {
      errors.push({ field: `${prefix}.quantity`, message: 'Maximum quantity per variant is 10' });
    }
  });

  return errors;
}

function validateShippingAddress(address: ShippingAddress): ValidationError[] {
  const errors: ValidationError[] = [];
  const requiredFields: (keyof ShippingAddress)[] = ['firstName', 'lastName', 'addressLine1', 'city', 'state', 'postalCode', 'country'];

  requiredFields.forEach((field) => {
    const value = address[field];
    if (!value || typeof value !== 'string' || value.trim() === '') {
      errors.push({ field: `shippingAddress.${field}`, message: `${field} is required` });
    }
  });

  if (address.postalCode && address.country === 'US' && !/^\d{5}(-\d{4})?$/.test(address.postalCode)) {
    errors.push({ field: 'shippingAddress.postalCode', message: 'Invalid US ZIP code format' });
  }

  if (address.country === 'US' && address.state && address.state.length !== 2) {
    errors.push({ field: 'shippingAddress.state', message: 'US state must be 2-letter abbreviation' });
  }

  return errors;
}

function validateOrderRequest(body: unknown): { errors: ValidationError[]; data?: OrderRequest } {
  const errors: ValidationError[] = [];

  if (!body || typeof body !== 'object') {
    errors.push({ field: 'body', message: 'Request body must be a valid JSON object' });
    return { errors };
  }

  const req = body as Record<string, unknown>;

  let customerName: string;
  let email: string;
  let shippingAddress: ShippingAddress;
  let cartItems: CartItem[];

  // Validate and extract customerName
  if (!req.customerName || typeof req.customerName !== 'string' || req.customerName.trim() === '') {
    errors.push({ field: 'customerName', message: 'Customer name is required' });
    customerName = '';
  } else if (req.customerName.trim().length > 100) {
    errors.push({ field: 'customerName', message: 'Customer name must be 100 characters or less' });
    customerName = '';
  } else {
    customerName = req.customerName.trim();
  }

  // Validate and extract email
  if (!req.email || typeof req.email !== 'string' || req.email.trim() === '') {
    errors.push({ field: 'email', message: 'Email is required' });
    email = '';
  } else if (!validateEmail(req.email.trim())) {
    errors.push({ field: 'email', message: 'Invalid email format' });
    email = '';
  } else {
    email = req.email.trim().toLowerCase();
  }

  // Validate and extract shippingAddress
  if (!req.shippingAddress || typeof req.shippingAddress !== 'object') {
    errors.push({ field: 'shippingAddress', message: 'Shipping address is required' });
    shippingAddress = {} as ShippingAddress;
  } else {
    errors.push(...validateShippingAddress(req.shippingAddress as ShippingAddress));
    shippingAddress = req.shippingAddress as ShippingAddress;
  }

  // Validate and extract cartItems
  if (!req.cartItems) {
    errors.push({ field: 'cartItems', message: 'Cart items are required' });
    cartItems = [];
  } else {
    errors.push(...validateCartItems(req.cartItems as CartItem[]));
    cartItems = req.cartItems as CartItem[];
  }

  if (errors.length > 0) {
    return { errors };
  }

  return {
    errors: [],
    data: {
      customerName,
      email,
      shippingAddress,
      cartItems,
    },
  };
}

function calculateOrderTotal(cartItems: CartItem[]): { subtotal: number; tax: number; shipping: number; total: number; items: Array<{ variantId: VariantId; name: string; quantity: number; unitPrice: number; lineTotal: number }> } {
  const items = cartItems.map((item) => {
    const variant = getVariantById(item.variantId as VariantId);
    if (!variant) {
      throw new Error(`Invalid variant ID: ${item.variantId}`);
    }
    const unitPrice = variant.price;
    const lineTotal = unitPrice * item.quantity;
    return {
      variantId: variant.id,
      name: variant.name,
      quantity: item.quantity,
      unitPrice,
      lineTotal,
    };
  });

  const subtotal = items.reduce((sum, item) => sum + item.lineTotal, 0);
  const shipping = subtotal >= 7500 ? 0 : 999; // Free shipping over $75
  const tax = Math.round(subtotal * 0.08); // 8% tax
  const total = subtotal + shipping + tax;

  return { subtotal, tax, shipping, total, items };
}

function generateOrderId(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `TV-${timestamp}-${random}`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
  } catch {
    return NextResponse.json(
      { errors: [{ field: 'body', message: 'Invalid JSON in request body' }] },
      { status: 400 }
    );
  }

  const body = await request.json();
  const validation = validateOrderRequest(body);

  if (validation.errors.length > 0) {
    return NextResponse.json(
      { errors: validation.errors },
      { status: 400 }
    );
  }

  const { customerName, email, shippingAddress, cartItems } = validation.data!;
  const { subtotal, tax, shipping, total, items } = calculateOrderTotal(cartItems);
  const orderId = generateOrderId();
  const timestamp = new Date().toISOString();

  // In a real app, you would:
  // 1. Save order to database
  // 2. Create payment intent with Stripe
  // 3. Send confirmation email
  // 4. Trigger fulfillment workflow

  console.log('[ORDER CREATED]', {
    orderId,
    customerName,
    email,
    items: items.map((i) => ({ variantId: i.variantId, quantity: i.quantity })),
    total,
    timestamp,
  });

  return NextResponse.json(
    {
      orderId,
      customerName,
      email,
      shippingAddress,
      items: items.map((item) => ({
        variantId: item.variantId,
        name: item.name,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        lineTotal: item.lineTotal,
      })),
      subtotal,
      tax,
      shipping,
      total,
      currency: 'USD',
      status: 'pending_payment',
      createdAt: timestamp,
    },
    { status: 201 }
  );
}

export async function GET() {
  return NextResponse.json(
    { message: 'Use POST to create an order', validVariantIds: VALID_VARIANT_IDS },
    { status: 405 }
  );
}