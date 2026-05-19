import { useState } from "react";
import { useListAdminDemoBookings, getListAdminDemoBookingsQueryKey } from "@workspace/api-client-react";
import { getAdminToken } from "@/lib/auth";
import { AdminLayout } from "./Dashboard";
import { Calendar, User, Phone, Building2, Clock, Search } from "lucide-react";

const statusColors: Record<string, string> = {
  pending: "bg-yellow-500/20 text-yellow-400",
  confirmed: "bg-green-500/20 text-green-400",
  completed: "bg-[#2563EB]/20 text-[#06B6D4]",
  cancelled: "bg-red-500/20 text-red-400",
};

export default function AdminBookings() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const params = { page, limit: 20 };
  const { data, isLoading } = useListAdminDemoBookings(params, {
    query: {
      queryKey: getListAdminDemoBookingsQueryKey(params),
      enabled: !!getAdminToken(),
    },
  });

  const bookings = data?.data ?? [];
  const total = data?.total ?? 0;
  const totalPages = data?.totalPages ?? 1;

  const filtered = search
    ? bookings.filter(b =>
        b.fullName?.toLowerCase().includes(search.toLowerCase()) ||
        b.businessName?.toLowerCase().includes(search.toLowerCase()) ||
        b.email?.toLowerCase().includes(search.toLowerCase())
      )
    : bookings;

  return (
    <AdminLayout title="Demo Bookings">
      <div className="mb-5 flex items-center gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
          <input
            type="text"
            placeholder="Search bookings..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-white/10 text-white text-sm focus:outline-none focus:border-[#2563EB]/40 transition-all"
            style={{ background: "rgba(255,255,255,0.05)" }}
          />
        </div>
        <div className="text-white/30 text-sm">{total} total</div>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4].map(i => <div key={i} className="h-24 rounded-xl border border-white/8 animate-pulse" style={{ background: "rgba(255,255,255,0.02)" }} />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-white/30">
          <Calendar className="w-10 h-10 mx-auto mb-3 opacity-30" />
          No bookings yet.
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(booking => (
            <div
              key={booking.id}
              className="p-5 rounded-xl border border-white/8 hover:border-[#2563EB]/20 transition-all"
              style={{ background: "rgba(255,255,255,0.02)" }}
            >
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-white font-medium">{booking.fullName}</span>
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${statusColors[booking.status || "pending"] || statusColors.pending}`}>
                      {booking.status || "pending"}
                    </span>
                  </div>
                  <div className="text-white/40 text-xs mb-2">{booking.email} · {booking.phone}</div>
                  <div className="flex flex-wrap gap-3 text-xs text-white/50">
                    <span className="flex items-center gap-1"><Building2 className="w-3 h-3" />{booking.businessName} ({booking.industry})</span>
                    <span className="flex items-center gap-1"><User className="w-3 h-3" />{booking.companySize}</span>
                    {booking.preferredDate && (
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{booking.preferredDate}</span>
                    )}
                    {booking.preferredTime && (
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{booking.preferredTime}</span>
                    )}
                  </div>
                  {booking.message && (
                    <div className="mt-2 text-white/30 text-xs bg-white/2 px-3 py-2 rounded">{booking.message}</div>
                  )}
                </div>
                <div className="text-white/30 text-xs shrink-0">
                  {new Date(booking.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6">
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="px-3 py-1.5 rounded border border-white/10 text-white/50 text-sm disabled:opacity-30 hover:border-white/30 transition-all">Previous</button>
          <span className="text-white/30 text-sm">{page} / {totalPages}</span>
          <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="px-3 py-1.5 rounded border border-white/10 text-white/50 text-sm disabled:opacity-30 hover:border-white/30 transition-all">Next</button>
        </div>
      )}
    </AdminLayout>
  );
}
