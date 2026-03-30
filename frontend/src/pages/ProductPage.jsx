import React, { useState } from "react";
import { products } from "../data/products";
import ProductGrid from "../components/product/ProductGrid";
import FilterSidebar from "../components/product/FilterSidebar";
import SortBar from "../components/product/SortBar";

const ProductPage = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-bg-main p-4 md:p-6">

      {/* Mobile Filter Button */}
      <div className="md:hidden mb-4">
        <button onClick={() => setOpen(true)} className="w-full bg-primary text-white py-2 rounded-lg">
          Filters
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 bg-black/40 z-50">
          <div className="w-64 bg-bg-main h-full p-4">
            <button onClick={() => setOpen(false)}>Close</button>
            <FilterSidebar />
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-6">

        {/* Sidebar */}
        <div className="hidden md:block">
          <FilterSidebar />
        </div>

        {/* Main */}
        <div className="flex-1">
          <SortBar />
          <ProductGrid products={products} />
        </div>

      </div>
    </div>
  );
};

export default ProductPage;