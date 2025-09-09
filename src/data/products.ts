import { Product } from '@/components/ProductCard';
import premiumWatch1 from '@/assets/watches/premium-watch-1.jpg';
import premiumWatch2 from '@/assets/watches/premium-watch-2.jpg';
import premiumWatch3 from '@/assets/watches/premium-watch-3.jpg';
import leatherShoes1 from '@/assets/shoes/leather-shoes-1.jpg';
import leatherShoes2 from '@/assets/shoes/leather-shoes-2.jpg';
import casualShirt1 from '@/assets/clothing/casual-shirt-1.jpg';
import casualShirt2 from '@/assets/clothing/casual-shirt-2.jpg';
import wirelessEarbuds1 from '@/assets/gadgets/wireless-earbuds-1.jpg';
import wirelessEarbuds2 from '@/assets/gadgets/wireless-earbuds-2.jpg';

export const demoProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Smart Watch Pro',
    price: 24999.99,
    originalPrice: 32999.99,
    image: premiumWatch1,
    images: [premiumWatch1, premiumWatch2, premiumWatch3],
    category: 'watches',
    description: 'High-end smartwatch with advanced health tracking, GPS, and premium materials. Perfect for the modern professional.',
    rating: 4.8,
    inStock: true,
    isNew: true,
    isSale: true,
    isFeatured: true,
  },
  {
    id: '2',
    name: 'Executive Leather Shoes',
    price: 15999.99,
    originalPrice: 20999.99,
    image: leatherShoes1,
    images: [leatherShoes1, leatherShoes2],
    category: 'shoes',
    description: 'Handcrafted genuine leather dress shoes. Elegant design meets comfort for business and formal occasions.',
    rating: 4.6,
    inStock: true,
    isNew: false,
    isSale: true,
    isFeatured: false,
  },
  {
    id: '3',
    name: 'Premium Casual Shirt',
    price: 6799.99,
    image: casualShirt1,
    images: [casualShirt1, casualShirt2],
    category: 'clothing',
    description: 'Premium quality cotton shirt with modern fit. Versatile for both casual and semi-formal wear.',
    rating: 4.5,
    inStock: true,
    isNew: true,
    isSale: false,
    isFeatured: true,
  },
  {
    id: '4',
    name: 'Wireless Pro Earbuds',
    price: 13499.99,
    originalPrice: 16999.99,
    image: wirelessEarbuds1,
    images: [wirelessEarbuds1, wirelessEarbuds2],
    category: 'gadgets',
    description: 'Premium wireless earbuds with active noise cancellation and superior sound quality.',
    rating: 4.7,
    inStock: true,
    isNew: false,
    isSale: true,
    isFeatured: false,
  },
  {
    id: '5',
    name: 'Luxury Chronograph Watch',
    price: 49999.99,
    image: premiumWatch1,
    images: [premiumWatch1, premiumWatch2, premiumWatch3],
    category: 'premium',
    description: 'Exclusive chronograph timepiece with sapphire crystal and Swiss movement. Limited edition.',
    rating: 5.0,
    inStock: true,
    isNew: true,
    isSale: false,
    isFeatured: true,
  },
  {
    id: '6',
    name: 'Designer Sneakers',
    price: 19299.99,
    image: leatherShoes1,
    images: [leatherShoes1, leatherShoes2],
    category: 'shoes',
    description: 'Limited edition designer sneakers combining style and comfort with premium materials.',
    rating: 4.4,
    inStock: false,
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