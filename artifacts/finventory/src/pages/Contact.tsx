import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, MessageCircle, Clock, Send } from "lucide-react";
import { toast } from "sonner";
import { useSubmitContact } from "@workspace/api-client-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", subject: "", message: "" });
  const mutation = useSubmitContact();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields");
      return;
    }
    mutation.mutate(
      { data: form },
      {
        onSuccess: () => {
          toast.success("Message sent! We'll get back to you within 24 hours.");
          setForm({ name: "", email: "", phone: "", company: "", subject: "", message: "" });
        },
        onError: () => toast.error("Something went wrong. Please try again."),
      }
    );
  };

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [field]: e.target.value }));

  return (
    <div className="min-h-screen" style={{ background: "#0B1F3A" }}>
      <Navbar />

      <section className="pt-32 pb-20 text-center relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-[#2563EB]/8 blur-[80px]" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="text-[#06B6D4] text-sm font-semibold uppercase tracking-wider mb-3">Get In Touch</div>
            <h1 className="text-5xl font-bold text-white mb-4">Let's Talk Business</h1>
            <p className="text-white/50 text-lg">Have questions? Our team responds within 24 hours on business days.</p>
          </motion.div>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Contact Info */}
            <div className="space-y-5">
              {[
                { icon: Phone, label: "Phone", value: "+91 1800 123 4567", sub: "Mon–Sat, 9 AM–8 PM IST", href: "tel:+911800123456" },
                { icon: Mail, label: "Email", value: "hello@finventory.in", sub: "We respond within 24 hours", href: "mailto:hello@finventory.in" },
                { icon: MapPin, label: "Office", value: "Cyber City Tower, Gurugram", sub: "Haryana 122002, India", href: "#" },
                { icon: Clock, label: "Support Hours", value: "24/7 for Premium Plans", sub: "Business hours for Standard", href: "#" },
              ].map(item => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4 p-5 rounded-xl border border-white/8 hover:border-[#2563EB]/30 transition-all block"
                  style={{ background: "rgba(255,255,255,0.02)" }}
                >
                  <div className="w-10 h-10 rounded-lg bg-[#2563EB]/20 flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-[#06B6D4]" />
                  </div>
                  <div>
                    <div className="text-white/40 text-xs mb-0.5">{item.label}</div>
                    <div className="text-white font-medium text-sm">{item.value}</div>
                    <div className="text-white/30 text-xs mt-0.5">{item.sub}</div>
                  </div>
                </motion.a>
              ))}

              {/* WhatsApp CTA */}
              <a
                href="https://wa.me/911800123456"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-xl border border-green-500/30 bg-green-500/10 hover:bg-green-500/20 transition-all"
              >
                <MessageCircle className="w-5 h-5 text-green-400" />
                <div>
                  <div className="text-green-400 font-semibold text-sm">Chat on WhatsApp</div>
                  <div className="text-white/40 text-xs">Quick responses for product queries</div>
                </div>
              </a>

              {/* Map placeholder */}
              <div className="rounded-xl border border-white/8 overflow-hidden h-48 flex items-center justify-center" style={{ background: "rgba(37,99,235,0.05)" }}>
                <div className="text-center">
                  <MapPin className="w-8 h-8 text-[#2563EB]/40 mx-auto mb-2" />
                  <div className="text-white/30 text-sm">Cyber City, Gurugram</div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2 p-8 rounded-2xl border border-white/8"
              style={{ background: "rgba(255,255,255,0.02)" }}
            >
              <h2 className="text-xl font-bold text-white mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label="Full Name *" type="text" placeholder="Rajesh Sharma" value={form.name} onChange={set("name")} />
                  <Field label="Email Address *" type="email" placeholder="rajesh@company.com" value={form.email} onChange={set("email")} />
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label="Phone Number" type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={set("phone")} />
                  <Field label="Company Name" type="text" placeholder="Sharma Enterprises" value={form.company} onChange={set("company")} />
                </div>
                <div>
                  <label className="block text-white/60 text-sm mb-1.5">Subject</label>
                  <select
                    value={form.subject}
                    onChange={set("subject")}
                    className="w-full px-4 py-2.5 rounded-lg border border-white/10 text-white text-sm focus:outline-none focus:border-[#2563EB]/50 focus:ring-1 focus:ring-[#2563EB]/30 transition-all"
                    style={{ background: "rgba(255,255,255,0.05)" }}
                  >
                    <option value="" style={{ background: "#0B1F3A" }}>Select a subject</option>
                    <option value="Product Inquiry" style={{ background: "#0B1F3A" }}>Product Inquiry</option>
                    <option value="Pricing" style={{ background: "#0B1F3A" }}>Pricing</option>
                    <option value="Technical Support" style={{ background: "#0B1F3A" }}>Technical Support</option>
                    <option value="Partnership" style={{ background: "#0B1F3A" }}>Partnership</option>
                    <option value="Other" style={{ background: "#0B1F3A" }}>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-white/60 text-sm mb-1.5">Message *</label>
                  <textarea
                    rows={5}
                    placeholder="Tell us about your business and what you're looking for..."
                    value={form.message}
                    onChange={set("message")}
                    className="w-full px-4 py-2.5 rounded-lg border border-white/10 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#2563EB]/50 focus:ring-1 focus:ring-[#2563EB]/30 transition-all resize-none"
                    style={{ background: "rgba(255,255,255,0.05)" }}
                  />
                </div>
                <button
                  type="submit"
                  disabled={mutation.isPending}
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-[#2563EB] to-[#1d4ed8] text-white font-semibold rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
                >
                  {mutation.isPending ? "Sending..." : <><Send className="w-4 h-4" /> Send Message</>}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function Field({ label, type, placeholder, value, onChange }: { label: string; type: string; placeholder: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
  return (
    <div>
      <label className="block text-white/60 text-sm mb-1.5">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2.5 rounded-lg border border-white/10 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#2563EB]/50 focus:ring-1 focus:ring-[#2563EB]/30 transition-all"
        style={{ background: "rgba(255,255,255,0.05)" }}
      />
    </div>
  );
}
