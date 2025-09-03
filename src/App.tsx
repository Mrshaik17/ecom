import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./LS/firebase.js";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

// Pages
import Index from "./pages/Index";
import Admin from "./pages/Admin";
import Cart from "./pages/Cart";
import Categories from "./pages/Categories";
import CategoryPage from "./pages/CategoryPage";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import OrderSuccess from "./pages/OrderSuccess";
import Products from "./pages/Products";
import NewArrivals from "./pages/NewArrivals";
import Login from "./LS/Login";
import ResetPassword from "./LS/ResetPassword"; // ✅ add reset password page
import ForgotPassword from "./LS/ForgotPassword";

const queryClient = new QueryClient();

// 🔒 PrivateRoute wrapper
const PrivateRoute = ({ user, children }: { user: any; children: JSX.Element }) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const App = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-lg">
        Loading...
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <div className="min-h-screen flex flex-col">
          <Routes>
            {/* Root redirect */}
            <Route path="/" element={<Navigate to={user ? "/home" : "/login"} replace />} />

            {/* Login (only show when logged out) */}
            <Route path="/login" element={user ? <Navigate to="/home" replace /> : <Login />} />

            {/* ✅ Forgot Password Route */}
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />


            {/* Admin (currently unprotected) */}
            <Route path="/admin" element={<Admin />} />

            {/* Protected Store Routes */}
            <Route
              path="/home"
              element={
                <PrivateRoute user={user}>
                  <>
                    <Header />
                    <main className="flex-1">
                      <Index />
                    </main>
                    <Footer />
                    <WhatsAppButton />
                  </>
                </PrivateRoute>
              }
            />
            <Route
              path="/cart"
              element={
                <PrivateRoute user={user}>
                  <>
                    <Header />
                    <main className="flex-1">
                      <Cart />
                    </main>
                    <Footer />
                    <WhatsAppButton />
                  </>
                </PrivateRoute>
              }
            />
            <Route
              path="/categories"
              element={
                <PrivateRoute user={user}>
                  <>
                    <Header />
                    <main className="flex-1">
                      <Categories />
                    </main>
                    <Footer />
                    <WhatsAppButton />
                  </>
                </PrivateRoute>
              }
            />
            <Route
              path="/category/:categoryId"
              element={
                <PrivateRoute user={user}>
                  <>
                    <Header />
                    <main className="flex-1">
                      <CategoryPage />
                    </main>
                    <Footer />
                    <WhatsAppButton />
                  </>
                </PrivateRoute>
              }
            />
            <Route
              path="/contact"
              element={
                <PrivateRoute user={user}>
                  <>
                    <Header />
                    <main className="flex-1">
                      <Contact />
                    </main>
                    <Footer />
                    <WhatsAppButton />
                  </>
                </PrivateRoute>
              }
            />
            <Route
              path="/products"
              element={
                <PrivateRoute user={user}>
                  <>
                    <Header />
                    <main className="flex-1">
                      <Products />
                    </main>
                    <Footer />
                    <WhatsAppButton />
                  </>
                </PrivateRoute>
              }
            />
            <Route
              path="/new-arrivals"
              element={
                <PrivateRoute user={user}>
                  <>
                    <Header />
                    <main className="flex-1">
                      <NewArrivals />
                    </main>
                    <Footer />
                    <WhatsAppButton />
                  </>
                </PrivateRoute>
              }
            />

            {/* Order Success (protected too) */}
            <Route
              path="/order-success"
              element={
                <PrivateRoute user={user}>
                  <>
                    <Header />
                    <main className="flex-1">
                      <OrderSuccess />
                    </main>
                    <Footer />
                    <WhatsAppButton />
                  </>
                </PrivateRoute>
              }
            />

            {/* 404 */}
            <Route
              path="*"
              element={
                <>
                  <Header />
                  <main className="flex-1">
                    <NotFound />
                  </main>
                  <Footer />
                  <WhatsAppButton />
                </>
              }
            />
          </Routes>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
