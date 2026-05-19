import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { BarChart3, Eye, EyeOff, LogIn } from "lucide-react";
import { toast } from "sonner";
import { useAdminLogin } from "@workspace/api-client-react";
import { setAdminToken } from "@/lib/auth";

export default function AdminLogin() {
  const [, navigate] = useLocation();
  const [email, setEmail] = useState("admin@finventory.com");
  const [password, setPassword] = useState("password");
  const [showPw, setShowPw] = useState(false);
  const mutation = useAdminLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(
      { data: { email, password } },
      {
        onSuccess: (data: any) => {
          if (data?.token) {
            setAdminToken(data.token);
            toast.success("Logged in successfully");
            navigate("/admin");
          } else {
            toast.error("Invalid response from server");
          }
        },
        onError: () => toast.error("Invalid email or password"),
      }
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "#060f1e" }}>
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-[#2563EB]/8 blur-[80px]" />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md"
      >
        <div className="p-8 rounded-2xl border border-white/10 shadow-2xl" style={{ background: "rgba(11,31,58,0.9)" }}>
          {/* Logo */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2563EB] to-[#06B6D4] flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white">Fin<span className="text-[#06B6D4]">ventory</span></span>
          </div>
          <h1 className="text-2xl font-bold text-white text-center mb-1">Admin Login</h1>
          <p className="text-white/40 text-sm text-center mb-8">Sign in to access the admin dashboard</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-white/50 text-xs uppercase tracking-wider mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-white/10 text-white text-sm focus:outline-none focus:border-[#2563EB]/60 transition-all"
                style={{ background: "rgba(255,255,255,0.05)" }}
                placeholder="admin@finventory.com"
              />
            </div>
            <div>
              <label className="block text-white/50 text-xs uppercase tracking-wider mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 rounded-xl border border-white/10 text-white text-sm focus:outline-none focus:border-[#2563EB]/60 transition-all"
                  style={{ background: "rgba(255,255,255,0.05)" }}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                >
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={mutation.isPending}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-[#2563EB] to-[#1d4ed8] text-white font-semibold rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 disabled:opacity-60 disabled:cursor-not-allowed transition-all mt-2"
            >
              {mutation.isPending ? "Signing in..." : <><LogIn className="w-4 h-4" /> Sign In</>}
            </button>
          </form>
        </div>
        <p className="text-center text-white/20 text-xs mt-6">Finventory Admin Panel · Restricted Access</p>
      </motion.div>
    </div>
  );
}
