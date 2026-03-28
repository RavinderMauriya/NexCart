import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Products from "./pages/Products";
import MobileBottomNav from "./components/mobileBottomNav";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/address" element={<div />} />
        <Route path="/cart" element={<div />} />
        <Route path="/profile" element={<div />} />
      </Routes>
      <Footer/>
      <MobileBottomNav/>
    </BrowserRouter>
  );
};

export default App;