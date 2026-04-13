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

  return (
    <AuthContext.Provider
      value={{
        isOpen,
        mode,
        setMode,
        openModal,
        closeModal
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};