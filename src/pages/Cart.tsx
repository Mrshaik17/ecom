import { useState } from 'react';
import { Minus, Plus, Trash2, ShoppingBag, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';
import CouponApply from '@/components/CouponApply';
import { useCoupon } from '@/context/CouponContext';

const Cart = () => {
  const { items, total, removeItem, updateQuantity, clearCart } = useCart();
  const { toast } = useToast();
  const { calculateDiscount, appliedCoupon } = useCoupon();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(id);
      return;
    }
    updateQuantity(id, newQuantity);
  };

  const handleOrderNow = () => {
    if (items.length === 0) return;

    const { discount, finalTotal } = calculateDiscount(total);
    
    // Create detailed cart message
    let message = "🛒 *ORDER REQUEST FROM HOUSE OF STYLES*\n\n";
    
    // Add items
    message += "📦 *ITEMS:*\n";
    items.forEach((item, index) => {
      message += `${index + 1}. ${item.name}\n`;
      message += `   Category: ${item.category}\n`;
      message += `   Price: ₹${item.price.toLocaleString('en-IN')}\n`;
      message += `   Quantity: ${item.quantity}\n`;
      message += `   Subtotal: ₹${(item.price * item.quantity).toLocaleString('en-IN')}\n\n`;
    });
    
    // Add pricing details
    message += "💰 *PRICING BREAKDOWN:*\n";
    message += `Subtotal: ₹${total.toLocaleString('en-IN')}\n`;
    
    // Add coupon info if applied
    if (appliedCoupon && discount > 0) {
      message += `🎟️ Coupon Applied: ${appliedCoupon.code}\n`;
      message += `Discount: -₹${discount.toLocaleString('en-IN')}\n`;
      message += `After Discount: ₹${finalTotal.toLocaleString('en-IN')}\n`;
    }
    
    message += `*FINAL TOTAL: ₹${finalTotal.toLocaleString('en-IN')}*\n\n`;
    
    message += "✅ Please confirm this order and provide delivery details.";
    
    // WhatsApp number (replace with actual number)
    const phoneNumber = '1234567890';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-secondary py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <ShoppingBag className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
            <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
            <p className="text-muted-foreground mb-8">
              Looks like you haven't added anything to your cart yet. 
              Start shopping to fill it up!
            </p>
            <Link to="/">
              <Button size="lg" className="bg-gradient-button">
                Continue Shopping
                <MessageCircle className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Shopping Cart</h1>
          <p className="text-muted-foreground">{items.length} item{items.length !== 1 ? 's' : ''} in your cart</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                      onError={(e) => {
                        e.currentTarget.src = '/placeholder.svg';
                      }}
                    />
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg truncate">{item.name}</h3>
                      <p className="text-sm text-muted-foreground capitalize">{item.category}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <span className="font-bold text-price text-lg">₹{item.price.toLocaleString('en-IN')}</span>
                        {item.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            ₹{item.originalPrice.toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      
                      <span className="text-lg font-semibold min-w-[2ch] text-center">
                        {item.quantity}
                      </span>
                      
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="text-right">
                      <p className="font-bold text-lg">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Coupon Section */}
                <CouponApply total={total} />
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>₹{total.toLocaleString('en-IN')}</span>
                  </div>
                  
                  {calculateDiscount(total).discount > 0 && (
                    <div className="flex justify-between text-sm text-success">
                      <span>Coupon Discount</span>
                      <span>-₹{calculateDiscount(total).discount.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span className="text-success">Free</span>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>₹{calculateDiscount(total).finalTotal.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>

                <Button
                  className="w-full bg-gradient-button hover:bg-primary-hover"
                  size="lg"
                  onClick={handleOrderNow}
                  disabled={isProcessing}
                >
                  Order Now via WhatsApp
                  <MessageCircle className="ml-2 h-5 w-5" />
                </Button>

                <div className="text-center">
                  <Link to="/">
                    <Button variant="outline" className="w-full">
                      Continue Shopping
                    </Button>
                  </Link>
                </div>

                <div className="text-xs text-muted-foreground text-center space-y-1">
                  <p>🔒 Secure checkout with SSL encryption</p>
                  <p>📦 Free shipping on orders over ₹8,000</p>
                  <p>↩️ 30-day return policy</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;