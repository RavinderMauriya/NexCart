// src/pages/ProductImages.jsx
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { apiRequest } from "../services/api";

export default function ProductImages() {
  const { token } = useContext(AuthContext);
  const { id } = useParams(); // productId

  const [product, setProduct] = useState(null);

  // ================= FETCH PRODUCT =================
  const fetchProduct = async () => {
    const res = await apiRequest(`/products/${id}`, "GET", null, token);
    if (res.success) {
      setProduct(res.data || res.product);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  // ================= UPLOAD =================
  const uploadImages = async (e, variantId) => {
    const files = e.target.files;

    if (!files.length) return;

    const formData = new FormData();
    formData.append("productId", id);
    formData.append("variantId", variantId);

    for (let file of files) {
      formData.append("images", file);
    }

    const data = await apiRequest("/products/upload", "POST", formData, token);

    if (data.success) {
      fetchProduct(); // refresh to show images
    }
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="space-y-6">

      <h1 className="text-xl font-bold">
        Upload Images - {product.title}
      </h1>

      {/* VARIANTS */}
      <div className="grid md:grid-cols-3 gap-4">
        {product.variants.map((v) => (
          <div key={v._id} className="border p-3 rounded space-y-2">

            {/* ATTRIBUTES */}
            <div className="text-sm">
              {Object.entries(v.attributes).map(([k, val]) => (
                <span key={k} className="mr-2">
                  {k}: {val}
                </span>
              ))}
            </div>

            {/* PRICE */}
            <div className="text-sm">Price: {v.price}</div>

            {/* UPLOAD */}
            <input
              type="file"
              multiple
              onChange={(e) => uploadImages(e, v._id)}
            />

            {/* PREVIEW */}
            <div className="flex gap-2 flex-wrap">
              {v.images?.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  className="w-16 h-16 object-cover rounded"
                />
              ))}
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}