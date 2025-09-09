import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Heart, ShoppingCart, Truck, Shield, RotateCcw, Headphones } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useProducts } from '@/context/ProductContext';
import { useCart } from '@/context/CartContext';
import BuyNowDialog from '@/components/BuyNowDialog';
import { Product } from '@/components/ProductCard';
import { toast } from 'sonner';

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { products } = useProducts();
  const { addItem } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [buyNowProduct, setBuyNowProduct] = useState<Product | null>(null);
  const [isBuyNowDialogOpen, setIsBuyNowDialogOpen] = useState(false);

  const product = products.find(p => p.id === productId);

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <Button onClick={() => navigate('/products')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Products
          </Button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem(product);
    toast.success('Added to cart successfully!');
  };

  const handleBuyNow = () => {
    setBuyNowProduct(product);
    setIsBuyNowDialogOpen(true);
  };

  const handleCloseBuyNowDialog = () => {
    setIsBuyNowDialogOpen(false);
    setBuyNowProduct(null);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-muted-foreground'
        }`}
      />
    ));
  };

  // Get product images from product data or fallback to single image
  const productImages = product.images || [product.image];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <div className="container mx-auto px-4 py-4">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
      </div>

      <div className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-lg border bg-card">
              <img
                src={productImages[selectedImage]}
                alt={product.name}
                className="w-full h-[500px] object-cover"
              />
              {product.isSale && (
                <Badge className="absolute top-4 left-4 bg-destructive text-destructive-foreground">
                  Sale
                </Badge>
              )}
              {product.isNew && (
                <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">
                  New
                </Badge>
              )}
            </div>
            
            {/* Thumbnail Images */}
            <div className="flex space-x-2">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative w-20 h-20 rounded-md overflow-hidden border-2 ${
                    selectedImage === index ? 'border-primary' : 'border-muted'
                  }`}
                >
                  <img
                    src={image}
                    alt={`Product ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-2">
                {product.category}
              </Badge>
              <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
              
              {/* Rating */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex">{renderStars(product.rating)}</div>
                <span className="text-sm text-muted-foreground">
                  ({product.rating}/5)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-3 mb-6">
                <span className="text-3xl font-bold">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
              </div>

              {/* Stock Status */}
              <div className="mb-6">
                {product.inStock ? (
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    In Stock
                  </Badge>
                ) : (
                  <Badge variant="destructive">
                    Out of Stock
                  </Badge>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Description</h3>
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Actions */}
            <div className="space-y-4">
              <div className="flex space-x-4">
                <Button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="flex-1"
                  size="lg"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsLiked(!isLiked)}
                  size="lg"
                >
                  <Heart className={`h-4 w-4 ${isLiked ? 'fill-current text-red-500' : ''}`} />
                </Button>
              </div>
              
              <Button
                onClick={handleBuyNow}
                disabled={!product.inStock}
                size="lg"
                className="w-full"
                variant="secondary"
              >
                Buy Now
              </Button>
            </div>

            <Separator />

            {/* Features */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Why Choose Us</h3>
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <Truck className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <p className="text-sm font-medium">Free Shipping</p>
                    <p className="text-xs text-muted-foreground">On orders over ₹8,000</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4 text-center">
                    <Shield className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <p className="text-sm font-medium">Secure Payment</p>
                    <p className="text-xs text-muted-foreground">100% protected</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4 text-center">
                    <RotateCcw className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <p className="text-sm font-medium">Easy Returns</p>
                    <p className="text-xs text-muted-foreground">30-day policy</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4 text-center">
                    <Headphones className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <p className="text-sm font-medium">24/7 Support</p>
                    <p className="text-xs text-muted-foreground">Always here to help</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Buy Now Dialog */}
      <BuyNowDialog
        isOpen={isBuyNowDialogOpen}
        onClose={handleCloseBuyNowDialog}
        product={buyNowProduct}
      />
    </div>
  );
};

export default ProductDetail;