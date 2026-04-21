import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { apiRequest } from "../services/api";
import { AuthContext } from "./authContext";

export const CartContext = createContext();

// Helper to check if error is auth related
const isAuthError = (res) => {
  return !res.success && (res.message?.includes("token") || res.message?.includes("unauthorized") || res.message?.includes("auth"));
};

export const CartProvider = ({ children }) => {
  const { token, openModal, refreshToken, logout } = useContext(AuthContext);

  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState({});

  // fetch cart - backend returns clean data
  const fetchCart = async () => {
    try {
      setLoading(true);
      const res = await apiRequest("/cart", "GET", null, token);

      // Handle token expiration
      if (isAuthError(res)) {
        const newToken = await refreshToken();
        if (newToken) {
          const retryRes = await apiRequest("/cart", "GET", null, newToken);
          setCart(retryRes.items || []);
        } else {
          logout();
          openModal("login");
        }
        return;
      }

      setCart(res.items || []);
    } catch (err) {
      console.error("Cart fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  // add to cart with token refresh support
  const addToCart = async ({ productId, variantId, quantity = 1 }) => {
    if (!token) {
      openModal("login");
      return;
    }
    if (!productId || !variantId) return;

    try {
      const res = await apiRequest("/cart/add", "POST", { productId, variantId, quantity }, token);

      // Handle token expiration
      if (isAuthError(res)) {
        const newToken = await refreshToken();
        if (newToken) {
          await apiRequest("/cart/add", "POST", { productId, variantId, quantity }, newToken);
          fetchCart();
        } else {
          logout();
          openModal("login");
        }
        return;
      }

      if (res.success) {
        fetchCart();
      } else {
        toast.error(res.message || "Failed to add item");
      }
    } catch (err) {
      console.error("Add to cart error:", err);
      toast.error("Something went wrong");
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
      const res = await apiRequest("/cart/update", "PUT", { productId, variantId, quantity }, token);

      // Handle token expiration
      if (isAuthError(res)) {
        const newToken = await refreshToken();
        if (newToken) {
          await apiRequest("/cart/update", "PUT", { productId, variantId, quantity }, newToken);
        } else {
          logout();
          openModal("login");
        }
        return;
      }

      if (!res.success) {
        fetchCart();
        toast.error(res.message || "Failed to update quantity");
      }
    } catch (err) {
      console.error("Update cart error:", err);
      fetchCart();
      toast.error("Something went wrong");
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
      const res = await apiRequest("/cart", "DELETE", { productId, variantId }, token);

      // Handle token expiration
      if (isAuthError(res)) {
        const newToken = await refreshToken();
        if (newToken) {
          await apiRequest("/cart", "DELETE", { productId, variantId }, newToken);
        } else {
          logout();
          openModal("login");
        }
        return;
      }

      if (res.success) {
        toast.success("Removed from cart");
      } else {
        fetchCart();
        toast.error(res.message || "Failed to remove item");
      }
    } catch (err) {
      console.error("Remove error:", err);
      fetchCart();
      toast.error("Something went wrong");
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
