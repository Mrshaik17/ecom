import { createContext, useContext, useReducer, ReactNode } from 'react';
import { Product } from '@/components/ProductCard';

export interface OrderAddress {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Order {
  id: string;
  product: Product;
  quantity: number;
  address: OrderAddress;
  total: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  createdAt: Date;
}

interface OrderState {
  orders: Order[];
  currentOrder: {
    product: Product | null;
    quantity: number;
  } | null;
}

type OrderAction =
  | { type: 'START_ORDER'; product: Product; quantity?: number }
  | { type: 'COMPLETE_ORDER'; address: OrderAddress }
  | { type: 'CANCEL_ORDER' }
  | { type: 'ADD_ORDER'; order: Order };

const initialState: OrderState = {
  orders: [],
  currentOrder: null,
};

const orderReducer = (state: OrderState, action: OrderAction): OrderState => {
  switch (action.type) {
    case 'START_ORDER':
      return {
        ...state,
        currentOrder: {
          product: action.product,
          quantity: action.quantity || 1,
        },
      };
    
    case 'COMPLETE_ORDER':
      if (!state.currentOrder?.product) return state;
      
      const newOrder: Order = {
        id: `order-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        product: state.currentOrder.product,
        quantity: state.currentOrder.quantity,
        address: action.address,
        total: state.currentOrder.product.price * state.currentOrder.quantity,
        status: 'pending',
        createdAt: new Date(),
      };
      
      return {
        ...state,
        orders: [...state.orders, newOrder],
        currentOrder: null,
      };
    
    case 'CANCEL_ORDER':
      return {
        ...state,
        currentOrder: null,
      };
    
    case 'ADD_ORDER':
      return {
        ...state,
        orders: [...state.orders, action.order],
      };
    
    default:
      return state;
  }
};

interface OrderContextType {
  orders: Order[];
  currentOrder: OrderState['currentOrder'];
  startOrder: (product: Product, quantity?: number) => void;
  completeOrder: (address: OrderAddress) => void;
  cancelOrder: () => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(orderReducer, initialState);

  const startOrder = (product: Product, quantity = 1) => {
    dispatch({ type: 'START_ORDER', product, quantity });
  };

  const completeOrder = (address: OrderAddress) => {
    dispatch({ type: 'COMPLETE_ORDER', address });
  };

  const cancelOrder = () => {
    dispatch({ type: 'CANCEL_ORDER' });
  };

  return (
    <OrderContext.Provider
      value={{
        orders: state.orders,
        currentOrder: state.currentOrder,
        startOrder,
        completeOrder,
        cancelOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
};