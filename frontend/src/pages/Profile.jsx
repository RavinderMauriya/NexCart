import { useEffect, useState, useContext } from "react";
import ProfileSidebar from "../components/profile/ProfileSidebar";
import ProfileInfo from "../components/profile/ProfileInfo";
import ProfileOrders from "../components/profile/ProfileOrders";
import { apiRequest } from "../services/api";
import { AuthContext } from "../context/authContext";
import { Outlet } from "react-router-dom";

const Profile = () => {
  const { user, token, loading: authLoading } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  const fetchOrders = async () => {
    if (!token) return;
    try {
      const res = await apiRequest("/orders/my", "GET", null, token);
      if (res.success) {
        setOrders(res.data || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingOrders(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    } else if (!authLoading) {
      setLoadingOrders(false);
    }
  }, [token, authLoading]);

  if (authLoading || loadingOrders) return <p className="p-6">Loading...</p>;

  if (!user) {
    return <p className="p-6 text-center">User not found. Please log in.</p>;
  }

  return (
    <div className="min-h-screen bg-surface px-4 md:px-6 py-10 bg-bg-main">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="w-full lg:w-1/4">
          <ProfileSidebar user={user} />
        </div>

        <div className="w-full lg:w-3/4">
          <Outlet />
        </div>
        
      </div>
    </div>
  );
};

export default Profile;
