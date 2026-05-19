import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Target, Eye, Heart, Users, Award, TrendingUp, Shield } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const milestones = [
  { year: "2018", title: "Founded", desc: "Started with a mission to simplify business management for Indian SMEs." },
  { year: "2019", title: "GST Integration", desc: "First platform to offer end-to-end GST filing integration in India." },
  { year: "2020", title: "100 Customers", desc: "Crossed 100 paying customers during the pandemic — proving cloud software's value." },
  { year: "2021", title: "Series A Funding", desc: "Raised ₹25 crore to expand our product and team." },
  { year: "2022", title: "Enterprise Launch", desc: "Launched enterprise tier serving businesses with 500+ employees." },
  { year: "2023", title: "500+ Businesses", desc: "Crossed 500 active business customers across 7 industries." },
  { year: "2024", title: "AI-Powered Analytics", desc: "Launched AI-powered business insights and forecasting module." },
];

const team = [
  { name: "Aditya Sharma", role: "Co-founder & CEO", bio: "Ex-Zoho, IIT Delhi. 12 years building enterprise software for Indian businesses." },
  { name: "Priya Nair", role: "Co-founder & CTO", bio: "Ex-Freshworks, IIT Bombay. Architected platforms serving 1M+ users." },
  { name: "Vikram Bajaj", role: "Head of Product", bio: "Ex-Tally Solutions. Brings 10 years of deep domain expertise in accounting software." },
  { name: "Ananya Krishnan", role: "Head of Customer Success", desc: "Ensures every Finventory customer achieves measurable business outcomes." },
];

const values = [
  { icon: Target, title: "Customer Obsession", desc: "Every feature we build starts with a customer problem." },
  { icon: Shield, title: "Trust & Transparency", desc: "Your data belongs to you. No hidden fees. No surprises." },
  { icon: TrendingUp, title: "Continuous Innovation", desc: "We ship meaningful updates every two weeks without exception." },
  { icon: Heart, title: "Built for India", desc: "Indian tax laws, Indian languages, Indian business workflows — built in." },
];

export default function About() {
  return (
    <div className="min-h-screen" style={{ background: "#0B1F3A" }}>
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 text-center relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#2563EB]/8 blur-[80px]" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="text-[#06B6D4] text-sm font-semibold uppercase tracking-wider mb-3">Our Story</div>
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
              Built by Founders Who{" "}
              <span className="gradient-text">Felt the Pain</span>
            </h1>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">
              Finventory was born out of frustration — watching Indian businesses struggle with fragmented, expensive, and outdated software. We knew there was a better way.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-2xl border border-white/8"
            style={{ background: "rgba(255,255,255,0.02)" }}
          >
            <h2 className="text-2xl font-bold text-white mb-4">How It Started</h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                In 2017, our co-founder Aditya was helping his family's textile business in Surat switch software vendors — for the third time in five years. Each time, it meant weeks of pain: data migration, re-training staff, customization headaches, and a support team that disappeared after the sale.
              </p>
              <p>
                He called Priya, his college batchmate from IIT Delhi who was building enterprise software at Zoho. "There has to be a better way," he said. Six months later, they quit their jobs and started Finventory.
              </p>
              <p>
                The mission was simple: build the business management platform that Indian entrepreneurs actually deserve — powerful enough for enterprise, simple enough for a 5-person team, and priced fairly for the Indian market.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: Target, label: "Mission", color: "#2563EB", text: "To give every Indian business — from a kirana store to a manufacturing company — access to enterprise-grade software that actually works for how Indian businesses operate." },
              { icon: Eye, label: "Vision", color: "#06B6D4", text: "A future where every business decision is backed by real data. Where accounting, inventory, and payroll don't consume your week. Where business owners spend time building, not managing software." },
            ].map(mv => (
              <motion.div
                key={mv.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 rounded-2xl border border-white/8"
                style={{ background: "rgba(255,255,255,0.02)" }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${mv.color}20` }}>
                    <mv.icon className="w-5 h-5" style={{ color: mv.color }} />
                  </div>
                  <span className="text-white font-bold text-lg">{mv.label}</span>
                </div>
                <p className="text-white/60 leading-relaxed">{mv.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-3">What We Stand For</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-xl border border-white/8 text-center"
                style={{ background: "rgba(255,255,255,0.02)" }}
              >
                <v.icon className="w-8 h-8 text-[#06B6D4] mx-auto mb-3" />
                <h3 className="text-white font-semibold mb-2">{v.title}</h3>
                <p className="text-white/40 text-sm">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-3">Our Journey</h2>
          </div>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[#2563EB] to-[#06B6D4] opacity-30" />
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-start gap-6 pl-16 relative"
                >
                  <div className="absolute left-6 top-1 w-4 h-4 rounded-full border-2 border-[#2563EB] bg-[#0B1F3A]" />
                  <div className="flex-1">
                    <div className="flex items-baseline gap-3 mb-1">
                      <span className="text-[#06B6D4] font-bold text-sm">{m.year}</span>
                      <span className="text-white font-semibold">{m.title}</span>
                    </div>
                    <p className="text-white/40 text-sm">{m.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-3">The Team</h2>
            <p className="text-white/40">Built by people who've been in your shoes.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-xl border border-white/8 text-center"
                style={{ background: "rgba(255,255,255,0.02)" }}
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#2563EB]/30 to-[#06B6D4]/30 mx-auto mb-4 flex items-center justify-center border border-white/10">
                  <span className="text-white font-bold text-xl">{member.name[0]}</span>
                </div>
                <h3 className="text-white font-semibold mb-0.5">{member.name}</h3>
                <div className="text-[#06B6D4] text-xs mb-3">{member.role}</div>
                <p className="text-white/40 text-xs leading-relaxed">{member.bio || member.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center border-t border-white/5">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-4">Want to Know More?</h2>
          <p className="text-white/50 mb-8">Talk to us. We genuinely love hearing from businesses who are on the same journey.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/book-demo" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#2563EB] to-[#1d4ed8] text-white font-semibold rounded-xl shadow-lg shadow-blue-500/25 transition-all">
              Book a Demo <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/5 transition-all">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
