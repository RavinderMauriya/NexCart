// src/pages/Coupons.jsx
import { useState, useContext } from "react";
import { AuthContext } from "../context/authContext";
import { apiRequest } from "../services/api";
import Input from "../components/adminDashboard/Input";
import Button from "../components/adminDashboard/Button";

export default function Coupons() {
  const { token } = useContext(AuthContext);

  const [code, setCode] = useState("");
  const [type, setType] = useState("flat");
  const [value, setValue] = useState("");
  const [minOrder, setMinOrder] = useState("");
  const [expiry, setExpiry] = useState("");

  const [coupons, setCoupons] = useState([]);

  // ================= CREATE =================
  const handleCreate = async () => {
    if (!code || !value) return alert("Required fields");

    const res = await apiRequest(
      "/coupon",
      "POST",
      {
        code,
        discountType: type,
        value: Number(value),
        minOrder: Number(minOrder),
        expiry,
        isActive: true,
      },
      token
    );

    if (res.success) {
      alert("Coupon created");

      setCode("");
      setValue("");
      setMinOrder("");
      setExpiry("");
    }
  };

  return (
    <div className="space-y-6">

      <h1 className="text-xl font-bold">Coupons</h1>

      {/* CREATE */}
      <div className="bg-white p-4 rounded shadow space-y-3">
        <h2 className="font-semibold">Create Coupon</h2>

        <Input
          placeholder="Code (FLAT100)"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />

        <select
          className="border p-2 rounded w-full"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="flat">Flat</option>
          <option value="percent">Percent</option>
        </select>

        <Input
          placeholder="Value"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        <Input
          placeholder="Min Order"
          value={minOrder}
          onChange={(e) => setMinOrder(e.target.value)}
        />

        <Input
          type="date"
          value={expiry}
          onChange={(e) => setExpiry(e.target.value)}
        />

        <Button onClick={handleCreate}>Create</Button>
      </div>

      {/* LIST (optional future) */}
      {coupons.length > 0 && (
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-3">Coupons List</h2>

          <table className="w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">Code</th>
                <th className="p-2 border">Type</th>
                <th className="p-2 border">Value</th>
                <th className="p-2 border">Min Order</th>
                <th className="p-2 border">Expiry</th>
              </tr>
            </thead>

            <tbody>
              {coupons.map((c, i) => (
                <tr key={i}>
                  <td className="p-2 border">{c.code}</td>
                  <td className="p-2 border">{c.discountType}</td>
                  <td className="p-2 border">{c.value}</td>
                  <td className="p-2 border">{c.minOrder}</td>
                  <td className="p-2 border">{c.expiry}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
}