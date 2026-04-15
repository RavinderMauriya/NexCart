import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

const ProtectedRoute = ({ children, role }) => {
  const { user, token, loading, openModal } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Agar loading khatam ho gaya aur koi token nahi hai
    if (!loading && !token) {
      navigate("/");
      openModal("login");
    }

    // Agar specific role chahiye aur user ka role match nahi hota
    if (!loading && token && role && user?.role !== role) {
      navigate("/");
    }
  }, [token, loading, user, role, navigate, openModal]);


  if (loading) {
    console.log("loading run...")
    return (
      <div className="h-screen flex justify-center items-center text-xl font-bold">
        Loading...
      </div>
    );
  }

  // Step 2: Token hai aur role sahi hai (ya role check nahi hai)
  if (token && (!role || user?.role === role)) {
    return children;
  }

  return null;
};

export default ProtectedRoute;