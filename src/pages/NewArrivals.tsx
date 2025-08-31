import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import ProductCard, { Product } from '@/components/ProductCard';
import BuyNowDialog from '@/components/BuyNowDialog';
import { useCart } from '@/context/CartContext';
import { useProducts } from '@/context/ProductContext';

const NewArrivals = () => {
  const { addItem } = useCart();
  const { products } = useProducts();
  const [buyNowProduct, setBuyNowProduct] = useState<Product | null>(null);
  const [isBuyNowDialogOpen, setIsBuyNowDialogOpen] = useState(false);
  const [sortBy, setSortBy] = useState<string>('newest');

  // Filter products to show only new arrivals
  const newArrivals = products.filter(product => product.isNew || Math.random() < 0.4); // Filter by isNew flag or show some as new

  // Sort new arrivals
  const sortedNewArrivals = [...newArrivals].sort((a, b) => {
    switch (sortBy) {
      case 'newest': return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      case 'price-low-high': return a.price - b.price;
      case 'price-high-low': return b.price - a.price;
      case 'name': return a.name.localeCompare(b.name);
      case 'rating': return (b.rating || 0) - (a.rating || 0);
      default: return 0;
    }
  });

  const handleAddToCart = (product: any) => {
    addItem(product);
  };

  const handleQuickView = (product: any) => {
    // Quick view functionality can be added here
  };

  const handleBuyNow = (product: Product) => {
    setBuyNowProduct(product);
    setIsBuyNowDialogOpen(true);
  };

  const handleCloseBuyNowDialog = () => {
    setIsBuyNowDialogOpen(false);
    setBuyNowProduct(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary/10 to-secondary/20 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">New Arrivals</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Be the first to discover our latest premium imported products. Fresh styles, trending designs, and exclusive collections.
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">New Arrivals</h2>
              <p className="text-muted-foreground">Latest additions to our premium collection ({sortedNewArrivals.length} items)</p>
            </div>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="price-low-high">Price: Low to High</SelectItem>
                <SelectItem value="price-high-low">Price: High to Low</SelectItem>
                <SelectItem value="name">Name A-Z</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {sortedNewArrivals.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sortedNewArrivals.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  onQuickView={handleQuickView}
                  onBuyNow={handleBuyNow}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Package className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
              <h3 className="text-xl font-semibold mb-4">No new arrivals yet</h3>
              <p className="text-muted-foreground mb-8">
                Check back soon for the latest products and collections.
              </p>
              <Link to="/categories">
                <Button className="bg-gradient-button">
                  Browse All Products
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>
      
      {/* Buy Now Dialog */}
      <BuyNowDialog
        isOpen={isBuyNowDialogOpen}
        onClose={handleCloseBuyNowDialog}
        product={buyNowProduct}
      />
    </div>
  );
};

export default NewArrivals;