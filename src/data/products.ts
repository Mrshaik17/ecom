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
    isNew: false,
    isSale: false,
    isFeatured: false,
  },
  


];

export const categories = [
  { id: 'watches', name: 'Watches', description: 'Premium timepieces and smartwatches' },
  { id: 'shoes', name: 'Shoes', description: 'Quality footwear for every occasion' },
  { id: 'clothing', name: 'Clothing', description: 'Stylish apparel for the modern man' },
  { id: 'gadgets', name: 'Gadgets', description: 'Latest tech and electronic accessories' },
  { id: 'premium', name: 'Premium', description: 'Exclusive luxury collections' },
];