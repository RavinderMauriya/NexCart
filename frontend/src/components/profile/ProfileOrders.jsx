import { useContext } from "react";
import { OrderContext } from "../../context/orderContext";

const ProfileOrders = () => {
  const { orders } = useContext(OrderContext);

  return (
    <div>
      <h3 className="font-bold text-lg mb-4">Recent Orders</h3>

      <div className="space-y-4">
        {orders.length === 0 && (
          <p className="text-gray-500">No orders found</p>
        )}

        {orders.slice(0, 3).map((order) => (
          <div
            key={order._id}
            className="bg-white p-4 rounded-xl shadow flex justify-between items-center"
          >
            <div className="flex items-center gap-3">
              {order.items[0]?.variant?.images?.[0] && (
                <img
                  src={order.items[0].variant.images[0]}
                  alt={order.items[0].title}
                  className="w-16 h-16 object-cover rounded-lg"
                  loading="lazy"
                />
              )}
              <div>
                <p className="text-xs text-gray-500">Order #{order._id.slice(-6)}</p>
                <p className="font-medium text-sm truncate max-w-[150px]">
                  {order.items[0]?.title}
                  {order.items.length > 1 && (
                    <span className="text-gray-500"> +{order.items.length - 1} more</span>
                  )}
                </p>
                <p className="text-xs text-gray-500">{new Date(order.createdAt).toDateString()}</p>
              </div>
            </div>

            <div className="text-right">
              <p className="font-bold">₹{order.totalAmount}</p>
              <span className="text-xs text-green-600 uppercase">{order.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileOrders;
