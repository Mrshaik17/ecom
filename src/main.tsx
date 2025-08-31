import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import { Toaster } from '@/components/ui/sonner'
import { CartProvider } from '@/context/CartContext'
import { ProductProvider } from '@/context/ProductContext'
import { OrderProvider } from '@/context/OrderContext'
import { CouponProvider } from '@/context/CouponContext'

createRoot(document.getElementById("root")!).render(
  <ProductProvider>
    <CouponProvider>
      <CartProvider>
        <OrderProvider>
          <BrowserRouter>
            <App />
            <Toaster />
          </BrowserRouter>
        </OrderProvider>
      </CartProvider>
    </CouponProvider>
  </ProductProvider>
);
