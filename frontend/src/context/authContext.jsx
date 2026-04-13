import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState("login");

  const openModal = (type = "login") => {
    setMode(type);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  //auth
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const login = (data) => {
    setToken(data.token);
    localStorage.setItem("token", data.token);
    setUser(data.user);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isOpen,
        mode,
        setMode,
        openModal,
        closeModal,
        login,
        user, setUser,
        token,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
