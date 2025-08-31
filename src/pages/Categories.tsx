import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Package, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import ProductCard, { Product } from '@/components/ProductCard';
import BuyNowDialog from '@/components/BuyNowDialog';
import { useCart } from '@/context/CartContext';
import { useProducts } from '@/context/ProductContext';

const Categories = () => {
  const { addItem } = useCart();
  const { products, categories } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [buyNowProduct, setBuyNowProduct] = useState<Product | null>(null);
  const [isBuyNowDialogOpen, setIsBuyNowDialogOpen] = useState(false);
  const [sortBy, setSortBy] = useState<string>('name');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState<string>('all');

  // Filter products based on category, search, and price range
  let filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);
    
  // Apply search filter
  if (searchQuery) {
    filteredProducts = filteredProducts.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
  
  // Apply price range filter
  if (priceRange !== 'all') {
    filteredProducts = filteredProducts.filter(product => {
      switch (priceRange) {
        case 'under-50': return product.price < 50;
        case '50-100': return product.price >= 50 && product.price <= 100;
        case '100-200': return product.price >= 100 && product.price <= 200;
        case 'over-200': return product.price > 200;
        case 'offers': return product.isSale || (product.originalPrice && product.originalPrice > product.price);
        default: return true;
      }
    });
  }
  
  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low-high': return a.price - b.price;
      case 'price-high-low': return b.price - a.price;
      case 'name': return a.name.localeCompare(b.name);
      case 'newest': return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      case 'rating': return (b.rating || 0) - (a.rating || 0);
      case 'offers': 
        const aHasOffer = a.isSale || (a.originalPrice && a.originalPrice > a.price);
        const bHasOffer = b.isSale || (b.originalPrice && b.originalPrice > b.price);
        return (bHasOffer ? 1 : 0) - (aHasOffer ? 1 : 0);
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
      <section className="bg-secondary py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">All Categories</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Explore our complete collection of premium imported products for men
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('all')}
              className={selectedCategory === 'all' ? 'bg-gradient-button' : ''}
            >
              All Products
            </Button>
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category.id)}
                className={selectedCategory === category.id ? 'bg-gradient-button' : ''}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Category Cards */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-12">
            {categories.map((category) => (
              <Link 
                key={category.id} 
                to={`/category/${category.id}`}
                className="group"
              >
                <Card className="border-0 shadow-md hover:shadow-hover transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6 text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 text-primary rounded-full mb-4">
                      <Package className="h-6 w-6" />
                    </div>
                    <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {category.description}
                    </p>
                    <div className="text-xs text-primary font-medium">
                      View Collection →
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* Search and Filter Controls */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="flex-1 max-w-md">
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
              </div>
              
              <div className="flex gap-4">
                <Select value={priceRange} onValueChange={setPriceRange}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by price" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Prices</SelectItem>
                    <SelectItem value="under-50">Under $50</SelectItem>
                    <SelectItem value="50-100">$50 - $100</SelectItem>
                    <SelectItem value="100-200">$100 - $200</SelectItem>
                    <SelectItem value="over-200">Over $200</SelectItem>
                    <SelectItem value="offers">Special Offers</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name A-Z</SelectItem>
                    <SelectItem value="price-low-high">Price: Low to High</SelectItem>
                    <SelectItem value="price-high-low">Price: High to Low</SelectItem>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="offers">Special Offers</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6">
              {selectedCategory === 'all' 
                ? `All Products (${sortedProducts.length})` 
                : `${categories.find(c => c.id === selectedCategory)?.name} (${sortedProducts.length})`
              }
            </h2>
          </div>

          {sortedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {sortedProducts.map((product) => (
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
              <h3 className="text-xl font-semibold mb-4">No products found</h3>
              <p className="text-muted-foreground mb-8">
                There are no products in this category yet.
              </p>
              <Link to="/">
                <Button className="bg-gradient-button">
                  Back to Home
                  <ArrowRight className="ml-2 h-5 w-5" />
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

export default Categories;