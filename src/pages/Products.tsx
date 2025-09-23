import { useState } from 'react';
import { Package, Filter, SortAsc } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ProductCard, { Product } from '@/components/ProductCard';
import { useCart } from '@/context/CartContext';
import { useProducts } from '@/context/ProductContext';

const Products = () => {
  const { addItem } = useCart();
  const { products, categories } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const handleAddToCart = (product: any) => {
    addItem(product);
  };

  const handleQuickView = (product: any) => {
    // Quick view functionality can be added here
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-secondary py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">All Products</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Discover our complete collection of premium imported products for men
            </p>
          </div>
        </div>
      </section>

      {/* Filter & Sort Bar */}
      <section className="py-8 border-b bg-card">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-4">
              <Button
                variant={selectedCategory === 'all' ? 'default' : 'outline'}
                onClick={() => setSelectedCategory('all')}
                size="sm"
              >
                <Filter className="h-4 w-4 mr-2" />
                All Products
              </Button>
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(category.id)}
                  size="sm"
                >
                  {category.name}
                </Button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <SortAsc className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {filteredProducts.length} products found
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                onQuickView={handleQuickView}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Package className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
              <h3 className="text-xl font-semibold mb-4">No products found</h3>
              <p className="text-muted-foreground mb-8">
                Try adjusting your filters or browse all categories.
              </p>
              <Button onClick={() => setSelectedCategory('all')}>
                Show All Products
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Products;