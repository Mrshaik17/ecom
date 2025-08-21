import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/ProductCard';
import { useCart } from '@/context/CartContext';
import { demoProducts, categories } from '@/data/products';

const CategoryPage = () => {
  const { categoryId } = useParams();
  const { addItem } = useCart();

  const category = categories.find(c => c.id === categoryId);
  const categoryProducts = demoProducts.filter(product => product.category === categoryId);

  const handleAddToCart = (product: any) => {
    addItem(product);
  };

  const handleQuickView = (product: any) => {
    // Quick view functionality can be added here
  };

  if (!category) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Category not found</h1>
          <Link to="/categories">
            <Button>Back to Categories</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-secondary py-16">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <Link to="/categories">
              <Button variant="ghost" className="mb-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Categories
              </Button>
            </Link>
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4 capitalize">{category.name}</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {category.description}
            </p>
            <div className="mt-6">
              <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                {categoryProducts.length} Products Available
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {categoryProducts.length > 0 ? (
            <>
              <div className="mb-8">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">
                    {category.name} Collection
                  </h2>
                  <div className="text-sm text-muted-foreground">
                    Showing {categoryProducts.length} products
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {categoryProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                    onQuickView={handleQuickView}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <Package className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
              <h3 className="text-xl font-semibold mb-4">No products available</h3>
              <p className="text-muted-foreground mb-8">
                We're working on adding products to this category. Check back soon!
              </p>
              <div className="flex justify-center space-x-4">
                <Link to="/categories">
                  <Button variant="outline">
                    Browse All Categories
                  </Button>
                </Link>
                <Link to="/">
                  <Button className="bg-gradient-button">
                    Back to Home
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Related Categories */}
      {categoryProducts.length > 0 && (
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-8">Explore Other Categories</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categories
                .filter(c => c.id !== categoryId)
                .slice(0, 4)
                .map((relatedCategory) => (
                  <Link 
                    key={relatedCategory.id} 
                    to={`/category/${relatedCategory.id}`}
                    className="group"
                  >
                    <div className="bg-background rounded-lg p-4 text-center hover:shadow-md transition-shadow">
                      <h3 className="font-medium group-hover:text-primary transition-colors">
                        {relatedCategory.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {demoProducts.filter(p => p.category === relatedCategory.id).length} items
                      </p>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default CategoryPage;