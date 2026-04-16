const ProfileOrders = ({ orders = [] }) => {
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
            <div>
              <p className="text-xs text-gray-500">
                Order #{order._id.slice(-6)}
              </p>
              <p className="font-semibold capitalize">{order.status}</p>
              <p className="text-xs text-gray-500">
                {new Date(order.createdAt).toDateString()}
              </p>
            </div>

            <div className="text-right">
              <p className="font-bold">₹{order.totalAmount}</p>
              <span className="text-xs text-green-600 uppercase">
                {order.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileOrders;
