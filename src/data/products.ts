import { Product } from '@/components/ProductCard';
import { getCategoryImages, getCategoryImage } from '@/utils/imageHelpers';

export const demoProducts: Product[] = [
  {
    id: '0',
    name: 'Crocs-Hike',
    price: 1599,
    originalPrice: 2999,
    image: getCategoryImage('shoes', 0),
    images: getCategoryImages('shoes', [0, 1, 2, 3]),
    imageIndices: [0, 1, 2, 3],
    category: 'shoes',
    description: 'Crocs OFF-Road',
    rating: 4.8,
    inStock: true,
    isNew: true,
    isSale: true,
    isFeatured: true,
    variants: {
      colors: ['Black', 'Brown', 'White'],
      sizes: ['6', '7', '8', '9', '10', '11']
    },
  },
  {
    id: '1',
    name: 'Luxury Premium Watch',
    price: 12999,
    originalPrice: 18999,
    image: getCategoryImage('premium', 0),
    images: [getCategoryImage('premium', 0)],
    imageIndices: [0],
    category: 'premium',
    description: 'Exclusive luxury timepiece with gold-plated finish and premium leather strap',
    rating: 4.9,
    inStock: true,
    isNew: true,
    isSale: true,
    isFeatured: true,
    variants: {
      colors: ['Gold', 'Silver', 'Rose Gold'],
      sizes: ['38mm', '42mm']
    },
  },
];

export const categories = [
  { id: 'watches', name: 'Watches', description: 'Premium timepieces and smartwatches' },
  { id: 'shoes', name: 'Shoes', description: 'Quality footwear for every occasion' },
  { id: 'clothing', name: 'Clothing', description: 'Stylish apparel for the modern man' },
  { id: 'gadgets', name: 'Gadgets', description: 'Latest tech and electronic accessories' },
  { id: 'premium', name: 'Premium', description: 'Exclusive luxury collections' },
];