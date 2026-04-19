import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { apiRequest } from "../../services/api";
import { useNavigate } from "react-router-dom";

const AddressBar = () => {
  const { token } = useContext(AuthContext);
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAddresses = async () => {
      if (!token) return;
      const res = await apiRequest("/user/profile/address", "GET", null, token);
      if (res.success) {
        setAddresses(res.data || []);
      }
      setLoading(false);
    };
    fetchAddresses();
  }, [token]);

  const defaultAddress = addresses.find(addr => addr.isDefault) || addresses[0];

  if (loading) {
    return (
      <div className="bg-bg-card rounded-lg p-4 flex justify-between items-center shadow-sm border">
        <p className="text-sm text-text-light">Loading address...</p>
      </div>
    );
  }

  if (!defaultAddress) {
    return (
      <div className="bg-bg-card rounded-lg p-4 flex justify-between items-center shadow-sm border">
        <div className="flex gap-3">
          <span className="text-primary">📍</span>
          <p className="text-sm text-text-light">No delivery address saved</p>
        </div>
        <button onClick={()=>navigate("/profile/address")} className="text-primary text-sm font-semibold">Add</button>
      </div>
    );
  }

  return (
    <div className="bg-bg-card rounded-lg p-4 flex justify-between items-start sm:items-center shadow-sm border">
      <div className="flex gap-3">
        <span className="text-primary">📍</span>
        <div>
          <p className="text-sm font-semibold">
            Deliver to: <span className="font-bold">{defaultAddress.fullName}, {defaultAddress.pincode}</span>
          </p>
          <p className="text-xs text-text-light">
            {defaultAddress.addressLine}, {defaultAddress.city}, {defaultAddress.state}
          </p>
        </div>
      </div>

      <button onClick={()=>navigate("/profile/address")} className="text-primary text-sm font-semibold">
        Change
      </button>
    </div>
  );
};

export default AddressBar;