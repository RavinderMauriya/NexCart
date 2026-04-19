import { useContext } from "react";
import { CartContext } from "../../context/cartContext";
import { Link } from "react-router-dom";

const CartItem = ({ item }) => {
  const { updateCart, removeFromCart } = useContext(CartContext);

  const { productId, variantId, name, variant, price, originalPrice, image, quantity, stock } = item;

  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;
  const maxQty = stock || 1;
  const canIncrease = quantity < maxQty;
  const canDecrease = quantity > 1;

  const handleQtyChange = (newQty) => {
    if (newQty >= 1 && newQty <= maxQty) {
      updateCart({ productId, variantId, quantity: newQty });
    }
  };

  return (
    <div className="p-4 sm:p-6 border-b hover:bg-gray-50 transition">
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
        <Link to={`/products/${productId}`} className="w-full sm:w-28 h-40 sm:h-32 flex-shrink-0">
          <img src={image} alt={name} className="w-full h-full object-contain rounded-lg bg-white" />
        </Link>

        <div className="flex-grow">
          <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
            <Link to={`/products/${productId}`}>
              <h2 className="font-semibold text-base sm:text-lg hover:text-primary">{name}</h2>
              {variant && <p className="text-sm text-text-light">{variant}</p>}
            </Link>

            <div className="text-left sm:text-right">
              <p className="text-lg font-extrabold">₹{price * quantity}</p>
              {originalPrice > price && (
                <p className="text-xs line-through text-text-muted">₹{originalPrice * quantity}</p>
              )}
              {discount > 0 && <p className="text-xs text-success font-bold">{discount}% Off</p>}
            </div>
          </div>

          {stock < 5 && stock > 0 && (
            <p className="text-xs text-orange-500 mt-1">Only {stock} left!</p>
          )}
          {stock === 0 && (
            <p className="text-xs text-red-500 mt-1">Out of stock</p>
          )}

          <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
            <div className="flex items-center border rounded-full px-2 py-1 bg-gray-100 w-fit">
              <button
                onClick={() => handleQtyChange(quantity - 1)}
                disabled={!canDecrease}
                className="px-2 disabled:opacity-40"
              >
                -
              </button>
              <span className="px-3 font-bold text-sm">{quantity}</span>
              <button
                onClick={() => handleQtyChange(quantity + 1)}
                disabled={!canIncrease}
                className="px-2 disabled:opacity-40"
              >
                +
              </button>
            </div>

            <div className="flex gap-4 sm:gap-6 text-sm font-bold uppercase">
              <button
                onClick={() => removeFromCart({ productId, variantId })}
                className="hover:text-danger"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;