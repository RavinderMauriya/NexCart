import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";

export default function Topbar()  {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const logoutHandler = async () => {
    await logout();
    navigate("/");
  };
  return (
    <div className="bg-bg-card border-b p-3 sm:p-4 flex justify-between items-center">
      <h2 className="font-bold text-sm sm:text-base">Admin Panel</h2>
      <button onClick={logoutHandler} className="text-danger font-bold px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-sm">
        Logout
      </button>
    </div>
  );
}