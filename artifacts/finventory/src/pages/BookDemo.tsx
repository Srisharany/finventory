import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Building2, Users, ArrowRight, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { useSubmitDemoBooking } from "@workspace/api-client-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const industries = ["Retail", "Wholesale", "Manufacturing", "Pharmacy", "Restaurants", "Ecommerce", "Startups", "Other"];
const companySizes = ["1–10 employees", "11–50 employees", "51–200 employees", "201–500 employees", "500+ employees"];
const timeSlots = ["10:00 AM", "11:00 AM", "12:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"];

const perks = [
  "30-minute personalized walkthrough",
  "Custom demo based on your industry",
  "Live Q&A with a product expert",
  "Pricing tailored to your business size",
  "No obligation, no hard sell",
];

export default function BookDemo() {
  const [form, setForm] = useState({
    fullName: "", businessName: "", industry: "", phone: "", email: "",
    companySize: "", preferredDate: "", preferredTime: "", message: ""
  });
  const mutation = useSubmitDemoBooking();

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [field]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { fullName, businessName, industry, phone, email, companySize, preferredDate, preferredTime } = form;
    if (!fullName || !businessName || !industry || !phone || !email || !companySize || !preferredDate || !preferredTime) {
      toast.error("Please fill in all required fields");
      return;
    }
    mutation.mutate(
      { data: form },
      {
        onSuccess: () => {
          toast.success("Demo booked! Our team will confirm within 2 hours.");
          setForm({ fullName: "", businessName: "", industry: "", phone: "", email: "", companySize: "", preferredDate: "", preferredTime: "", message: "" });
        },
        onError: () => toast.error("Something went wrong. Please try again."),
      }
    );
  };

  const inputClass = "w-full px-4 py-2.5 rounded-lg border border-white/10 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#2563EB]/50 focus:ring-1 focus:ring-[#2563EB]/30 transition-all";
  const inputStyle = { background: "rgba(255,255,255,0.05)" };
  const selectStyle = { background: "#112644" };

  return (
    <div className="min-h-screen" style={{ background: "#0B1F3A" }}>
      <Navbar />

      <section className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-16 items-start">
            {/* Left Info */}
            <div className="lg:col-span-2">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
                <div className="text-[#06B6D4] text-sm font-semibold uppercase tracking-wider mb-3">Free Demo</div>
                <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                  See Finventory in Action
                </h1>
                <p className="text-white/50 leading-relaxed mb-8">
                  Book a free 30-minute personalized demo. Our expert will show you exactly how Finventory works for businesses like yours.
                </p>
                <div className="space-y-3 mb-8">
                  {perks.map(p => (
                    <div key={p} className="flex items-center gap-2.5 text-white/60 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-[#06B6D4] shrink-0" />
                      {p}
                    </div>
                  ))}
                </div>
                <div className="p-5 rounded-xl border border-[#2563EB]/20 bg-[#2563EB]/5">
                  <div className="text-white font-semibold mb-1 text-sm">Trusted by 500+ businesses</div>
                  <div className="text-white/40 text-xs">Average onboarding time: 2 days. Average customer rating: 4.9/5.</div>
                </div>
              </motion.div>
            </div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-3 p-8 rounded-2xl border border-white/8"
              style={{ background: "rgba(255,255,255,0.02)" }}
            >
              <h2 className="text-lg font-bold text-white mb-6">Book Your Demo Slot</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/50 text-xs mb-1.5 uppercase tracking-wider">Full Name *</label>
                    <input type="text" placeholder="Rajesh Sharma" className={inputClass} style={inputStyle} value={form.fullName} onChange={set("fullName")} />
                  </div>
                  <div>
                    <label className="block text-white/50 text-xs mb-1.5 uppercase tracking-wider">Business Name *</label>
                    <input type="text" placeholder="Sharma Enterprises" className={inputClass} style={inputStyle} value={form.businessName} onChange={set("businessName")} />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/50 text-xs mb-1.5 uppercase tracking-wider">Phone *</label>
                    <input type="tel" placeholder="+91 98765 43210" className={inputClass} style={inputStyle} value={form.phone} onChange={set("phone")} />
                  </div>
                  <div>
                    <label className="block text-white/50 text-xs mb-1.5 uppercase tracking-wider">Email *</label>
                    <input type="email" placeholder="rajesh@company.com" className={inputClass} style={inputStyle} value={form.email} onChange={set("email")} />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/50 text-xs mb-1.5 uppercase tracking-wider">Industry *</label>
                    <select className={inputClass} style={selectStyle} value={form.industry} onChange={set("industry")}>
                      <option value="">Select industry</option>
                      {industries.map(i => <option key={i} value={i}>{i}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-white/50 text-xs mb-1.5 uppercase tracking-wider">Company Size *</label>
                    <select className={inputClass} style={selectStyle} value={form.companySize} onChange={set("companySize")}>
                      <option value="">Select size</option>
                      {companySizes.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/50 text-xs mb-1.5 uppercase tracking-wider flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" /> Preferred Date *
                    </label>
                    <input
                      type="date"
                      className={inputClass}
                      style={inputStyle}
                      value={form.preferredDate}
                      min={new Date().toISOString().split("T")[0]}
                      onChange={set("preferredDate")}
                    />
                  </div>
                  <div>
                    <label className="block text-white/50 text-xs mb-1.5 uppercase tracking-wider flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" /> Preferred Time *
                    </label>
                    <select className={inputClass} style={selectStyle} value={form.preferredTime} onChange={set("preferredTime")}>
                      <option value="">Select time (IST)</option>
                      {timeSlots.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-white/50 text-xs mb-1.5 uppercase tracking-wider">Any specific requirements?</label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about your business challenges or what you'd like to see in the demo..."
                    className={`${inputClass} resize-none`}
                    style={inputStyle}
                    value={form.message}
                    onChange={set("message")}
                  />
                </div>
                <button
                  type="submit"
                  disabled={mutation.isPending}
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-[#2563EB] to-[#1d4ed8] text-white font-semibold rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
                >
                  {mutation.isPending ? "Booking..." : <><Calendar className="w-4 h-4" /> Book My Free Demo</>}
                </button>
                <p className="text-center text-white/30 text-xs">No credit card required. Our team will confirm your slot within 2 hours.</p>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
