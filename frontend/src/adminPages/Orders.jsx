
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/authContext";
import { apiRequest } from "../services/api";
import Button from "../components/adminDashboard/Button";

export default function Orders() {
  const { token } = useContext(AuthContext);

  const [orders, setOrders] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);

  // ================= FETCH =================
  const fetchOrders = async () => {
    const res = await apiRequest("/orders", "GET", null, token);
    if (res.success) {
      setOrders(res.data || res.orders || []);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // ================= UPDATE STATUS =================
  const updateStatus = async (id, status) => {
    const res = await apiRequest(
      `/orders/${id}/status`,
      "PUT",
      { status },
      token
    );

    if (res.success) {
      fetchOrders();
    }
  };

  return (
    <div className="space-y-4">

      <h1 className="text-xl font-bold">Orders</h1>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Order ID</th>
            <th className="p-2 border">Amount</th>
            <th className="p-2 border">Payment</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Action</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((o, i) => (
            <React.Fragment key={o._id}>

              {/* ORDER ROW */}
              <tr>
                <td className="p-2 border">{o._id}</td>
                <td className="p-2 border">₹{o.totalAmount}</td>
                <td className="p-2 border">{o.paymentStatus}</td>
                <td className="p-2 border">{o.status}</td>

                <td className="p-2 border space-x-2">
                  <Button onClick={() => setOpenIndex(openIndex === i ? null : i)}>
                    {openIndex === i ? "Hide" : "View"}
                  </Button>
                </td>
              </tr>

              {/* DETAILS */}
              {openIndex === i && (
                <tr>
                  <td colSpan="5" className="p-3 border bg-gray-50">

                    {/* ITEMS */}
                    <div className="mb-4">
                      <h3 className="font-semibold mb-2">Items</h3>

                      <div className="grid md:grid-cols-3 gap-3">
                        {o.items.map((item, idx) => (
                          <div key={idx} className="border p-2 rounded">

                            <div className="font-medium">
                              {item.title}
                            </div>

                            <div className="text-sm">
                              Qty: {item.quantity}
                            </div>

                            <div className="text-sm">
                              Price: ₹{item.price}
                            </div>

                            <div className="text-sm">
                              {Object.values(item.variant || {}).join(" - ")}
                            </div>

                          </div>
                        ))}
                      </div>
                    </div>

                    {/* ADDRESS */}
                    <div className="mb-4">
                      <h3 className="font-semibold mb-2">Address</h3>

                      <div className="text-sm">
                        {o.address?.fullName}
                      </div>
                      <div className="text-sm">
                        {o.address?.addressLine}
                      </div>
                      <div className="text-sm">
                        {o.address?.city}, {o.address?.state}
                      </div>
                      <div className="text-sm">
                        {o.address?.pincode}
                      </div>
                    </div>

                    {/* STATUS UPDATE */}
                    <div className="flex gap-2 items-center">
                      <select
                        className="border p-2 rounded"
                        value={o.status}
                        onChange={(e) => updateStatus(o._id, e.target.value)}
                      >
                        <option value="pending">pending</option>
                        <option value="confirmed">confirmed</option>
                        <option value="shipped">shipped</option>
                        <option value="delivered">delivered</option>
                        <option value="cancelled">cancelled</option>
                        <option value="returned">returned</option>
                      </select>
                    </div>

                  </td>
                </tr>
              )}

            </React.Fragment>
          ))}
        </tbody>
      </table>

    </div>
  );
}