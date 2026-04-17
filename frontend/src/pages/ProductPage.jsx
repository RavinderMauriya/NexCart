// import React, { useState } from "react";
// import { products } from "../data/products";
// import ProductGrid from "../components/product/ProductGrid";
// import FilterSidebar from "../components/product/FilterSidebar";
// import SortBar from "../components/product/SortBar";

// const ProductPage = () => {
//   const [open, setOpen] = useState(false);
  
//   return (
//     <div className="bg-bg-main p-4 md:p-6">

//       {/* Mobile Filter Button */}
//       <div className="md:hidden mb-4">
//         <button onClick={() => setOpen(true)} className="w-full bg-primary text-white py-2 rounded-lg">
//           Filters
//         </button>
//       </div>

//       {open && (
//         <div className="fixed inset-0 bg-black/40 z-50">
//           <div className="w-64 bg-bg-main h-full p-4">
//             <button onClick={() => setOpen(false)}>Close</button>
//             <FilterSidebar />
//           </div>
//         </div>
//       )}

//       <div className="flex flex-col md:flex-row gap-6">

//         {/* Sidebar */}
//         <div className="hidden md:block">
//           <FilterSidebar />
//         </div>

//         {/* Main */}
//         <div className="flex-1">
//           <SortBar />
//           <ProductGrid products={products} />
//         </div>

//       </div>
//     </div>
//   );
// };

// export default ProductPage;



import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { apiRequest } from "../services/api";
import ProductGrid from "../components/product/ProductGrid";
import FilterSidebar from "../components/product/FilterSidebar";
import SortBar from "../components/product/SortBar";

const ProductPage = () => {
  const location = useLocation();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ simple way to get category
  const query = location.search; 
  // example: "?category=123"

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      try {
        const res = await apiRequest(`/products${query}`);

        if (res.success) {
         setProducts(res.data?.products || []);
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
    price: p.minPrice,
    image: p.variants?.[0]?.images?.[0] || "/placeholder.png",
  }));

  if (loading) return <p className="p-6">Loading...</p>;

  if (products.length === 0)
    return <p className="p-6">No products found</p>;

  return (
    <div className="bg-bg-main p-4 md:p-6 flex gap-6">

      {/* Sidebar */}
      <div className="hidden md:block">
        <FilterSidebar />
      </div>

      {/* Main */}
      <div className="flex-1">
        <SortBar />
        <ProductGrid products={formattedProducts} />
      </div>

    </div>
  );
};

export default ProductPage;