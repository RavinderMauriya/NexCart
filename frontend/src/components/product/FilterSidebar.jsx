import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { apiRequest } from "../../services/api";
import { SlidersHorizontal, X } from "lucide-react";

const FilterSidebar = ({ isMobileOpen, onMobileClose }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter states from URL
  const selectedCategory = searchParams.get("category") || "";
  const selectedBrand = searchParams.get("brand") || "";
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";
  const selectedRating = searchParams.get("rating") || "";

  // Fetch categories and brands on mount
  useEffect(() => {
    const fetchFilterData = async () => {
      try {
        const [catRes, brandRes] = await Promise.all([
          apiRequest("/category"),
          apiRequest("/products/brands"),
        ]);

        if (catRes.success) setCategories(catRes.data || []);
        if (brandRes.success) setBrands(brandRes.data || []);
      } catch (err) {
        // Fallback: extract unique brands from products if endpoint fails
        console.log("Using fallback for brands");
      } finally {
        setLoading(false);
      }
    };

    fetchFilterData();
  }, []);

  // Alternative: fetch brands from products if no dedicated endpoint
  useEffect(() => {
    const fetchBrandsFromProducts = async () => {
      if (brands.length === 0) {
        try {
          const res = await apiRequest("/products?limit=100");
          if (res.success) {
            const uniqueBrands = [
              ...new Set(res.data?.products?.map((p) => p.brand).filter(Boolean)),
            ];
            setBrands(uniqueBrands);
          }
        } catch (err) {
          console.error("Failed to fetch brands");
        }
      }
    };

    fetchBrandsFromProducts();
  }, [brands.length]);

  const updateFilter = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    // Reset to page 1 when filter changes
    newParams.delete("page");
    setSearchParams(newParams);
  };

  const clearFilters = () => {
    const newParams = new URLSearchParams();
    // Keep search if exists
    const search = searchParams.get("search");
    const sort = searchParams.get("sort");
    if (search) newParams.set("search", search);
    if (sort) newParams.set("sort", sort);
    setSearchParams(newParams);
  };

  const hasActiveFilters =
    selectedCategory || selectedBrand || minPrice || maxPrice || selectedRating;

  const ratingOptions = [
    { value: "4", label: "4★ & above" },
    { value: "3", label: "3★ & above" },
    { value: "2", label: "2★ & above" },
  ];

  const FilterContent = (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-lg flex items-center gap-2">
          <SlidersHorizontal size={20} />
          Filters
        </h2>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-primary hover:text-primary/80 flex items-center gap-1"
          >
            <X size={14} />
            Clear
          </button>
        )}
      </div>

      {/* Categories */}
      <div className="mb-5">
        <p className="text-sm font-semibold mb-3 text-text-dark">Categories</p>
        {loading ? (
          <div className="space-y-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-4 bg-gray-200 rounded animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {categories.map((cat) => (
              <label
                key={cat._id}
                className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors"
              >
                <input
                  type="radio"
                  name="category"
                  checked={selectedCategory === cat._id}
                  onChange={() => updateFilter("category", cat._id)}
                  className="accent-primary"
                />
                <span className="text-sm capitalize">{cat.name}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      <hr className="my-4 border-border" />

      {/* Price Range */}
      <div className="mb-5">
        <p className="text-sm font-semibold mb-3 text-text-dark">Price Range</p>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => updateFilter("minPrice", e.target.value)}
            className="w-full px-3 py-2 text-sm bg-bg-main border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
          <span className="text-text-muted">-</span>
          <input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => updateFilter("maxPrice", e.target.value)}
            className="w-full px-3 py-2 text-sm bg-bg-main border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </div>
      </div>

      <hr className="my-4 border-border" />

      {/* Brands */}
      <div className="mb-5">
        <p className="text-sm font-semibold mb-3 text-text-dark">Brands</p>
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {brands.map((brand) => (
            <label
              key={brand._id || brand}
              className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors"
            >
              <input
                type="radio"
                name="brand"
                checked={selectedBrand === (brand._id || brand)}
                onChange={() => updateFilter("brand", brand._id || brand)}
                className="accent-primary"
              />
              <span className="text-sm">{brand.name || brand}</span>
            </label>
          ))}
        </div>
      </div>

      <hr className="my-4 border-border" />

      {/* Rating */}
      <div className="mb-5">
        <p className="text-sm font-semibold mb-3 text-text-dark">Customer Rating</p>
        <div className="space-y-2">
          {ratingOptions.map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors"
            >
              <input
                type="radio"
                name="rating"
                checked={selectedRating === option.value}
                onChange={() => updateFilter("rating", option.value)}
                className="accent-primary"
              />
              <span className="text-sm">{option.label}</span>
            </label>
          ))}
        </div>
      </div>
    </>
  );

  // Mobile drawer
  if (isMobileOpen) {
    return (
      <>
        {/* Overlay */}
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onMobileClose}
        />
        {/* Drawer */}
        <div className="fixed left-0 top-0 h-full w-80 bg-bg-card p-4 z-50 overflow-y-auto md:hidden shadow-xl pb-20">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-lg">Filters</h2>
            <button onClick={onMobileClose} className="p-2 hover:bg-gray-100 rounded-lg">
              <X size={20} />
            </button>
          </div>
          {FilterContent}
        </div>
      </>
    );
  }

  // Desktop sidebar
  return (
    <div className="hidden md:block w-64 shrink-0 bg-bg-card p-4 rounded-xl shadow border border-border sticky top-24 h-fit">
      {FilterContent}
    </div>
  );
};

export default FilterSidebar;