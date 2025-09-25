import { useState, useRef } from 'react';
import { Plus, Edit, Trash2, Upload, Link as LinkIcon, Eye, Package, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useProducts } from '@/context/ProductContext';
import { useCoupon, Coupon } from '@/context/CouponContext';
import { COUPONS_ENABLED } from '@/config/coupons';

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
  isFeatured: boolean;
  shipping?: {
    cost: number;
    freeShippingThreshold?: number;
  };
}

const Admin = () => {
  const { toast } = useToast();
  const { products, categories, addProduct, removeProduct, addCategory } = useProducts();
  const { coupons, addCoupon, deleteCoupon, updateCoupon, toggleCouponStatus } = useCoupon();
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showAddCoupon, setShowAddCoupon] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);
  const [newCategory, setNewCategory] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
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
    isFeatured: false,
    shippingCost: '',
    freeShippingThreshold: '',
  });

  const [newCoupon, setNewCoupon] = useState<{
    code: string;
    description: string;
    type: 'percentage' | 'fixed' | 'bogo' | 'free_shipping';
    value: string;
    minOrderValue: string;
    maxDiscount: string;
    expiresAt: string;
    usageLimit: string;
  }>({
    code: '',
    description: '',
    type: 'percentage',
    value: '',
    minOrderValue: '',
    maxDiscount: '',
    expiresAt: '',
    usageLimit: '',
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setNewProduct({ ...newProduct, image: event.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

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
      isFeatured: newProduct.isFeatured,
      shipping: newProduct.shippingCost ? {
        cost: parseFloat(newProduct.shippingCost),
        freeShippingThreshold: newProduct.freeShippingThreshold ? parseFloat(newProduct.freeShippingThreshold) : undefined,
      } : undefined,
    };

    addProduct(product);
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
      isFeatured: false,
      shippingCost: '',
      freeShippingThreshold: '',
    });
    setShowAddProduct(false);

    toast({
      title: "Success",
      description: "Product added successfully!",
    });
  };

  const handleEditCoupon = (coupon: Coupon) => {
    setEditingCoupon(coupon);
    setNewCoupon({
      code: coupon.code,
      description: coupon.description,
      type: coupon.type,
      value: coupon.value.toString(),
      minOrderValue: coupon.minOrderValue?.toString() || '',
      maxDiscount: coupon.maxDiscount?.toString() || '',
      expiresAt: coupon.expiresAt ? coupon.expiresAt.toISOString().split('T')[0] : '',
      usageLimit: coupon.usageLimit?.toString() || '',
    });
    setShowAddCoupon(true);
  };

  const handleDeleteCoupon = (couponId: string) => {
    if (confirm('Are you sure you want to delete this coupon?')) {
      deleteCoupon(couponId);
      toast({
        title: "Success",
        description: "Coupon deleted successfully!",
      });
    }
  };

  const handleToggleCouponStatus = (couponId: string) => {
    toggleCouponStatus(couponId);
    toast({
      title: "Success",
      description: "Coupon status updated!",
    });
  };

  const handleAddCoupon = () => {
    if (!newCoupon.code || !newCoupon.description || !newCoupon.value) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const coupon: Coupon = {
      id: editingCoupon?.id || Date.now().toString(),
      code: newCoupon.code.toUpperCase(),
      description: newCoupon.description,
      type: newCoupon.type,
      value: parseFloat(newCoupon.value),
      minOrderValue: newCoupon.minOrderValue ? parseFloat(newCoupon.minOrderValue) : undefined,
      maxDiscount: newCoupon.maxDiscount ? parseFloat(newCoupon.maxDiscount) : undefined,
      expiresAt: newCoupon.expiresAt ? new Date(newCoupon.expiresAt) : undefined,
      usageLimit: newCoupon.usageLimit ? parseInt(newCoupon.usageLimit) : undefined,
      isActive: true,
      usageCount: editingCoupon?.usageCount || 0,
    };

    if (editingCoupon) {
      updateCoupon(coupon);
      toast({
        title: "Success",
        description: "Coupon updated successfully!",
      });
    } else {
      addCoupon(coupon);
      toast({
        title: "Success",
        description: "Coupon added successfully!",
      });
    }

    setNewCoupon({
      code: '',
      description: '',
      type: 'percentage',
      value: '',
      minOrderValue: '',
      maxDiscount: '',
      expiresAt: '',
      usageLimit: '',
    });
    setShowAddCoupon(false);
    setEditingCoupon(null);
  };

  const handleAddCategory = () => {
    if (!newCategory.trim()) return;
    
    const category = {
      id: newCategory.toLowerCase().replace(/\s+/g, '-'),
      name: newCategory,
      description: `Custom ${newCategory} category`
    };
    
    addCategory(category);
    setNewCategory('');
    setShowAddCategory(false);
    
    toast({
      title: "Success",
      description: "Category added successfully!",
    });
  };

  const handleDeleteProduct = (id: string) => {
    removeProduct(id);
    toast({
      title: "Success",
      description: "Product deleted successfully!",
    });
  };

  return (
    <div className="min-h-screen bg-secondary p-6">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">House Of Styles Admin Panel</h1>
          <p className="text-muted-foreground">Manage your products, categories, and coupons</p>
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
                  <p className="text-2xl font-bold">{categories.length}</p>
                  <p className="text-sm text-muted-foreground">Categories</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Tag className="h-8 w-8 text-warning" />
                <div>
                  <p className="text-2xl font-bold">
                    {COUPONS_ENABLED ? coupons.filter(c => c.isActive).length : 'Disabled'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {COUPONS_ENABLED ? 'Active Coupons' : 'Coupons Disabled'}
                  </p>
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
          {COUPONS_ENABLED && (
            <Button variant="outline" onClick={() => setShowAddCoupon(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Coupon
            </Button>
          )}
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
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="price">Selling Price *</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    placeholder="Final price customers pay"
                  />
                </div>
                <div>
                  <Label htmlFor="originalPrice">MRP (Original Price)</Label>
                  <Input
                    id="originalPrice"
                    type="number"
                    step="0.01"
                    value={newProduct.originalPrice}
                    onChange={(e) => setNewProduct({ ...newProduct, originalPrice: e.target.value })}
                    placeholder="Enter MRP for discount display"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Shows crossed-out price and discount percentage to customers
                  </p>
                </div>
              </div>

              {/* Shipping Configuration */}
              <div className="space-y-4">
                <h3 className="font-medium text-lg border-t pt-4">Shipping Configuration</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="shippingCost">Shipping Cost (₹)</Label>
                    <Input
                      id="shippingCost"
                      type="number"
                      step="0.01"
                      value={newProduct.shippingCost}
                      onChange={(e) => setNewProduct({ ...newProduct, shippingCost: e.target.value })}
                      placeholder="0.00 (Leave empty for free shipping)"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Leave empty for free shipping on this product
                    </p>
                  </div>
                  <div>
                    <Label htmlFor="freeShippingThreshold">Free Shipping Above (₹)</Label>
                    <Input
                      id="freeShippingThreshold"
                      type="number"
                      step="0.01"
                      value={newProduct.freeShippingThreshold}
                      onChange={(e) => setNewProduct({ ...newProduct, freeShippingThreshold: e.target.value })}
                      placeholder="100.00 (Optional)"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Free shipping if order value exceeds this amount
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <Label htmlFor="image">Product Image</Label>
                <div className="space-y-2">
                  <Input
                    id="image"
                    value={newProduct.image}
                    onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                  />
                  <div className="flex space-x-2">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileUpload}
                      accept="image/*"
                      className="hidden"
                    />
                    <Button 
                      type="button"
                      variant="outline" 
                      onClick={() => fileInputRef.current?.click()}
                      className="flex-1"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Select from Device
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <LinkIcon className="h-4 w-4 mr-2" />
                      Use URL
                    </Button>
                  </div>
                  {newProduct.image && (
                    <div className="mt-2">
                      <img 
                        src={newProduct.image} 
                        alt="Preview" 
                        className="w-20 h-20 object-cover rounded border"
                        onError={(e) => {
                          e.currentTarget.src = '/placeholder.svg';
                        }}
                      />
                    </div>
                  )}
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
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newProduct.isFeatured}
                    onChange={(e) => setNewProduct({ ...newProduct, isFeatured: e.target.checked })}
                    className="rounded"
                  />
                  <span className="text-sm">Featured on Main Page</span>
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

        {/* Add/Edit Coupon Form */}
        {showAddCoupon && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{editingCoupon ? 'Edit Coupon' : 'Add New Coupon'}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="couponCode">Coupon Code *</Label>
                  <Input
                    id="couponCode"
                    value={newCoupon.code}
                    onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value.toUpperCase() })}
                    placeholder="SAVE20"
                  />
                </div>
                <div>
                  <Label htmlFor="couponType">Discount Type *</Label>
                  <Select
                    value={newCoupon.type}
                    onValueChange={(value: any) => setNewCoupon({ ...newCoupon, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">Percentage (%)</SelectItem>
                      <SelectItem value="fixed">Fixed Amount (₹)</SelectItem>
                      <SelectItem value="bogo">Buy One Get One</SelectItem>
                      <SelectItem value="free_shipping">Free Shipping</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="couponValue">
                    Value * {newCoupon.type === 'percentage' ? '(%)' : '(₹)'}
                  </Label>
                  <Input
                    id="couponValue"
                    type="number"
                    step="0.01"
                    value={newCoupon.value}
                    onChange={(e) => setNewCoupon({ ...newCoupon, value: e.target.value })}
                    placeholder={newCoupon.type === 'percentage' ? '20' : '10.00'}
                  />
                </div>
                <div>
                  <Label htmlFor="minOrderValue">Min Order Value</Label>
                  <Input
                    id="minOrderValue"
                    type="number"
                    step="0.01"
                    value={newCoupon.minOrderValue}
                    onChange={(e) => setNewCoupon({ ...newCoupon, minOrderValue: e.target.value })}
                    placeholder="50.00"
                  />
                </div>
                <div>
                  <Label htmlFor="maxDiscount">Max Discount (for %)</Label>
                  <Input
                    id="maxDiscount"
                    type="number"
                    step="0.01"
                    value={newCoupon.maxDiscount}
                    onChange={(e) => setNewCoupon({ ...newCoupon, maxDiscount: e.target.value })}
                    placeholder="100.00"
                  />
                </div>
                <div>
                  <Label htmlFor="usageLimit">Usage Limit (Optional)</Label>
                  <Input
                    id="usageLimit"
                    type="number"
                    value={newCoupon.usageLimit}
                    onChange={(e) => setNewCoupon({ ...newCoupon, usageLimit: e.target.value })}
                    placeholder="100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiresAt">Expiry Date (Optional)</Label>
                  <Input
                    id="expiresAt"
                    type="date"
                    value={newCoupon.expiresAt}
                    onChange={(e) => setNewCoupon({ ...newCoupon, expiresAt: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="couponDescription">Description *</Label>
                <Input
                  id="couponDescription"
                  value={newCoupon.description}
                  onChange={(e) => setNewCoupon({ ...newCoupon, description: e.target.value })}
                  placeholder="20% off your entire order"
                />
              </div>

              <div className="flex space-x-4">
                <Button onClick={handleAddCoupon} className="bg-gradient-button">
                  <Tag className="h-4 w-4 mr-2" />
                  {editingCoupon ? 'Update Coupon' : 'Add Coupon'}
                </Button>
                <Button variant="outline" onClick={() => {
                  setShowAddCoupon(false);
                  setEditingCoupon(null);
                  setNewCoupon({
                    code: '',
                    description: '',
                    type: 'percentage',
                    value: '',
                    minOrderValue: '',
                    maxDiscount: '',
                    expiresAt: '',
                    usageLimit: '',
                  });
                }}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Coupons List */}
        {COUPONS_ENABLED && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>All Coupons ({coupons.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {coupons.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No coupons yet. Click "Add Coupon" to create one.
                </div>
              ) : (
                <div className="space-y-4">
                  {coupons.map((coupon) => (
                    <div key={coupon.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <Badge 
                            variant={coupon.isActive ? "secondary" : "outline"} 
                            className={coupon.isActive ? "bg-primary text-primary-foreground" : ""}
                          >
                            {coupon.code}
                          </Badge>
                          {!coupon.isActive && (
                            <Badge variant="secondary" className="text-muted-foreground">
                              Disabled
                            </Badge>
                          )}
                          {coupon.expiresAt && new Date(coupon.expiresAt) < new Date() && (
                            <Badge variant="destructive">
                              Expired
                            </Badge>
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{coupon.description}</p>
                          <p className="text-sm text-muted-foreground">
                            {coupon.type === 'percentage' ? `${coupon.value}% off` : 
                             coupon.type === 'fixed' ? `₹${coupon.value} off` :
                             coupon.type === 'bogo' ? 'Buy 1 Get 1' : 'Free Shipping'}
                            {coupon.minOrderValue && ` (Min: ₹${coupon.minOrderValue})`}
                            {coupon.expiresAt && ` • Expires: ${new Date(coupon.expiresAt).toLocaleDateString()}`}
                            {coupon.usageLimit && ` • Limit: ${coupon.usageLimit}`}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Used: {coupon.usageCount} times
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditCoupon(coupon)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant={coupon.isActive ? "secondary" : "default"}
                          onClick={() => handleToggleCouponStatus(coupon.id)}
                        >
                          {coupon.isActive ? 'Disable' : 'Enable'}
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDeleteCoupon(coupon.id)}
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
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-price">
                          ${product.price.toFixed(2)}
                        </span>
                        {product.originalPrice && (
                          <>
                            <span className="text-xs text-muted-foreground line-through">
                              MRP: ${product.originalPrice.toFixed(2)}
                            </span>
                            <span className="text-xs text-success">
                              Save ${(product.originalPrice - product.price).toFixed(2)}
                            </span>
                          </>
                        )}
                      </div>
                      {product.shipping ? (
                        <p className="text-xs text-muted-foreground">
                          Shipping: ₹{product.shipping.cost.toLocaleString('en-IN')}
                          {product.shipping.freeShippingThreshold && 
                            ` (Free above ₹${product.shipping.freeShippingThreshold.toLocaleString('en-IN')})`
                          }
                        </p>
                      ) : (
                        <p className="text-xs text-success">Free Shipping</p>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      {product.isNew && <Badge>New</Badge>}
                      {product.isSale && <Badge variant="destructive">Sale</Badge>}
                      {product.isFeatured && <Badge className="bg-primary">Featured</Badge>}
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