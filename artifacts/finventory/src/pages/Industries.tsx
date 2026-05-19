import { motion } from "framer-motion";
import { Link } from "wouter";
import { ShoppingBag, Truck, Factory, Pill, UtensilsCrossed, ShoppingCart, Rocket, ArrowRight, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const industries = [
  {
    icon: ShoppingBag,
    title: "Retail",
    desc: "From single-store boutiques to large retail chains, Finventory powers retail businesses with real-time POS integration, inventory control, and customer loyalty management.",
    challenges: ["Managing multiple SKUs", "Cash and card reconciliation", "Seasonal demand forecasting", "Multi-store operations"],
    solutions: ["Barcode-enabled POS", "Automated reorder alerts", "Sales analytics by category", "Centralized multi-store dashboard"],
    color: "#2563EB",
  },
  {
    icon: Truck,
    title: "Wholesale",
    desc: "Handle high-volume transactions, complex pricing structures, and large dealer networks with the tools built specifically for wholesale distributors.",
    challenges: ["Dealer credit management", "Bulk pricing and discounts", "Large order fulfillment", "Regional GST compliance"],
    solutions: ["Credit limit tracking", "Tiered pricing management", "Automated invoicing", "State-wise GST calculations"],
    color: "#06B6D4",
  },
  {
    icon: Factory,
    title: "Manufacturing",
    desc: "Track raw materials, manage production workflows, and maintain quality control across your manufacturing operations with end-to-end visibility.",
    challenges: ["Raw material tracking", "Production cost calculation", "Quality control", "Multi-shift operations"],
    solutions: ["BOM and production planning", "Job costing and WIP tracking", "Quality check workflows", "Shift-wise production reports"],
    color: "#2563EB",
  },
  {
    icon: Pill,
    title: "Pharmacy",
    desc: "Stay compliant with drug regulatory requirements while managing inventory, expiry dates, and prescriptions with pharmacy-specific features.",
    challenges: ["Drug expiry management", "Schedule H/H1 compliance", "Batch tracking recall", "Multiple supplier management"],
    solutions: ["FIFO/FEFO inventory", "Near-expiry alerts", "Batch-wise tracking", "Supplier performance analysis"],
    color: "#06B6D4",
  },
  {
    icon: UtensilsCrossed,
    title: "Restaurants",
    desc: "From fine dining to QSR chains, manage your kitchen, control food costs, and deliver great customer experiences with restaurant-ready features.",
    challenges: ["Perishable inventory waste", "Recipe cost control", "Multiple outlets", "Table and billing management"],
    solutions: ["Recipe-based cost tracking", "Daily purchase planning", "Outlet-wise P&L", "KOT and billing integration"],
    color: "#2563EB",
  },
  {
    icon: ShoppingCart,
    title: "Ecommerce",
    desc: "Connect your online store with inventory, accounting, and fulfillment in one place. Sell on multiple platforms without losing control of your operations.",
    challenges: ["Multi-channel inventory sync", "Returns management", "Marketplace reconciliation", "Shipping cost allocation"],
    solutions: ["Marketplace integrations", "Automated return processing", "Platform-wise P&L", "Logistics cost tracking"],
    color: "#06B6D4",
  },
  {
    icon: Rocket,
    title: "Startups",
    desc: "Fast-moving startups need tools that grow with them. Start lean with the essentials and add capabilities as your business scales.",
    challenges: ["Investor-ready reporting", "Burn rate tracking", "Rapid scaling needs", "Compliance from day one"],
    solutions: ["MIS and investor reports", "Cash burn dashboards", "Modular pricing", "GST and labour law compliance"],
    color: "#2563EB",
  },
];

export default function Industries() {
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
            <div className="text-[#06B6D4] text-sm font-semibold uppercase tracking-wider mb-3">Industries We Serve</div>
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
              Built for Your{" "}
              <span className="gradient-text">Industry</span>
            </h1>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">
              Finventory is tailored for the unique needs of different business sectors. Not a generic one-size-fits-all solution.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Industry Cards */}
      <section className="py-12 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-6">
          {industries.map((ind, i) => (
            <motion.div
              key={ind.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: (i % 2) * 0.1 }}
              className="rounded-2xl border border-white/8 overflow-hidden"
              style={{ background: "rgba(255,255,255,0.02)" }}
            >
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `${ind.color}20`, border: `1px solid ${ind.color}30` }}>
                    <ind.icon className="w-6 h-6" style={{ color: ind.color }} />
                  </div>
                  <h2 className="text-xl font-bold text-white">{ind.title}</h2>
                </div>
                <p className="text-white/50 text-sm leading-relaxed mb-6">{ind.desc}</p>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-white/40 text-xs uppercase tracking-wider mb-3 font-semibold">Key Challenges</h4>
                    <ul className="space-y-2">
                      {ind.challenges.map(c => (
                        <li key={c} className="text-white/50 text-xs flex items-start gap-1.5">
                          <span className="w-1 h-1 rounded-full bg-white/30 mt-1.5 shrink-0" />
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-[#06B6D4] text-xs uppercase tracking-wider mb-3 font-semibold">Our Solutions</h4>
                    <ul className="space-y-2">
                      {ind.solutions.map(s => (
                        <li key={s} className="text-white/60 text-xs flex items-start gap-1.5">
                          <CheckCircle2 className="w-3 h-3 text-[#06B6D4] mt-0.5 shrink-0" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="border-t border-white/5 px-8 py-4">
                <Link href="/book-demo" className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:gap-2.5" style={{ color: ind.color }}>
                  Book Demo for {ind.title} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
