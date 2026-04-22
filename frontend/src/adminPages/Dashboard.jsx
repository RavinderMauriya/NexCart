import { useEffect, useState, useContext } from "react";
import Card from "../components/adminDashboard/Card";
import { apiRequest } from "../services/api";
import { AuthContext } from "../context/authContext";

export default function Dashboard() {
  const { token } = useContext(AuthContext);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0
  });

  const fetchStats = async () => {
    try {
      const res = await apiRequest("/admin/status", "GET", null, token);
      if (res.success) {
        setStats(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      <Card>Total Products: {stats.totalProducts}</Card>
      <Card>Total Orders: {stats.totalOrders}</Card>
      <Card>Total Users: {stats.totalUsers}</Card>
      {/* <Card>Revenue: ₹{stats.revenue}</Card> */}
    </div>
  );
}