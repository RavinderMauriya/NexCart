import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

export default function Topbar() {
  const { logout } = useContext(AuthContext);

  return (
    <div className="bg-bg-card border-b p-4 flex justify-between">
      <h2 className="font-semibold">Admin Panel</h2>
      <button onClick={logout} className="text-red-500">
        Logout
      </button>
    </div>
  );
}