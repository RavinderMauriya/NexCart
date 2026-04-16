import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/authContext";
import { apiRequest } from "../services/api";
import Input from "../components/adminDashboard/Input";
import Button from "../components/adminDashboard/Button";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  // BASIC
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");

  const [categories, setCategories] = useState([]);

  // ATTRIBUTES
  const [attributes, setAttributes] = useState([]);
  const [attrName, setAttrName] = useState("");
  const [attrValue, setAttrValue] = useState("");

  //  VARIANTS 
  const [variants, setVariants] = useState([]);

  //  PRODUCT ID 
  const [productId, setProductId] = useState(null);

  //  FETCH CATEGORY 
  useEffect(() => {
    const fetchCategories = async () => {
      const res = await apiRequest("/category", "GET", null, token);
      if (res.success) {
        setCategories(res.data || res.categories || []);
      }
    };
    fetchCategories();
  }, []);

  //  ADD ATTRIBUTE 
  const addAttributeValue = () => {
    if (!attrName || !attrValue) return;

    const existing = attributes.find((a) => a.name.toLowerCase() === attrName.toLowerCase(),
    );

    if (existing) {
      if (!existing.values.includes(attrValue)) {
        existing.values.push(attrValue);
      }
      setAttributes([...attributes]);
    } else {
      setAttributes([...attributes, { name: attrName, values: [attrValue] }]);
    }

    setAttrValue("");
  };

  //  GENERATE VARIANTS
  const generateVariants = () => {
    if (attributes.length === 0) return alert("Add attributes first");

    let result = [{}];

    attributes.forEach((attr) => {
      const temp = [];

      result.forEach((resItem) => {
        attr.values.forEach((val) => {
          temp.push({
            ...resItem,
            [attr.name.toLowerCase()]: val,
          });
        });
      });

      result = temp;
    });

    const finalVariants = result.map((v) => ({
      attributes: v,
      price: "",
      discountPrice: "",
      stock: "",
      images: [],
    }));

    setVariants(finalVariants);
  };

  //  UPDATE VARIANT
  const updateVariant = (index, field, value) => {
    const updated = [...variants];
    updated[index][field] = value;
    setVariants(updated);
  };

  //  CREATE PRODUCT
  const handleSubmit = async () => {
    if (!title || variants.length === 0) {
      return alert("Fill required fields");
    }

    const res = await apiRequest(
      "/products",
      "POST",
      {
        title,
        description,
        brand,
        category,
        attributes,
        variants,
      },
      token,
    );

    if (res.success) {
      alert("Product Created");
      const product = res.data || res.product;
      navigate(`/admin/products/${product._id}/images`);
    }
  };
  return (
    <div className="space-y-6">
      {/*  BASIC INFO  */}
      <div className="bg-white p-4 rounded shadow space-y-3">
        <h2 className="font-semibold text-lg">Basic Info</h2>

        <Input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Input
          placeholder="Brand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />

        <select
          className="border p-2 rounded w-full"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/*  ATTRIBUTES  */}
      <div className="bg-white p-4 rounded shadow space-y-3">
        <h2 className="font-semibold text-lg">Attributes</h2>

        <Input
          placeholder="Attribute Name (Color)"
          value={attrName}
          onChange={(e) => setAttrName(e.target.value)}
        />

        <div className="flex gap-2">
          <Input
            placeholder="Value (Red)"
            value={attrValue}
            onChange={(e) => setAttrValue(e.target.value)}
          />
          <Button onClick={addAttributeValue}>Add</Button>
        </div>

        {attributes.map((attr, i) => (
          <div key={i} className="border p-2 rounded">
            <strong>{attr.name}</strong>: {attr.values.join(", ")}
          </div>
        ))}
      </div>

      {/*  GENERATE  */}
      <Button onClick={generateVariants}>Generate Variants</Button>

      {/*  VARIANTS  */}
      {variants.length > 0 && (
        <div className="bg-white p-4 rounded shadow space-y-3">
          <h2 className="font-semibold text-lg">Variants</h2>

          <div className="grid md:grid-cols-2 gap-4">
            {variants.map((v, i) => (
              <div key={i} className="border p-3 rounded space-y-2">
                <div>
                  {Object.entries(v.attributes).map(([k, val]) => (
                    <span key={k} className="mr-2 text-sm">
                      {k}: {val}
                    </span>
                  ))}
                </div>

                <Input
                  placeholder="Price"
                  value={v.price}
                  onChange={(e) => updateVariant(i, "price", e.target.value)}
                />

                <Input
                  placeholder="Discount Price"
                  value={v.discountPrice}
                  onChange={(e) =>
                    updateVariant(i, "discountPrice", e.target.value)
                  }
                />

                <Input
                  placeholder="Stock"
                  value={v.stock}
                  onChange={(e) => updateVariant(i, "stock", e.target.value)}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/*  CREATE BUTTON  */}
      {variants.length > 0 && (
        <Button onClick={handleSubmit}>Create Product & Continue to Images →</Button>
      )}
    </div>
  );
}
