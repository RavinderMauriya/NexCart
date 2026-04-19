import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { apiRequest } from "../services/api";
import Button from "../components/adminDashboard/Button";

export default function Products() {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  const [products, setProducts] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const [loading, setLoading] = useState(false);

  //  FETCH
  const fetchProducts = async () => {
    setLoading(true);
    const res = await apiRequest("/products?limit=1000", "GET", null, token);
    if (res.success) {
      setProducts(res.data.products || res.products || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  //  DELETE 
  const handleDelete = async (id) => {
    const confirm = window.confirm("Delete this product permanently?");
    if (!confirm) return;

    const res = await apiRequest(`/products/${id}`, "DELETE", null, token);
    if (res.success) fetchProducts();
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Products</h1>

        <Button onClick={() => navigate("/admin/products/add")}>
          + Add Product
        </Button>
      </div>

      {/* LOADING */}
      {loading && (
        <div className="text-center py-10 text-gray-500">Loading products...</div>
      )}

      {/* EMPTY */}
      {!loading && products.length === 0 && (
        <div className="text-center py-10 text-gray-400">
          No products found
        </div>
      )}

      {/* LIST */}
      <div className="space-y-4">
        {products.map((p, i) => (
          <div
            key={p._id}
            className="border rounded-xl p-4 shadow-sm bg-white"
          >
            {/* TOP */}
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-lg font-semibold">{p.title}</h2>
                <p className="text-sm text-gray-500">{p.brand}</p>

                {/* PRICE (use DB fields, not calc) */}
                <p className="text-sm mt-1">
                  ₹{p.minPrice} - ₹{p.maxPrice}
                </p>
              </div>

              {/* ACTIONS */}
              <div className="flex gap-2">
                <Button
                  onClick={() =>
                    setOpenIndex(openIndex === i ? null : i)
                  }
                >
                  {openIndex === i ? "Hide" : "View"}
                </Button>

                <Button
                  onClick={() => handleDelete(p._id)}
                >
                  Delete
                </Button>
              </div>
            </div>

            {/* VARIANTS */}
            {openIndex === i && (
              <div className="mt-4 grid md:grid-cols-3 gap-4">
                {p.variants.map((v, idx) => (
                  <div
                    key={idx}
                    className="border rounded-lg p-3 bg-gray-50"
                  >
                    {/* IMAGE */}
                    {v.images?.[0] ? (
                      <img
                        src={v.images[0]}
                        className="w-full h-32 object-cover rounded mb-2"
                      />
                    ) : (
                      <div className="w-full h-32 bg-gray-200 rounded mb-2 flex items-center justify-center text-xs text-gray-500">
                        No Image
                      </div>
                    )}

                    {/* ATTRIBUTES */}
                    <div className="text-sm font-medium mb-1">
                      {Object.values(v.attributes).join(" / ")}
                    </div>

                    <div className="text-sm text-gray-600">
                      ₹{v.price}
                    </div>

                    <div className="text-sm text-gray-500">
                      Stock: {v.stock}
                    </div>

                    <div className="text-xs text-gray-400 mt-1">
                      {v.images?.length || 0} images
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
