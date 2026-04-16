import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import MobileBottomNav from "./components/mobileBottomNav";
import Footer from "./components/Footer";
import ProductPage from "./pages/ProductPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import Profile from "./pages/Profile";
import Order from "./components/profile/Order";
import ProfileDetails from "./components/profile/profileDetails";
import Address from "./components/profile/Address";
import { OrderProvider } from "./context/orderContext";
//auth and admin routes
import { AuthProvider } from "./context/authContext";
import AuthModal from "./components/auth/AuthModal";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import AdminDashboard from "./adminPages/Dashboard";
import AdminProducts from "./adminPages/Product";
import AdminCategories from "./adminPages/Categories";
import AdminOrders from "./adminPages/Orders";
import AdminUsers from "./adminPages/Users";
import AdminCoupons from "./adminPages/Coupons";
import AdminProductImages from "./adminPages/ProductImages";
import AdminAddProduct from "./adminPages/AddProduct";
import AdminLayout from "./components/adminDashboard/AdminLayout";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <OrderProvider>
          <Navbar />
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
            {/* user routes */}
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
              <Route path="addresses" element={<Address />} />
            </Route>

            {/* admin routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute role="admin">
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="categories" element={<AdminCategories />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="products/add" element={<AdminAddProduct />} />
              <Route
                path="products/:id/images"
                element={<AdminProductImages />}
              />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="coupons" element={<AdminCoupons />} />
            </Route>
          </Routes>
          <Footer />

          <MobileBottomNav />
          <AuthModal />
        </OrderProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
