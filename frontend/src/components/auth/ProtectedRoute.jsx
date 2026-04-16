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



// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../../context/authContext";

// const ProtectedRoute = ({ children, role }) => {
//   const { user, token, loading, openModal } = useContext(AuthContext);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!loading && !token) {
//       navigate("/");
//       openModal("login");
//     }

//     if (!loading && token && role && user?.role !== role) {
//       navigate("/");
//     }
//   }, [token, loading, user, role, navigate, openModal]);


//   if (loading) {
//     console.log("loading run...")
//     return (
//       <div className="h-screen flex justify-center items-center text-xl font-bold">
//         Loading...
//       </div>
//     );
//   }

//   if (token && (!role || user?.role === role)) {
//     return children;
//   }

//   return null;
// };

// export default ProtectedRoute;


