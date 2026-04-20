import { createContext, useContext, useEffect, useState } from "react";
import { apiRequest } from "../services/api";
import { AuthContext } from "./authContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { token, openModal } = useContext(AuthContext);

  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState({});

  // fetch cart - backend returns clean data
  const fetchCart = async () => {
    try {
      setLoading(true);
      const res = await apiRequest("/cart", "GET", null, token);
      // Backend already returns: { items: [{ productId, variantId, name, price, ... }] }
      setCart(res.items || []);
    } catch (err) {
      console.error("Cart fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  // add to cart
  const addToCart = async ({ productId, variantId, quantity = 1 }) => {
    if (!token) {
      openModal("login");
      return;
    }
    if (!productId || !variantId) return;
    try {
      await apiRequest("/cart/add", "POST", { productId, variantId, quantity }, token);
      fetchCart();
    } catch (err) {
      console.error("Add to cart error:", err);
    }
  };

  const updateCart = async ({ productId, variantId, quantity }) => {
    const key = `${productId}-${variantId}`;
    // optimistic update
    setCart((prev) =>
      prev.map((item) =>
        item.productId === productId && item.variantId === variantId
          ? { ...item, quantity }
          : item,
      ),
    );
    setActionLoading((prev) => ({ ...prev, [key]: true }));
    try {
      await apiRequest("/cart/update", "PUT", { productId, variantId, quantity }, token);
    } catch (err) {
      console.error("Update cart error:", err);
      fetchCart();
    } finally {
      setActionLoading((prev) => ({ ...prev, [key]: false }));
    }
  };

  const removeFromCart = async ({ productId, variantId }) => {
    const key = `${productId}-${variantId}`;
    // optimistic update
    setCart((prev) =>
      prev.filter((item) =>
        !(item.productId === productId && item.variantId === variantId)
      ),
    );
    setActionLoading((prev) => ({ ...prev, [key]: true }));
    try {
      await apiRequest("/cart", "DELETE", { productId, variantId }, token);
    } catch (err) {
      console.error("Remove error:", err);
      fetchCart(); // rollback on error
    } finally {
      setActionLoading((prev) => ({ ...prev, [key]: false }));
    }
  };

  useEffect(() => {
    if (token) fetchCart();
  }, [token]);

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        actionLoading,
        addToCart,
        updateCart,
        removeFromCart,
        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
