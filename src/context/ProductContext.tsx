import { createContext, useContext, useReducer, ReactNode } from 'react';
import { Product } from '@/components/ProductCard';
import { demoProducts, categories as initialCategories } from '@/data/products';

interface Category {
  id: string;
  name: string;
  description: string;
}

interface ProductState {
  products: Product[];
  categories: Category[];
}

type ProductAction =
  | { type: 'ADD_PRODUCT'; payload: Product }
  | { type: 'REMOVE_PRODUCT'; payload: string }
  | { type: 'UPDATE_PRODUCT'; payload: Product }
  | { type: 'ADD_CATEGORY'; payload: Category }
  | { type: 'REMOVE_CATEGORY'; payload: string };

const productReducer = (state: ProductState, action: ProductAction): ProductState => {
  switch (action.type) {
    case 'ADD_PRODUCT':
      return {
        ...state,
        products: [...state.products, action.payload],
      };
    
    case 'REMOVE_PRODUCT':
      return {
        ...state,
        products: state.products.filter(product => product.id !== action.payload),
      };
    
    case 'UPDATE_PRODUCT':
      return {
        ...state,
        products: state.products.map(product =>
          product.id === action.payload.id ? action.payload : product
        ),
      };
    
    case 'ADD_CATEGORY':
      return {
        ...state,
        categories: [...state.categories, action.payload],
      };
    
    case 'REMOVE_CATEGORY':
      return {
        ...state,
        categories: state.categories.filter(category => category.id !== action.payload),
      };
    
    default:
      return state;
  }
};

interface ProductContextType extends ProductState {
  addProduct: (product: Product) => void;
  removeProduct: (id: string) => void;
  updateProduct: (product: Product) => void;
  addCategory: (category: Category) => void;
  removeCategory: (id: string) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(productReducer, {
    products: demoProducts,
    categories: initialCategories,
  });

  const addProduct = (product: Product) => {
    dispatch({ type: 'ADD_PRODUCT', payload: product });
  };

  const removeProduct = (id: string) => {
    dispatch({ type: 'REMOVE_PRODUCT', payload: id });
  };

  const updateProduct = (product: Product) => {
    dispatch({ type: 'UPDATE_PRODUCT', payload: product });
  };

  const addCategory = (category: Category) => {
    dispatch({ type: 'ADD_CATEGORY', payload: category });
  };

  const removeCategory = (id: string) => {
    dispatch({ type: 'REMOVE_CATEGORY', payload: id });
  };

  return (
    <ProductContext.Provider
      value={{
        ...state,
        addProduct,
        removeProduct,
        updateProduct,
        addCategory,
        removeCategory,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};