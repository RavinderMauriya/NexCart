import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import MobileBottomNav from "./components/mobileBottomNav";
import Footer from './components/Footer'
import ProductPage from "./pages/ProductPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import LoginModel from './pages/LoginModel'

const App = () => {
  const [loginModel, setLoginModel] = useState(false);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/orders" element={<div />} />
        <Route path="/profile" element={<div />} />
      </Routes>
      <Footer />

      {loginModel && <LoginModel onClose={()=>setLoginModel(false)} />}
      <MobileBottomNav />
    </BrowserRouter>
  );
};

export default App;