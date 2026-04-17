// import { useContext } from "react";
// import { AuthContext } from "../../context/authContext";

// const ProfileInfo = () => {
//   const { user } = useContext(AuthContext);
//   return (
//     <div className="bg-white p-6 rounded-xl shadow border">
//       <div className="flex justify-between mb-4">
//         <h3 className="font-bold text-lg">Personal Information</h3>
//       </div>

//       <div className="grid md:grid-cols-2 gap-4 text-sm">
//         <div>
//           <p className="text-gray-500 text-xs">Name</p>
//           <p className="font-medium">{user?.name}</p>
//         </div>

//         <div>
//           <p className="text-gray-500 text-xs">Email</p>
//           <p className="font-medium">{user?.email}</p>
//         </div>

//         <div>
//           <p className="text-gray-500 text-xs">Role</p>
//           <p className="font-medium capitalize">{user?.role}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfileInfo;

import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

const ProfileInfo = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-xl shadow border">
        <p className="text-sm text-gray-500">Loading profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="bg-white p-6 rounded-xl shadow border">
        <p className="text-sm text-gray-400">No user data available</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow border">
      {/* HEADER */}
      <div className="flex items-center justify-between p-6 border-b">
        <div className="flex items-center gap-4">
          {/* AVATAR */}
          <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-lg font-semibold">
            {user.name?.charAt(0)?.toUpperCase() || "U"}
          </div>

          <div>
            <h3 className="font-semibold text-lg">{user.name}</h3>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>

        <button className="text-sm px-4 py-1.5 border rounded-lg hover:bg-gray-100">
          Edit
        </button>
      </div>

      {/* INFO */}
      <div className="p-6 grid md:grid-cols-2 gap-6 text-sm">
        <div>
          <p className="text-gray-400 text-xs mb-1">Full Name</p>
          <p className="font-medium">{user.name || "-"}</p>
        </div>

        <div>
          <p className="text-gray-400 text-xs mb-1">Email Address</p>
          <p className="font-medium">{user.email || "-"}</p>
        </div>

        <div>
          <p className="text-gray-400 text-xs mb-1">Account Role</p>
          <p className="font-medium capitalize">{user.role || "-"}</p>
        </div>

        <div>
          <p className="text-gray-400 text-xs mb-1">Account Status</p>
          <p className="font-medium text-green-600">Active</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
