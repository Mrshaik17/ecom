import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import { Toaster } from '@/components/ui/sonner'
import { CartProvider } from '@/context/CartContext'
import { ProductProvider } from '@/context/ProductContext'

createRoot(document.getElementById("root")!).render(
  <ProductProvider>
    <CartProvider>
      <BrowserRouter>
        <App />
        <Toaster />
      </BrowserRouter>
    </CartProvider>
  </ProductProvider>
);
