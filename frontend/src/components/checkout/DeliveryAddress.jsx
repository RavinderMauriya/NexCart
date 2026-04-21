import { useNavigate } from "react-router-dom";
import { MapPin } from "lucide-react";

const DeliveryAddress = ({ addresses, selectedAddressId, onSelect }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-bg-card rounded-lg shadow-sm border overflow-hidden">
      <div className="p-4 border-b flex items-center gap-3">
        <MapPin className="text-primary" size={20} />
        <h2 className="font-bold">Delivery Address</h2>
      </div>

      <div className="p-4">
        {addresses.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-text-light mb-4">No addresses saved</p>
            <button
              onClick={() => navigate("/profile/address")}
              className="px-4 py-2 bg-primary text-white rounded-lg font-medium"
            >
              Add Address
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {addresses.map((addr) => (
              <label
                key={addr._id}
                className={`flex items-start gap-3 p-3 border rounded-lg cursor-pointer transition ${
                  selectedAddressId === addr._id ? "border-primary bg-primary/5" : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  name="address"
                  value={addr._id}
                  checked={selectedAddressId === addr._id}
                  onChange={() => onSelect(addr._id)}
                  className="mt-1"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold">{addr.fullName}</span>
                    {addr.isDefault && <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">Default</span>}
                  </div>
                  <p className="text-sm text-text-light">{addr.addressLine}, {addr.city}, {addr.state} - {addr.pincode}</p>
                  <p className="text-sm text-text-light">Phone: {addr.phone}</p>
                </div>
              </label>
            ))}
            <button
              onClick={() => navigate("/profile/address")}
              className="text-primary text-sm font-medium hover:underline"
            >
              + Add New Address
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeliveryAddress;
