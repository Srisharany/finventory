import { useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { BarChart3, Users, Calendar, BookOpen, TrendingUp, LogOut, Home } from "lucide-react";
import { useGetAdminStats } from "@workspace/api-client-react";
import { getAdminToken, logout } from "@/lib/auth";
import { useQueryClient } from "@tanstack/react-query";

function AdminLayout({ children, title }: { children: React.ReactNode; title: string }) {
  const [location, navigate] = useLocation();
  const qc = useQueryClient();
  const token = getAdminToken();

  useEffect(() => {
    if (!token) navigate("/admin/login");
  }, [token, navigate]);

  const navItems = [
    { href: "/admin", label: "Dashboard", icon: Home },
    { href: "/admin/contacts", label: "Contacts", icon: Users },
    { href: "/admin/bookings", label: "Bookings", icon: Calendar },
    { href: "/admin/blog", label: "Blog Posts", icon: BookOpen },
  ];

  return (
    <div className="min-h-screen flex" style={{ background: "#060f1e" }}>
      {/* Sidebar */}
      <aside className="w-60 shrink-0 border-r border-white/5 flex flex-col" style={{ background: "rgba(11,31,58,0.9)" }}>
        <div className="p-5 border-b border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#2563EB] to-[#06B6D4] flex items-center justify-center">
              <BarChart3 className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-white text-sm">Finventory Admin</span>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                location === item.href
                  ? "bg-[#2563EB]/20 text-[#06B6D4] border border-[#2563EB]/20"
                  : "text-white/50 hover:text-white hover:bg-white/5"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-white/5">
          <button
            onClick={() => logout(qc)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/40 hover:text-red-400 hover:bg-red-400/5 transition-all w-full"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="px-6 py-4 border-b border-white/5 flex items-center justify-between" style={{ background: "rgba(11,31,58,0.5)" }}>
          <h1 className="text-white font-semibold">{title}</h1>
          <Link href="/" className="text-white/30 hover:text-white text-xs transition-colors">View Site →</Link>
        </header>
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}

export { AdminLayout };

export default function Dashboard() {
  const { data: stats } = useGetAdminStats({
    query: { enabled: !!getAdminToken() },
  } as any);

  const cards = [
    { label: "Total Contacts", value: stats?.totalContacts ?? "—", icon: Users, color: "#2563EB" },
    { label: "New Contacts", value: stats?.newContacts ?? "—", icon: TrendingUp, color: "#06B6D4" },
    { label: "Demo Bookings", value: stats?.totalDemoBookings ?? "—", icon: Calendar, color: "#2563EB" },
    { label: "Blog Posts", value: stats?.publishedBlogPosts ?? "—", icon: BookOpen, color: "#06B6D4" },
  ];

  return (
    <AdminLayout title="Dashboard">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-5 rounded-xl border border-white/8"
            style={{ background: "rgba(255,255,255,0.03)" }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="text-white/40 text-xs">{card.label}</div>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${card.color}20` }}>
                <card.icon className="w-4 h-4" style={{ color: card.color }} />
              </div>
            </div>
            <div className="text-2xl font-bold text-white">{String(card.value)}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="p-5 rounded-xl border border-white/8" style={{ background: "rgba(255,255,255,0.02)" }}>
          <h3 className="text-white font-semibold mb-4">Quick Actions</h3>
          <div className="space-y-2">
            {[
              { href: "/admin/contacts", label: "View all contact inquiries", icon: Users },
              { href: "/admin/bookings", label: "Manage demo bookings", icon: Calendar },
              { href: "/admin/blog", label: "Manage blog posts", icon: BookOpen },
            ].map(a => (
              <Link key={a.href} href={a.href} className="flex items-center gap-3 px-4 py-3 rounded-lg border border-white/5 hover:border-[#2563EB]/30 hover:bg-[#2563EB]/5 transition-all text-white/60 hover:text-white text-sm">
                <a.icon className="w-4 h-4 text-[#06B6D4]" />
                {a.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="p-5 rounded-xl border border-white/8" style={{ background: "rgba(255,255,255,0.02)" }}>
          <h3 className="text-white font-semibold mb-4">System Status</h3>
          <div className="space-y-3">
            {[
              { label: "API Server", status: "Operational" },
              { label: "Database", status: "Operational" },
              { label: "Email Service", status: "Operational" },
            ].map(s => (
              <div key={s.label} className="flex items-center justify-between py-2 border-b border-white/5">
                <span className="text-white/60 text-sm">{s.label}</span>
                <span className="flex items-center gap-1.5 text-green-400 text-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  {s.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
