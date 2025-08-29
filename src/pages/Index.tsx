import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, TruckIcon, ShieldCheck, Headphones } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ProductCard, { Product } from '@/components/ProductCard';
import BuyNowDialog from '@/components/BuyNowDialog';
import { useCart } from '@/context/CartContext';
import { useProducts } from '@/context/ProductContext';

const Index = () => {
  const { addItem } = useCart();
  const { products, categories } = useProducts();
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [buyNowProduct, setBuyNowProduct] = useState<Product | null>(null);
  const [isBuyNowDialogOpen, setIsBuyNowDialogOpen] = useState(false);

  const featuredProducts = products.filter(p => p.isFeatured);
  const newArrivals = products.filter(p => p.isNew);
  const premiumProducts = products.filter(p => p.category === 'premium');

  const handleAddToCart = (product: any) => {
    addItem(product);
  };

  const handleQuickView = (product: any) => {
    setQuickViewProduct(product);
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
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-hero text-primary-foreground overflow-hidden">
        <div className="container mx-auto px-4 py-20 lg:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-6xl font-display font-bold mb-6 leading-tight">
              Premium Import
              <span className="block text-primary-light">Collection</span>
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-primary-light/90">
              Discover exclusive watches, shoes, clothing, and gadgets for the modern gentleman. 
              Quality imports at unbeatable prices.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" variant="secondary" className="bg-background text-primary hover:bg-background/90">
                Shop Collection
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-primary-light text-primary-light hover:bg-primary-light hover:text-primary">
                View Categories
              </Button>
            </div>
          </div>
        </div>
        
        {/* Floating Stats */}
        <div className="absolute bottom-8 right-8 hidden lg:flex space-x-8 text-center">
          <div>
            <div className="text-2xl font-bold">1000+</div>
            <div className="text-sm text-primary-light/80">Happy Customers</div>
          </div>
          <div>
            <div className="text-2xl font-bold">500+</div>
            <div className="text-sm text-primary-light/80">Premium Products</div>
          </div>
          <div>
            <div className="text-2xl font-bold">4.9</div>
            <div className="text-sm text-primary-light/80">Customer Rating</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: TruckIcon, title: 'Free Shipping', desc: 'On orders over $100' },
              { icon: ShieldCheck, title: 'Secure Payment', desc: '100% protected checkout' },
              { icon: Headphones, title: '24/7 Support', desc: 'Dedicated customer service' },
              { icon: Star, title: 'Quality Guarantee', desc: 'Premium imported products' },
            ].map((feature, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 text-primary rounded-full mb-4">
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Shop by Category</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our carefully curated collections of premium imported products for men
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {categories.map((category) => (
              <Link 
                key={category.id} 
                to={`/category/${category.id}`}
                className="group"
              >
                <Card className="border-0 shadow-md hover:shadow-hover transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6 text-center">
                    <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {category.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Featured Products</h2>
              <p className="text-muted-foreground">Handpicked favorites from our collection</p>
            </div>
            <Link to="/categories">
              <Button variant="outline">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                onQuickView={handleQuickView}
                onBuyNow={handleBuyNow}
              />
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      {newArrivals.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-display font-bold mb-4">New Arrivals</h2>
              <p className="text-muted-foreground">Latest additions to our premium collection</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {newArrivals.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                onQuickView={handleQuickView}
                onBuyNow={handleBuyNow}
              />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Premium Collection */}
      {premiumProducts.length > 0 && (
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-display font-bold mb-4">Premium Collection</h2>
              <p className="text-muted-foreground">Exclusive luxury items for the discerning gentleman</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {premiumProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                onQuickView={handleQuickView}
                onBuyNow={handleBuyNow}
              />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter Section */}
        <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-display font-bold mb-4">Stay Updated</h2>
          <p className="text-xl mb-8 text-primary-light/90">
            Get exclusive offers and be the first to know about new arrivals
          </p>
          <div className="max-w-md mx-auto flex space-x-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-foreground"
            />
            <Button size="lg" variant="secondary" className="bg-background text-primary hover:bg-background/90">
              Subscribe
            </Button>
          </div>
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

export default Index;
