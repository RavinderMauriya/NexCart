import { createContext, useContext,useState } from "react";
import {AuthContext} from "../context/authContext"
import { apiRequest } from "../services/api";

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const {token} = useContext(AuthContext)
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  // CREATE ORDER
  const createOrder = async (orderData) => {
    try {
      setLoading(true);

      const res = await apiRequest("/orders", "POST", orderData, token);

      if (res.success) {
        return { success: true, data: res.data };
      }

    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.message || "Order creation failed",
      };
    } finally {
      setLoading(false);
    }
  };

  
  // GET MY ORDERS
  
  const fetchMyOrders = async () => {
    try {
      setLoading(true);

      const res = await apiRequest("/orders/my", "GET", null, token);

      if (res.success) {
        setOrders(res.data || []);
      }
    } catch (error) {
      console.error(
        error.response?.data?.message || "Failed to fetch orders"
      );
    } finally {
      setLoading(false);
    }
  };

  
  // CANCEL ORDER
  
  const cancelOrder = async (orderId) => {
    try {
      setLoading(true);

      const res = await apiRequest(
        "/orders/cancel",
        "POST",
        { orderId },
        token
      );

      if (res.success) {
        // update UI instantly
        setOrders((prev) =>
          prev.map((o) =>
            o._id === orderId ? { ...o, status: "cancelled" } : o
          )
        );
      }

      return res;
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.message || "Cancel failed",
      };
    } finally {
      setLoading(false);
    }
  };

  
  // RETURN ORDER
  
  const returnOrder = async (orderId) => {
    try {
      setLoading(true);

      const res = await apiRequest(
        "/orders/return",
        "POST",
        { orderId },
        token
      );

      if (res.success) {
        setOrders((prev) =>
          prev.map((o) =>
            o._id === orderId ? { ...o, status: "returned" } : o
          )
        );
      }

      return res;
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.message || "Return failed",
      };
    } finally {
      setLoading(false);
    }
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        loading,
        createOrder,
        fetchMyOrders,
        cancelOrder,
        returnOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};