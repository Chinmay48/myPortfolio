"use client";
import * as Icons from "react-icons/si";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Code2, Trash2, Edit3, Layers, Terminal } from "lucide-react";
import Link from "next/link";
import { showError, showSuccess } from "@/utils/toast";

export default function AdminSkillPage() {
  const [skills, setSkills] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const fetchSkills = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/skills");
      const data = await res.json();
      if (!res.ok) throw new Error("Failed to fetch");
      setSkills(data.data);
    } catch (error: any) {
      showError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Permanently delete this skill from the database?")) return;
    try {
      const res = await fetch(`/api/skills/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error("Delete failed");
      showSuccess(data.message);
      setSkills((prev) => prev.filter((s) => s._id !== id));
    } catch (error: any) {
      showError(error.message);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="flex items-center gap-2 text-cyan-500 mb-2">
            <Terminal size={16} />
            <span className="text-xs font-bold uppercase tracking-[0.3em]">
              Core Competencies
            </span>
          </div>
          <h1 className="text-4xl font-black text-white">
            Skill{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Inventory
            </span>
          </h1>
        </motion.div>

        <Link href="/admin/skills/create">
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 20px rgba(6,182,212,0.4)",
            }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 bg-cyan-500 text-black px-6 py-3 rounded-2xl font-bold uppercase text-xs tracking-widest transition-all"
          >
            <Plus size={18} /> Add New Skill
          </motion.button>
        </Link>
      </div>
      {loading && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse bg-white/5 h-32 rounded-2xl border border-white/10"
            />
          ))}
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        <AnimatePresence mode="popLayout">
          {skills.map((skill) => {
            const Icon =
              Icons[
                ("Si" +
                  skill.icon.charAt(0).toUpperCase() +
                  skill.icon.slice(1)) as keyof typeof Icons
              ];
            return (
              <motion.div
                key={skill._id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group relative bg-[#0A0A0A] p-5 rounded-2xl border border-white/5 hover:border-cyan-500/30 transition-all duration-300 shadow-xl"
              >
                <div className="flex flex-col h-full">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500 group-hover:text-black transition-colors">
                      {Icon ? <Icon size={20} /> : <Code2 size={20} />}
                    </div>
                    <span className="text-[9px] font-bold uppercase tracking-widest text-gray-500 bg-white/5 px-2 py-1 rounded">
                      {skill.category}
                    </span>
                  </div>

                  <h3 className="text-white font-bold tracking-tight mb-6">
                    {skill.name}
                  </h3>

                  <div className="mt-auto flex gap-2">
                    <button
                      onClick={() => router.push(`/admin/skills/${skill._id}`)}
                      className="flex-1 py-2 rounded-lg bg-white/5 text-gray-400 text-[10px] font-bold uppercase tracking-tighter hover:bg-white/10 hover:text-white transition-all flex items-center justify-center gap-1"
                    >
                      <Edit3 size={12} /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(skill._id)}
                      className="p-2 rounded-lg bg-rose-500/5 text-rose-500/60 hover:text-rose-500 hover:bg-rose-500/10 transition-all"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                {/* Subtle bottom glow */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-cyan-500/0 group-hover:bg-cyan-500/40 blur-[2px] transition-all" />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
