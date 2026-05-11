// ═══════════════════════════════════════════════════════════════
// NEXO SELLS — PRODUCT DATABASE
// ═══════════════════════════════════════════════════════════════
// HOW TO ADD A PRODUCT:
// 1. Copy one object below, increment the id
// 2. Set image: 'images/your-file.jpg' once you have real photos
// 3. Set salePrice to show a strikethrough (original) price
// 4. Set stockBySize per size variant
// 5. Push to GitHub → live in 30s
// ═══════════════════════════════════════════════════════════════

const PRODUCTS = [
  {
    id: 1,
    name: 'Nexo Core Tee',
    category: 'Tees',
    price: 1499,
    salePrice: 2500,        // original (crossed out) price — set null if no sale
    badge: 'BESTSELLER',
    emoji: '👕',
    image: null,
    description: 'The one that started it all. Heavyweight 280gsm cotton, oversized fit. Goes with literally everything.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stockBySize: { S: 5, M: 8, L: 10, XL: 6, XXL: 3 },
    colors: ['Black', 'White', 'Red'],
    inStock: true,
    featured: true,
    details: ['280gsm 100% combed cotton','Oversized drop shoulder fit','Ribbed crew neck','Screen printed logo','Wash cold, hang dry']
  },
  {
    id: 2,
    name: 'Nexo Acid Hoodie',
    category: 'Hoodies',
    price: 3500,
    salePrice: null,
    badge: 'NEW',
    emoji: '🧥',
    image: null,
    description: 'Thick. Heavy. Warm. Built for people who mean business. Kangaroo pocket, drawstring hood.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stockBySize: { S: 3, M: 5, L: 7, XL: 4, XXL: 2 },
    colors: ['Black', 'Charcoal'],
    inStock: true,
    featured: true,
    details: ['380gsm fleece cotton blend','Double layered hood','Kangaroo front pocket','Ribbed cuffs and hem','Embroidered Nexo logo']
  },
  {
    id: 3,
    name: 'Nexo Cargo Shorts',
    category: 'Bottoms',
    price: 2200,
    salePrice: null,
    badge: null,
    emoji: '🩳',
    image: null,
    description: 'Six pockets. Adjustable waist. Built for the streets.',
    sizes: ['S', 'M', 'L', 'XL'],
    stockBySize: { S: 4, M: 6, L: 5, XL: 3 },
    colors: ['Olive', 'Black', 'Beige'],
    inStock: true,
    featured: true,
    details: ['100% ripstop cotton','Six utility pockets','Adjustable drawstring waist','Relaxed wide leg fit']
  },
  {
    id: 4,
    name: 'Nexo Cap',
    category: 'Accessories',
    price: 1200,
    salePrice: null,
    badge: 'LIMITED',
    emoji: '🧢',
    image: null,
    description: 'Six panel structured cap. Adjustable strap. The cherry on top of any fit.',
    sizes: ['One Size'],
    stockBySize: { 'One Size': 15 },
    colors: ['Black', 'Red', 'White'],
    inStock: true,
    featured: true,
    details: ['Six panel structured design','Embroidered Nexo logo','Adjustable snapback strap','100% cotton twill']
  },
  {
    id: 5,
    name: 'Nexo Long Sleeve',
    category: 'Tees',
    price: 1999,
    salePrice: 2800,
    badge: 'SALE',
    emoji: '👔',
    image: null,
    description: 'Same premium cotton as the Core Tee, built for cold days.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stockBySize: { S: 2, M: 4, L: 6, XL: 3, XXL: 1 },
    colors: ['Black', 'White', 'Navy'],
    inStock: true,
    featured: false,
    details: ['280gsm 100% combed cotton','Ribbed crew neck and cuffs','Oversized fit','Screen printed chest logo']
  },
  {
    id: 6,
    name: 'Nexo Tote Bag',
    category: 'Accessories',
    price: 900,
    salePrice: null,
    badge: null,
    emoji: '🛍️',
    image: null,
    description: 'Heavy canvas tote. Carries your whole life.',
    sizes: ['One Size'],
    stockBySize: { 'One Size': 20 },
    colors: ['Natural', 'Black'],
    inStock: true,
    featured: false,
    details: ['12oz heavyweight canvas','Reinforced handles','Heat transfer logo print','15L capacity']
  }
];

const CATEGORIES = ['All', 'Tees', 'Hoodies', 'Bottoms', 'Accessories'];

const SETTINGS = {
  storeName: 'Nexo Sells',
  currency: 'PKR',
  whatsappNumber: '923XXXXXXXXX',   // ← YOUR NUMBER e.g. 923001234567
  jazzcashNumber: '03XX-XXXXXXX',   // ← YOUR JAZZCASH
  easypaisaNumber: '03XX-XXXXXXX',  // ← YOUR EASYPAISA
  freeShippingOver: 2000,
  shippingCost: 200,
  deliveryDays: '3-5',
  instagramHandle: '@nexosells',    // ← YOUR INSTAGRAM
  tiktokHandle: '@nexosells',       // ← YOUR TIKTOK
  email: 'hello@nexosells.com',     // ← YOUR EMAIL
};
