import { useEffect, useState, useContext } from "react";
import ProfileSidebar from "../components/profile/ProfileSidebar";
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
  <div className="min-h-screen bg-bg-main px-4 md:px-6 py-8">
    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">

      {/* SIDEBAR */}
      <aside className="w-full lg:w-1/4">
        <div className="lg:sticky lg:top-6">
          <div className="bg-white rounded-xl shadow-xl p-4">
            <ProfileSidebar user={user} />
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="w-full lg:w-3/4">
        <div className="bg-white rounded-xl shadow-xl p-4 md:p-6 min-h-[500px]">
          <Outlet />
        </div>
      </main>

    </div>
  </div>
);
};

export default Profile;
