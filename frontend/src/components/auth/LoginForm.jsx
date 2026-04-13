import { useState } from "react";

export default function LoginForm() {
  const [data, setData] = useState({ email: "", password: "" });

  return (
    <form className="space-y-3">
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

      <button className="w-full bg-black text-white py-2 rounded-lg">
        Login
      </button>
    </form>
  );
}
