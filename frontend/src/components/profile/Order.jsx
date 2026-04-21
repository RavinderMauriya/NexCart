import { useContext, useEffect } from "react";
import { OrderContext } from "../../context/orderContext";

const Order = () => {
  const { orders, fetchMyOrders, cancelOrder, returnOrder, loading } = useContext(OrderContext);

  useEffect(() => {
    fetchMyOrders();
  }, []);

  if (loading) {
    return <div className="p-5">Loading orders...</div>;
  }

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">My Orders</h1>

      {orders.length === 0 && (
        <div className="text-text-light text-sm">No orders found</div>
      )}

      {orders.map((o) => (
        <div key={o._id} className="bg-gradient-to-br from-yellow-50 to-blue-50 border rounded-xl p-4 shadow-sm">
          {/* TOP */}
          <div className="flex justify-between flex-wrap gap-3">
            <div>
              <p className="text-xs text-text-light">Order ID</p>
              <p className="font-medium text-sm">{o._id}</p>
            </div>

            <div>
              <p className="text-xs text-text-light">Amount</p>
              <p className="font-semibold">₹{o.totalAmount}</p>
            </div>

            <div>
              <p className="text-xs text-text-light">Status</p>
              <span className="text-sm font-medium text-primary">
                {o.status}
              </span>
            </div>
          </div>

          {/* CANCEL / RETURN BUTTON */}
          {["pending", "confirmed"].includes(o.status) && (
            <div className="mt-3 flex justify-end">
              <button
                onClick={() => cancelOrder(o._id)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm hover:bg-red-200 transition"
              >
                Cancel Order
              </button>
            </div>
          )}
          {o.status === "delivered" && (
            <div className="mt-3 flex justify-end">
              <button
                onClick={() => returnOrder(o._id)}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm hover:bg-orange-400 transition"
              >
                Return Order
              </button>
            </div>
          )}

          {/* ITEMS */}
          <div className="mt-4 space-y-3">
            {o.items.map((item, idx) => (
              <div key={idx} className="flex gap-3 border rounded-lg p-3 bg-gradient-to-r from-blue-50/30 to-indigo-50/30">
                <img
                  src={item.variant?.images?.[0]}
                  className="w-16 h-16 object-cover rounded"
                />

                <div className="flex-1">
                  <p className="text-sm font-medium">{item.title}</p>

                  <div className="text-xs text-text-light">
                    {Object.entries(item.variant?.attributes || {})
                      .map(([k, v]) => `${v}`)
                      .join(" | ")}
                  </div>

                  <p className="text-sm font-semibold">₹{item.price}</p>

                  <p className="text-xs text-text-light">
                    Qty: {item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Order;
