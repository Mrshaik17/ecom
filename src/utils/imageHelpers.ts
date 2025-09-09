// Image helper functions for product management

import { watchImages } from '@/assets/watches';
import { shoeImages } from '@/assets/shoes'; 
import { clothingImages } from '@/assets/clothing';
import { gadgetImages } from '@/assets/gadgets';
import { premiumImages } from '@/assets/premium';

// Category image mapping
export const categoryImageMap: { [key: string]: string[] } = {
  watches: watchImages,
  shoes: shoeImages,
  clothing: clothingImages,
  gadgets: gadgetImages,
  premium: premiumImages,
};

// Get images by category and indices - simplified for easy product addition
export const getCategoryImages = (category: string, indices?: number[]): string[] => {
  const categoryImages = categoryImageMap[category] || [];
  
  if (!indices || indices.length === 0) {
    return categoryImages.length > 0 ? [categoryImages[0]] : [];
  }
  
  return indices
    .map(index => categoryImages[index])
    .filter(Boolean) // Remove undefined values
    .slice(0, 6); // Limit to 6 images max for performance
};

// Get single image by category and index
export const getCategoryImage = (category: string, index: number = 0): string => {
  const categoryImages = categoryImageMap[category] || [];
  return categoryImages[index] || categoryImages[0] || '';
};