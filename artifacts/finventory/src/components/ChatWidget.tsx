import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle, X, Phone, Mail, Send, ChevronRight,
  CheckCircle2
} from "lucide-react";
import { toast } from "sonner";
import { useSubmitContact } from "@workspace/api-client-react";

type Tab = "options" | "message";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<Tab>("options");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);
  const mutation = useSubmitContact();

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (widgetRef.current && !widgetRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      setTab("options");
      setSent(false);
    }, 300);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error("Please fill in all fields");
      return;
    }
    mutation.mutate(
      { data: { name, email, message, subject: "Chat Widget Inquiry" } },
      {
        onSuccess: () => {
          setSent(true);
          setName("");
          setEmail("");
          setMessage("");
        },
        onError: () => toast.error("Something went wrong. Please try again."),
      }
    );
  };

  const inputClass =
    "w-full px-3 py-2 rounded-lg border border-white/10 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#2563EB]/50 focus:ring-1 focus:ring-[#2563EB]/20 transition-all";
  const inputStyle = { background: "rgba(255,255,255,0.05)" };

  return (
    <div ref={widgetRef} className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Popup */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="w-80 rounded-2xl shadow-2xl overflow-hidden border border-white/10"
            style={{ background: "#0d2340", boxShadow: "0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)" }}
          >
            {/* Header */}
            <div className="px-5 py-4 flex items-center justify-between" style={{ background: "linear-gradient(135deg, #2563EB, #1d4ed8)" }}>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">Finventory Support</div>
                  <div className="flex items-center gap-1.5 text-white/70 text-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    We're online · Typically replies in minutes
                  </div>
                </div>
              </div>
              <button onClick={handleClose} className="text-white/60 hover:text-white transition-colors p-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="p-5">
              <AnimatePresence mode="wait">
                {/* Options tab */}
                {tab === "options" && (
                  <motion.div
                    key="options"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.15 }}
                  >
                    <p className="text-white/60 text-sm mb-4 leading-relaxed">
                      Hi there! How can we help you today?
                    </p>
                    <div className="space-y-2">
                      {/* WhatsApp */}
                      <a
                        href="https://wa.me/911800123456?text=Hi%2C%20I%27d%20like%20to%20know%20more%20about%20Finventory"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between px-4 py-3 rounded-xl border border-green-500/20 bg-green-500/5 hover:bg-green-500/10 hover:border-green-500/40 transition-all group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-green-400">
                              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                            </svg>
                          </div>
                          <div>
                            <div className="text-white text-sm font-medium">Chat on WhatsApp</div>
                            <div className="text-white/40 text-xs">Fastest response</div>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-green-400/60 group-hover:text-green-400 transition-colors" />
                      </a>

                      {/* Send a message */}
                      <button
                        onClick={() => setTab("message")}
                        className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-[#2563EB]/20 bg-[#2563EB]/5 hover:bg-[#2563EB]/10 hover:border-[#2563EB]/40 transition-all group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-[#2563EB]/20 flex items-center justify-center">
                            <Mail className="w-4 h-4 text-[#06B6D4]" />
                          </div>
                          <div className="text-left">
                            <div className="text-white text-sm font-medium">Send a message</div>
                            <div className="text-white/40 text-xs">We reply within 24 hours</div>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-[#06B6D4]/60 group-hover:text-[#06B6D4] transition-colors" />
                      </button>

                      {/* Call us */}
                      <a
                        href="tel:+911800123456"
                        className="flex items-center justify-between px-4 py-3 rounded-xl border border-white/8 bg-white/2 hover:bg-white/5 hover:border-white/20 transition-all group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                            <Phone className="w-4 h-4 text-white/60" />
                          </div>
                          <div>
                            <div className="text-white text-sm font-medium">Call us</div>
                            <div className="text-white/40 text-xs">Mon–Sat, 9 AM–8 PM IST</div>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-white/50 transition-colors" />
                      </a>
                    </div>
                  </motion.div>
                )}

                {/* Message form tab */}
                {tab === "message" && !sent && (
                  <motion.div
                    key="message"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.15 }}
                  >
                    <button
                      onClick={() => setTab("options")}
                      className="flex items-center gap-1 text-white/40 hover:text-white text-xs mb-4 transition-colors"
                    >
                      ← Back
                    </button>
                    <p className="text-white/60 text-sm mb-4">Leave us a message and we'll get back to you.</p>
                    <form onSubmit={handleSend} className="space-y-3">
                      <input
                        type="text"
                        placeholder="Your name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className={inputClass}
                        style={inputStyle}
                      />
                      <input
                        type="email"
                        placeholder="Email address"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className={inputClass}
                        style={inputStyle}
                      />
                      <textarea
                        rows={3}
                        placeholder="How can we help you?"
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        className={`${inputClass} resize-none`}
                        style={inputStyle}
                      />
                      <button
                        type="submit"
                        disabled={mutation.isPending}
                        className="w-full flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-[#2563EB] to-[#1d4ed8] text-white font-semibold rounded-xl text-sm shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 disabled:opacity-60 transition-all"
                      >
                        {mutation.isPending ? "Sending..." : <><Send className="w-3.5 h-3.5" /> Send Message</>}
                      </button>
                    </form>
                  </motion.div>
                )}

                {/* Success state */}
                {tab === "message" && sent && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-6 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
                      className="w-14 h-14 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center mx-auto mb-4"
                    >
                      <CheckCircle2 className="w-7 h-7 text-green-400" />
                    </motion.div>
                    <h3 className="text-white font-semibold mb-1">Message sent!</h3>
                    <p className="text-white/50 text-sm mb-4">We'll get back to you within 24 hours.</p>
                    <button
                      onClick={() => { setTab("options"); setSent(false); }}
                      className="text-[#2563EB] text-sm hover:text-[#06B6D4] transition-colors"
                    >
                      Back to options
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating button */}
      <motion.button
        onClick={() => setOpen(v => !v)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-14 h-14 rounded-full shadow-2xl flex items-center justify-center"
        style={{
          background: "linear-gradient(135deg, #2563EB, #1d4ed8)",
          boxShadow: "0 8px 32px rgba(37,99,235,0.5), 0 2px 8px rgba(0,0,0,0.4)"
        }}
        aria-label="Open chat"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X className="w-6 h-6 text-white" />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <MessageCircle className="w-6 h-6 text-white" />
            </motion.div>
          )}
        </AnimatePresence>
        {/* Pulse ring when closed */}
        {!open && (
          <span className="absolute inset-0 rounded-full animate-ping opacity-30" style={{ background: "#2563EB" }} />
        )}
      </motion.button>
    </div>
  );
}
