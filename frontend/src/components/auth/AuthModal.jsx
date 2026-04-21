import { useContext, useEffect, useRef, useCallback } from "react";
import { AuthContext } from "../../context/authContext";
import { X } from "lucide-react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function AuthModal() {
  const { isOpen, closeModal, mode, setMode } = useContext(AuthContext);
  const modalRef = useRef(null);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") closeModal();
    },
    [closeModal]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal();
      }}
    >
      <div
        ref={modalRef}
        className="bg-bg-card w-full max-w-md mx-4 rounded-2xl shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-200"
      >
        {/* header */}
        <div className="px-6 pt-6 pb-2 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-text-dark">
            {mode === "login" ? "Welcome back" : "Create account"}
          </h2>
          <button
            onClick={closeModal}
            className="p-1.5 rounded-full hover:bg-bg-main text-text-muted hover:text-text-dark transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* tabs */}
        <div className="px-6 flex gap-6 border-b border-border">
          <button
            onClick={() => setMode("login")}
            className={`pb-3 text-sm font-semibold transition-colors relative ${
              mode === "login"
                ? "text-primary"
                : "text-text-muted hover:text-text-light"
            }`}
          >
            Login
            {mode === "login" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
            )}
          </button>
          <button
            onClick={() => setMode("register")}
            className={`pb-3 text-sm font-semibold transition-colors relative ${
              mode === "register"
                ? "text-primary"
                : "text-text-muted hover:text-text-light"
            }`}
          >
            Register
            {mode === "register" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
            )}
          </button>
        </div>

        {/* forms */}
        <div className="px-6 py-6">
          {mode === "login" ? <LoginForm /> : <RegisterForm />}
        </div>
      </div>
    </div>
  );
}
