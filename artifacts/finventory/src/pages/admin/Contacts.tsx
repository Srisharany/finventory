import { useState } from "react";
import { useListAdminContacts, getListAdminContactsQueryKey } from "@workspace/api-client-react";
import { getAdminToken } from "@/lib/auth";
import { AdminLayout } from "./Dashboard";
import { Users, Mail, Phone, Building2, Calendar, Search } from "lucide-react";

export default function AdminContacts() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const params = { page, limit: 20 };
  const { data, isLoading } = useListAdminContacts(params, {
    query: {
      queryKey: getListAdminContactsQueryKey(params),
      enabled: !!getAdminToken(),
    },
  });

  const contacts = data?.data ?? [];
  const total = data?.total ?? 0;
  const totalPages = data?.totalPages ?? 1;

  const filtered = search
    ? contacts.filter(c =>
        c.name?.toLowerCase().includes(search.toLowerCase()) ||
        c.email?.toLowerCase().includes(search.toLowerCase()) ||
        c.company?.toLowerCase().includes(search.toLowerCase())
      )
    : contacts;

  return (
    <AdminLayout title="Contact Inquiries">
      <div className="mb-5 flex items-center gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
          <input
            type="text"
            placeholder="Search contacts..."
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
          {[1, 2, 3, 4, 5].map(i => <div key={i} className="h-16 rounded-xl border border-white/8 animate-pulse" style={{ background: "rgba(255,255,255,0.02)" }} />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-white/30">
          <Users className="w-10 h-10 mx-auto mb-3 opacity-30" />
          No contacts yet.
        </div>
      ) : (
        <div className="rounded-xl border border-white/8 overflow-hidden" style={{ background: "rgba(255,255,255,0.02)" }}>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left px-5 py-3 text-white/40 text-xs font-medium uppercase tracking-wider">Name</th>
                <th className="text-left px-5 py-3 text-white/40 text-xs font-medium uppercase tracking-wider">Company</th>
                <th className="text-left px-5 py-3 text-white/40 text-xs font-medium uppercase tracking-wider">Subject</th>
                <th className="text-left px-5 py-3 text-white/40 text-xs font-medium uppercase tracking-wider">Date</th>
                <th className="text-left px-5 py-3 text-white/40 text-xs font-medium uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((contact, i) => (
                <tr key={contact.id} className={`border-b border-white/5 hover:bg-white/2 transition-colors ${i % 2 === 0 ? "" : "bg-white/1"}`}>
                  <td className="px-5 py-3.5">
                    <div className="text-white font-medium">{contact.name}</div>
                    <div className="text-white/30 text-xs flex items-center gap-1 mt-0.5">
                      <Mail className="w-3 h-3" />{contact.email}
                    </div>
                    {contact.phone && (
                      <div className="text-white/30 text-xs flex items-center gap-1 mt-0.5">
                        <Phone className="w-3 h-3" />{contact.phone}
                      </div>
                    )}
                  </td>
                  <td className="px-5 py-3.5 text-white/60">{contact.company || "—"}</td>
                  <td className="px-5 py-3.5">
                    <div className="text-white/60">{contact.subject || "—"}</div>
                    {contact.message && (
                      <div className="text-white/30 text-xs mt-0.5 max-w-xs truncate">{contact.message}</div>
                    )}
                  </td>
                  <td className="px-5 py-3.5 text-white/40 text-xs">
                    {new Date(contact.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                      contact.status === "replied" || contact.status === "closed"
                        ? "bg-green-500/20 text-green-400"
                        : contact.status === "read"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-[#2563EB]/20 text-[#06B6D4]"
                    }`}>
                      {contact.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
