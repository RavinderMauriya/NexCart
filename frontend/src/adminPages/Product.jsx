import React, { Fragment } from "react";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { apiRequest } from "../services/api";
import Button from "../components/adminDashboard/Button";

export default function Products() {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  const [products, setProducts] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);

  // ================= FETCH =================
  const fetchProducts = async () => {
    const res = await apiRequest("/products", "GET", null, token);
    if (res.success) {
      setProducts(res.data.products || res.products || []);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ================= DELETE =================
  const handleDelete = async (id) => {
    const confirm = window.confirm("Delete product?");
    if (!confirm) return;

    const res = await apiRequest(`/products/${id}`, "DELETE", null, token);

    if (res.success) {
      fetchProducts();
    }
  };

  // ================= PRICE RANGE =================
  const getPriceRange = (variants) => {
    const prices = variants.map((v) => Number(v.price || 0));
    return `${Math.min(...prices)} - ${Math.max(...prices)}`;
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Products</h1>

      <Button onClick={() => navigate("/admin/products/add")}>
        + Add Product
      </Button>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Title</th>
            <th className="p-2 border">Brand</th>
            <th className="p-2 border">Price Range</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p, i) => (
            <Fragment key={p._id}>
              {/* PRODUCT ROW */}
              <tr>
                <td className="p-2 border">{p.title}</td>
                <td className="p-2 border">{p.brand}</td>
                <td className="p-2 border">
                  {getPriceRange(p.variants || [])}
                </td>

                <td className="p-2 border space-x-2">
                  <Button
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  >
                    {openIndex === i ? "Hide" : "View"}
                  </Button>

                  <Button onClick={() => handleDelete(p._id)}>Delete</Button>
                </td>
              </tr>

              {/* VARIANTS ROW */}
              {openIndex === i && (
                <tr>
                  <td colSpan="4" className="p-3 border bg-gray-50">
                    <div className="grid md:grid-cols-3 gap-3">
                      {p.variants.map((v, idx) => (
                        <div key={idx} className="border p-2 rounded">
                          <div className="text-sm mb-1">
                            {Object.values(v.attributes).join(" - ")}
                          </div>

                          <div className="text-sm">Price: {v.price}</div>

                          <div className="text-sm">Stock: {v.stock}</div>

                          <div className="text-sm">
                            Images: {v.images?.length || 0}
                          </div>

                          {/* preview first image */}
                          {v.images?.[0] && (
                            <img
                              src={v.images[0]}
                              className="w-16 h-16 object-cover mt-2"
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </td>
                </tr>
              )}
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
