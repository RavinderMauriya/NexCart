import { useEffect, useContext } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { CheckCircle, ShoppingBag, Home, FileText } from "lucide-react";
import { CartContext } from "../context/cartContext";

const OrderSuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { fetchCart } = useContext(CartContext);

  const { orderId, amount, paymentMethod, paymentId } = location.state || {};

  // Refresh cart (should be cleared after order)
  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  // Redirect if no order data
  useEffect(() => {
    if (!orderId) {
      navigate("/");
    }
  }, [orderId, navigate]);

  if (!orderId) {
    return null;
  }

  return (
    <div className="min-h-screen bg-bg-main py-12">
      <div className="max-w-lg mx-auto px-4">
        <div className="bg-bg-card rounded-lg shadow-sm border p-8 text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-green-600" />
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold mb-2">Order Placed!</h1>
          <p className="text-text-light mb-6">
            Thank you for shopping with us. Your order has been confirmed.
          </p>

          {/* Order Details */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-text-light">Order ID</span>
                <span className="font-medium">#{orderId?.slice(-8).toUpperCase()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-light">Amount Paid</span>
                <span className="font-bold">₹{amount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-light">Payment Method</span>
                <span className="font-medium">
                  {paymentMethod === "COD" ? "Cash on Delivery" : "Online Payment"}
                </span>
              </div>
              {paymentId && (
                <div className="flex justify-between">
                  <span className="text-text-light">Payment ID</span>
                  <span className="font-medium text-xs">{paymentId}</span>
                </div>
              )}
            </div>
          </div>

          {/* Delivery Message */}
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-700">
              {paymentMethod === "COD" 
                ? "Please keep cash ready for delivery."
                : "Your payment has been received successfully."}
            </p>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <Link
              to="/profile/orders"
              className="w-full py-3 bg-primary text-white font-semibold rounded-lg flex items-center justify-center gap-2 hover:bg-primary-dark transition"
            >
              <FileText size={18} />
              View My Orders
            </Link>

            <Link
              to="/products"
              className="w-full py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition"
            >
              <ShoppingBag size={18} />
              Continue Shopping
            </Link>

            <Link
              to="/"
              className="w-full py-3 text-text-light font-medium flex items-center justify-center gap-2 hover:text-primary transition"
            >
              <Home size={18} />
              Go to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
