import { useContext } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { CartContext } from "../../context/cartContext";
import CartItem from "./CartItem";

const EmptyCart = () => (
  <div className="bg-bg-card rounded-lg shadow-sm border p-8 text-center">
    <ShoppingBag size={48} className="mx-auto text-text-light mb-4" />
    <h2 className="text-lg font-semibold mb-2">Your cart is empty</h2>
    <p className="text-text-light mb-4">Looks like you haven't added anything yet</p>
    <Link
      to="/products"
      className="inline-block px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition"
    >
      Continue Shopping
    </Link>
  </div>
);

const CartList = () => {
  const { cart, loading } = useContext(CartContext);

  if (loading) {
    return (
      <div className="bg-bg-card rounded-lg shadow-sm border p-8">
        <div className="animate-pulse space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="flex gap-4">
              <div className="w-28 h-32 bg-gray-200 rounded-lg" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (cart.length === 0) return <EmptyCart />;

  return (
    <div className="bg-bg-card rounded-lg shadow-sm border overflow-hidden">
      <div className="p-4 border-b">
        <h1 className="text-lg font-bold">Cart Items ({cart.length})</h1>
      </div>
      {cart.map((item) => (
        <CartItem key={`${item.productId}-${item.variantId}`} item={item} />
      ))}
    </div>
  );
};

export default CartList;