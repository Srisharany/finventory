import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  DollarSign, Package, Users, UserCheck, FileText, BarChart3,
  TrendingUp, Settings, CheckCircle2, ArrowRight
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const services = [
  {
    icon: DollarSign,
    title: "Accounting Solutions",
    subtitle: "Complete financial management",
    desc: "Our double-entry accounting module gives you real-time visibility into your business finances. Track revenues, expenses, and profitability with automated journal entries and bank reconciliation.",
    benefits: [
      "Real-time P&L, balance sheet, and cash flow statements",
      "Automated bank reconciliation",
      "Multi-currency support",
      "Accounts payable and receivable management",
      "Depreciation and asset management",
      "150+ financial reports",
    ],
    color: "#2563EB",
  },
  {
    icon: Package,
    title: "Inventory Management",
    subtitle: "Smart stock control across locations",
    desc: "Manage inventory across unlimited locations with real-time tracking, barcode scanning, and intelligent reorder alerts. Reduce stockouts and overstock simultaneously.",
    benefits: [
      "Multi-location warehouse management",
      "Barcode and QR code scanning",
      "Batch and serial number tracking",
      "Automatic reorder point alerts",
      "Stock aging and valuation reports",
      "Expiry date management",
    ],
    color: "#06B6D4",
  },
  {
    icon: Users,
    title: "Payroll Services",
    subtitle: "Automated, compliant payroll processing",
    desc: "Process payroll for unlimited employees with automatic calculation of PF, ESI, TDS, professional tax, and LWF. Generate payslips and transfer salaries directly to bank accounts.",
    benefits: [
      "Automatic PF, ESI, TDS, PT calculations",
      "Direct bank transfer integration",
      "Payslip generation and distribution",
      "Attendance and leave management",
      "Form 16, 24Q, 26Q generation",
      "Labour law compliance",
    ],
    color: "#2563EB",
  },
  {
    icon: UserCheck,
    title: "CRM Solutions",
    subtitle: "Turn leads into loyal customers",
    desc: "Manage your entire sales pipeline from lead capture to deal closure. Track customer interactions, automate follow-ups, and gain insights that help your team close more deals.",
    benefits: [
      "Lead capture from website and ads",
      "Visual sales pipeline management",
      "Customer interaction history",
      "Automated follow-up reminders",
      "Quotation and proposal generation",
      "Sales performance analytics",
    ],
    color: "#06B6D4",
  },
  {
    icon: Settings,
    title: "HR Management",
    subtitle: "Streamline people operations",
    desc: "From recruitment to exit, manage your entire employee lifecycle. Handle appraisals, training, and HR compliance with ease.",
    benefits: [
      "Employee profile and document management",
      "Leave and attendance tracking",
      "Performance appraisal workflows",
      "Training and development tracking",
      "HR policy management",
      "Employee self-service portal",
    ],
    color: "#2563EB",
  },
  {
    icon: BarChart3,
    title: "Reports & Analytics",
    subtitle: "Data-driven business intelligence",
    desc: "Access 200+ customizable reports and dashboards. From sales trends to cash flow forecasts, get the insights you need to make smarter decisions faster.",
    benefits: [
      "200+ built-in business reports",
      "Customizable dashboards",
      "Trend analysis and forecasting",
      "Comparative period reports",
      "Scheduled report delivery",
      "Export to Excel, PDF",
    ],
    color: "#06B6D4",
  },
  {
    icon: FileText,
    title: "GST & Tax Support",
    subtitle: "Complete GST compliance automation",
    desc: "Stay 100% compliant with Indian tax regulations. Automate GST calculations, generate e-invoices, file returns directly, and manage TDS deductions effortlessly.",
    benefits: [
      "Automated GSTR-1, GSTR-3B generation",
      "E-invoicing and e-way bill creation",
      "GST reconciliation with GSTN",
      "TDS management and Form 26Q",
      "Input tax credit tracking",
      "GST audit trail and reports",
    ],
    color: "#2563EB",
  },
  {
    icon: TrendingUp,
    title: "Business Automation",
    subtitle: "Eliminate repetitive manual tasks",
    desc: "Automate workflows across departments. From purchase order approval to invoice reminders, reduce manual work and let your team focus on what matters.",
    benefits: [
      "Automated invoice and payment reminders",
      "Purchase order approval workflows",
      "Low stock automatic reorder",
      "Scheduled backup and reports",
      "API integrations with third-party tools",
      "Custom automation rules builder",
    ],
    color: "#06B6D4",
  },
];

export default function Services() {
  return (
    <div className="min-h-screen" style={{ background: "#0B1F3A" }}>
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 text-center relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#2563EB]/8 blur-[80px]" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-block text-[#06B6D4] text-sm font-semibold uppercase tracking-wider mb-3">Our Services</div>
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
              Every Tool Your Business{" "}
              <span className="gradient-text">Needs</span>
            </h1>
            <p className="text-white/50 text-lg max-w-2xl mx-auto mb-8">
              Eight powerful modules, seamlessly integrated. Choose what you need today and expand as you grow.
            </p>
            <Link href="/book-demo" className="inline-flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-[#2563EB] to-[#1d4ed8] text-white font-semibold rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all">
              Book a Demo <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-12 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl border border-white/8 overflow-hidden"
              style={{ background: "rgba(255,255,255,0.02)" }}
            >
              <div className={`grid lg:grid-cols-2 gap-0 ${i % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
                <div className="p-8 lg:p-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `${s.color}20`, border: `1px solid ${s.color}30` }}>
                      <s.icon className="w-6 h-6" style={{ color: s.color }} />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white">{s.title}</h2>
                      <p className="text-white/40 text-sm">{s.subtitle}</p>
                    </div>
                  </div>
                  <p className="text-white/60 leading-relaxed mb-6">{s.desc}</p>
                  <Link href="/book-demo" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-all" style={{ background: s.color, boxShadow: `0 4px 20px ${s.color}30` }}>
                    Get Started <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="border-t lg:border-t-0 lg:border-l border-white/5 p-8 lg:p-10" style={{ background: "rgba(255,255,255,0.01)" }}>
                  <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Key Benefits</h3>
                  <ul className="space-y-3">
                    {s.benefits.map((b) => (
                      <li key={b} className="flex items-start gap-2.5 text-white/60 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-[#06B6D4] mt-0.5 shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-gradient-to-r from-[#2563EB]/10 to-[#06B6D4]/5" />
        <div className="relative max-w-3xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to See It in Action?</h2>
          <p className="text-white/50 mb-8">Book a personalized demo and see how Finventory works for your specific business.</p>
          <Link href="/book-demo" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#2563EB] to-[#1d4ed8] text-white font-semibold rounded-xl shadow-lg shadow-blue-500/30 transition-all hover:-translate-y-0.5">
            Book Free Demo <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
