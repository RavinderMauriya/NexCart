import { useState, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { Mail, Lock, ArrowRight, Loader2 } from "lucide-react";

export default function LoginForm() {
  const [data, setData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login, closeModal } = useContext(AuthContext);

  const loginHandler = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(data);
      closeModal();
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-5" onSubmit={loginHandler}>
      {error && (
        <div className="bg-red-50 text-danger text-sm px-4 py-2.5 rounded-lg border border-red-100">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-text-dark mb-1.5">
          Email address
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full border border-border rounded-lg pl-10 pr-3 py-2.5 text-sm text-text-dark placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            required
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="block text-sm font-medium text-text-dark">
            Password
          </label>
          <button
            type="button"
            className="text-xs text-primary hover:text-primary-dark font-medium transition-colors"
            onClick={() => alert("Forgot password flow not implemented yet.")}
          >
            Forgot password?
          </button>
        </div>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full border border-border rounded-lg pl-10 pr-3 py-2.5 text-sm text-text-dark placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            required
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? (
          <Loader2 className="animate-spin" size={18} />
        ) : (
          <>
            Login <ArrowRight size={18} />
          </>
        )}
      </button>
    </form>
  );
}
