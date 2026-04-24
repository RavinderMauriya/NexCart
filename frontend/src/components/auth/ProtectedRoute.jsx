import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

const ProtectedRoute = ({ children, role }) => {
  const { user, loading, openModal } = useContext(AuthContext);

  useEffect(() => {
    if (!loading && !user) {
      openModal("login");
    }
  }, [loading, user, openModal]);

  // Wait for auth check
  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center text-xl font-bold">
        Loading...
      </div>
    );
  }

  // Not logged in
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Role check (for admin etc.)
  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  // Allowed
  return children;
};

export default ProtectedRoute;
