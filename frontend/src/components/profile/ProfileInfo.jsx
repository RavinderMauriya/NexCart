
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { apiRequest } from "../../services/api";

const ProfileInfo = () => {
  const { user, loading, setUser, token } = useContext(AuthContext);

  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  // trigger file input
  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  // handle upload
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    console.log("Uploading file:", file);

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("avatar", file);

      const res = await apiRequest(
        "/user/profile/upload-avatar",
        "POST",
        formData,
        token,
        true
      );

      console.log("Upload response:", res);

      if (res.success) {
        setUser((prev) => ({
          ...prev,
          profileImage: { url: res.data.avatar },
        }));
      }
    } catch (err) {
      console.error("Upload error:", err);
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return <Card>Loading profile...</Card>;
  }

  if (!user) {
    return <Card>No user data</Card>;
  }

  return (
    <Card>
      {/* HEADER */}
      <div className="flex justify-between items-center p-6 border-b">
        <div className="flex items-center gap-4">
          {/* AVATAR */}
          <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
            {user?.profileImage?.url ? (
              <img
                src={user.profileImage.url}
                alt="avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              user?.name?.charAt(0)?.toUpperCase()
            )}
          </div>

          <div>
            <h3 className="font-semibold">{user.name}</h3>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>

        {/* BUTTON */}
        <div>
          <button
            onClick={triggerUpload}
            disabled={uploading}
            className="px-4 py-1 border rounded"
          >
            {uploading ? "Uploading..." : "Upload Avatar"}
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="hidden"
          />
        </div>
      </div>

      {/* INFO */}
      <div className="p-6 grid md:grid-cols-2 gap-4 text-sm">
        <Info label="Full Name" value={user.name} />
        <Info label="Email" value={user.email} />
        <Info label="Role" value={user.role} />
        <Info label="Status" value="Active" className="text-green-600" />
      </div>
    </Card>
  );
};

const Info = ({ label, value, className = "" }) => (
  <div>
    <p className="text-xs text-gray-400">{label}</p>
    <p className={`font-medium ${className}`}>{value || "-"}</p>
  </div>
);

const Card = ({ children }) => (
  <div className="bg-white border rounded-xl shadow">{children}</div>
);

export default ProfileInfo;

// import { useContext, useRef, useState } from "react";
// import { AuthContext } from "../../context/authContext";
// import { apiRequest } from "../../services/api";

// const useAvatarUpload = (token, setUser) => {
//   const [uploading, setUploading] = useState(false);
//   const fileInputRef = useRef(null);

//   const triggerUpload = () => fileInputRef.current?.click();

//   const handleUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     setUploading(true);
//     try {
//       const formData = new FormData();
//       formData.append("avatar", file);
//       const res = await apiRequest("/user/profile/upload-avatar", "POST", formData, token, true);
//       if (res.success) setUser((prev) => ({ ...prev, profileImage: { url: res.data.avatar } }));
//     } catch (err) {
//       console.error("Avatar upload failed:", err);
//     } finally {
//       setUploading(false);
//     }
//   };

//   return { uploading, fileInputRef, triggerUpload, handleUpload };
// };

// const Avatar = ({ user }) => (
//   <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-lg font-semibold overflow-hidden">
//     {user?.profileImage?.url ? (
//       <img src={user.profileImage.url} alt="Avatar" className="w-full h-full object-cover" />
//     ) : (
//       user?.name?.charAt(0)?.toUpperCase() || "U"
//     )}
//   </div>
// );

// const InfoItem = ({ label, value, className = "" }) => (
//   <div>
//     <p className="text-gray-400 text-xs mb-1">{label}</p>
//     <p className={`font-medium ${className}`}>{value || "-"}</p>
//   </div>
// );

// const ActionButtons = ({ uploading, triggerUpload, fileInputRef, handleUpload }) => (
//   <div className="flex items-center gap-2">
//     <button
//       onClick={triggerUpload}
//       disabled={uploading}
//       className="text-sm px-4 py-1.5 border rounded-lg hover:bg-gray-100 disabled:opacity-50"
//     >
//       {uploading ? "Uploading..." : "Upload Avatar"}
//     </button>
//     <input ref={fileInputRef} type="file" accept="image/*" onChange={handleUpload} className="hidden" />
//   </div>
// );

// const ProfileInfo = () => {
//   const { user, loading, setUser, token } = useContext(AuthContext);
//   const avatar = useAvatarUpload(token, setUser);

//   const FIELDS = [
//     { label: "Full Name", key: "name" },
//     { label: "Email Address", key: "email" },
//     { label: "Account Role", key: "role", capitalize: true },
//     { label: "Account Status", value: "Active", className: "text-green-600" },
//   ];

//   if (loading) return <Card><p className="text-sm text-gray-500">Loading profile...</p></Card>;
//   if (!user) return <Card><p className="text-sm text-gray-400">No user data available</p></Card>;

//   return (
//     <Card>
//       <div className="flex items-center justify-between p-6 border-b">
//         <div className="flex items-center gap-4">
//           <Avatar user={user} />
//           <div>
//             <h3 className="font-semibold text-lg">{user.name}</h3>
//             <p className="text-sm text-gray-500">{user.email}</p>
//           </div>
//         </div>
//         <ActionButtons {...avatar} />
//       </div>

//       <div className="p-6 grid md:grid-cols-2 gap-6 text-sm">
//         {FIELDS.map(({ label, key, value, capitalize, className }) => (
//           <InfoItem
//             key={label}
//             label={label}
//             value={value || (capitalize ? user[key]?.toLowerCase() : user[key])}
//             className={className}
//           />
//         ))}
//       </div>
//     </Card>
//   );
// };

// const Card = ({ children }) => <div className="bg-white rounded-xl shadow border">{children}</div>;

// export default ProfileInfo;
