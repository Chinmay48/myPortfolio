"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Mail, MessageSquare, Send, User, AtSign, CheckCircle, AlertCircle } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | 'idle', message: string }>({
    type: 'idle',
    message: ''
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: 'idle', message: '' });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok) {
        setStatus({ type: 'success', message: "Message sent successfully! I'll get back to you soon." });
        setFormData({ name: "", email: "", subject: "", message: "" }); // Reset form
      } else {
        throw new Error(result.error || "Something went wrong.");
      }
    } catch (error: any) {
      setStatus({ type: 'error', message: error.message || "Failed to send message. Please try again." });
    } finally {
      setIsSubmitting(false);
      // Clear status after 5 seconds
      setTimeout(() => setStatus({ type: 'idle', message: '' }), 5000);
    }
  };

  return (
    <section className="relative py-20 px-6 bg-[#0A0A0A] overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[var(--purple)] opacity-[0.03] blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Get In <span className="text-[var(--cyan)]">Touch</span>
          </h2>
          <p className="text-gray-400 max-w-lg mx-auto">
            Have a project in mind or just want to say hi? Feel free to reach out. 
            I'm always open to new opportunities!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-[2.5rem] shadow-2xl"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="space-y-2">
                <label className="text-sm font-mono text-gray-400 ml-1">Full Name</label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[var(--cyan)] transition-colors" size={18} />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white outline-none focus:border-[var(--cyan)] focus:ring-1 focus:ring-[var(--cyan)] transition-all"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-mono text-gray-400 ml-1">Email Address</label>
                <div className="relative group">
                  <AtSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[var(--cyan)] transition-colors" size={18} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white outline-none focus:border-[var(--cyan)] focus:ring-1 focus:ring-[var(--cyan)] transition-all"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Subject */}
            <div className="space-y-2">
              <label className="text-sm font-mono text-gray-400 ml-1">Subject</label>
              <div className="relative group">
                <MessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[var(--cyan)] transition-colors" size={18} />
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Inquiry for project"
                  className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white outline-none focus:border-[var(--cyan)] focus:ring-1 focus:ring-[var(--cyan)] transition-all"
                  required
                />
              </div>
            </div>

            {/* Message */}
            <div className="space-y-2">
              <label className="text-sm font-mono text-gray-400 ml-1">Your Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                placeholder="Tell me about your idea..."
                className="w-full bg-black/40 border border-white/10 rounded-3xl p-6 text-white outline-none focus:border-[var(--cyan)] focus:ring-1 focus:ring-[var(--cyan)] transition-all resize-none"
                required
              ></textarea>
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full py-4 rounded-2xl flex items-center justify-center gap-2 font-bold transition-all shadow-lg ${
                isSubmitting ? "bg-gray-600 cursor-not-allowed" : "bg-white text-black hover:bg-[var(--cyan)]"
              }`}
            >
              <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
              <Send size={18} className={isSubmitting ? "animate-pulse" : ""} />
            </motion.button>

            {/* Status Messages */}
            <AnimatePresence>
              {status.type !== 'idle' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`flex items-center justify-center gap-2 text-sm font-medium p-4 rounded-xl ${
                    status.type === 'success' ? "text-emerald-400 bg-emerald-400/10" : "text-rose-400 bg-rose-400/10"
                  }`}
                >
                  {status.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
                  {status.message}
                </motion.div>
              )}
            </AnimatePresence>
          </form>

          <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[var(--cyan)]/10 flex items-center justify-center text-[var(--cyan)]">
                <Mail size={20} />
              </div>
              <span className="text-gray-300 font-medium text-sm md:text-base">chinmaytakke48@gmail.com</span>
            </div>
            <div className="flex gap-4 text-gray-500 text-xs font-mono uppercase tracking-widest">
              Available for Hire
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}