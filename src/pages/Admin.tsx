import { useState } from 'react';
import { Plus, Edit, Trash2, Upload, Link as LinkIcon, Eye, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { categories } from '@/data/products';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  description: string;
  inStock: boolean;
  isNew: boolean;
  isSale: boolean;
}

const Admin = () => {
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [customCategories, setCustomCategories] = useState<Array<{id: string, name: string, description: string}>>([]);
  
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    originalPrice: '',
    image: '',
    category: '',
    description: '',
    inStock: true,
    isNew: false,
    isSale: false,
  });

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.category) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const product: Product = {
      id: Date.now().toString(),
      name: newProduct.name,
      price: parseFloat(newProduct.price),
      originalPrice: newProduct.originalPrice ? parseFloat(newProduct.originalPrice) : undefined,
      image: newProduct.image || '/placeholder.svg',
      category: newProduct.category,
      description: newProduct.description,
      inStock: newProduct.inStock,
      isNew: newProduct.isNew,
      isSale: newProduct.isSale,
    };

    setProducts([...products, product]);
    setNewProduct({
      name: '',
      price: '',
      originalPrice: '',
      image: '',
      category: '',
      description: '',
      inStock: true,
      isNew: false,
      isSale: false,
    });
    setShowAddProduct(false);

    toast({
      title: "Success",
      description: "Product added successfully!",
    });
  };

  const handleAddCategory = () => {
    if (!newCategory.trim()) return;
    
    const category = {
      id: newCategory.toLowerCase().replace(/\s+/g, '-'),
      name: newCategory,
      description: `Custom ${newCategory} category`
    };
    
    setCustomCategories([...customCategories, category]);
    setNewCategory('');
    setShowAddCategory(false);
    
    toast({
      title: "Success",
      description: "Category added successfully!",
    });
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
    toast({
      title: "Success",
      description: "Product deleted successfully!",
    });
  };

  const allCategories = [...categories, ...customCategories];

  return (
    <div className="min-h-screen bg-secondary p-6">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">TechFusion Admin Panel</h1>
          <p className="text-muted-foreground">Manage your products and categories</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Package className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{products.length}</p>
                  <p className="text-sm text-muted-foreground">Total Products</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Eye className="h-8 w-8 text-success" />
                <div>
                  <p className="text-2xl font-bold">{products.filter(p => p.inStock).length}</p>
                  <p className="text-sm text-muted-foreground">In Stock</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Badge className="h-8 w-8 bg-primary" />
                <div>
                  <p className="text-2xl font-bold">{allCategories.length}</p>
                  <p className="text-sm text-muted-foreground">Categories</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Plus className="h-8 w-8 text-warning" />
                <div>
                  <p className="text-2xl font-bold">{products.filter(p => p.isNew).length}</p>
                  <p className="text-sm text-muted-foreground">New Products</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4 mb-8">
          <Button onClick={() => setShowAddProduct(true)} className="bg-gradient-button">
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
          <Button variant="outline" onClick={() => setShowAddCategory(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Category
          </Button>
        </div>

        {/* Add Product Form */}
        {showAddProduct && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Add New Product</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Product Name *</Label>
                  <Input
                    id="name"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    placeholder="Enter product name"
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={newProduct.category}
                    onValueChange={(value) => setNewProduct({ ...newProduct, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {allCategories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="price">Price *</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <Label htmlFor="originalPrice">Original Price (for sales)</Label>
                  <Input
                    id="originalPrice"
                    type="number"
                    step="0.01"
                    value={newProduct.originalPrice}
                    onChange={(e) => setNewProduct({ ...newProduct, originalPrice: e.target.value })}
                    placeholder="0.00"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="image">Product Image URL</Label>
                <div className="flex space-x-2">
                  <Input
                    id="image"
                    value={newProduct.image}
                    onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                    placeholder="https://example.com/image.jpg or upload file"
                  />
                  <Button variant="outline" size="icon">
                    <Upload className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <LinkIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  placeholder="Product description, variants, details..."
                  rows={3}
                />
              </div>

              <div className="flex space-x-6">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newProduct.inStock}
                    onChange={(e) => setNewProduct({ ...newProduct, inStock: e.target.checked })}
                    className="rounded"
                  />
                  <span className="text-sm">In Stock</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newProduct.isNew}
                    onChange={(e) => setNewProduct({ ...newProduct, isNew: e.target.checked })}
                    className="rounded"
                  />
                  <span className="text-sm">New Product</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newProduct.isSale}
                    onChange={(e) => setNewProduct({ ...newProduct, isSale: e.target.checked })}
                    className="rounded"
                  />
                  <span className="text-sm">On Sale</span>
                </label>
              </div>

              <div className="flex space-x-4">
                <Button onClick={handleAddProduct} className="bg-gradient-button">
                  Add Product
                </Button>
                <Button variant="outline" onClick={() => setShowAddProduct(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Add Category Form */}
        {showAddCategory && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Add New Category</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-4">
                <Input
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="Category name"
                  className="flex-1"
                />
                <Button onClick={handleAddCategory} className="bg-gradient-button">
                  Add Category
                </Button>
                <Button variant="outline" onClick={() => setShowAddCategory(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Products List */}
        <Card>
          <CardHeader>
            <CardTitle>Products ({products.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {products.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No products added yet. Click "Add Product" to get started.
              </div>
            ) : (
              <div className="space-y-4">
                {products.map((product) => (
                  <div key={product.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded"
                      onError={(e) => {
                        e.currentTarget.src = '/placeholder.svg';
                      }}
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold">{product.name}</h3>
                      <p className="text-sm text-muted-foreground">{product.category}</p>
                      <p className="text-sm font-medium text-price">${product.price}</p>
                    </div>
                    <div className="flex space-x-2">
                      {product.isNew && <Badge>New</Badge>}
                      {product.isSale && <Badge variant="destructive">Sale</Badge>}
                      {!product.inStock && <Badge variant="secondary">Out of Stock</Badge>}
                    </div>
                    <div className="flex space-x-2">
                      <Button size="icon" variant="ghost">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;