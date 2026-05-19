import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Calendar, User, Tag, ArrowRight, BookOpen } from "lucide-react";
import { useListBlogPosts, getListBlogPostsQueryKey } from "@workspace/api-client-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const categories = ["All", "Accounting", "Inventory", "Payroll", "CRM", "Compliance", "Business Growth"];

export default function Blog() {
  const [category, setCategory] = useState("All");
  const [page, setPage] = useState(1);

  const params = { page, limit: 9, ...(category !== "All" ? { category } : {}) };
  const { data, isLoading } = useListBlogPosts(params, {
    query: { queryKey: getListBlogPostsQueryKey(params) },
  });

  const posts = data?.data ?? [];
  const totalPages = data?.totalPages ?? 1;

  return (
    <div className="min-h-screen" style={{ background: "#0B1F3A" }}>
      <Navbar />

      <section className="pt-32 pb-20 text-center relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-[#2563EB]/8 blur-[80px]" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="text-[#06B6D4] text-sm font-semibold uppercase tracking-wider mb-3">Insights</div>
            <h1 className="text-5xl font-bold text-white mb-4">The Finventory Blog</h1>
            <p className="text-white/50 text-lg">Business tips, compliance guides, and product updates for Indian entrepreneurs.</p>
          </motion.div>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => { setCategory(cat); setPage(1); }}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  category === cat
                    ? "bg-[#2563EB] text-white"
                    : "border border-white/10 text-white/50 hover:text-white hover:border-white/30"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="h-72 rounded-2xl border border-white/8 animate-pulse" style={{ background: "rgba(255,255,255,0.02)" }} />
              ))}
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-20">
              <BookOpen className="w-12 h-12 text-white/10 mx-auto mb-4" />
              <p className="text-white/30">No posts yet in this category.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {posts.map((post, i) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="group rounded-2xl border border-white/8 overflow-hidden hover:border-[#2563EB]/30 transition-all"
                  style={{ background: "rgba(255,255,255,0.02)" }}
                >
                  {/* Cover image placeholder */}
                  <div className="h-40 bg-gradient-to-br from-[#2563EB]/20 to-[#06B6D4]/10 flex items-center justify-center border-b border-white/5">
                    <BookOpen className="w-10 h-10 text-white/10" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2 py-0.5 rounded text-xs font-medium text-[#06B6D4] border border-[#06B6D4]/30 bg-[#06B6D4]/10">
                        {post.category}
                      </span>
                    </div>
                    <h2 className="text-white font-semibold text-base leading-tight mb-2 group-hover:text-[#06B6D4] transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-white/40 text-sm leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center justify-between border-t border-white/5 pt-4">
                      <div className="flex items-center gap-3 text-white/30 text-xs">
                        <span className="flex items-center gap-1"><User className="w-3 h-3" />{post.author}</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(post.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                        </span>
                      </div>
                      <Link href={`/blog/${post.slug}`} className="text-[#2563EB] text-xs font-medium flex items-center gap-1 hover:gap-2 transition-all">
                        Read <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-10">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 rounded-lg border border-white/10 text-white/50 text-sm disabled:opacity-30 hover:border-white/30 transition-all"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`w-9 h-9 rounded-lg text-sm font-medium transition-all ${
                    page === i + 1 ? "bg-[#2563EB] text-white" : "border border-white/10 text-white/50 hover:border-white/30"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-4 py-2 rounded-lg border border-white/10 text-white/50 text-sm disabled:opacity-30 hover:border-white/30 transition-all"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
