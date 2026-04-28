"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "/projects" },
  { name: "Experience", href: "/experience" },
  { name: "Achievements", href: "/achievements" },
  {name:"Login",href:"/login"}
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  

  return (
    <nav className="fixed top-0 w-full z-[100] backdrop-blur-xl bg-black/50 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/" className="text-2xl font-black tracking-tighter">
            <span className="bg-gradient-to-r from-[var(--cyan)] to-[var(--purple)] bg-clip-text text-transparent uppercase">
              Chinmay<span className="text-white">.dev</span>
            </span>
          </Link>
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center">
          {navLinks.map((link, i) => (
            <motion.div
              key={link.name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link href={link.href} className="text-sm font-medium text-gray-400 hover:text-[var(--cyan)] transition-colors relative group">
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[var(--cyan)] transition-all duration-300 group-hover:w-full" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Mobile Button */}
        <button className="md:hidden text-white" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/90 border-b border-white/10 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-6">
              {navLinks.map((link) => (
                <Link key={link.name} href={link.href} onClick={() => setOpen(false)} className="text-xl font-bold text-gray-300">
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}