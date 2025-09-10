import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Product } from './ProductCard';
import { useOrder, OrderAddress } from '@/context/OrderContext';
import { useCoupon } from '@/context/CouponContext'; 
import AddressForm from './AddressForm';
import CouponApply from './CouponApply';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface BuyNowDialogProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
}

const BuyNowDialog = ({ isOpen, onClose, product }: BuyNowDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { startOrder, completeOrder, cancelOrder } = useOrder();
  const { calculateDiscount } = useCoupon();
  const navigate = useNavigate();

  if (!product) return null;

  const handleAddressSubmit = async (addressData: OrderAddress) => {
    setIsLoading(true);
    try {
      // Start the order process
      startOrder(product, 1);
      
      // Complete the order with address
      completeOrder(addressData);
      
      // Close dialog and navigate to success page
      onClose();
      navigate('/order-success');
    } catch (error) {
      console.error('Order submission failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    cancelOrder();
    onClose();
  };

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const { discount: couponDiscount, finalTotal } = calculateDiscount(product.price);
  const shippingCost = product.shipping?.cost || 0;
  const isShippingFree = !product.shipping || 
    (product.shipping.freeShippingThreshold && finalTotal >= product.shipping.freeShippingThreshold);
  const finalShippingCost = isShippingFree ? 0 : shippingCost;
  const grandTotal = finalTotal + finalShippingCost;

  return (
    <Dialog open={isOpen} onOpenChange={handleCancel}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Complete Your Purchase</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Product Summary */}
          <div className="space-y-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1 space-y-2">
                    <h3 className="font-semibold">{product.name}</h3>
                    <p className="text-sm text-muted-foreground uppercase">
                      {product.category}
                    </p>
                    
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-lg">
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>
                      {product.originalPrice && (
                        <>
                          <span className="text-sm text-muted-foreground line-through">
                            ₹{product.originalPrice.toLocaleString('en-IN')}
                          </span>
                          <Badge variant="destructive" className="text-xs">
                            -{discount}% OFF
                          </Badge>
                        </>
                      )}
                    </div>
                    
                    {product.rating && (
                      <div className="flex items-center gap-1">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              className={`text-xs ${
                                i < product.rating! ? 'text-yellow-400' : 'text-gray-300'
                              }`}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground">({product.rating})</span>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Order Summary */}
                <div className="mt-4 pt-4 border-t space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Quantity:</span>
                    <span>1</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Subtotal:</span>
                    <span>₹{product.price.toLocaleString('en-IN')}</span>
                  </div>
                  {couponDiscount > 0 && (
                    <div className="flex justify-between text-sm text-success">
                      <span>Coupon Discount:</span>
                      <span>-₹{couponDiscount.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span>Shipping:</span>
                    <span>
                      {isShippingFree ? (
                        <span className="text-success">Free</span>
                      ) : (
                        `₹${finalShippingCost.toLocaleString('en-IN')}`
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-2 border-t">
                    <span>Total:</span>
                    <span>₹{grandTotal.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="text-sm text-muted-foreground p-4 bg-muted/30 rounded-lg">
              <p className="font-medium mb-2">Payment Process:</p>
              <ul className="space-y-1 text-xs">
                <li>• Enter your shipping address</li>
                <li>• We'll send you payment instructions</li>
                <li>• Order ships after payment confirmation</li>
              </ul>
            </div>
          </div>
          
          {/* Address Form */}
          <div>
            {/* Coupon Section */}
            <div className="mb-6">
              <CouponApply total={product.price} />
            </div>
            
        <AddressForm
          onSubmit={handleAddressSubmit}
          onCancel={handleCancel}
          isLoading={isLoading}
          productVariants={product?.variants}
        />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BuyNowDialog;