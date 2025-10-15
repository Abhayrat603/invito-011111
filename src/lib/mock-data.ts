import type { Product, Category, EditRequest, Order, DealProduct } from './types';

export const categories: Category[] = [
  { id: 'cat1', name: 'Wedding', imageId: 'category-wedding' },
  { id: 'cat2', name: 'Birthday', imageId: 'category-birthday' },
  { id: 'cat5', name: 'Engagement', imageId: 'category-engagement' },
  { id: 'cat6', name: 'Anniversary', imageId: 'category-anniversary' },
  { id: 'cat7', name: 'Housewarming', imageId: 'category-housewarming' },
  { id: 'cat8', name: 'Baby Shower', imageId: 'category-baby-shower' },
  { id: 'cat9', name: 'Graduation', imageId: 'category-graduation' },
  { id: 'cat3', name: 'Corporate', imageId: 'category-corporate' },
  { id: 'cat4', name: 'Party', imageId: 'category-party' },
  { id: 'cat10', name: 'E-Invite', imageId: 'category-e-invite' },
  { id: 'cat11', name: 'Save the Date', imageId: 'category-save-the-date' },
];

export const products: Product[] = [
  {
    id: 'prod1',
    slug: 'classic-wedding-invitation',
    name: 'Classic Wedding',
    description: 'A timeless and elegant wedding invitation with beautiful calligraphy.',
    price: 5.99,
    images: ['product-wedding-1', 'product-wedding-2'],
    category: 'Wedding',
    createdAt: new Date(),
  },
  {
    id: 'prod2',
    slug: 'modern-birthday-bash',
    name: 'Modern Birthday Bash',
    description: 'A fun and vibrant birthday invitation perfect for any age.',
    price: 4.50,
    images: ['product-birthday-1', 'product-birthday-2'],
    category: 'Birthday',
    createdAt: new Date(),
  },
  {
    id: 'prod3',
    slug: 'corporate-gala-invite',
    name: 'Corporate Gala Invite',
    description: 'A professional and sophisticated invitation for your next corporate event.',
    price: 7.00,
    images: ['product-corporate-1', 'product-corporate-2'],
    category: 'Corporate',
    createdAt: new Date(),
  },
  {
    id: 'prod4',
    slug: 'summer-pool-party',
    name: 'Summer Pool Party',
    description: 'A playful and colorful invitation for a summer pool party.',
    price: 3.99,
    images: ['product-party-1', 'product-party-2'],
    category: 'Party',
    createdAt: new Date(),
  },
  {
    id: 'prod5',
    slug: 'floral-bridal-shower',
    name: 'Floral Bridal Shower',
    description: 'A beautiful and delicate invitation for a bridal shower, featuring floral designs.',
    price: 5.50,
    images: ['product-bridal-1', 'product-bridal-2'],
    category: 'Wedding',
    createdAt: new Date(),
  },
  {
    id: 'prod6',
    slug: 'kids-dinosaur-party',
    name: 'Kids Dinosaur Party',
    description: 'A roaring fun invitation for a child\'s dinosaur-themed birthday party.',
    price: 4.25,
    images: ['product-dino-1', 'product-dino-2'],
    category: 'Birthday',
    createdAt: new Date(),
  },
  {
    id: 'prod7',
    slug: 'elegant-anniversary-invite',
    name: 'Elegant Anniversary',
    description: 'Celebrate a milestone with this elegant anniversary invitation.',
    price: 6.50,
    images: ['product-anniversary-1', 'product-anniversary-2'],
    category: 'Anniversary',
    createdAt: new Date(),
  },
  {
    id: 'prod8',
    slug: 'business-conference-pass',
    name: 'Business Conference',
    description: 'A clean and modern design for a business conference or seminar.',
    price: 8.00,
    images: ['product-conference-1', 'product-conference-2'],
    category: 'Corporate',
    createdAt: new Date(),
  },
  {
    id: 'prod9',
    slug: 'shop-visiting-card',
    name: 'Shop Visiting Card',
    description: 'A professional and eye-catching visiting card for your shop. Designed in a modern, attractive style.',
    price: 10,
    images: ['product-visiting-card-1', 'product-visiting-card-2'],
    category: 'Corporate',
    createdAt: new Date(),
  },
  {
    id: 'prod10',
    slug: 'rustic-wedding-suite',
    name: 'Rustic Wedding Suite',
    description: 'A charming rustic-themed wedding invitation perfect for a countryside wedding.',
    price: 6.25,
    images: ['product-rustic-wedding-1', 'product-rustic-wedding-2'],
    category: 'Wedding',
    createdAt: new Date(),
  }
];

export const editRequests: EditRequest[] = [
  {
    id: 'req1',
    productId: 'prod1',
    productName: 'Classic Wedding',
    requestDetails: 'Please change the main font to "Great Vibes" and the wedding date to October 26, 2024.',
    status: 'Approved',
    requestedAt: new Date('2023-10-01T10:00:00Z'),
    updatedAt: new Date('2023-10-01T18:30:00Z'),
  },
  {
    id: 'req2',
    productId: 'prod2',
    productName: 'Modern Birthday Bash',
    requestDetails: 'Can you change the age from "30th" to "40th" and use a blue color scheme instead of pink?',
    status: 'Pending',
    requestedAt: new Date('2023-10-05T14:15:00Z'),
    updatedAt: new Date('2023-10-05T14:15:00Z'),
  },
  {
    id: 'req3',
    productId: 'prod3',
    productName: 'Corporate Gala Invite',
    requestDetails: 'Add our company logo to the top right corner. I have emailed it to you.',
    status: 'Pending',
    requestedAt: new Date('2023-10-06T09:00:00Z'),
    updatedAt: new Date('2023-10-06T09:00:00Z'),
  },
  {
    id: 'req4',
    productId: 'prod4',
    productName: 'Summer Pool Party',
    requestDetails: 'This request is not feasible. Please add a unicorn that flies across the card.',
    status: 'Rejected',
    requestedAt: new Date('2023-09-28T11:00:00Z'),
    updatedAt: new Date('2023-09-29T16:45:00Z'),
  },
];


export const orders: Order[] = [
    {
        id: 'ord1',
        items: [
            { productId: 'prod9', productName: 'Shop Visiting Card', quantity: 2, price: 10 },
            { productId: 'prod2', productName: 'Modern Birthday Bash', quantity: 1, price: 4.50 },
        ],
        total: 24.50,
        status: 'Delivered',
        createdAt: new Date('2023-09-15T11:30:00Z'),
    },
    {
        id: 'ord2',
        items: [
            { productId: 'prod7', productName: 'Elegant Anniversary', quantity: 1, price: 6.50 },
        ],
        total: 6.50,
        status: 'Shipped',
        createdAt: new Date('2023-10-02T18:00:00Z'),
    },
    {
        id: 'ord3',
        items: [
            { productId: 'prod1', productName: 'Classic Wedding', quantity: 50, price: 5.99 },
            { productId: 'prod10', productName: 'Rustic Wedding Suite', quantity: 50, price: 6.25 },
        ],
        total: 612.00,
        status: 'Placed',
        createdAt: new Date('2023-10-07T10:00:00Z'),
    },
];

const offerEndDate = new Date();
offerEndDate.setHours(offerEndDate.getHours() + 24);

export const dealProduct: DealProduct = {
  id: 'dealprod1',
  slug: 'shampoo-conditioner-facewash',
  name: 'Shampoo, Conditioner & Facewash',
  description: 'A complete grooming kit for men. The ultimate swagger pack for everyday freshness.',
  price: 200,
  discountPrice: 150,
  images: ['product-deal-1'],
  category: 'Personal Care',
  createdAt: new Date(),
  offerEndsAt: offerEndDate,
  stock: 60,
  sold: 20,
  rating: 3.5,
};
