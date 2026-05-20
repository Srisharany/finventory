import { Link } from "wouter";
import { BarChart3, Mail, Phone, MapPin, Linkedin, Twitter, Facebook, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer style={{ background: "#060f1e" }} className="border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#2563EB] to-[#06B6D4] flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">Fin<span className="text-[#06B6D4]">ventory</span></span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-6 max-w-xs">
              India's most complete business management platform. Accounting, inventory, payroll, CRM, HR, and analytics — all in one place.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: Linkedin, href: "#" },
                { icon: Twitter, href: "#" },
                { icon: Facebook, href: "#" },
                { icon: Youtube, href: "#" },
              ].map(({ icon: Icon, href }, i) => (
                <a key={i} href={href} className="w-9 h-9 rounded-lg bg-white/5 hover:bg-[#2563EB]/20 border border-white/10 hover:border-[#2563EB]/40 flex items-center justify-center text-white/50 hover:text-[#06B6D4] transition-all">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Products</h4>
            <ul className="space-y-3">
              {["Accounting", "Inventory", "Payroll", "CRM", "HR Management", "Analytics", "GST Filing"].map(p => (
                <li key={p}><Link href="/services" className="text-white/50 hover:text-[#06B6D4] text-sm transition-colors">{p}</Link></li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Company</h4>
            <ul className="space-y-3">
              {[
                { label: "About Us", href: "/about" },
                { label: "Industries", href: "/industries" },
                { label: "Pricing", href: "/pricing" },
                { label: "Blog", href: "/blog" },
                { label: "FAQ", href: "/faq" },
                { label: "Book Demo", href: "/book-demo" },
              ].map(l => (
                <li key={l.href}><Link href={l.href} className="text-white/50 hover:text-[#06B6D4] text-sm transition-colors">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-white/50 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 text-[#06B6D4] shrink-0" />
                <span>Karimnagar,Telangana</span>
              </li>
              <li>
                <a href="tel:+9183408 04742" className="flex items-center gap-2 text-white/50 hover:text-[#06B6D4] text-sm transition-colors">
                  <Phone className="w-4 h-4 text-[#06B6D4]" />
                  +91 83408 04742
                </a>
              </li>
              <li>
                <a href="mailto:founderfinventory@gmail.com" className="flex items-center gap-2 text-white/50 hover:text-[#06B6D4] text-sm transition-colors">
                  <Mail className="w-4 h-4 text-[#06B6D4]" />
                  founderfinventory@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-sm">© 2024 Finventory Technologies Pvt. Ltd. All rights reserved.</p>
          <div className="flex items-center gap-6 text-sm text-white/30">
            <a href="#" className="hover:text-white/60 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white/60 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white/60 transition-colors">Refund Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
