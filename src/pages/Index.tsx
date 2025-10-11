import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, TruckIcon, ShieldCheck, Headphones } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ProductCard, { Product } from '@/components/ProductCard';
import { useCart } from '@/context/CartContext';
import { useProducts } from '@/context/ProductContext';

const Index = () => {
  const { addItem } = useCart();
  const { products } = useProducts();
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const featuredProducts = products.filter(p => p.isFeatured);
  const premiumProducts = products.filter(p => p.category === 'premium');

  const handleAddToCart = (product: any) => {
    addItem(product);
  };

  const handleQuickView = (product: any) => {
    setQuickViewProduct(product);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-hero text-primary-foreground overflow-hidden">
        <div className="container mx-auto px-4 py-16 lg:py-28">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold mb-4 md:mb-6 leading-tight">
              Premium Import
              <span className="block text-primary-light">Collection</span>
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 text-primary-light/90">
              Discover exclusive watches, shoes, clothing, and gadgets for the modern gentleman. 
              Quality imports at unbeatable prices.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/categories">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto bg-background text-primary hover:bg-background/90">
                  Shop Collection
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/categories">
                <Button size="lg" className="w-full sm:w-auto bg-primary-light text-primary hover:bg-primary-light/90 font-semibold">
                  View Categories
                </Button>
              </Link>
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
      <section className="py-12 md:py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {[
              { icon: TruckIcon, title: 'Free Shipping', desc: 'On all orders' },
              { icon: ShieldCheck, title: 'Secure Payment', desc: '100% protected' },
              { icon: Headphones, title: '24/7 Support', desc: 'Customer service' },
              { icon: Star, title: 'Quality', desc: 'Premium products' },
            ].map((feature, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-primary/10 text-primary rounded-full mb-3 md:mb-4">
                  <feature.icon className="h-6 w-6 md:h-8 md:w-8" />
                </div>
                <h3 className="font-semibold mb-1 md:mb-2 text-sm md:text-base">{feature.title}</h3>
                <p className="text-muted-foreground text-xs md:text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Offers Section */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-3 md:mb-4">Special Offers</h2>
            <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
              Don't miss out on our exclusive deals and limited-time offers
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {/* Branded Section */}
            <div className="relative bg-gradient-hero rounded-xl overflow-hidden aspect-video flex items-center justify-center p-8">
              <div className="text-center text-primary-foreground">
                <h3 className="text-3xl md:text-5xl font-display font-bold mb-4">House Of Styles</h3>
                <p className="text-base md:text-xl text-primary-light/90">
                  Where Quality Meets Elegance
                </p>
                <p className="text-sm md:text-base text-primary-light/80 mt-3">
                  Premium Imported Collections for the Modern Gentleman
                </p>
              </div>
            </div>
            
            {/* Coupon Codes */}
            <div className="space-y-4">
              <h3 className="text-lg md:text-xl font-semibold mb-4">Active Coupon Codes</h3>
              
              <div className="bg-card border border-primary/20 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-primary text-primary-foreground font-mono text-xs md:text-sm">
                      SAVE10
                    </Badge>
                    <span className="font-semibold text-sm md:text-base">10% Off Your Order</span>
                  </div>
                </div>
                <p className="text-xs md:text-sm text-muted-foreground">
                  Save 10% on any item. Valid on all products.
                </p>
              </div>
              
              <div className="bg-card border border-secondary/20 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="font-mono text-xs md:text-sm">
                      FREESHIP
                    </Badge>
                    <span className="font-semibold text-sm md:text-base">Free Shipping</span>
                  </div>
                </div>
                <p className="text-xs md:text-sm text-muted-foreground">
                  Free shipping on all orders, no minimum required
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Collection Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">Our Collection</h2>
            <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
              Explore our carefully curated collections of premium imported products for men
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {/* Watches */}
            <Link to="/category/watches" className="group">
              <Card className="border-0 shadow-md hover:shadow-hover transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                <div className="aspect-square bg-secondary/50 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1523275335684-37898b6baf30" 
                    alt="Watches" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-2 md:p-3 text-center">
                  <h3 className="font-semibold text-xs md:text-sm group-hover:text-primary transition-colors">
                    Watches
                  </h3>
                </CardContent>
              </Card>
            </Link>

            {/* Shirts */}
            <Link to="/category/clothing" className="group">
              <Card className="border-0 shadow-md hover:shadow-hover transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                <div className="aspect-square bg-secondary/50 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1596755094514-f87e34085b2c" 
                    alt="Shirts" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-2 md:p-3 text-center">
                  <h3 className="font-semibold text-xs md:text-sm group-hover:text-primary transition-colors">
                    Shirts
                  </h3>
                </CardContent>
              </Card>
            </Link>

            {/* Pants */}
            <Link to="/category/clothing" className="group">
              <Card className="border-0 shadow-md hover:shadow-hover transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                <div className="aspect-square bg-secondary/50 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1624378439575-d8705ad7ae80" 
                    alt="Pants" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-2 md:p-3 text-center">
                  <h3 className="font-semibold text-xs md:text-sm group-hover:text-primary transition-colors">
                    Pants
                  </h3>
                </CardContent>
              </Card>
            </Link>

            {/* Tracks */}
            <Link to="/category/clothing" className="group">
              <Card className="border-0 shadow-md hover:shadow-hover transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                <div className="aspect-square bg-secondary/50 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1517438476312-10d79c077509" 
                    alt="Tracks" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-2 md:p-3 text-center">
                  <h3 className="font-semibold text-xs md:text-sm group-hover:text-primary transition-colors">
                    Tracks
                  </h3>
                </CardContent>
              </Card>
            </Link>

            {/* Shoes */}
            <Link to="/category/shoes" className="group">
              <Card className="border-0 shadow-md hover:shadow-hover transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                <div className="aspect-square bg-secondary/50 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1460353581641-37baddab0fa2" 
                    alt="Shoes" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-2 md:p-3 text-center">
                  <h3 className="font-semibold text-xs md:text-sm group-hover:text-primary transition-colors">
                    Shoes
                  </h3>
                </CardContent>
              </Card>
            </Link>

            {/* Premium Collection */}
            <Link to="/category/premium" className="group">
              <Card className="border-0 shadow-md hover:shadow-hover transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                <div className="aspect-square bg-secondary/50 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd" 
                    alt="Premium Collection" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-2 md:p-3 text-center">
                  <h3 className="font-semibold text-xs md:text-sm group-hover:text-primary transition-colors">
                    Premium
                  </h3>
                </CardContent>
              </Card>
            </Link>

            {/* Slides/Slippers */}
            <Link to="/category/slides" className="group">
              <Card className="border-0 shadow-md hover:shadow-hover transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                <div className="aspect-square bg-secondary/50 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1603487742131-4160ec999306" 
                    alt="Slides/Slippers" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-2 md:p-3 text-center">
                  <h3 className="font-semibold text-xs md:text-sm group-hover:text-primary transition-colors">
                    Slides/Slippers
                  </h3>
                </CardContent>
              </Card>
            </Link>

            {/* Gadgets */}
            <Link to="/category/gadgets" className="group">
              <Card className="border-0 shadow-md hover:shadow-hover transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                <div className="aspect-square bg-secondary/50 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1625772452859-1c03d5bf1137" 
                    alt="Gadgets" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-2 md:p-3 text-center">
                  <h3 className="font-semibold text-xs md:text-sm group-hover:text-primary transition-colors">
                    Gadgets
                  </h3>
                </CardContent>
              </Card>
            </Link>

            {/* Combo Offers */}
            <Link to="/category/combo" className="group">
              <Card className="border-0 shadow-md hover:shadow-hover transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                <div className="aspect-square bg-secondary/50 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1607083206869-4c7672e72a8a" 
                    alt="Combo Offers" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-2 md:p-3 text-center">
                  <h3 className="font-semibold text-xs md:text-sm group-hover:text-primary transition-colors">
                    Combo Offers
                  </h3>
                </CardContent>
              </Card>
            </Link>

            {/* Coming Soon 1 */}
            {/* <div className="group cursor-not-allowed opacity-50">
              <Card className="border-0 shadow-md overflow-hidden">
                <div className="aspect-square bg-secondary/50 flex items-center justify-center p-2">
                  <img 
                    src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d" 
                    alt="Coming Soon" 
                    className="w-full h-full object-cover rounded"
                  />
                </div>
                <CardContent className="p-2 md:p-3 text-center">
                  <h3 className="font-semibold text-xs md:text-sm text-muted-foreground">
                    Coming Soon
                  </h3>
                  <p className="text-xs text-muted-foreground">₹0/-</p>
                </CardContent>
              </Card>
            </div> */}

            {/* Coming Soon 2 */}
            {/* <div className="group cursor-not-allowed opacity-50">
              <Card className="border-0 shadow-md overflow-hidden">
                <div className="aspect-square bg-secondary/50 flex items-center justify-center p-2">
                  <img 
                    src="https://images.unsplash.com/photo-1513094735237-8f2714d57c13" 
                    alt="Coming Soon" 
                    className="w-full h-full object-cover rounded"
                  />
                </div>
                <CardContent className="p-2 md:p-3 text-center">
                  <h3 className="font-semibold text-xs md:text-sm text-muted-foreground">
                    Coming Soon
                  </h3>
                  <p className="text-xs text-muted-foreground">₹0/-</p>
                </CardContent>
              </Card>
            </div> */}

            {/* Coming Soon 3 */}
            {/* <div className="group cursor-not-allowed opacity-50">
              <Card className="border-0 shadow-md overflow-hidden">
                <div className="aspect-square bg-secondary/50 flex items-center justify-center p-2">
                  <img 
                    src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04" 
                    alt="Coming Soon" 
                    className="w-full h-full object-cover rounded"
                  />
                </div>
                <CardContent className="p-2 md:p-3 text-center">
                  <h3 className="font-semibold text-xs md:text-sm text-muted-foreground">
                    Coming Soon
                  </h3>
                  <p className="text-xs text-muted-foreground">₹0/-</p>
                </CardContent>
              </Card>
            </div> */}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 md:mb-8 gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Featured Products</h2>
              <p className="text-sm md:text-base text-muted-foreground">Handpicked favorites from our collection</p>
            </div>
            <Link to="/categories">
              <Button variant="outline" size="sm" className="text-xs md:text-sm">
                View All
                <ArrowRight className="ml-2 h-3 w-3 md:h-4 md:w-4" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {featuredProducts.slice(0, 8).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                onQuickView={handleQuickView}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Premium Collection */}
      {premiumProducts.length > 0 && (
        <section className="py-12 md:py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl font-display font-bold mb-3 md:mb-4">Premium Collection</h2>
              <p className="text-sm md:text-base text-muted-foreground">Exclusive luxury items for the discerning gentleman</p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {premiumProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                onQuickView={handleQuickView}
              />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter Section */}
      <section className="py-12 md:py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-3 md:mb-4">Stay Updated</h2>
          <p className="text-base md:text-xl mb-6 md:mb-8 text-primary-light/90">
            Get exclusive offers and be the first to know about new arrivals
          </p>
          <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-3 sm:gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-3 md:px-4 py-2 md:py-3 rounded-lg text-foreground text-sm md:text-base"
            />
            <Button size="lg" variant="secondary" className="bg-background text-primary hover:bg-background/90 text-sm md:text-base">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
