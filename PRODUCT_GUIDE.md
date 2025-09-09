# Easy Product Management Guide

## Adding New Products (For 200+ Products)

### Step 1: Add Images to Category Folders

1. **Watches**: Add images to `src/assets/watches/` folder
   - Then update `src/assets/watches/index.ts`
   - Import your new images and add them to `watchImages` array

2. **Shoes**: Add images to `src/assets/shoes/` folder
   - Then update `src/assets/shoes/index.ts`
   - Import your new images and add them to `shoeImages` array

3. **Clothing**: Add images to `src/assets/clothing/` folder
   - Then update `src/assets/clothing/index.ts`
   - Import your new images and add them to `clothingImages` array

4. **Gadgets**: Add images to `src/assets/gadgets/` folder
   - Then update `src/assets/gadgets/index.ts`
   - Import your new images and add them to `gadgetImages` array

5. **Premium**: Add images to `src/assets/premium/` folder
   - Then update `src/assets/premium/index.ts`
   - Import your new images and add them to `premiumImages` array

### Step 2: Add Product Data

In `src/data/products.ts`, just add your product like this:

```javascript
{
  id: '7', // Unique ID
  name: 'Your Product Name',
  price: 15999.99, // Price in INR
  originalPrice: 20999.99, // Optional - for sale items
  image: getCategoryImage('watches', 3), // Category and image index (0,1,2,3...)
  images: getCategoryImages('watches', [3, 4, 5]), // Multiple images by index
  imageIndices: [3, 4, 5], // Same indices as above
  category: 'watches', // Category name
  description: 'Your product description here...',
  rating: 4.5, // 0-5 rating
  inStock: true, // true/false
  isNew: true, // Optional - shows "New" badge
  isSale: true, // Optional - shows "Sale" badge  
  isFeatured: false, // Optional - shows on featured section
}
```

### Example: Adding a New Watch

1. **Add image**: Put `luxury-watch-4.jpg` in `src/assets/watches/`

2. **Update index.ts**:
```javascript
// In src/assets/watches/index.ts
import watch4 from './luxury-watch-4.jpg';

export const watchImages = [
  watch1,
  watch2, 
  watch3,
  watch4, // Add your new image here
];
```

3. **Add product data**:
```javascript
{
  id: '7',
  name: 'Luxury Gold Watch',
  price: 89999.99,
  originalPrice: 99999.99,
  image: getCategoryImage('watches', 3), // Index 3 = watch4
  images: getCategoryImages('watches', [3]), // Just one image
  imageIndices: [3],
  category: 'watches',
  description: 'Premium gold-plated luxury watch with diamond accents.',
  rating: 4.9,
  inStock: true,
  isNew: true,
  isSale: true,
  isFeatured: true,
}
```

## Key Benefits

✅ **One file per category** - No need to import individual images  
✅ **Easy image management** - Just reference by index number  
✅ **Fast bulk addition** - Perfect for 200+ products  
✅ **Automatic image switching** - Multiple product images work perfectly  
✅ **INR currency** - All prices in Indian Rupees  

## Image Tips

- Use high-quality images (at least 800x800px)
- Keep consistent naming: `product-name-1.jpg`, `product-name-2.jpg`, etc.
- Add multiple angles of the same product for better user experience