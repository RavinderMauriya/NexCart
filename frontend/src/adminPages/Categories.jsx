import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/authContext";
import { apiRequest } from "../services/api";
import Input from "../components/adminDashboard/Input";
import Button from "../components/adminDashboard/Button";

export default function Categories() {
  const { token } = useContext(AuthContext);

  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [parent, setParent] = useState("");

  // fetch categories
  const fetchCategories = async () => {
    const res = await apiRequest("/category", "GET", null, token);
    console.log(res);
    if (res.success) {
      setCategories(res.data || res.categories || []);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // add category
  const handleAdd = async () => {
    if (!name) return alert("Name required");

    const res = await apiRequest(
      "/category",
      "POST",
      { name, parent: parent || null },
      token,
    );

    if (res.success) {
      setName("");
      setParent("");
      fetchCategories();
    }
  };

  // helper to find parent name
  const getParentName = (parent) => {
    if (!parent) return "-";

    // if populated object
    if (typeof parent === "object") {
      return parent.name;
    }

    // fallback (if id only)
    const p = categories.find((c) => c._id.toString() === parent.toString());

    return p ? p.name : "-";

  };

  //delete category btn
  const catDelete = async (id) => {
    const ok = window.confirm("Are you sure you want to delete this category?");
    if (!ok) return;

    const res = await apiRequest(`/category/${id}`, "delete", null, token);

    if (res.success) {
      fetchCategories();
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* LEFT: FORM */}
      <div className="bg-white p-4 rounded shadow space-y-4">
        <h2 className="text-lg font-semibold">Add Category</h2>

        <Input
          placeholder="Category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <select
          className="border p-2 rounded w-full"
          value={parent}
          onChange={(e) => setParent(e.target.value)}
        >
          <option value="">No Parent</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>

        <Button onClick={handleAdd}>Add Category</Button>
      </div>

      {/* RIGHT: LIST */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-4">Category List</h2>

        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Parent</th>
              <th className="p-2 border">Action</th>
              
            </tr>
          </thead>

          <tbody>
            {categories.map((cat) => (
              <tr key={cat._id}>
                <td className="p-2 border">{cat.name}</td>
                <td className="p-2 border">{getParentName(cat.parent)}</td>
                <td className="p-2 border"><button onClick={()=>catDelete(cat._id)}>Delete</button></td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
