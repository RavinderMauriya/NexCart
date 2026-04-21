import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/authContext";
import { apiRequest } from "../services/api";

const statusStyles = {
  pending: "bg-yellow-100 text-yellow-700",
  confirmed: "bg-blue-100 text-blue-700",
  shipped: "bg-purple-100 text-purple-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
  returned: "bg-gray-200 text-gray-700",
};

export default function Orders() {
  const { token } = useContext(AuthContext);

  const [orders, setOrders] = useState([]);
  const [openOrderId, setOpenOrderId] = useState(null);

  const fetchOrders = async () => {
    const res = await apiRequest("/orders", "GET", null, token);
    if (res.success) {
      setOrders(res.data || []);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id, status) => {
    const res = await apiRequest(
      `/orders/${id}/status`,
      "PUT",
      { status },
      token,
    );

    if (res.success) fetchOrders();
  };

  return (
    <div className="space-y-3 sm:space-y-4">
      <h1 className="text-xl sm:text-2xl font-bold">Orders</h1>

      {orders.map((o, i) => (
        <div key={o._id} className="bg-bg-card border rounded-xl shadow-sm p-3 sm:p-4">
          {/* TOP SECTION */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-3">
            <div className="min-w-0">
              <div className="font-semibold text-xs sm:text-sm text-text-light">
                Order ID
              </div>
              <div className="font-medium text-sm truncate max-w-[150px] sm:max-w-[200px]">{o._id}</div>
            </div>

            <div>
              <div className="text-xs sm:text-sm text-text-light">Amount</div>
              <div className="font-semibold text-sm">₹{o.totalAmount}</div>
            </div>

            <div>
              <div className="text-xs sm:text-sm text-text-light">Payment</div>
              <div className="font-medium text-sm">{o.paymentStatus}</div>
            </div>

            {/* STATUS BADGE */}
            <div
              className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${
                statusStyles[o.status]
              }`}
            >
              {o.status}
            </div>

            {/* STATUS UPDATE */}
            <select
              className="border p-1.5 sm:p-2 rounded bg-bg-card text-sm"
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

            <button
              onClick={() =>
                setOpenOrderId(openOrderId === o._id ? null : o._id)
              }
              className="text-primary text-xs sm:text-sm"
            >
              {openOrderId === o._id ? "Hide" : "View"}
            </button>
          </div>

          {/* EXPANDED */}
          {openOrderId === o._id && (
            <div className="mt-4 border-t pt-4 space-y-4">
              {/* ITEMS */}
              <div>
                <h3 className="font-semibold mb-2">Items</h3>
                <div className="grid gap-3">
                  {o.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex gap-4 border rounded-xl p-3 hover:shadow-sm transition"
                    >
                      {/* IMAGE */}
                      <div className="w-20 h-20 shrink-0">
                        <img
                          src={item.variant?.images?.[0]}
                          alt={item.title}
                          className="w-full h-full object-cover rounded-lg border"
                        />
                      </div>

                      {/* CONTENT */}
                      <div className="flex-1 space-y-1">
                        {/* TITLE */}
                        <div className="font-medium text-sm line-clamp-2">
                          {item.title}
                        </div>

                        {/* VARIANT CHIPS */}
                        <div className="flex flex-wrap gap-2 text-xs">
                          {item.variant?.attributes &&
                            Object.entries(item.variant.attributes).map(
                              ([key, val]) => (
                                <span
                                  key={key}
                                  className="px-2 py-0.5 bg-gray-100 border rounded-md text-text-dark"
                                >
                                  {val}
                                </span>
                              ),
                            )}
                        </div>

                        {/* SKU */}
                        {item.variant?.sku && (
                          <div className="text-xs text-text-muted break-all">
                            SKU: {item.variant.sku}
                          </div>
                        )}

                        {/* PRICE */}
                        <div className="flex items-center gap-2 text-sm">
                          {/* original price */}
                          {item.variant?.price &&
                            item.variant.price > item.price && (
                              <span className="line-through text-text-muted">
                                ₹{item.variant.price}
                              </span>
                            )}

                          {/* final price */}
                          <span className="font-semibold text-text-dark">
                            ₹{item.price}
                          </span>

                          {/* discount badge */}
                          {item.variant?.price &&
                            item.variant.price > item.price && (
                              <span className="text-success text-xs font-medium">
                                {Math.round(
                                  ((item.variant.price - item.price) /
                                    item.variant.price) *
                                    100,
                                )}
                                % off
                              </span>
                            )}
                        </div>

                        {/* QUANTITY */}
                        <div className="text-xs text-text-muted">
                          Qty: {item.quantity}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ADDRESS */}
              <div>
                <h3 className="font-semibold mb-2">Address</h3>
                <div className="text-sm text-text-dark">
                  {o.address?.fullName}
                </div>
                <div className="text-sm text-text-muted">
                  {o.address?.addressLine}
                </div>
                <div className="text-sm text-text-muted">
                  {o.address?.city}, {o.address?.state}
                </div>
                <div className="text-sm text-text-muted">
                  {o.address?.pincode}
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
