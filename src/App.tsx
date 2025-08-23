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
          
          {/* Main Store Routes with Layout */}
          <Route path="/" element={
            <>
              <Header />
              <main className="flex-1">
                <Index />
              </main>
              <Footer />
              <WhatsAppButton />
            </>
          } />
          <Route path="/cart" element={
            <>
              <Header />
              <main className="flex-1">
                <Cart />
              </main>
              <Footer />
              <WhatsAppButton />
            </>
          } />
          <Route path="/categories" element={
            <>
              <Header />
              <main className="flex-1">
                <Categories />
              </main>
              <Footer />
              <WhatsAppButton />
            </>
          } />
          <Route path="/category/:categoryId" element={
            <>
              <Header />
              <main className="flex-1">
                <CategoryPage />
              </main>
              <Footer />
              <WhatsAppButton />
            </>
          } />
          <Route path="/contact" element={
            <>
              <Header />
              <main className="flex-1">
                <Contact />
              </main>
              <Footer />
              <WhatsAppButton />
            </>
          } />
          <Route path="*" element={
            <>
              <Header />
              <main className="flex-1">
                <NotFound />
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
