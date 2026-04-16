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
    <div className="bg-bg-card border-b p-4 flex justify-between">
      <h2 className="font-semibold">Admin Panel</h2>
      <button onClick={logoutHandler} className="bg-secondary font-bold px-4 py-2 rounded-xl">
        Logout
      </button>
    </div>
  );
}