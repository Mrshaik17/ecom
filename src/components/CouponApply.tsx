import { useState } from 'react';
import { Tag, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useCoupon } from '@/context/CouponContext';
import { useToast } from '@/hooks/use-toast';

interface CouponApplyProps {
  total: number;
}

const CouponApply = ({ total }: CouponApplyProps) => {
  const [couponCode, setCouponCode] = useState('');
  const { appliedCoupon, applyCoupon, removeCoupon, calculateDiscount } = useCoupon();
  const { toast } = useToast();

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) return;

    const success = applyCoupon(couponCode);
    if (success) {
      toast({
        title: "Coupon Applied!",
        description: "Your discount has been applied successfully.",
      });
      setCouponCode('');
    } else {
      toast({
        title: "Invalid Coupon",
        description: "The coupon code is invalid or expired.",
        variant: "destructive",
      });
    }
  };

  const handleRemoveCoupon = () => {
    removeCoupon();
    toast({
      title: "Coupon Removed",
      description: "The coupon has been removed from your order.",
    });
  };

  const { discount, finalTotal } = calculateDiscount(total);

  return (
    <div className="space-y-4">
      {!appliedCoupon ? (
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Enter coupon code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
              className="pl-10"
              onKeyDown={(e) => e.key === 'Enter' && handleApplyCoupon()}
            />
          </div>
          <Button 
            onClick={handleApplyCoupon}
            disabled={!couponCode.trim()}
            className="bg-gradient-button"
          >
            Apply
          </Button>
        </div>
      ) : (
        <div className="flex items-center justify-between p-3 bg-success/10 rounded-lg border border-success/20">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-success text-success-foreground">
              {appliedCoupon.code}
            </Badge>
            <span className="text-sm text-success font-medium">
              {appliedCoupon.description}
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRemoveCoupon}
            className="h-8 w-8 p-0 hover:bg-destructive/10"
          >
            <X className="h-4 w-4 text-destructive" />
          </Button>
        </div>
      )}

      {appliedCoupon && discount > 0 && (
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>₹{total.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between text-success">
            <span>Discount ({appliedCoupon.code}):</span>
            <span>-₹{discount.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between font-bold text-lg border-t pt-2">
            <span>Total:</span>
            <span>₹{finalTotal.toLocaleString('en-IN')}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CouponApply;