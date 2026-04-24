import { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { CartContext } from "../context/cartContext";
import { AuthContext } from "../context/authContext";
import { apiRequest } from "../services/api";
import { ChevronLeft, Loader2 } from "lucide-react";
import DeliveryAddress from "../components/checkout/DeliveryAddress";
import PaymentMethod from "../components/checkout/PaymentMethod";
import CheckoutOrderSummary from "../components/checkout/CheckoutOrderSummary";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart, loading: cartLoading } = useContext(CartContext);
  const { token, user, loading: authLoading } = useContext(AuthContext);

  const buyNowItem = location.state?.buyNowItem;
  const checkoutItems = buyNowItem ? [buyNowItem] : cart;
  const isBuyNow = !!buyNowItem;

  const addresses = user?.address || [];
  const [selectedAddressId, setSelectedAddressId] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const totalMRP = checkoutItems.reduce((sum, item) => sum + (item.originalPrice || item.price) * item.quantity, 0);
  const totalPrice = checkoutItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = totalMRP - totalPrice;

  // set default address AFTER auth loads
  useEffect(() => {
    if (authLoading) return;
    if (addresses.length > 0 && !selectedAddressId) {
      const defaultAddr = addresses.find(a => a.isDefault) || addresses[0];
      if (defaultAddr) setSelectedAddressId(defaultAddr._id);
    }
  }, [addresses, authLoading, selectedAddressId]);

  useEffect(() => {
    if (!isBuyNow && !cartLoading && cart.length === 0) navigate("/cart");
  }, [cart, cartLoading, navigate, isBuyNow]);

  const handlePlaceOrder = async () => {
    setError("");
    setLoading(true);

    try {
      const orderPayload = { addressId: selectedAddressId, paymentMethod };
      if (isBuyNow) {
        orderPayload.items = [{
          product: buyNowItem.productId,
          productId: buyNowItem.productId,
          variantId: buyNowItem.variantId,
          quantity: buyNowItem.quantity
        }];
      }

      const orderRes = await apiRequest("/orders", "POST", orderPayload, token);

      if (!orderRes.success) {
        setError(orderRes.message || "Failed to create order");
        toast.error(orderRes.message || "Failed to create order");
        setLoading(false);
        return;
      }

      const { type, orderId, razorpayOrder, amount } = orderRes.data;

      if (type === "COD") {
        toast.success("Order placed successfully!");
        navigate("/order-success", { state: { orderId, amount, paymentMethod: "COD" } });
        return;
      }

      if (type === "ONLINE" && window.Razorpay) {
        const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;
        if (!razorpayKey) {
          setError("Payment configuration error");
          setLoading(false);
          return;
        }

        const rzp = new window.Razorpay({
          key: razorpayKey,
          amount: razorpayOrder.amount,
          currency: razorpayOrder.currency,
          name: "NexCart",
          description: `Order #${orderId}`,
          order_id: razorpayOrder.id,
          handler: async (response) => {
            const verifyRes = await apiRequest("/orders/verify", "POST", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              orderId,
            }, token);

            if (verifyRes.success) {
              toast.success("Payment successful! Order placed.");
              navigate("/order-success", {
                state: { orderId, amount, paymentMethod: "ONLINE", paymentId: response.razorpay_payment_id }
              });
            } else {
              setError("Payment verification failed");
              toast.error("Payment verification failed");
              setLoading(false);
            }
          },
          prefill: {
            name: user?.name || "",
            email: user?.email || "",
            contact: addresses.find(a => a._id === selectedAddressId)?.phone || "",
          },
          theme: { color: "#4F46E5" },
          modal: { ondismiss: () => setLoading(false) }
        });
        rzp.open();
      } else {
        setError("Payment gateway not available");
        toast.error("Payment gateway not available");
        setLoading(false);
      }
    } catch {
      setError("Something went wrong. Please try again.");
      toast.error("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  const selectedAddress = addresses.find(a => a._id === selectedAddressId);

  if (cartLoading || authLoading) return (
    <div className="min-h-screen bg-bg-main flex items-center justify-center">
      <Loader2 className="animate-spin text-primary" size={32} />
    </div>
  );

  return (
    <div className="min-h-screen bg-bg-main">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <button
          onClick={() => navigate("/cart")}
          className="flex items-center gap-2 text-text-light hover:text-primary mb-6"
        >
          <ChevronLeft size={20} />
          <span>Back to Cart</span>
        </button>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          <div className="lg:w-[65%] space-y-6">
            <DeliveryAddress
              addresses={addresses}
              selectedAddressId={selectedAddressId}
              onSelect={setSelectedAddressId}
            />
            <PaymentMethod
              selectedMethod={paymentMethod}
              onSelect={setPaymentMethod}
            />
          </div>

          <div className="lg:w-[35%]">
            <CheckoutOrderSummary
              cart={checkoutItems}
              totalMRP={totalMRP}
              totalPrice={totalPrice}
              discount={discount}
              selectedAddress={selectedAddress}
              error={error}
              loading={loading}
              onPlaceOrder={handlePlaceOrder}
              addressesCount={addresses.length}
              selectedAddressId={selectedAddressId}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
