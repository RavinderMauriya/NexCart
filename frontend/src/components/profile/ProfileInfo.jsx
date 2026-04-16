import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

const ProfileInfo = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <div className="flex justify-between mb-4">
        <h3 className="font-bold text-lg">Personal Information</h3>
        {/* <button className="text-blue-600 text-sm">Edit</button> */}
      </div>

      <div className="grid md:grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-gray-500 text-xs">Name</p>
          <p className="font-medium">{user?.name}</p>
        </div>

        <div>
          <p className="text-gray-500 text-xs">Email</p>
          <p className="font-medium">{user?.email}</p>
        </div>

        <div>
          <p className="text-gray-500 text-xs">Role</p>
          <p className="font-medium capitalize">{user?.role}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
