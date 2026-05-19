import { useRef } from "react";
import { Link } from "wouter";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight, CheckCircle2, TrendingUp, Shield, Zap, Users, Globe, Award,
  BookOpen, BarChart3, Package, DollarSign, UserCheck, FileText, Settings,
  ChevronRight, Star, Play
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useListTestimonials, useListFaqs } from "@workspace/api-client-react";

function Counter({ end, suffix = "", label }: { end: number; suffix?: string; label: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref} className="text-center">
      <motion.div
        className="text-4xl lg:text-5xl font-bold text-white mb-2"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1.5 }}
        >
          {inView ? end : 0}{suffix}
        </motion.span>
      </motion.div>
      <p className="text-white/50 text-sm">{label}</p>
    </div>
  );
}

const services = [
  { icon: DollarSign, title: "Accounting", desc: "Complete double-entry accounting with real-time P&L, balance sheet, and cash flow reports." },
  { icon: Package, title: "Inventory", desc: "Multi-location stock management with barcode scanning, reorder alerts, and batch tracking." },
  { icon: Users, title: "Payroll", desc: "Automated payroll with PF, ESI, TDS, professional tax, and direct bank transfers." },
  { icon: UserCheck, title: "CRM", desc: "Track leads, manage customer relationships, and close deals faster with pipeline analytics." },
  { icon: FileText, title: "GST & Tax", desc: "One-click GSTR filing, e-invoicing, and TDS management fully compliant with Indian regulations." },
  { icon: BarChart3, title: "Analytics", desc: "Business intelligence dashboards with 200+ reports for data-driven decision making." },
];

const industries = [
  "Retail", "Wholesale", "Manufacturing", "Pharmacy", "Restaurants", "Ecommerce", "Startups"
];

const whyUs = [
  { icon: Shield, title: "Bank-Grade Security", desc: "256-bit AES encryption with daily backups and ISO 27001 certification." },
  { icon: Zap, title: "99.9% Uptime SLA", desc: "Enterprise infrastructure with guaranteed uptime and 24/7 monitoring." },
  { icon: Globe, title: "GST Compliant", desc: "Fully compliant with Indian tax laws. Regular updates for every regulation change." },
  { icon: Award, title: "Award-Winning Support", desc: "Dedicated account managers and 24/7 support rated 4.9/5 by customers." },
];

const howItWorks = [
  { step: "01", title: "Book a Demo", desc: "Schedule a personalized walkthrough with our product expert tailored to your business needs." },
  { step: "02", title: "Data Migration", desc: "Our team migrates your existing data from Tally, Busy, or any other software seamlessly." },
  { step: "03", title: "Team Training", desc: "Hands-on training for your team with dedicated onboarding support until you're confident." },
  { step: "04", title: "Go Live", desc: "Launch with confidence. Our support team is available 24/7 for the first 30 days." },
];

export default function Home() {
  const { data: testimonialsData } = useListTestimonials();
  const { data: faqsData } = useListFaqs({ category: undefined });
  const testimonials = Array.isArray(testimonialsData) ? testimonialsData : [];
  const faqs = Array.isArray(faqsData) ? faqsData.slice(0, 5) : [];

  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  const servicesInView = useInView(servicesRef, { once: true, margin: "-100px" });

  return (
    <div className="min-h-screen" style={{ background: "#0B1F3A" }}>
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#2563EB]/10 blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-[#06B6D4]/10 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#2563EB]/5 blur-[100px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#2563EB]/30 bg-[#2563EB]/10 text-[#06B6D4] text-xs font-medium mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#06B6D4] animate-pulse" />
              India's #1 Business Management Platform
            </div>
            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] mb-6">
              Run Your Business{" "}
              <span className="gradient-text">Smarter</span>{" "}
              Not Harder
            </h1>
            <p className="text-white/60 text-lg leading-relaxed mb-8 max-w-lg">
              Accounting, inventory, payroll, CRM, HR, and GST compliance — all in one intelligent platform built for Indian businesses.
            </p>
            <div className="flex flex-wrap gap-4 mb-10">
              <Link href="/book-demo" className="inline-flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-[#2563EB] to-[#1d4ed8] text-white font-semibold rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all hover:-translate-y-0.5">
                Book Free Demo <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3.5 border border-white/20 text-white font-semibold rounded-xl hover:border-white/40 hover:bg-white/5 transition-all">
                Contact Us
              </Link>
            </div>
            {/* Trust badges */}
            <div className="flex flex-wrap gap-6">
              {["500+ Businesses", "99.9% Uptime", "GST Compliant", "ISO 27001"].map(b => (
                <div key={b} className="flex items-center gap-1.5 text-white/50 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-[#06B6D4]" />
                  {b}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl glow-blue" style={{ background: "rgba(11,31,58,0.9)" }}>
              {/* Window chrome */}
              <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/5">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
                <span className="ml-3 text-white/30 text-xs">finventory.in — Dashboard</span>
              </div>
              <div className="p-6">
                {/* Stats row */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {[
                    { label: "Revenue", value: "₹28.4L", change: "+12.5%", color: "#06B6D4" },
                    { label: "Orders", value: "1,284", change: "+8.2%", color: "#2563EB" },
                    { label: "Stock Items", value: "3,891", change: "-2.1%", color: "#06B6D4" },
                    { label: "GST Pending", value: "₹4.2L", change: "Due 20 Nov", color: "#f59e0b" },
                  ].map(stat => (
                    <div key={stat.label} className="rounded-xl p-3" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                      <div className="text-white/40 text-xs mb-1">{stat.label}</div>
                      <div className="text-white font-bold text-lg">{stat.value}</div>
                      <div className="text-xs mt-0.5" style={{ color: stat.color }}>{stat.change}</div>
                    </div>
                  ))}
                </div>
                {/* Chart mock */}
                <div className="rounded-xl p-4" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-white/60 text-xs font-medium">Revenue vs Expenses — Nov 2024</span>
                    <span className="text-[#06B6D4] text-xs">Live</span>
                  </div>
                  <div className="flex items-end gap-1 h-16">
                    {[60, 75, 55, 90, 70, 85, 95, 80, 100, 88, 92, 78].map((h, i) => (
                      <div key={i} className="flex-1 rounded-t" style={{
                        height: `${h}%`,
                        background: i % 2 === 0
                          ? "linear-gradient(to top, #2563EB, #3B82F6)"
                          : "linear-gradient(to top, #06B6D4, #22D3EE)",
                        opacity: 0.7 + i * 0.02
                      }} />
                    ))}
                  </div>
                </div>
                {/* Recent transactions */}
                <div className="mt-3 space-y-2">
                  {[
                    { name: "Sharma Textiles", amount: "₹1,24,500", type: "Invoice", status: "Paid" },
                    { name: "Kapoor Pharma", amount: "₹68,000", type: "Purchase", status: "Pending" },
                  ].map((tx, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-t border-white/5">
                      <div>
                        <div className="text-white/80 text-xs font-medium">{tx.name}</div>
                        <div className="text-white/30 text-xs">{tx.type}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-white/80 text-xs font-semibold">{tx.amount}</div>
                        <div className={`text-xs ${tx.status === "Paid" ? "text-green-400" : "text-yellow-400"}`}>{tx.status}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Floating badges */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 glass rounded-xl px-3 py-2 border border-[#06B6D4]/30"
            >
              <div className="text-[#06B6D4] text-xs font-semibold">GST Filed</div>
              <div className="text-white text-xs">GSTR-3B ✓</div>
            </motion.div>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-4 -left-4 glass rounded-xl px-3 py-2 border border-[#2563EB]/30"
            >
              <div className="text-[#2563EB] text-xs font-semibold">Stock Alert</div>
              <div className="text-white text-xs">Paracetamol low</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Counters */}
      <section className="py-16 border-y border-white/5" style={{ background: "rgba(255,255,255,0.02)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <Counter end={500} suffix="+" label="Businesses Served" />
            <Counter end={99} suffix=".9%" label="Uptime SLA" />
            <Counter end={50} suffix="L+" label="Transactions Processed" />
            <Counter end={4.9} suffix="/5" label="Customer Rating" />
          </div>
        </div>
      </section>

      {/* Services */}
      <section ref={servicesRef} className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={servicesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-block text-[#06B6D4] text-sm font-semibold uppercase tracking-wider mb-3">Everything You Need</div>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">One Platform, Complete Control</h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">Every tool your business needs, seamlessly integrated and working together.</p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                animate={servicesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group p-6 rounded-2xl border border-white/8 hover:border-[#2563EB]/40 transition-all hover:bg-[#2563EB]/5 cursor-pointer"
                style={{ background: "rgba(255,255,255,0.02)" }}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#2563EB]/20 to-[#06B6D4]/20 border border-[#2563EB]/20 flex items-center justify-center mb-4 group-hover:from-[#2563EB]/30 group-hover:to-[#06B6D4]/30 transition-all">
                  <s.icon className="w-6 h-6 text-[#06B6D4]" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">{s.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed mb-4">{s.desc}</p>
                <Link href="/services" className="inline-flex items-center gap-1 text-[#2563EB] text-sm font-medium group-hover:gap-2 transition-all">
                  Learn more <ChevronRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/services" className="inline-flex items-center gap-2 px-6 py-3 border border-[#2563EB]/40 text-[#06B6D4] font-medium rounded-xl hover:bg-[#2563EB]/10 transition-all">
              View All Services <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Us */}
      <WhyUsSection />

      {/* Industries */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block text-[#06B6D4] text-sm font-semibold uppercase tracking-wider mb-3">Built For Your Industry</div>
            <h2 className="text-4xl font-bold text-white mb-4">Trusted Across Industries</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {industries.map((ind) => (
              <Link key={ind} href="/industries" className="px-5 py-2.5 rounded-full border border-white/10 text-white/60 hover:text-white hover:border-[#2563EB]/40 hover:bg-[#2563EB]/10 text-sm font-medium transition-all">
                {ind}
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/industries" className="inline-flex items-center gap-2 text-[#2563EB] text-sm font-medium hover:gap-3 transition-all">
              Explore Industries <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <HowItWorksSection />

      {/* Testimonials */}
      {testimonials.length > 0 && <TestimonialsSection testimonials={testimonials} />}

      {/* FAQ */}
      {faqs.length > 0 && <FAQSection faqs={faqs} />}

      {/* CTA */}
      <CTASection />

      <Footer />
    </div>
  );
}

function WhyUsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <section ref={ref} className="py-24 border-y border-white/5" style={{ background: "rgba(37,99,235,0.03)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }}>
            <div className="text-[#06B6D4] text-sm font-semibold uppercase tracking-wider mb-3">Why Choose Us</div>
            <h2 className="text-4xl font-bold text-white mb-6">Built for India. Designed for Growth.</h2>
            <p className="text-white/50 leading-relaxed mb-8">We understand the unique challenges of Indian businesses — GST complexity, multi-location operations, seasonal demand, and the need for real-time visibility. Finventory is built ground-up to solve these challenges.</p>
            <Link href="/book-demo" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#2563EB] to-[#1d4ed8] text-white font-semibold rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all">
              See It In Action <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {whyUs.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                className="p-5 rounded-xl border border-white/8 hover:border-[#2563EB]/30 transition-all"
                style={{ background: "rgba(255,255,255,0.02)" }}
              >
                <item.icon className="w-8 h-8 text-[#06B6D4] mb-3" />
                <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <section ref={ref} className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="text-[#06B6D4] text-sm font-semibold uppercase tracking-wider mb-3">Simple Process</div>
          <h2 className="text-4xl font-bold text-white mb-4">Get Started in 4 Easy Steps</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {howItWorks.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative p-6 rounded-2xl border border-white/8"
              style={{ background: "rgba(255,255,255,0.02)" }}
            >
              <div className="text-5xl font-black text-white/5 mb-3">{step.step}</div>
              <div className="w-8 h-0.5 bg-gradient-to-r from-[#2563EB] to-[#06B6D4] mb-3" />
              <h3 className="text-white font-semibold mb-2">{step.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection({ testimonials }: { testimonials: Array<any> }) {
  return (
    <section className="py-24 border-y border-white/5" style={{ background: "rgba(255,255,255,0.01)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="text-[#06B6D4] text-sm font-semibold uppercase tracking-wider mb-3">Customer Stories</div>
          <h2 className="text-4xl font-bold text-white mb-4">Trusted by 500+ Businesses</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.slice(0, 6).map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-2xl border border-white/8"
              style={{ background: "rgba(255,255,255,0.02)" }}
            >
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: t.rating || 5 }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-[#f59e0b] text-[#f59e0b]" />
                ))}
              </div>
              <p className="text-white/60 text-sm leading-relaxed mb-4">"{t.content}"</p>
              <div className="border-t border-white/5 pt-4">
                <div className="font-semibold text-white text-sm">{t.name}</div>
                <div className="text-white/40 text-xs">{t.role}, {t.company}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSection({ faqs }: { faqs: Array<any> }) {
  return (
    <section className="py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Frequently Asked Questions</h2>
          <p className="text-white/50">Quick answers to common questions</p>
        </div>
        <div className="space-y-3">
          {faqs.map((faq) => (
            <details key={faq.id} className="group rounded-xl border border-white/8 overflow-hidden">
              <summary className="flex items-center justify-between p-5 cursor-pointer text-white font-medium" style={{ background: "rgba(255,255,255,0.02)" }}>
                {faq.question}
                <ChevronRight className="w-5 h-5 text-white/40 group-open:rotate-90 transition-transform" />
              </summary>
              <div className="px-5 pb-5 text-white/50 text-sm leading-relaxed border-t border-white/5 pt-4" style={{ background: "rgba(255,255,255,0.01)" }}>
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/faq" className="text-[#2563EB] text-sm font-medium hover:text-[#06B6D4] transition-colors">
            View all FAQs →
          </Link>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[#2563EB]/20 to-[#06B6D4]/10" />
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">Ready to Transform Your Business?</h2>
        <p className="text-white/60 text-lg mb-8 max-w-2xl mx-auto">Join 500+ businesses that trust Finventory. Start with a free demo — no credit card required.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/book-demo" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#2563EB] to-[#1d4ed8] text-white font-semibold rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all hover:-translate-y-0.5 text-lg">
            Book Free Demo <ArrowRight className="w-5 h-5" />
          </Link>
          <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/5 transition-all text-lg">
            Contact Sales
          </Link>
        </div>
      </div>
    </section>
  );
}
