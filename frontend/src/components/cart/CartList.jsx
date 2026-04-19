import { useContext } from "react";
import { CartContext } from "../../context/cartContext";
import CartItem from "./CartItem";

const CartList = () => {
  const { cart, loading } = useContext(CartContext);

  if (loading) return <p className="p-4">Loading...</p>;
  if (cart.length === 0) return <p className="p-4 text-center">Your cart is empty</p>;

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