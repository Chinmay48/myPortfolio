"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { signOut } from "next-auth/react"; // Import signOut
import { 
  LayoutDashboard, Briefcase, Cpu, GraduationCap, 
  Trophy, ChevronRight, Menu, X, LogOut 
} from "lucide-react";

const links = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Projects", href: "/admin/projects", icon: Briefcase },
  { name: "Skills", href: "/admin/skills", icon: Cpu },
  { name: "Experience", href: "/admin/experience", icon: GraduationCap },
  { name: "Achievements", href: "/admin/achievements", icon: Trophy },
];

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const handleLogout = () => {
    signOut({ callbackUrl: "/login" });
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 shadow-[0_0_15px_rgba(6,182,212,0.5)]" />
        <h2 className="text-xl font-bold tracking-tight text-white/90">
          Admin<span className="text-cyan-400">Panel</span>
        </h2>
      </div>

      <nav className="flex flex-col gap-2 flex-grow">
        {links.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;

          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`relative group flex items-center justify-between p-3 rounded-xl transition-colors duration-300 ${
                isActive ? "text-cyan-400" : "text-gray-400 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3 z-10">
                <Icon size={20} className={isActive ? "text-cyan-400" : "group-hover:text-cyan-300 transition-colors"} />
                <span className="font-medium text-sm tracking-wide">{link.name}</span>
              </div>
              {isActive && (
                <motion.div 
                  layoutId="active-pill" 
                  className="absolute inset-0 bg-cyan-500/10 border border-cyan-500/20 rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.1)]" 
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Logout Button at the Bottom */}
      <div className="pt-4 mt-4 border-t border-white/5">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 p-3 rounded-xl text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-all duration-300 group"
        >
          <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium text-sm tracking-wide">Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Toggle Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 border-b border-white/5 bg-black/60 backdrop-blur-xl z-40 flex items-center justify-between px-6">
        <div className="flex items-center gap-2">
           <div className="h-6 w-6 rounded bg-cyan-500 shadow-[0_0_10px_cyan]" />
           <span className="font-bold text-sm tracking-tighter text-white">ADMIN</span>
        </div>
        <button onClick={() => setIsOpen(true)} className="p-2 text-cyan-400 bg-cyan-400/10 rounded-lg">
          <Menu size={20} />
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 lg:hidden"
            />
            <motion.div 
              initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-72 bg-[#050505] p-6 border-r border-cyan-500/20 z-[60] lg:hidden"
            >
              <button onClick={() => setIsOpen(false)} className="absolute top-6 right-6 text-gray-500">
                <X size={24} />
              </button>
              <SidebarContent />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-72 bg-[#050505] p-6 border-r border-white/5 flex-col h-screen sticky top-0">
        <SidebarContent />
      </aside>
    </>
  );
}