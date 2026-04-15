import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

export default function RegisterForm() {
  const { registerHandler, setMode } = useContext(AuthContext);
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const register = async (e)=>{
    e.preventDefault();
    await registerHandler(data);
    setMode("login");
  }

  return (
    <form className="space-y-3" onSubmit={register}>
      <input
        type="text"
        placeholder="Name"
        className="w-full border rounded-lg px-3 py-2"
        value={data.name}
        onChange={(e) => setData({ ...data, name: e.target.value })}
      />

      <input
        type="email"
        placeholder="Email"
        className="w-full border rounded-lg px-3 py-2"
        value={data.email}
        onChange={(e) => setData({ ...data, email: e.target.value })}
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full border rounded-lg px-3 py-2"
        value={data.password}
        onChange={(e) => setData({ ...data, password: e.target.value })}
      />

      <button type="submit" className="w-full bg-black text-white py-2 rounded-lg">
        Register
      </button>
    </form>
  );
}
