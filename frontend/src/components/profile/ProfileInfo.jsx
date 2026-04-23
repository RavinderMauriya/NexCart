
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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-6 border-b gap-4">
        <div className="flex items-center gap-4">
          {/* AVATAR */}
          <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center shrink-0">
            {user?.profileImage?.url ? (
              <img
                src={user.profileImage.url}
                alt="avatar"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            ) : (
              user?.name?.charAt(0)?.toUpperCase()
            )}
          </div>

          <div className="min-w-0">
            <h3 className="font-semibold truncate">{user.name}</h3>
            <p className="text-sm text-gray-500 truncate">{user.email}</p>
          </div>
        </div>

        {/* BUTTON */}
        <div className="w-full sm:w-auto">
          <button
            onClick={triggerUpload}
            disabled={uploading}
            className="w-full sm:w-auto px-4 py-2 border rounded text-sm whitespace-nowrap"
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
