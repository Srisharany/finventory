import { motion } from "framer-motion";
import { Link } from "wouter";
import { Check, X, ArrowRight, Zap } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const plans = [
  {
    name: "Starter",
    price: "₹999",
    period: "/month",
    desc: "Perfect for small businesses just getting started.",
    highlight: false,
    features: [
      "Up to 2 users",
      "Accounting & invoicing",
      "Basic inventory (500 items)",
      "GST filing (GSTR-1, 3B)",
      "5 bank accounts",
      "Email support",
      "Mobile app access",
      "50 MB storage",
    ],
    notIncluded: ["Payroll", "CRM", "HR Management", "Multi-location", "API access", "Dedicated support"],
  },
  {
    name: "Business",
    price: "₹2,999",
    period: "/month",
    desc: "For growing businesses that need more power.",
    highlight: true,
    badge: "Most Popular",
    features: [
      "Up to 15 users",
      "Everything in Starter",
      "Full inventory management",
      "Payroll (unlimited employees)",
      "CRM with pipeline",
      "HR Management",
      "Multi-location support",
      "5 GB storage",
      "Priority email & phone support",
      "All GST reports",
      "Custom reports",
    ],
    notIncluded: ["Custom integrations", "Dedicated account manager"],
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    desc: "For large organizations with complex requirements.",
    highlight: false,
    features: [
      "Unlimited users",
      "Everything in Business",
      "Custom integrations & APIs",
      "Dedicated account manager",
      "24/7 phone support",
      "Custom onboarding",
      "SLA guarantee",
      "Unlimited storage",
      "White-label options",
      "On-premise deployment",
      "Custom compliance modules",
    ],
    notIncluded: [],
  },
];

const comparison = [
  { feature: "Users", starter: "2", business: "15", enterprise: "Unlimited" },
  { feature: "Accounting", starter: true, business: true, enterprise: true },
  { feature: "Inventory Items", starter: "500", business: "Unlimited", enterprise: "Unlimited" },
  { feature: "GST Filing", starter: true, business: true, enterprise: true },
  { feature: "Payroll", starter: false, business: true, enterprise: true },
  { feature: "CRM", starter: false, business: true, enterprise: true },
  { feature: "HR Management", starter: false, business: true, enterprise: true },
  { feature: "Multi-location", starter: false, business: true, enterprise: true },
  { feature: "Custom Reports", starter: false, business: true, enterprise: true },
  { feature: "API Access", starter: false, business: false, enterprise: true },
  { feature: "Dedicated Support", starter: false, business: false, enterprise: true },
  { feature: "SLA Guarantee", starter: false, business: false, enterprise: true },
];

export default function Pricing() {
  return (
    <div className="min-h-screen" style={{ background: "#0B1F3A" }}>
      <Navbar />

      <section className="pt-32 pb-20 text-center relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#2563EB]/8 blur-[80px]" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="text-[#06B6D4] text-sm font-semibold uppercase tracking-wider mb-3">Transparent Pricing</div>
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
              Simple, Fair{" "}
              <span className="gradient-text">Pricing</span>
            </h1>
            <p className="text-white/50 text-lg max-w-2xl mx-auto mb-2">
              No hidden fees. No surprises. Pay monthly, cancel anytime.
            </p>
            <p className="text-[#06B6D4] text-sm">14-day free trial on all plans. No credit card required.</p>
          </motion.div>
        </div>
      </section>

      {/* Plans */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-6">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative rounded-2xl border overflow-hidden ${
                  plan.highlight
                    ? "border-[#2563EB]/60 shadow-2xl shadow-blue-500/20"
                    : "border-white/8"
                }`}
                style={{ background: plan.highlight ? "rgba(37,99,235,0.08)" : "rgba(255,255,255,0.02)" }}
              >
                {plan.highlight && (
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#2563EB] to-[#06B6D4]" />
                )}
                {plan.badge && (
                  <div className="absolute top-4 right-4">
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-[#2563EB] text-white flex items-center gap-1">
                      <Zap className="w-3 h-3" /> {plan.badge}
                    </span>
                  </div>
                )}
                <div className="p-7">
                  <h3 className="text-white font-bold text-xl mb-1">{plan.name}</h3>
                  <p className="text-white/40 text-sm mb-5">{plan.desc}</p>
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className={`font-black ${plan.price === "Custom" ? "text-3xl" : "text-4xl"} text-white`}>{plan.price}</span>
                    <span className="text-white/40 text-sm">{plan.period}</span>
                  </div>
                  <Link
                    href={plan.price === "Custom" ? "/contact" : "/book-demo"}
                    className={`block w-full py-3 text-center font-semibold rounded-xl transition-all text-sm ${
                      plan.highlight
                        ? "bg-gradient-to-r from-[#2563EB] to-[#1d4ed8] text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50"
                        : "border border-white/20 text-white hover:bg-white/5"
                    }`}
                  >
                    {plan.price === "Custom" ? "Contact Sales" : "Start Free Trial"}
                  </Link>
                </div>
                <div className="px-7 pb-7 border-t border-white/5 pt-6">
                  <div className="text-white/40 text-xs uppercase tracking-wider mb-4 font-semibold">What's included</div>
                  <ul className="space-y-2.5">
                    {plan.features.map(f => (
                      <li key={f} className="flex items-start gap-2 text-sm text-white/70">
                        <Check className="w-4 h-4 text-[#06B6D4] shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                    {plan.notIncluded.map(f => (
                      <li key={f} className="flex items-start gap-2 text-sm text-white/25">
                        <X className="w-4 h-4 text-white/20 shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="pb-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white text-center mb-8">Full Feature Comparison</h2>
          <div className="rounded-2xl border border-white/8 overflow-hidden" style={{ background: "rgba(255,255,255,0.02)" }}>
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left px-6 py-4 text-white/40 text-sm font-medium">Feature</th>
                  {["Starter", "Business", "Enterprise"].map(p => (
                    <th key={p} className={`px-6 py-4 text-sm font-semibold ${p === "Business" ? "text-[#06B6D4]" : "text-white"}`}>{p}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparison.map((row, i) => (
                  <tr key={row.feature} className={`border-b border-white/5 ${i % 2 === 0 ? "" : "bg-white/1"}`}>
                    <td className="px-6 py-3.5 text-white/60 text-sm">{row.feature}</td>
                    {(["starter", "business", "enterprise"] as const).map(p => (
                      <td key={p} className="px-6 py-3.5 text-center">
                        {typeof row[p] === "boolean" ? (
                          row[p]
                            ? <Check className="w-4 h-4 text-[#06B6D4] mx-auto" />
                            : <X className="w-4 h-4 text-white/15 mx-auto" />
                        ) : (
                          <span className="text-white/70 text-sm">{row[p]}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#2563EB]/10 to-[#06B6D4]/5" />
        <div className="relative max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-4">Not Sure Which Plan?</h2>
          <p className="text-white/50 mb-8">Talk to our team. We'll recommend the right plan for your business size and needs.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/book-demo" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#2563EB] to-[#1d4ed8] text-white font-semibold rounded-xl shadow-lg shadow-blue-500/25 transition-all">
              Book Free Demo <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/5 transition-all">
              Contact Sales
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
