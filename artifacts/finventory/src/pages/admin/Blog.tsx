import { useState } from "react";
import { useListAdminBlogPosts, getListAdminBlogPostsQueryKey } from "@workspace/api-client-react";
import { getAdminToken } from "@/lib/auth";
import { AdminLayout } from "./Dashboard";
import { BookOpen, Calendar, User, Search, Plus, Eye, EyeOff } from "lucide-react";

export default function AdminBlog() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const { data, isLoading } = useListAdminBlogPosts({
    query: {
      queryKey: getListAdminBlogPostsQueryKey(),
      enabled: !!getAdminToken(),
    },
  });

  const posts = data?.data ?? [];
  const total = data?.total ?? 0;
  const totalPages = data?.totalPages ?? 1;

  const filtered = search
    ? posts.filter(p =>
        p.title?.toLowerCase().includes(search.toLowerCase()) ||
        p.author?.toLowerCase().includes(search.toLowerCase()) ||
        p.category?.toLowerCase().includes(search.toLowerCase())
      )
    : posts;

  return (
    <AdminLayout title="Blog Posts">
      <div className="mb-5 flex items-center gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
          <input
            type="text"
            placeholder="Search posts..."
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
          {[1, 2, 3, 4].map(i => <div key={i} className="h-20 rounded-xl border border-white/8 animate-pulse" style={{ background: "rgba(255,255,255,0.02)" }} />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-white/30">
          <BookOpen className="w-10 h-10 mx-auto mb-3 opacity-30" />
          No blog posts yet.
        </div>
      ) : (
        <div className="rounded-xl border border-white/8 overflow-hidden" style={{ background: "rgba(255,255,255,0.02)" }}>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left px-5 py-3 text-white/40 text-xs font-medium uppercase tracking-wider">Title</th>
                <th className="text-left px-5 py-3 text-white/40 text-xs font-medium uppercase tracking-wider">Category</th>
                <th className="text-left px-5 py-3 text-white/40 text-xs font-medium uppercase tracking-wider">Author</th>
                <th className="text-left px-5 py-3 text-white/40 text-xs font-medium uppercase tracking-wider">Date</th>
                <th className="text-left px-5 py-3 text-white/40 text-xs font-medium uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((post, i) => (
                <tr key={post.id} className={`border-b border-white/5 hover:bg-white/2 transition-colors ${i % 2 === 0 ? "" : "bg-white/1"}`}>
                  <td className="px-5 py-3.5">
                    <div className="text-white font-medium line-clamp-1">{post.title}</div>
                    <div className="text-white/30 text-xs mt-0.5 line-clamp-1">{post.excerpt}</div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="px-2 py-0.5 rounded text-xs bg-[#2563EB]/20 text-[#06B6D4]">{post.category}</span>
                  </td>
                  <td className="px-5 py-3.5 text-white/50">
                    <div className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5" />{post.author}
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-white/40 text-xs">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(post.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`flex items-center gap-1 text-xs font-medium ${post.published ? "text-green-400" : "text-white/30"}`}>
                      {post.published ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                      {post.published ? "Published" : "Draft"}
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
