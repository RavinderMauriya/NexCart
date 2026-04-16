// src/pages/Users.jsx
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/authContext";
import { apiRequest } from "../services/api";
import Button from "../components/adminDashboard/Button";

export default function Users() {
  const { token } = useContext(AuthContext);

  const [users, setUsers] = useState([]);

  // ================= FETCH =================
  const fetchUsers = async () => {
    const res = await apiRequest("/user/profile/all", "GET", null, token);
    if (res.success) {
      setUsers(res.users || res.data || []);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ================= BLOCK =================
  const toggleBlock = async (id) => {
    const res = await apiRequest(`/user/profile/block/${id}`, "PUT", null, token);

    if (res.success) {
      fetchUsers();
    }
  };

  return (
    <div className="space-y-4">

      <h1 className="text-xl font-bold">Users</h1>

      <table className="w-full border">
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
                  />
                ) : (
                  <div className="w-10 h-10 bg-gray-200 rounded-full" />
                )}
              </td>

              {/* INFO */}
              <td className="p-2 border">{u.name}</td>
              <td className="p-2 border">{u.email}</td>
              <td className="p-2 border">{u.role}</td>

              {/* STATUS */}
              <td className="p-2 border">
                {u.isBlocked ? "Blocked" : "Active"}
              </td>

              {/* ACTION */}
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
  );
}