import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Index from "./pages/Index";
import Admin from "./pages/Admin";
import Cart from "./pages/Cart";
import Categories from "./pages/Categories";
import CategoryPage from "./pages/CategoryPage";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <div className="min-h-screen flex flex-col">
        <Routes>
          {/* Admin Route */}
          <Route path="/admin" element={<Admin />} />
          
          {/* Main Store Routes */}
          <Route path="/*" element={
            <>
              <Header />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/categories" element={<Categories />} />
                  <Route path="/category/:categoryId" element={<CategoryPage />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
              <WhatsAppButton />
            </>
          } />
        </Routes>
      </div>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
