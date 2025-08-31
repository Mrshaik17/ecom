import { useState } from 'react';
import { Sparkles, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ProductCard, { Product } from '@/components/ProductCard';
import BuyNowDialog from '@/components/BuyNowDialog';
import { useCart } from '@/context/CartContext';
import { useProducts } from '@/context/ProductContext';

const NewArrivals = () => {
  const { addItem } = useCart();
  const { products } = useProducts();
  const [buyNowProduct, setBuyNowProduct] = useState<Product | null>(null);
  const [isBuyNowDialogOpen, setIsBuyNowDialogOpen] = useState(false);

  // Filter products to show only new arrivals (you can modify this logic based on your needs)
  const newArrivals = products.filter((product, index) => index < 8); // Show first 8 as new arrivals

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
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-medium">Just Landed</span>
            </div>
            <h1 className="text-4xl font-bold mb-4">New Arrivals</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Be the first to discover our latest premium imported products. Fresh styles, trending designs, and exclusive collections.
            </p>
          </div>
        </div>
      </section>

      {/* New Arrivals Info */}
      <section className="py-8 bg-card border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="text-primary border-primary">
                <Clock className="h-3 w-3 mr-1" />
                Latest Arrivals
              </Badge>
              <span className="text-sm text-muted-foreground">
                {newArrivals.length} new products this week
              </span>
            </div>
            <Button variant="outline" size="sm">
              Sort by: Newest First
            </Button>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {newArrivals.length > 0 ? (
            <>
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-2">Fresh Arrivals</h2>
                <p className="text-muted-foreground">
                  Get them before they're gone - limited quantities available
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {newArrivals.map((product) => (
                  <div key={product.id} className="relative">
                    <Badge 
                      className="absolute top-2 left-2 z-10 bg-primary text-primary-foreground"
                    >
                      New
                    </Badge>
                    <ProductCard
                      product={product}
                      onAddToCart={handleAddToCart}
                      onQuickView={handleQuickView}
                      onBuyNow={handleBuyNow}
                    />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <Sparkles className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
              <h3 className="text-xl font-semibold mb-4">No new arrivals yet</h3>
              <p className="text-muted-foreground mb-8">
                Check back soon for the latest products and collections.
              </p>
              <Button>Browse All Products</Button>
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