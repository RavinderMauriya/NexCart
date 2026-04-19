import { createContext, useContext, useEffect, useState } from "react";
import { apiRequest } from "../services/api";
import { AuthContext } from "./authContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const { token } = useContext(AuthContext);

    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(false);
    const [actionLoading, setActionLoading] = useState({});

    // fetch cart
    const fetchCart = async () => {
        try {
            setLoading(true);
            const res = await apiRequest("/cart", "GET", null, token);
            console.log("Cart API response:", res);
            const items = res.data?.items || [];
            console.log("Cart items:", items);

            // Transform backend data to frontend format
            const transformed = items.map(item => {
                const product = item.product || {};
                const variant = product.variants?.find(v => String(v._id) === String(item.variantId)) || {};

                return {
                    productId: product._id || item.product,
                    variantId: item.variantId,
                    name: product.title || "Product",
                    variant: Object.entries(variant.attributes || {}).map(([k, v]) => `${k}: ${v}`).join(", "),
                    price: variant.discountPrice || variant.price || 0,
                    originalPrice: variant.price || 0,
                    image: variant.images?.[0] || "/placeholder.png",
                    quantity: item.quantity || 1,
                    stock: variant.stock || 0
                };
            });

            setCart(transformed);
        } catch (err) {
            console.error("Cart fetch error", err);
        } finally {
            setLoading(false);
        }
    };

    // add to cart
    const addToCart = async ({ productId, variantId, quantity = 1 }) => {
        console.log("Adding to cart:", { productId, variantId, quantity });
        if (!productId || !variantId) {
            console.error("Missing required fields:", { productId, variantId });
            return;
        }
        try {
            const res = await apiRequest(
                "/cart/add",
                "POST",
                { productId, variantId, quantity },
                token
            );
            console.log("Add to cart response:", res);
            fetchCart(); // always sync
        } catch (err) {
            console.error("Add to cart error", err);
        }
    };

    // update quantity - optimistic update with local loading
    const updateCart = async ({ productId, variantId, quantity }) => {
        const key = `${productId}-${variantId}`;
        console.log("Updating cart:", { productId, variantId, quantity });
        
        // Optimistic update
        setCart(prev => prev.map(item => 
            item.productId === productId && item.variantId === variantId
                ? { ...item, quantity }
                : item
        ));
        setActionLoading(prev => ({ ...prev, [key]: true }));
        
        try {
            await apiRequest(
                "/cart/update",
                "PUT",
                { productId, variantId, quantity },
                token
            );
        } catch (err) {
            console.error("Update cart error", err);
            fetchCart(); // Revert on error
        } finally {
            setActionLoading(prev => ({ ...prev, [key]: false }));
        }
    };

    // remove item - optimistic update with local loading
    const removeFromCart = async ({ productId, variantId }) => {
        const key = `${productId}-${variantId}`;
        
        // Optimistic update
        setCart(prev => prev.filter(item => 
            !(item.productId === productId && item.variantId === variantId)
        ));
        setActionLoading(prev => ({ ...prev, [key]: true }));
        
        try {
            await apiRequest(
                "/cart",
                "DELETE",
                { productId, variantId },
                token
            );
        } catch (err) {
            console.error("Remove error", err);
            fetchCart(); // Revert on error
        } finally {
            setActionLoading(prev => ({ ...prev, [key]: false }));
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
                fetchCart
            }}
        >
            {children}
        </CartContext.Provider>
    );
};