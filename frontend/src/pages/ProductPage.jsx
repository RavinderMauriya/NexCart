import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { apiRequest } from "../services/api";
import ProductGrid from "../components/product/ProductGrid";
import FilterSidebar from "../components/product/FilterSidebar";
import SortBar from "../components/product/SortBar";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";

const LoadingSkeleton = () => (
  <div className="bg-bg-main p-4 md:p-6 min-h-[calc(100vh-200px)]">
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="bg-bg-card rounded-xl shadow p-3 sm:p-4 animate-pulse">
          <div className="aspect-[4/3] bg-gray-200 rounded-lg mb-3" />
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
          <div className="h-3 bg-gray-200 rounded w-1/2" />
        </div>
      ))}
    </div>
  </div>
);

const ProductPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState(null);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const query = searchParams.toString();
  const queryString = query ? `?${query}` : "";

  useEffect(() => {
    let ignore = false;

    apiRequest(`/products${queryString}`)
      .then((res) => {
        if (!ignore) setData(res.data);
      })
      .catch((err) => {
        console.error(err);
        if (!ignore) setData({ products: [], pagination: { total: 0, page: 1, pages: 1 } });
      });

    return () => (ignore = true);
  }, [query]);

  if (data === null) return <LoadingSkeleton />;

  const pagination = data.pagination || { total: 0, page: 1, pages: 1 };

  const products = (data.products || []).map((p) => ({
    id: p._id,
    title: p.title,
    price: p.minPrice,
    oldPrice: p.variants?.[0]?.discountPrice ? p.variants[0].price : null,
    brand: p.brand,
    rating: p.rating,
    image: p.variants?.[0]?.images?.[0] || "/placeholder.png",
  }));

  // reusable param updater
  const updateParams = (key, value) => {
    const p = new URLSearchParams(searchParams);
    value ? p.set(key, value) : p.delete(key);
    setSearchParams(p);
  };

  const handlePageChange = (newPage) => {
    updateParams("page", newPage > 1 ? newPage : null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const Pagination = () => {
    const { page, pages } = pagination;
    if (pages <= 1) return null;

    const visiblePages = Array.from({ length: pages }, (_, i) => i + 1)
      .filter((i) => Math.abs(i - page) <= 2);

    return (
      <>
        <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}
          className="p-2 rounded-lg border border-border hover:bg-gray-50 disabled:opacity-50">
          <ChevronLeft size={18} />
        </button>
        {visiblePages.map((i) => (
          <button key={i} onClick={() => handlePageChange(i)}
            className={`px-4 py-2 rounded-lg ${i === page ? "bg-primary text-white" : "border border-border"}`}>
            {i}
          </button>
        ))}
        <button onClick={() => handlePageChange(page + 1)} disabled={page === pages}
          className="p-2 rounded-lg border border-border hover:bg-gray-50 disabled:opacity-50">
          <ChevronRight size={18} />
        </button>
      </>
    );
  };

  const searchTerm = searchParams.get("search");
  const isEmpty = products.length === 0;
  const ClearSearchButton = ({ className = "" }) => (
    <button onClick={() => updateParams("search", null)}
      className={`text-primary hover:underline text-sm ${className}`}>
      Clear search
    </button>
  );

  return (
    <div className="bg-bg-main p-4 md:p-6 flex gap-6 min-h-[calc(100vh-200px)]">
      <FilterSidebar
        isMobileOpen={mobileFilterOpen}
        onMobileClose={() => setMobileFilterOpen(false)}
      />

      <div className="flex-1 min-w-0">
        {searchTerm && (
          <div className="flex items-center gap-2 mb-4 px-4 py-2 bg-blue-50 rounded-lg">
            <Search size={16} className="text-primary" />
            <span className="text-sm">Search: <strong>"{searchTerm}"</strong></span>
            <ClearSearchButton className="ml-auto" />
          </div>
        )}

        {isEmpty ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <Search size={48} className="text-text-muted mb-4" />
            <p className="text-text-muted mb-2">No products found</p>
            {searchTerm && <ClearSearchButton />}
          </div>
        ) : (
          <>
            <SortBar total={pagination.total} onMobileFilterOpen={() => setMobileFilterOpen(true)} />
            <ProductGrid products={products} />
            {pagination.pages > 1 && (
              <div className="flex justify-center gap-2 mt-8"><Pagination /></div>
            )}
            <p className="text-center text-sm text-text-muted mt-4">
              Showing {(pagination.page - 1) * 10 + 1} - {Math.min(pagination.page * 10, pagination.total)} of {pagination.total}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductPage;