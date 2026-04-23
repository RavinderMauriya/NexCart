// src/pages/Users.jsx
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/authContext";
import { apiRequest } from "../services/api";
import Button from "../components/adminDashboard/Button";

export default function Users() {
  const { token } = useContext(AuthContext);

  const [users, setUsers] = useState([]);

  //  FETCH 
  const fetchUsers = async () => {
    const res = await apiRequest("/user/profile/all", "GET", null, token);
    if (res.success) {
      setUsers(res.users || res.data || []);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  //  BLOCK 
  const toggleBlock = async (id) => {
    const res = await apiRequest(`/user/profile/block/${id}`, "PUT", null, token);

    if (res.success) {
      fetchUsers();
    }
  };

  return (
    <div className="space-y-3 sm:space-y-4">

      <h1 className="text-lg sm:text-xl font-bold">Users</h1>

      {/* Mobile Card View */}
      <div className="lg:hidden space-y-3">
        {users.map((u) => (
          <div key={u._id} className="bg-white border rounded-lg p-3 flex items-center gap-3">
            {/* AVATAR */}
            {u.profileImage?.url ? (
              <img
                src={u.profileImage.url}
                className="w-12 h-12 rounded-full object-cover shrink-0"
                alt=""
                loading="lazy"
              />
            ) : (
              <div className="w-12 h-12 bg-gray-200 rounded-full shrink-0" />
            )}

            {/* INFO */}
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">{u.name}</p>
              <p className="text-xs text-gray-500 truncate">{u.email}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">{u.role}</span>
                <span className={`text-xs px-2 py-0.5 rounded ${u.isBlocked ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                  {u.isBlocked ? "Blocked" : "Active"}
                </span>
              </div>
            </div>

            {/* ACTION */}
            <Button onClick={() => toggleBlock(u._id)}>
              {u.isBlocked ? "Unblock" : "Block"}
            </Button>
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full border text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Avatar</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Role</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                {/* AVATAR */}
                <td className="p-2 border">
                  {u.profileImage?.url ? (
                    <img
                      src={u.profileImage.url}
                      className="w-10 h-10 rounded-full object-cover"
                      alt=""
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-gray-200 rounded-full" />
                  )}
                </td>
                <td className="p-2 border">{u.name}</td>
                <td className="p-2 border">{u.email}</td>
                <td className="p-2 border">{u.role}</td>
                <td className="p-2 border">
                  {u.isBlocked ? "Blocked" : "Active"}
                </td>
                <td className="p-2 border">
                  <Button onClick={() => toggleBlock(u._id)}>
                    {u.isBlocked ? "Unblock" : "Block"}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}