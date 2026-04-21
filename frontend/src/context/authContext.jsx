import { createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { apiRequest } from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  //ui model state
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState("login");

  const openModal = (type = "login") => {
    setMode(type);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  // CORE
  const saveToken = (newToken) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  };

  const logout = async () => {
    const res = await apiRequest("/auth/logout", "GET", null, token);
    if(res.success){
      setUser(null);
      setToken(null);
      localStorage.removeItem("token");
      closeModal();
      toast.success("Logged out successfully");
    }
  };

  const fetchProfile = async (authToken) => {
    const res = await apiRequest("/user/profile/me", "GET", null, authToken);
    if (res.success) {
      setUser(res.data || res.user);
      return true;
    }
    return false;
  };

  const refreshToken = async () => {
    const res = await apiRequest("/auth/refresh", "POST");
    const receivedToken = res.token || res.accessToken;
    if (res.success && receivedToken) {
      saveToken(receivedToken);
      return receivedToken;
    }
    return null;
  };

  // APP START

  useEffect(() => {
    const init = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      // try profile
      let ok = await fetchProfile(token);

      // if failed → try refresh
      if (!ok) {
        const newToken = await refreshToken();

        if (newToken) {
          ok = await fetchProfile(newToken);
        }
      }

      if (!ok) logout();

      setLoading(false);
    };

    init();
  }, []);

  // LOGIN

  const login = async (data) => {
    const res = await apiRequest("/auth/login", "POST", data);

    if (!res.success) throw new Error(res.message);

    const obtainedToken = res.token || res.accessToken;
    saveToken(obtainedToken);

    const ok = await fetchProfile(obtainedToken);

    if (!ok) logout();
  };

  // REGISTER

  const register = async (data) => {
    const res = await apiRequest("/auth/register", "POST", data);

    if (!res.success) throw new Error(res.message);

    return res;
  };

  // CONTEXT

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        register,
        logout,
        setUser,
        
        //ui model state
        isOpen,
        mode,
        setMode,
        openModal,
        closeModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
