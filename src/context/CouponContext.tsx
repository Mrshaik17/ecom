import { createContext, useContext, useReducer, ReactNode } from 'react';

export interface Coupon {
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

interface CouponState {
  coupons: Coupon[];
  appliedCoupon: Coupon | null;
}

type CouponAction =
  | { type: 'ADD_COUPON'; payload: Coupon }
  | { type: 'APPLY_COUPON'; payload: string }
  | { type: 'REMOVE_COUPON' }
  | { type: 'UPDATE_COUPON'; payload: Coupon }
  | { type: 'DELETE_COUPON'; payload: string }
  | { type: 'TOGGLE_COUPON_STATUS'; payload: string };

const initialCoupons: Coupon[] = [
  {
    id: '1',
    code: 'BOGO50',
    description: 'Buy 1 Get 1 Free',
    type: 'bogo',
    value: 50,
    minOrderValue: 50,
    isActive: true,
    usageLimit: 100,
    usageCount: 0,
  },
  {
    id: '2',
    code: 'SAVE20',
    description: '20% Off Your Order',
    type: 'percentage',
    value: 20,
    minOrderValue: 100,
    maxDiscount: 50,
    isActive: true,
    usageLimit: 50,
    usageCount: 0,
  },
  {
    id: '3',
    code: 'FREESHIP',
    description: 'Free Shipping on All Orders',
    type: 'free_shipping',
    value: 0,
    isActive: true,
    usageCount: 0,
  },
];

const couponReducer = (state: CouponState, action: CouponAction): CouponState => {
  switch (action.type) {
    case 'ADD_COUPON':
      return {
        ...state,
        coupons: [...state.coupons, action.payload],
      };
    
    case 'APPLY_COUPON':
      const coupon = state.coupons.find(c => 
        c.code.toLowerCase() === action.payload.toLowerCase() && c.isActive
      );
      
      if (!coupon) return state;
      
      return {
        ...state,
        appliedCoupon: coupon,
      };
    
    case 'REMOVE_COUPON':
      return {
        ...state,
        appliedCoupon: null,
      };
    
    case 'UPDATE_COUPON':
      return {
        ...state,
        coupons: state.coupons.map(c =>
          c.id === action.payload.id ? action.payload : c
        ),
      };
    
    case 'DELETE_COUPON':
      return {
        ...state,
        coupons: state.coupons.filter(c => c.id !== action.payload),
      };
    
    case 'TOGGLE_COUPON_STATUS':
      return {
        ...state,
        coupons: state.coupons.map(c =>
          c.id === action.payload ? { ...c, isActive: !c.isActive } : c
        ),
      };
    
    default:
      return state;
  }
};

interface CouponContextType extends CouponState {
  addCoupon: (coupon: Coupon) => void;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  deleteCoupon: (couponId: string) => void;
  updateCoupon: (coupon: Coupon) => void;
  toggleCouponStatus: (couponId: string) => void;
  calculateDiscount: (total: number) => { discount: number; finalTotal: number };
}

const CouponContext = createContext<CouponContextType | undefined>(undefined);

export const CouponProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(couponReducer, {
    coupons: initialCoupons,
    appliedCoupon: null,
  });

  const addCoupon = (coupon: Coupon) => {
    dispatch({ type: 'ADD_COUPON', payload: coupon });
  };

  const applyCoupon = (code: string): boolean => {
    const coupon = state.coupons.find(c => 
      c.code.toLowerCase() === code.toLowerCase() && c.isActive
    );
    
    if (coupon) {
      dispatch({ type: 'APPLY_COUPON', payload: code });
      return true;
    }
    return false;
  };

  const removeCoupon = () => {
    dispatch({ type: 'REMOVE_COUPON' });
  };

  const deleteCoupon = (couponId: string) => {
    dispatch({ type: 'DELETE_COUPON', payload: couponId });
  };

  const updateCoupon = (coupon: Coupon) => {
    dispatch({ type: 'UPDATE_COUPON', payload: coupon });
  };

  const toggleCouponStatus = (couponId: string) => {
    dispatch({ type: 'TOGGLE_COUPON_STATUS', payload: couponId });
  };

  const calculateDiscount = (total: number): { discount: number; finalTotal: number } => {
    if (!state.appliedCoupon) {
      return { discount: 0, finalTotal: total };
    }

    const coupon = state.appliedCoupon;
    let discount = 0;

    if (coupon.minOrderValue && total < coupon.minOrderValue) {
      return { discount: 0, finalTotal: total };
    }

    switch (coupon.type) {
      case 'percentage':
        discount = (total * coupon.value) / 100;
        if (coupon.maxDiscount) {
          discount = Math.min(discount, coupon.maxDiscount);
        }
        break;
      
      case 'fixed':
        discount = Math.min(coupon.value, total);
        break;
      
      case 'bogo':
        discount = total * 0.5; // 50% off for BOGO
        break;
      
      case 'free_shipping':
        discount = 10; // Assuming $10 shipping cost
        break;
      
      default:
        discount = 0;
    }

    return {
      discount,
      finalTotal: Math.max(0, total - discount),
    };
  };

  return (
    <CouponContext.Provider
      value={{
        ...state,
        addCoupon,
        applyCoupon,
        removeCoupon,
        deleteCoupon,
        updateCoupon,
        toggleCouponStatus,
        calculateDiscount,
      }}
    >
      {children}
    </CouponContext.Provider>
  );
};

export const useCoupon = () => {
  const context = useContext(CouponContext);
  if (!context) {
    throw new Error('useCoupon must be used within a CouponProvider');
  }
  return context;
};