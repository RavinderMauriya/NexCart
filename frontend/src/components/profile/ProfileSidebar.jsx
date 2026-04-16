import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { Link } from "react-router-dom";

const ProfileSidebar = () => {
  const { logout, user } = useContext(AuthContext);
  return (
    <div className="bg-bg-card p-5 rounded-xl shadow space-y-4">
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 bg-gray-200 rounded-full" />
        <div>
          <p className="text-xs text-gray-500">Hello,</p>
          <h2 className="font-semibold">{user?.name}</h2>
        </div>
      </div>

      <div className="border-t pt-3 space-y-2 text-sm h-full flex flex-col justify-between">
        <p className="font-semibold text-blue-600">My Profile</p>
        <Link to="/profile" className="px-4 py-2 bg-bg-main cursor-pointer hover:bg-primary text-center">Profile Details</Link>
        <Link to="/profile/orders" className="px-4 py-2 bg-bg-main cursor-pointer hover:bg-primary text-center">My Orders</Link>
        <Link to="/profile/address" className="px-4 py-2 bg-bg-main cursor-pointer hover:bg-primary text-center">Addresses</Link>

        <button className="px-4 py-2 text-danger font-bold bg-bg-main cursor-pointer hover:bg-primary text-center"
          onClick={logout}>logout
        </button>
      </div>
    </div>
  );
};

export default ProfileSidebar;
