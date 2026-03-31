"use client";

import { showError, showSuccess } from "@/utils/toast";
import { motion } from "framer-motion";
import { Code, Image as ImageIcon, Layers, PlusCircle, Save, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SkillForm({ initialData }: any) {
  const router = useRouter();
  const [form, setForm] = useState({
    name: initialData?.name || "",
    icon: initialData?.icon || "",
    category: initialData?.category || "frontend",
  });

  const isEdit = !!initialData;

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const url = isEdit ? `/api/skills/${initialData._id}` : `/api/skills`;
      const res = await fetch(url, {
        method: isEdit ? "PUT" : "POST",
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error("Request failed");
      
      showSuccess(data.message);
      router.push("/admin/skills");
      router.refresh();
    } catch (error: any) {
      showError(error.message);
    }
  };
  

  return (
    <motion.form
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="bg-[#0A0A0A] border border-white/5 p-8 rounded-2xl space-y-8 max-w-xl shadow-2xl relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-[60px] rounded-full pointer-events-none" />

      <div className="space-y-6">
        {/* Name */}
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 flex gap-2 items-center">
            <Code size={14} className="text-cyan-500" /> Skill Label
          </label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="e.g. Next.js"
            className="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-white focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 outline-none transition-all placeholder:text-gray-700"
          />
        </div>

        {/* Icon */}
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 flex gap-2 items-center">
            <ImageIcon size={14} className="text-cyan-500" /> Icon Identifier
          </label>
          <input
            name="icon"
            value={form.icon}
            placeholder="react / node / mongodb"
            onChange={handleChange}
            className="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-white focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 outline-none transition-all placeholder:text-gray-700"
          />
        </div>

        {/* Category */}
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 flex gap-2 items-center">
            <Layers size={14} className="text-cyan-500" /> Segment
          </label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full p-4 bg-[#0F0F0F] border border-white/10 rounded-xl text-white focus:border-cyan-500/50 outline-none transition-all cursor-pointer appearance-none"
          >
            <option value="frontend">Frontend Development</option>
            <option value="backend">Backend & Logic</option>
            <option value="tools">Infrastructure & Tools</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-3 pt-4">
        <button
          type="submit"
          className="w-full py-4 bg-cyan-500 text-black rounded-xl font-black uppercase text-xs tracking-[0.2em] shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_35px_rgba(6,182,212,0.5)] transition-all flex items-center justify-center gap-3"
        >
          {isEdit ? <Save size={18} /> : <PlusCircle size={18} />}
          {isEdit ? "Update Registry" : "Initialize Skill"}
        </button>
        
        <button
          type="button"
          onClick={() => router.back()}
          className="w-full py-3 text-gray-500 text-[10px] font-bold uppercase tracking-widest hover:text-white transition-colors flex items-center justify-center gap-2"
        >
          <ArrowLeft size={12} /> Return to Inventory
        </button>
      </div>
    </motion.form>
  );
}