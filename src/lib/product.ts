export type VariantId = 'small' | 'medium' | 'large' | 'two-pack';

export interface Variant {
  id: VariantId;
  name: string;
  description: string;
  price: number; // in cents
  originalPrice?: number; // in cents, for bundle discounts
  weightRange: string; // e.g., "Under 15 kg"
  dimensions: {
    diameter: string; // e.g., "4 in / 10 cm"
    height: string; // e.g., "5.5 in / 14 cm"
    capacity: string; // e.g., "1.5 cups / 350 ml"
    weight: string; // e.g., "1.2 lb / 540 g"
  };
  materials: {
    snuffleSkirt: string;
    lickSeal: string;
    core: string;
    base: string;
  };
  features: string[];
  includes: string[];
  popular?: boolean;
  badge?: string;
  images: string[];
}

export interface FAQ {
  question: string;
  answer: string;
  category: 'general' | 'usage' | 'cleaning' | 'safety' | 'shipping';
}

export const VARIANTS: Variant[] = [
  {
    id: 'small',
    name: 'ThawVault Small',
    description: 'Perfect for small breeds and puppies. Compact 3-stage enrichment that fits in any freezer.',
    price: 7900, // $79.00
    weightRange: 'Under 15 kg (33 lbs)',
    dimensions: {
      diameter: '4 in / 10 cm',
      height: '5.5 in / 14 cm',
      capacity: '1.5 cups / 350 ml',
      weight: '1.2 lb / 540 g',
    },
    materials: {
      snuffleSkirt: 'Food-grade LFGB platinum silicone, BPA-free, phthalate-free',
      lickSeal: 'Double-wall insulated food-grade silicone with vacuum-sealed gel core',
      core: 'Weighted TPR (thermoplastic rubber) with food-safe additive, bottom-weighted for wobble',
      base: 'Non-slip food-grade silicone suction base',
    },
    features: [
      'Silicone snuffle skirt with 12 foraging flaps',
      'Insulated frozen lick seal holds freeze 2+ hours',
      'Weighted slow-release core dispenses kibble unpredictably',
      'Suction base prevents sliding on hard floors',
      'Dishwasher safe (top rack)',
      'Freezer safe down to -40°F / -40°C',
    ],
    includes: [
      '1x ThawVault Small Dome',
      '1x Silicone Snuffle Skirt (pre-attached)',
      '1x Insulated Frozen Lick Seal',
      '1x Weighted Slow-Release Core',
      '1x Recipe & Training Guide (digital)',
    ],
    images: [
      '/images/thawvault-p3.png',
      '/images/thawvault-p2.png',
      '/images/thawvault.png',
    ],
  },
  {
    id: 'medium',
    name: 'ThawVault Medium',
    description: 'Our bestseller for medium breeds. Balanced capacity and engagement time for daily use.',
    price: 8900, // $89.00
    weightRange: 'Under 15 kg (33 lbs)',
    dimensions: {
      diameter: '5.5 in / 14 cm',
      height: '7 in / 18 cm',
      capacity: '2.5 cups / 590 ml',
      weight: '1.8 lb / 820 g',
    },
    materials: {
      snuffleSkirt: 'Food-grade LFGB platinum silicone, BPA-free, phthalate-free',
      lickSeal: 'Double-wall insulated food-grade silicone with vacuum-sealed gel core',
      core: 'Weighted TPR (thermoplastic rubber) with food-safe additive, bottom-weighted for wobble',
      base: 'Non-slip food-grade silicone suction base',
    },
    features: [
      'Silicone snuffle skirt with 16 foraging flaps',
      'Insulated frozen lick seal holds freeze 2.5+ hours',
      'Weighted slow-release core dispenses kibble unpredictably',
      'Suction base prevents sliding on hard floors',
      'Dishwasher safe (top rack)',
      'Freezer safe down to -40°F / -40°C',
    ],
    includes: [
      '1x ThawVault Medium Dome',
      '1x Silicone Snuffle Skirt (pre-attached)',
      '1x Insulated Frozen Lick Seal',
      '1x Weighted Slow-Release Core',
      '1x Recipe & Training Guide (digital)',
    ],
    popular: true,
    badge: 'Most Popular',
    images: [
      '/images/thawvault-p3.png',
      '/images/thawvault-p2.png',
      '/images/thawvault.png',
    ],
  },
  {
    id: 'large',
    name: 'ThawVault Large / Power Chewer',
    description: 'Built for large breeds and power chewers. Reinforced construction with extra-thick walls.',
    price: 9900, // $99.00
    weightRange: '15 kg+ (33+ lbs)',
    dimensions: {
      diameter: '7 in / 18 cm',
      height: '8.5 in / 22 cm',
      capacity: '4 cups / 950 ml',
      weight: '2.6 lb / 1.18 kg',
    },
    materials: {
      snuffleSkirt: 'Reinforced food-grade LFGB platinum silicone with tear-resistant mesh core, BPA-free',
      lickSeal: 'Double-wall insulated food-grade silicone with reinforced rim and vacuum-sealed gel core',
      core: 'Heavy-duty weighted TPR with steel shot core, extra-thick walls for aggressive chewers',
      base: 'Wide-profile non-slip food-grade silicone suction base',
    },
    features: [
      'Reinforced silicone snuffle skirt with 20 foraging flaps',
      'Insulated frozen lick seal holds freeze 3+ hours',
      'Heavy-duty weighted core with steel shot for extreme wobble',
      'Wide suction base for maximum stability',
      'Dishwasher safe (top rack)',
      'Freezer safe down to -40°F / -40°C',
      'Lifetime chew-damage warranty',
    ],
    includes: [
      '1x ThawVault Large / Power Chewer Dome',
      '1x Reinforced Silicone Snuffle Skirt (pre-attached)',
      '1x Heavy-Duty Insulated Frozen Lick Seal',
      '1x Heavy-Duty Weighted Slow-Release Core',
      '1x Recipe & Training Guide (digital)',
      'Lifetime warranty registration card',
    ],
    images: [
      '/images/thawvault-p3.png',
      '/images/thawvault-p2.png',
      '/images/thawvault.png',
    ],
  },
  {
    id: 'two-pack',
    name: '2-Pack Rotation Bundle',
    description: 'Keep the enrichment going non-stop. While one thaws, the other engages. Best value for daily use.',
    price: 15900, // $159.00 (save $19 vs buying separately)
    originalPrice: 17800, // $178.00 (2x medium)
    weightRange: 'Under 15 kg (33 lbs) — ideal for rotation',
    dimensions: {
      diameter: '5.5 in / 14 cm (each)',
      height: '7 in / 18 cm (each)',
      capacity: '2.5 cups / 590 ml (each)',
      weight: '1.8 lb / 820 g (each)',
    },
    materials: {
      snuffleSkirt: 'Food-grade LFGB platinum silicone, BPA-free, phthalate-free',
      lickSeal: 'Double-wall insulated food-grade silicone with vacuum-sealed gel core',
      core: 'Weighted TPR (thermoplastic rubber) with food-safe additive, bottom-weighted for wobble',
      base: 'Non-slip food-grade silicone suction base',
    },
    features: [
      'Two complete ThawVault Medium domes',
      'Rotate for continuous enrichment — zero downtime',
      'Prep one while dog uses the other',
      'Perfect for multi-dog households',
      'Dishwasher safe (top rack)',
      'Freezer safe down to -40°F / -40°C',
      'Save $19 vs individual purchase',
    ],
    includes: [
      '2x ThawVault Medium Domes',
      '2x Silicone Snuffle Skirts (pre-attached)',
      '2x Insulated Frozen Lick Seals',
      '2x Weighted Slow-Release Cores',
      '1x Recipe & Training Guide (digital)',
      'Rotation schedule magnet',
    ],
    badge: 'Best Value',
    images: [
      '/images/thawvault-p3.png',
      '/images/thawvault-p2.png',
      '/images/thawvault.png',
    ],
  },
];

export const FAQS: FAQ[] = [
  // General
  {
    question: 'How long does ThawVault keep my dog busy?',
    answer: 'Most dogs engage for 1.5 to 2+ hours per session. The frozen lick seal extends licking time significantly, while the weighted core and snuffle skirt provide varied enrichment that prevents boredom.',
    category: 'general',
  },
  {
    question: 'What size should I get for my dog?',
    answer: 'Small: under 15 kg / 33 lbs (terriers, puppies, small breeds). Medium: under 15 kg / 33 lbs but higher drive (border collies, cattle dogs). Large/Power Chewer: 15 kg+ / 33+ lbs OR any aggressive chewer regardless of size. When in doubt, size up.',
    category: 'general',
  },
  {
    question: 'Is ThawVault really zero electronics?',
    answer: 'Yes. No batteries, no charging, no apps, no Bluetooth. Pure mechanical enrichment powered by thermodynamics (frozen core), physics (wobble mechanics), and instinct (foraging). It works anywhere — camping, travel, power outages.',
    category: 'general',
  },
  {
    question: 'Can I use ThawVault for cats?',
    answer: 'ThawVault is designed for dogs. The weighted core and snuffle skirt are calibrated for canine jaw strength and foraging style. For cats, we recommend our upcoming ThawVault Cat line (join the waitlist).',
    category: 'general',
  },
  // Usage
  {
    question: 'What can I put in the frozen lick seal?',
    answer: 'Any dog-safe liquid or semi-liquid: bone broth, plain yogurt, pumpkin puree, mashed banana, peanut butter thinned with water, wet food blended with water. Freeze 4+ hours for best results. The insulated chamber keeps it frozen 2-3 hours at room temp.',
    category: 'usage',
  },
  {
    question: 'What kibble/treats work in the weighted core?',
    answer: 'Dry kibble up to 0.6 in / 15 mm diameter works best. Small training treats, freeze-dried raw pieces, or dental chews broken into pieces. Avoid sticky/soft treats that clump. The core dispenses 1-3 pieces per wobble cycle.',
    category: 'usage',
  },
  {
    question: 'How do I introduce ThawVault to my dog?',
    answer: 'Start easy: leave the skirt off, put high-value treats in the core, let them figure out the wobble. Next session, add the skirt with visible treats. Final step: freeze the lick seal. Most dogs master all 3 stages within 3-5 sessions.',
    category: 'usage',
  },
  {
    question: 'Can I use it without freezing the lick seal?',
    answer: 'Yes! The lick seal works as a room-temperature slow feeder for wet food, peanut butter, or yogurt. But freezing unlocks the full 2+ hour engagement and cooling benefit. We recommend freezing for maximum enrichment.',
    category: 'usage',
  },
  // Cleaning
  {
    question: 'Is ThawVault dishwasher safe?',
    answer: 'Yes, all components are top-rack dishwasher safe. The silicone skirt, lick seal, and core can all go in the dishwasher. The weighted core\'s TPR material withstands high heat. For the insulated seal, we recommend air drying upside down to prevent water trapping.',
    category: 'cleaning',
  },
  {
    question: 'How do I clean the snuffle skirt flaps?',
    answer: 'The flaps are molded as one piece with the skirt — no seams to trap food. Run under warm water, use a bottle brush for between flaps, or toss in dishwasher. For stubborn residue, soak 10 minutes in warm soapy water before brushing.',
    category: 'cleaning',
  },
  {
    question: 'Can I boil ThawVault to sanitize?',
    answer: 'We don\'t recommend boiling. The vacuum-sealed gel in the lick seal can be damaged by sustained boiling temps. Dishwasher (top rack, sanitize cycle) or hand wash with hot soapy water is sufficient. All materials are non-porous and resist bacterial growth.',
    category: 'cleaning',
  },
  // Safety
  {
    question: 'Is the silicone actually food-grade and safe?',
    answer: 'Yes. All silicone components are LFGB-certified (stricter than FDA), platinum-cured, BPA-free, phthalate-free, lead-free, and PVC-free. Tested by third-party labs for food contact safety. The TPR core uses food-safe additives only.',
    category: 'safety',
  },
  {
    question: 'What if my dog destroys the snuffle skirt?',
    answer: 'The platinum silicone is extremely tear-resistant. For the Large/Power Chewer variant, we added a tear-resistant mesh core. If any component fails under normal use, our 60-day satisfaction guarantee covers replacement. Lifetime warranty on Large variant.',
    category: 'safety',
  },
  {
    question: 'Is the weighted core a choking hazard?',
    answer: 'The core is a single molded piece (approx 2.5 in / 6 cm diameter) — too large to swallow for dogs in the recommended weight range. The steel shot in the Large variant is fully encapsulated in TPR. Always supervise first few sessions.',
    category: 'safety',
  },
  {
    question: 'Can puppies use ThawVault?',
    answer: 'Yes, with supervision. The Small variant is puppy-appropriate. For teething puppies, the frozen lick seal provides soothing cold relief. Start with shorter sessions (15-20 min) and very easy kibble dispensing until they learn the mechanics.',
    category: 'safety',
  },
  // Shipping
  {
    question: 'Do you ship internationally?',
    answer: 'Currently US, Canada, UK, EU, and Australia. Shipping calculated at checkout. International orders may incur customs duties/taxes paid by recipient. Free shipping on US orders $75+.',
    category: 'shipping',
  },
  {
    question: 'How long does shipping take?',
    answer: 'US: 3-5 business days. Canada: 5-10 business days. UK/EU: 7-14 business days. Australia: 10-18 business days. All orders ship within 1 business day. Tracking emailed upon shipment.',
    category: 'shipping',
  },
  {
    question: 'What is your return policy?',
    answer: '60-day satisfaction guarantee. If your dog doesn\'t love it, email us for a prepaid return label (US only) and full refund. Item must be clean and include all components. International returns accepted but customer covers return shipping.',
    category: 'shipping',
  },
];

export function getVariantById(id: VariantId): Variant | undefined {
  return VARIANTS.find((v) => v.id === id);
}

export function getVariantsByWeightRange(weightKg: number): Variant[] {
  if (weightKg < 15) {
    return VARIANTS.filter((v) => v.id === 'small' || v.id === 'medium' || v.id === 'two-pack');
  }
  return VARIANTS.filter((v) => v.id === 'large');
}

export function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

export const VALID_VARIANT_IDS: VariantId[] = ['small', 'medium', 'large', 'two-pack'];