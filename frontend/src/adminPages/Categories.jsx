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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
      {/* LEFT: FORM */}
      <div className="bg-white p-3 sm:p-4 rounded shadow space-y-3 sm:space-y-4">
        <h2 className="text-base sm:text-lg font-semibold">Add Category</h2>

        <Input
          placeholder="Category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <select
          className="border p-2 rounded w-full text-sm"
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
      <div className="bg-white p-3 sm:p-4 rounded shadow">
        <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Category List</h2>

        {/* Mobile Card View */}
        <div className="lg:hidden space-y-2">
          {categories.map((cat) => (
            <div key={cat._id} className="border rounded-lg p-3 flex justify-between items-center">
              <div>
                <p className="font-medium text-sm">{cat.name}</p>
                <p className="text-xs text-gray-500">Parent: {getParentName(cat.parent)}</p>
              </div>
              <button onClick={()=>catDelete(cat._id)} className="text-red-500 text-sm px-2 py-1">Delete</button>
            </div>
          ))}
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full border text-sm">
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
                  <td className="p-2 border"><button onClick={()=>catDelete(cat._id)} className="text-red-500">Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
