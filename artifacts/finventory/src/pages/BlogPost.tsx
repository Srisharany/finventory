import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, Calendar, User, Tag, BookOpen } from "lucide-react";
import { useGetBlogPost, getGetBlogPostQueryKey } from "@workspace/api-client-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function BlogPost({ params }: { params: { slug: string } }) {
  const { data: post, isLoading, error } = useGetBlogPost(params.slug, {
    query: { queryKey: getGetBlogPostQueryKey(params.slug) },
  });

  return (
    <div className="min-h-screen" style={{ background: "#0B1F3A" }}>
      <Navbar />

      <div className="pt-24 pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/blog" className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>

          {isLoading && (
            <div className="space-y-4 animate-pulse">
              <div className="h-10 rounded bg-white/5 w-3/4" />
              <div className="h-4 rounded bg-white/5 w-1/2" />
              <div className="h-64 rounded-xl bg-white/5 mt-8" />
            </div>
          )}

          {error && (
            <div className="text-center py-20">
              <BookOpen className="w-12 h-12 text-white/10 mx-auto mb-4" />
              <h2 className="text-white font-semibold mb-2">Post not found</h2>
              <p className="text-white/40 text-sm mb-6">This article may have been removed or the URL is incorrect.</p>
              <Link href="/blog" className="inline-flex items-center gap-2 px-4 py-2 bg-[#2563EB] text-white text-sm font-medium rounded-lg">
                Browse all articles
              </Link>
            </div>
          )}

          {post && (
            <motion.article initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              {/* Category */}
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-[#06B6D4] border border-[#06B6D4]/30 bg-[#06B6D4]/10 mb-5">
                {post.category}
              </span>

              <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">{post.title}</h1>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 text-white/40 text-sm mb-8 pb-8 border-b border-white/5">
                <span className="flex items-center gap-1.5"><User className="w-4 h-4" />{post.author}</span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {new Date(post.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                </span>
                {post.tags && post.tags.length > 0 && (
                  <div className="flex items-center gap-1.5">
                    <Tag className="w-4 h-4" />
                    {post.tags.map(t => <span key={t} className="text-[#06B6D4]">{t}</span>)}
                  </div>
                )}
              </div>

              {/* Excerpt */}
              <p className="text-white/70 text-lg leading-relaxed mb-8 italic border-l-2 border-[#2563EB] pl-4">{post.excerpt}</p>

              {/* Cover placeholder */}
              <div className="h-56 rounded-2xl bg-gradient-to-br from-[#2563EB]/20 to-[#06B6D4]/10 flex items-center justify-center border border-white/5 mb-10">
                <BookOpen className="w-14 h-14 text-white/10" />
              </div>

              {/* Content */}
              {post.content && (
                <div className="prose prose-invert prose-lg max-w-none">
                  {post.content.split("\n").map((para, i) =>
                    para.trim() ? <p key={i} className="text-white/60 leading-relaxed mb-4">{para}</p> : null
                  )}
                </div>
              )}

              {/* Footer */}
              <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="text-white font-semibold">{post.author}</div>
                  <div className="text-white/30 text-sm">Finventory Editorial Team</div>
                </div>
                <Link href="/book-demo" className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#2563EB] to-[#1d4ed8] text-white font-semibold rounded-xl text-sm shadow-lg shadow-blue-500/25 transition-all">
                  Book a Free Demo
                </Link>
              </div>
            </motion.article>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
