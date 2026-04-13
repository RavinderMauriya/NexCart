import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import MobileBottomNav from "./components/mobileBottomNav";
import Footer from "./components/Footer";
import ProductPage from "./pages/ProductPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
//auth and admin routes
import { AuthProvider } from "./context/authContext";
import AuthModal from "./components/auth/AuthModal";
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
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/orders" element={<div />} />
          <Route path="/profile" element={<div />} />

          {/* admin routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="categories" element={<AdminCategories />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="products/add" element={<AdminAddProduct />} />
            <Route path="products/:id/images" element={<AdminProductImages />}/>
            <Route path="orders" element={<AdminOrders />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="coupons" element={<AdminCoupons />} />
          </Route>
          
        </Routes>
        <Footer />

        <MobileBottomNav />
        <AuthModal />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
