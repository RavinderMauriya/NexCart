import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { apiRequest } from "../services/api";
import ProductGrid from "../components/product/ProductGrid";
import FilterSidebar from "../components/product/FilterSidebar";
import SortBar from "../components/product/SortBar";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";

const ProductPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({ total: 0, page: 1, pages: 1 });
  const [loading, setLoading] = useState(true);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const queryString = searchParams.toString();
  const query = queryString ? `?${queryString}` : "";

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      try {
        const res = await apiRequest(`/products${query}`);

        if (res.success) {
          setProducts(res.data?.products || []);
          setPagination(res.data?.pagination || { total: 0, page: 1, pages: 1 });
        }
      } catch (err) {
        console.log(err);
      }

      setLoading(false);
    };

    fetchProducts();
  }, [query]);

  const formattedProducts = products.map((p) => ({
    id: p._id,
    title: p.title,
    price: p.minPrice === p.maxPrice ? p.minPrice : `${p.minPrice} - ${p.maxPrice}`,
    oldPrice: p.variants?.[0]?.discountPrice ? p.variants[0].price : null,
    brand: p.brand,
    rating: p.rating,
    image: p.variants?.[0]?.images?.[0] || "/placeholder.png",
  }));

  const handlePageChange = (newPage) => {
    const newParams = new URLSearchParams(searchParams);
    if (newPage > 1) {
      newParams.set("page", newPage);
    } else {
      newParams.delete("page");
    }
    setSearchParams(newParams);
    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Generate pagination buttons
  const renderPagination = () => {
    const { page, pages } = pagination;
    if (pages <= 1) return null;

    const buttons = [];
    const maxButtons = 5;
    let start = Math.max(1, page - Math.floor(maxButtons / 2));
    let end = Math.min(pages, start + maxButtons - 1);

    if (end - start + 1 < maxButtons) {
      start = Math.max(1, end - maxButtons + 1);
    }

    // Previous button
    buttons.push(
      <button
        key="prev"
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 1}
        className="p-2 rounded-lg border border-border hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronLeft size={18} />
      </button>
    );

    // Page numbers
    for (let i = start; i <= end; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            i === page
              ? "bg-primary text-white"
              : "border border-border hover:bg-gray-50"
          }`}
        >
          {i}
        </button>
      );
    }

    // Next button
    buttons.push(
      <button
        key="next"
        onClick={() => handlePageChange(page + 1)}
        disabled={page === pages}
        className="p-2 rounded-lg border border-border hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronRight size={18} />
      </button>
    );

    return buttons;
  };

  // Check if search is active
  const isSearchActive = searchParams.has("search");
  const searchTerm = searchParams.get("search");

  return (
    <div className="bg-bg-main p-4 md:p-6 flex gap-6 min-h-[calc(100vh-200px)]">
      {/* Filter Sidebar - Desktop & Mobile Drawer */}
      <FilterSidebar
        isMobileOpen={mobileFilterOpen}
        onMobileClose={() => setMobileFilterOpen(false)}
      />

      {/* Main */}
      <div className="flex-1 min-w-0">
        {/* Search indicator */}
        {isSearchActive && (
          <div className="flex items-center gap-2 mb-4 px-4 py-2 bg-blue-50 rounded-lg">
            <Search size={16} className="text-primary" />
            <span className="text-sm">
              Search results for: <strong>"{searchTerm}"</strong>
            </span>
            <button
              onClick={() => {
                const newParams = new URLSearchParams(searchParams);
                newParams.delete("search");
                setSearchParams(newParams);
              }}
              className="ml-auto text-sm text-primary hover:underline"
            >
              Clear search
            </button>
          </div>
        )}

        <SortBar
          total={pagination.total}
          onMobileFilterOpen={() => setMobileFilterOpen(true)}
        />

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-bg-card rounded-xl shadow p-3 sm:p-4 animate-pulse">
                <div className="aspect-[4/3] bg-gray-200 rounded-lg mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <Search size={48} className="text-text-muted mb-4" />
            <p className="text-text-muted mb-2">No products found</p>
            {isSearchActive && (
              <button
                onClick={() => {
                  const newParams = new URLSearchParams(searchParams);
                  newParams.delete("search");
                  setSearchParams(newParams);
                }}
                className="text-primary hover:underline text-sm"
              >
                Clear search and try again
              </button>
            )}
          </div>
        ) : (
          <>
            <ProductGrid products={formattedProducts} />

            {/* Pagination */}
            {pagination.pages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                {renderPagination()}
              </div>
            )}

            {/* Results count */}
            <p className="text-center text-sm text-text-muted mt-4">
              Showing {(pagination.page - 1) * 10 + 1} -{" "}
              {Math.min(pagination.page * 10, pagination.total)} of{" "}
              {pagination.total} products
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductPage;