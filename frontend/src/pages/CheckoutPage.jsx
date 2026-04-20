import { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
  const { cart, loading: cartLoading, fetchCart } = useContext(CartContext);
  
  // Check for Buy Now item from navigation state
  const buyNowItem = location.state?.buyNowItem;
  const { token, user } = useContext(AuthContext);

  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Determine items to use (Buy Now takes priority over cart)
  const checkoutItems = buyNowItem ? [buyNowItem] : cart;
  const isBuyNow = !!buyNowItem;

  // Calculate totals
  const totalMRP = checkoutItems.reduce((sum, item) => sum + (item.originalPrice || item.price) * item.quantity, 0);
  const totalPrice = checkoutItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = totalMRP - totalPrice;

  // Fetch addresses on load
  useEffect(() => {
    const loadAddresses = async () => {
      const res = await apiRequest("/user/profile/address", "GET", null, token);
      if (res.success && res.data) {
        setAddresses(res.data);
        const defaultAddr = res.data.find(a => a.isDefault) || res.data[0];
        if (defaultAddr) {
          setSelectedAddressId(defaultAddr._id);
        }
      }
    };
    loadAddresses();
  }, [token]);

  // Redirect if cart is empty (skip if Buy Now)
  useEffect(() => {
    if (!isBuyNow && !cartLoading && cart.length === 0) {
      navigate("/cart");
    }
  }, [cart, cartLoading, navigate, isBuyNow]);

  const handlePlaceOrder = async () => {
    setError("");
    setLoading(true);

    try {
      // Step 1: Create order
      const orderPayload = {
        addressId: selectedAddressId,
        paymentMethod: paymentMethod,
      };
      
      // If Buy Now, send item directly (backend supports this)
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
        setLoading(false);
        return;
      }

      const { type, orderId, razorpayOrder, amount } = orderRes.data;

      // Step 2: Handle COD
      if (type === "COD") {
        navigate("/order-success", {
          state: { orderId, amount, paymentMethod: "COD" }
        });
        return;
      }

      // Step 3: Handle Online Payment (Razorpay)
      if (type === "ONLINE" && window.Razorpay) {
        const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;

        if (!razorpayKey) {
          console.error("Razorpay Key missing. Please set VITE_RAZORPAY_KEY_ID in .env");
          setError("Payment configuration error. Please contact support.");
          setLoading(false);
          return;
        }

        const options = {
          key: razorpayKey,
          amount: razorpayOrder.amount,
          currency: razorpayOrder.currency,
          name: "NexCart",
          description: `Order #${orderId}`,
          order_id: razorpayOrder.id,
          handler: async function (response) {
            // Step 4: Verify payment
            const verifyRes = await apiRequest("/orders/verify", "POST", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              orderId: orderId,
            }, token);

            if (verifyRes.success) {
              navigate("/order-success", {
                state: {
                  orderId,
                  amount,
                  paymentMethod: "ONLINE",
                  paymentId: response.razorpay_payment_id
                }
              });
            } else {
              setError("Payment verification failed. Please contact support.");
              setLoading(false);
            }
          },
          prefill: {
            name: user?.name || "",
            email: user?.email || "",
            contact: addresses.find(a => a._id === selectedAddressId)?.phone || "",
          },
          theme: {
            color: "#4F46E5",
          },
          modal: {
            ondismiss: function() {
              setLoading(false);
            }
          }
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        setError("Payment gateway not available");
        setLoading(false);
      }
    } catch (err) {
      console.error("Order error:", err);
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  const selectedAddress = addresses.find(a => a._id === selectedAddressId);

  if (cartLoading) {
    return (
      <div className="min-h-screen bg-bg-main flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-main">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Header */}
        <button
          onClick={() => navigate("/cart")}
          className="flex items-center gap-2 text-text-light hover:text-primary mb-6"
        >
          <ChevronLeft size={20} />
          <span>Back to Cart</span>
        </button>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* LEFT - Address & Payment */}
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

          {/* RIGHT - Order Summary */}
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
