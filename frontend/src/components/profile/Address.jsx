import { useState, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { apiRequest } from "../../services/api";

const Address = () => {
  const { token, user, refreshUser } = useContext(AuthContext);

  const addresses = user?.address || [];
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    addressLine: "",
    city: "",
    state: "",
    pincode: "",
  });

  //  HANDLE CHANGE 
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  //  ADD ADDRESS 
  const addAddress = async () => {
    const res = await apiRequest(
      "/user/profile/address",
      "POST",
      form,
      token
    );

    if (res.success) {
      await refreshUser();
      setForm({
        fullName: "",
        phone: "",
        addressLine: "",
        city: "",
        state: "",
        pincode: "",
      });
    }
  };

  //  DELETE 
  const deleteAddress = async (id) => {
    const res = await apiRequest(
      `/user/profile/address/${id}`,
      "DELETE",
      null,
      token
    );

    if (res.success) await refreshUser();
  };

  //  SET DEFAULT 
  const setDefaultAddress = async (id) => {
    const res = await apiRequest(
      `/user/profile/address/${id}`,
      "PUT",
      { isDefault: true },
      token
    );

    if (res.success) await refreshUser();
  };

  return (
    <div className="space-y-5">

      <h1 className="text-xl font-semibold">My Addresses</h1>

      {/* FORM */}
      <div className="bg-white p-4 border rounded-xl space-y-3">

        <input name="fullName" value={form.fullName} onChange={handleChange} placeholder="Full Name" className="border p-2 w-full rounded" />
        <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" className="border p-2 w-full rounded" />
        <input name="addressLine" value={form.addressLine} onChange={handleChange} placeholder="Address" className="border p-2 w-full rounded" />

        <div className="grid grid-cols-2 gap-2">
          <input name="city" value={form.city} onChange={handleChange} placeholder="City" className="border p-2 rounded" />
          <input name="state" value={form.state} onChange={handleChange} placeholder="State" className="border p-2 rounded" />
        </div>

        <input name="pincode" value={form.pincode} onChange={handleChange} placeholder="Pincode" className="border p-2 w-full rounded" />

        <button
          onClick={addAddress}
          className="bg-primary text-white px-4 py-2 rounded"
        >
          Add Address
        </button>
      </div>

      {/* LIST */}
      {addresses.map((addr, i) => (
        <div
          key={addr._id || i}
          className={`bg-white border p-4 rounded-xl flex justify-between items-start ${addr.isDefault ? 'border-primary border-2' : ''}`}
        >
          <div className="text-sm">
            <div className="flex items-center gap-2">
              <p className="font-medium">
                {addr.fullName} ({addr.phone})
              </p>
              {addr.isDefault && (
                <span className="bg-primary text-white text-xs px-2 py-0.5 rounded">Default</span>
              )}
            </div>
            <p>{addr.addressLine}</p>
            <p>
              {addr.city}, {addr.state} - {addr.pincode}
            </p>
          </div>

          <div className="flex flex-col gap-2 items-end">
            {!addr.isDefault && (
              <button
                onClick={() => setDefaultAddress(addr._id)}
                className="text-primary text-sm font-semibold"
              >
                Set as Default
              </button>
            )}
            <button
              onClick={() => deleteAddress(addr._id)}
              className="text-red-500 text-sm"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Address;