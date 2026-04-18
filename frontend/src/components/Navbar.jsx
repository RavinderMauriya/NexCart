import React, { useEffect, useState, useContext } from "react";
import { Search, ShoppingCart, User, MapPin, X } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { apiRequest } from "../services/api";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { openModal, user } = useContext(AuthContext);
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // fetch root categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await apiRequest("/category/root");
        if (res.success) setCategories(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setCategoriesLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Sync search query from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchFromUrl = params.get("search") || "";
    setSearchQuery(searchFromUrl);
  }, [location.search]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    // If on products page with search, remove search param
    const params = new URLSearchParams(location.search);
    if (params.has("search")) {
      params.delete("search");
      navigate(`${location.pathname}?${params.toString()}`);
    }
  };

  return (
    <header className="sticky top-0 w-full z-50 bg-white/60 backdrop-blur-md border-b border-black/5 shadow-[0_12px_40px_rgba(25,28,30,0.06)]">
      
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 md:px-6 py-3 max-w-[1400px] mx-auto">
        
        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          className="text-xl md:text-2xl font-black tracking-tighter text-primary cursor-pointer"
        >
          NexCart
        </div>

        {/* Search */}
        <form onSubmit={handleSearch} className="flex flex-1 max-w-2xl mx-6 lg:mx-12">
          <div className="relative flex items-center bg-bg-main rounded-xl px-4 py-2 w-full focus-within:ring-2 focus-within:ring-primary/40">
            <Search className="mr-2 text-text-muted" size={18} />
            <input
              className="bg-transparent w-full text-sm outline-none"
              placeholder="Search products..."
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={clearSearch}
                className="ml-2 p-1 hover:bg-gray-200 rounded-full transition-colors"
              >
                <X size={14} className="text-text-muted" />
              </button>
            )}
          </div>
        </form>

        {/* Right */}
        <div className="flex items-center gap-4 md:gap-6">
          <Link
            to="/address"
            className="hidden md:flex items-center text-text-dark hover:text-primary"
          >
            <MapPin />
            <span className="hidden lg:block text-sm ml-1">141001</span>
          </Link>

          <Link
            to="/cart"
            className="flex items-center text-text-dark hover:text-primary"
          >
            <ShoppingCart />
            <span className="hidden lg:block text-sm ml-1">Cart</span>
          </Link>

          {user?.role === "admin" && (
            <div
              onClick={() => navigate("/admin/dashboard")}
              className="bg-secondary px-3 md:px-5 py-2 rounded-xl font-semibold cursor-pointer"
            >
              Dashboard
            </div>
          )}

          {user ? (
            <Link
              to="/profile"
              className="hidden md:flex items-center gap-2 bg-primary text-white px-3 md:px-5 py-2 rounded-xl font-semibold"
            >
              <User />
              <span>Profile</span>
            </Link>
          ) : (
            <button
              onClick={() => openModal("login")}
              className="hidden md:flex items-center gap-2 bg-primary text-white px-3 md:px-5 py-2 rounded-xl font-semibold"
            >
              <User />
              <span>Login</span>
            </button>
          )}
        </div>
      </div>

      {/*Category Nav */}
      <nav className="bg-white/50 border-t border-border">
        <div className="max-w-[1400px] mx-auto flex items-center gap-9 px-6 py-2 overflow-x-auto hide-scrollbar">

          {/* All Products */}
          <Link
            to="/products"
            className={`text-sm py-1 ${
              location.search === ""
                ? "text-primary font-semibold border-b-2 border-primary"
                : "text-text-dark hover:text-primary"
            }`}
          >
            All
          </Link>

          {/* Loading placeholder - prevents layout shift */}
          {categoriesLoading && (
            <>
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-5 w-16 bg-gray-200 rounded animate-pulse"></div>
              ))}
            </>
          )}

          {/* Dynamic Categories loaded */}
          {!categoriesLoading && categories.map((cat) => {
            const isActive = location.search.includes(cat._id);

            return (
              <Link
                key={cat._id}
                to={`/products?category=${cat._id}`}
                className={`text-sm py-1 ${
                  isActive
                    ? "text-primary font-semibold border-b-2 border-primary"
                    : "text-text-dark hover:text-primary"
                }`}
              >
                {cat.name}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;