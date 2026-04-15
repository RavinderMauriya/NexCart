import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function AuthModal() {
  const { isOpen, closeModal, mode, setMode } = useContext(AuthContext);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-bg-card w-full max-w-md p-6 rounded-xl relative">
        <button onClick={closeModal} className="absolute right-3 top-3 font-extrabold text-lg text-text-dark hover:text-danger">
          ✕
        </button>

        <h2 className="text-xl font-semibold text-center mb-4">
          {mode === "login" ? "Login" : "Register"}
        </h2>

        {/* forms */}
        {mode === "login" ? <LoginForm /> : <RegisterForm />}

        <p className="text-center text-sm mt-4">
          {mode === "login" ? "Don't have account?" : "Already have account?"}

          <span
            onClick={() => setMode(mode === "login" ? "register" : "login")}
            className="text-blue-600 font-bold ml-1 cursor-pointer"
          >
            {mode === "login" ? "Register" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
}
