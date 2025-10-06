// Coupon Configuration - Enable/disable coupons easily
export const COUPONS_ENABLED = true; // Set to false to disable all coupon functionality

export interface CouponConfig {
  id: string;
  code: string;
  description: string;
  type: 'percentage' | 'fixed' | 'bogo' | 'free_shipping';
  value: number;
  minOrderValue?: number;
  maxDiscount?: number;
  isActive: boolean;
  expiresAt?: Date;
  usageLimit?: number;
  usageCount: number;
}

// Default coupons - Admin can modify these
export const DEFAULT_COUPONS: CouponConfig[] = [
  {
    id: '1',
    code: 'SAVE10',
    description: '10% Off on Any Item',
    type: 'percentage',
    value: 10,
    isActive: true,
    usageLimit: 100,
    usageCount: 0,
  },
  {
    id: '2',
    code: 'FREESHIP',
    description: 'Free Shipping on All Products',
    type: 'free_shipping',
    value: 0,
    isActive: true,
    usageCount: 0,
  },
];