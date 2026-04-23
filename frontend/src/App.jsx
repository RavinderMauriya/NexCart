import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import MobileBottomNav from "./components/mobileBottomNav";
import Footer from "./components/Footer";
import ProductPage from "./pages/ProductPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import Profile from "./pages/Profile";
import Order from "./components/profile/Order";
import ProfileDetails from "./components/profile/profileDetails";
import Address from "./components/profile/Address";
import { OrderProvider } from "./context/orderContext";
import { CartProvider } from "./context/cartContext";
import CheckoutSkeleton from "./components/checkout/CheckoutSkeleton";
const CheckoutPage = lazy(() => import("./pages/CheckoutPage"));

//auth and admin routes
import { AuthProvider } from "./context/authContext";
import AuthModal from "./components/auth/AuthModal";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import AdminLayout from "./components/adminDashboard/AdminLayout";

// Lazy loaded admin pages
const AdminDashboard = lazy(() => import("./adminPages/Dashboard"));
const AdminProducts = lazy(() => import("./adminPages/Product"));
const AdminCategories = lazy(() => import("./adminPages/Categories"));
const AdminOrders = lazy(() => import("./adminPages/Orders"));
const AdminUsers = lazy(() => import("./adminPages/Users"));
const AdminProductImages = lazy(() => import("./adminPages/ProductImages"));
const AdminAddProduct = lazy(() => import("./adminPages/AddProduct"));

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <OrderProvider>
            <Navbar />
            <main className="min-h-[calc(100vh-180px)] pb-16 md:pb-0">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<ProductPage />} />
                <Route path="/products/:id" element={<ProductDetailPage />} />
                <Route
                  path="/cart"
                  element={
                    <ProtectedRoute>
                      <CartPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/checkout"
                  element={
                    <ProtectedRoute>
                      <Suspense fallback={<CheckoutSkeleton />}>
                        <CheckoutPage />
                      </Suspense>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/order-success"
                  element={
                    <ProtectedRoute>
                      <OrderSuccessPage />
                    </ProtectedRoute>
                  }
                />
                {/* user nested routes */}
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<ProfileDetails />} />
                  <Route path="orders" element={<Order />} />
                  <Route path="address" element={<Address />} />
                </Route>

                {/* admin nested routes */}
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute role="admin">
                      <AdminLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route path="dashboard" element={<Suspense fallback={<div className="p-8 text-center">Loading...</div>}><AdminDashboard /></Suspense>} />
                  <Route path="categories" element={<Suspense fallback={<div className="p-8 text-center">Loading...</div>}><AdminCategories /></Suspense>} />
                  <Route path="products" element={<Suspense fallback={<div className="p-8 text-center">Loading...</div>}><AdminProducts /></Suspense>} />
                  <Route path="products/add" element={<Suspense fallback={<div className="p-8 text-center">Loading...</div>}><AdminAddProduct /></Suspense>} />
                  <Route
                    path="products/:id/images"
                    element={<Suspense fallback={<div className="p-8 text-center">Loading...</div>}><AdminProductImages /></Suspense>}
                  />
                  <Route path="orders" element={<Suspense fallback={<div className="p-8 text-center">Loading...</div>}><AdminOrders /></Suspense>} />
                  <Route path="users" element={<Suspense fallback={<div className="p-8 text-center">Loading...</div>}><AdminUsers /></Suspense>} />
                </Route>
              </Routes>
            </main>
            <Footer />

            <MobileBottomNav />
            <AuthModal />
            <Toaster position="top-center" reverseOrder={false} />
          </OrderProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
