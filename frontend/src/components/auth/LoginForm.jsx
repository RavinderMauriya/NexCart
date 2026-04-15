import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

export default function LoginForm() {
  const [data, setData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { loginHandler, closeModal } = useContext(AuthContext)

  //api call
  const login = async (e)=>{
    e.preventDefault();
    await loginHandler(data);
    closeModal();
  }

  return (
    <form className="space-y-3" onSubmit={login}>
      <input
        type="email"
        placeholder="Email"
        className="w-full border rounded-lg px-3 py-2"
        value={data.email}
        onChange={(e) => setData({ ...data, email: e.target.value })}
        required
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full border rounded-lg px-3 py-2"
        value={data.password}
        onChange={(e) => setData({ ...data, password: e.target.value })}
        required
      />

      <button type="submit" className="w-full bg-black text-white py-2 rounded-lg">
        Login
      </button> 
    </form>
  );
}
