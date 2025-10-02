import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[]; // Additional images for product gallery
  imageIndices?: number[]; // For referencing category images by index
  category: string;
  description: string;
  rating?: number;
  inStock: boolean;
  isNew?: boolean;
  isSale?: boolean;
  isFeatured?: boolean;
  variants?: {
    colors?: string[];
    sizes?: string[];
  };
  shipping?: {
    cost: number;
    freeShippingThreshold?: number;
  };
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

const ProductCard = ({ product, onAddToCart, onQuickView }: ProductCardProps) => {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleOrderWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    const phoneNumber = '9885522948'; // Replace with your WhatsApp number
    const message = `Hi! I'm interested in ordering this product:
    
Product: ${product.name}
Price: ₹${product.price}
Category: ${product.category}
${product.variants?.colors ? `Available Colors: ${product.variants.colors.join(', ')}` : ''}
${product.variants?.sizes ? `Available Sizes: ${product.variants.sizes.join(', ')}` : ''}

Please let me know about availability and delivery details.`;
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Card className="group overflow-hidden border-0 shadow-md hover:shadow-hover transition-all duration-300 hover:-translate-y-1">
      <div className="relative overflow-hidden bg-gradient-card">
        {/* Product Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
          {product.isNew && (
            <Badge variant="secondary" className="bg-primary text-primary-foreground">
              New
            </Badge>
          )}
          {product.isSale && discount > 0 && (
            <Badge variant="destructive" className="bg-sale text-sale-foreground">
              -{discount}%
            </Badge>
          )}
          {!product.inStock && (
            <Badge variant="secondary" className="bg-muted text-muted-foreground">
              Out of Stock
            </Badge>
          )}
        </div>

        {/* Action Buttons */}
        <div className="absolute top-3 right-3 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            size="icon"
            variant="secondary"
            className="h-8 w-8 rounded-full bg-background/80 hover:bg-background"
            onClick={() => setIsLiked(!isLiked)}
          >
            <Heart className={`h-4 w-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="h-8 w-8 rounded-full bg-background/80 hover:bg-background"
            onClick={() => onQuickView(product)}
          >
            <Eye className="h-4 w-4" />
          </Button>
        </div>

        {/* Product Image */}
        <div 
          className="aspect-square overflow-hidden cursor-pointer"
          onClick={() => navigate(`/product/${product.id}`)}
        >
          <img
            src={product.image}
            alt={product.name}
            className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
          />
          {!imageLoaded && (
            <div className="w-full h-full bg-muted animate-pulse" />
          )}
        </div>

        {/* Action Buttons - More Visible */}
        <div className="absolute inset-x-3 bottom-3">
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              className="flex-1 bg-gradient-button hover:bg-primary-hover text-sm"
              onClick={() => onAddToCart(product)}
              disabled={!product.inStock}
              size="sm"
            >
              <ShoppingCart className="h-3 w-3 mr-1" />
              Add
            </Button>
            <Button
              className="flex-1 bg-green-600 hover:bg-green-700 text-white text-sm"
              onClick={handleOrderWhatsApp}
              disabled={!product.inStock}
              size="sm"
            >
              Order Now
            </Button>
          </div>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="space-y-2">
          {/* Category */}
          <p className="text-xs text-muted-foreground uppercase tracking-wider">
            {product.category}
          </p>

          {/* Product Name */}
          <h3 className="font-semibold text-sm leading-tight hover:text-primary transition-colors cursor-pointer">
            {product.name}
          </h3>

          {/* Rating */}
          {product.rating && (
            <div className="flex items-center gap-1">
              <div className="flex">
                {[...Array(5)].map((_, i) => {
                  const rating = product.rating!;
                  const isFull = i < Math.floor(rating);
                  const isHalf = i === Math.floor(rating) && rating % 1 >= 0.5;
                  
                  return (
                    <span
                      key={i}
                      className={`text-xs ${
                        isFull ? 'text-yellow-400' : isHalf ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                    >
                      {isFull ? '★' : isHalf ? '☆' : '☆'}
                    </span>
                  );
                })}
              </div>
              <span className="text-xs text-muted-foreground">({product.rating})</span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg text-price">
              ₹{product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ₹{product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;