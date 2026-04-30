// ═══════════════════════════════════════════════════════════════
// NEXO SELLS — PRODUCT DATABASE
// ═══════════════════════════════════════════════════════════════
// HOW TO ADD A PRODUCT:
// 1. Copy one of the objects below
// 2. Change the id (must be unique, just increment the number)
// 3. Fill in name, price, category, description, sizes, etc.
// 4. Add an image: put the image file in /images/ folder
//    then set: image: 'images/your-image.jpg'
//    (remove the emoji field when you have a real image)
// 5. Save the file and push to GitHub → Vercel auto-deploys
// ═══════════════════════════════════════════════════════════════

const PRODUCTS = [
  {
    id: 1,
    name: 'Nexo Core Tee',
    category: 'Tees',
    price: 1800,
    badge: 'BESTSELLER',
    emoji: '👕',
    image: null, // replace with: 'images/core-tee.jpg'
    description: 'The one that started it all. Heavyweight 280gsm cotton, oversized fit. This tee goes with literally everything.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'White', 'Red'],
    inStock: true,
    featured: true,
    details: [
      '280gsm 100% combed cotton',
      'Oversized drop shoulder fit',
      'Ribbed crew neck',
      'Screen printed logo',
      'Wash cold, hang dry'
    ]
  },
  {
    id: 2,
    name: 'Nexo Acid Hoodie',
    category: 'Hoodies',
    price: 3500,
    badge: 'NEW',
    emoji: '🧥',
    image: null,
    description: 'Thick. Heavy. Warm. The Acid Hoodie is built for people who mean business. Kangaroo pocket, drawstring hood, the works.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'Charcoal'],
    inStock: true,
    featured: true,
    details: [
      '380gsm fleece cotton blend',
      'Double layered hood',
      'Kangaroo front pocket',
      'Ribbed cuffs and hem',
      'Embroidered Nexo logo'
    ]
  },
  {
    id: 3,
    name: 'Nexo Cargo Shorts',
    category: 'Bottoms',
    price: 2200,
    badge: null,
    emoji: '🩳',
    image: null,
    description: 'Six pockets. Adjustable waist. Built for the streets. These aren\'t your average shorts.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Olive', 'Black', 'Beige'],
    inStock: true,
    featured: true,
    details: [
      '100% ripstop cotton',
      'Six utility pockets',
      'Adjustable drawstring waist',
      'Relaxed wide leg fit',
      'Side zip closure'
    ]
  },
  {
    id: 4,
    name: 'Nexo Cap',
    category: 'Accessories',
    price: 1200,
    badge: 'LIMITED',
    emoji: '🧢',
    image: null,
    description: 'Six panel structured cap. Adjustable strap. The cherry on top of any fit.',
    sizes: ['One Size'],
    colors: ['Black', 'Red', 'White'],
    inStock: true,
    featured: true,
    details: [
      'Six panel structured design',
      'Embroidered Nexo logo',
      'Adjustable snapback strap',
      '100% cotton twill',
      'Pre-curved brim'
    ]
  },
  {
    id: 5,
    name: 'Nexo Long Sleeve',
    category: 'Tees',
    price: 2400,
    badge: null,
    emoji: '👔',
    image: null,
    description: 'The long sleeve you\'ve been looking for. Same premium cotton as the Core Tee but built for cold days.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'White', 'Navy'],
    inStock: true,
    featured: false,
    details: [
      '280gsm 100% combed cotton',
      'Ribbed crew neck and cuffs',
      'Oversized fit',
      'Screen printed chest logo'
    ]
  },
  {
    id: 6,
    name: 'Nexo Tote Bag',
    category: 'Accessories',
    price: 900,
    badge: null,
    emoji: '🛍️',
    image: null,
    description: 'Heavy canvas tote. Carries your whole life. Nexo logo heat transfer print.',
    sizes: ['One Size'],
    colors: ['Natural', 'Black'],
    inStock: true,
    featured: false,
    details: [
      '12oz heavyweight canvas',
      'Reinforced handles',
      'Heat transfer logo print',
      '15L capacity',
      'Inner zip pocket'
    ]
  }
];

// ═══════════════════════════════════════════════════════════════
// CATEGORIES — add new ones here as you expand
// ═══════════════════════════════════════════════════════════════
const CATEGORIES = ['All', 'Tees', 'Hoodies', 'Bottoms', 'Accessories'];

// ═══════════════════════════════════════════════════════════════
// SITE SETTINGS
// ═══════════════════════════════════════════════════════════════
const SETTINGS = {
  storeName: 'Nexo Sells',
  currency: 'PKR',
  whatsappNumber: '923XXXXXXXXX', // Replace with your WhatsApp number (no + or spaces)
  jazzcashNumber: '03XX-XXXXXXX', // Replace with your JazzCash number
  easypaisaNumber: '03XX-XXXXXXX', // Replace with your EasyPaisa number
  freeShippingOver: 2000,
  shippingCost: 200,
  deliveryDays: '3-5',
};
