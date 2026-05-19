import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { ChevronDown, ArrowRight } from "lucide-react";
import { useListFaqs } from "@workspace/api-client-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const categories = ["All", "General", "Compliance", "Pricing", "Features", "Security", "Support"];

export default function FAQ() {
  const [selected, setSelected] = useState("All");
  const [open, setOpen] = useState<string | null>(null);
  const { data, isLoading } = useListFaqs({ category: selected === "All" ? undefined : selected });
  const faqs = Array.isArray(data) ? data : [];

  return (
    <div className="min-h-screen" style={{ background: "#0B1F3A" }}>
      <Navbar />

      <section className="pt-32 pb-20 text-center relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-[#2563EB]/8 blur-[80px]" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="text-[#06B6D4] text-sm font-semibold uppercase tracking-wider mb-3">FAQ</div>
            <h1 className="text-5xl font-bold text-white mb-4">Frequently Asked Questions</h1>
            <p className="text-white/50 text-lg">Everything you need to know about Finventory.</p>
          </motion.div>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelected(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  selected === cat
                    ? "bg-[#2563EB] text-white"
                    : "border border-white/10 text-white/50 hover:text-white hover:border-white/30"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {isLoading ? (
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="h-16 rounded-xl border border-white/8 animate-pulse" style={{ background: "rgba(255,255,255,0.02)" }} />
              ))}
            </div>
          ) : faqs.length === 0 ? (
            <div className="text-center py-16 text-white/30">No FAQs found for this category.</div>
          ) : (
            <div className="space-y-3">
              {faqs.map((faq) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-xl border border-white/8 overflow-hidden"
                  style={{ background: "rgba(255,255,255,0.02)" }}
                >
                  <button
                    onClick={() => setOpen(open === faq.id ? null : faq.id)}
                    className="w-full flex items-center justify-between p-5 text-left"
                  >
                    <span className="text-white font-medium text-sm pr-4">{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-white/40 shrink-0 transition-transform duration-200 ${
                        open === faq.id ? "rotate-180 text-[#06B6D4]" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {open === faq.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 pt-1 text-white/50 text-sm leading-relaxed border-t border-white/5">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          )}

          {/* Still have questions */}
          <div className="mt-12 p-6 rounded-2xl border border-[#2563EB]/20 bg-[#2563EB]/5 text-center">
            <h3 className="text-white font-semibold mb-2">Still have questions?</h3>
            <p className="text-white/40 text-sm mb-4">Our team responds within 24 hours on business days.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/contact" className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#2563EB] text-white text-sm font-medium rounded-lg transition-all hover:bg-[#1d4ed8]">
                Contact Us <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/book-demo" className="inline-flex items-center gap-1.5 px-4 py-2 border border-white/20 text-white text-sm font-medium rounded-lg hover:bg-white/5 transition-all">
                Book a Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
