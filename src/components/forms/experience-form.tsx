"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, Variants } from "framer-motion";
import { 
  Building2, 
  UserCircle, 
  Calendar, 
  AlignLeft, 
  Cpu, 
  Save, 
  ArrowLeft,
  Sparkles,
  CheckCircle2
} from "lucide-react";
import { showError, showSuccess } from "@/utils/toast";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 300, damping: 24 } 
  },
};

export default function ExperienceForm({ initialData }: any) {
  const router = useRouter();
  
  // Helper to format Date for input[type="date"]
  const formatDate = (date: any) => {
    if (!date) return "";
    return new Date(date).toISOString().split('T')[0];
  };

  const [form, setForm] = useState({
    role: initialData?.role || "",
    company: initialData?.company || "",
    description: initialData?.description || "",
    startDate: formatDate(initialData?.startDate),
    endDate: formatDate(initialData?.endDate),
    isCurrent: initialData?.isCurrent || false,
    techStack: initialData?.techStack?.join(", ") || "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEdit = !!initialData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setForm({ ...form, [name]: val });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const url = isEdit ? `/api/experience/${initialData._id}` : `/api/experience`;
      
      // Transform techStack string to Array and ensure dates are handled
      const payload = {
        ...form,
        techStack: form.techStack.split(",").map((s: string) => s.trim()).filter((s:string)=>s!==""),
        endDate: form.isCurrent ? null : form.endDate, // Nullify end date if current
      };

      const res = await fetch(url, {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Operation failed");

      showSuccess(isEdit ? "Experience updated" : "Experience created");
      router.push("/admin/experience");
      router.refresh();
    } catch (error: any) {
      showError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8 flex items-center justify-center">
      <motion.form
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-[#0A0A0A] border border-white/10 p-6 md:p-10 rounded-[2rem] shadow-2xl relative overflow-hidden"
      >
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-cyan-500/10 blur-[100px] pointer-events-none" />

        <motion.div variants={itemVariants} className="mb-10 space-y-2">
          <div className="flex items-center gap-3 mb-1">
            <div className="p-2 bg-cyan-500/10 rounded-lg">
              <Sparkles size={18} className="text-cyan-400" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
              {isEdit ? "Edit Milestone" : "New Experience"}
            </h2>
          </div>
          <p className="text-gray-500 text-sm">Schema-validated professional entry.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
          {/* Role */}
          <motion.div variants={itemVariants} className="md:col-span-2 space-y-2 group">
            <Label icon={<UserCircle size={14} />} text="Professional Role" />
            <input
              name="role"
              required
              value={form.role}
              onChange={handleChange}
              placeholder="e.g. Senior Software Engineer"
              className="custom-input"
            />
          </motion.div>

          {/* Company */}
          <motion.div variants={itemVariants} className="md:col-span-2 space-y-2 group">
            <Label icon={<Building2 size={14} />} text="Organization" />
            <input
              name="company"
              required
              value={form.company}
              onChange={handleChange}
              placeholder="e.g. Tech Corp"
              className="custom-input"
            />
          </motion.div>

          {/* Start Date */}
          <motion.div variants={itemVariants} className="space-y-2 group">
            <Label icon={<Calendar size={14} />} text="Start Date" />
            <input
              type="date"
              name="startDate"
              required
              value={form.startDate}
              onChange={handleChange}
              className="custom-input [color-scheme:dark]"
            />
          </motion.div>

          {/* End Date or Current */}
          <motion.div variants={itemVariants} className="space-y-2 group">
            <div className="flex justify-between items-center mb-1">
               <Label icon={<Calendar size={14} />} text="End Date" />
               <label className="flex items-center gap-2 cursor-pointer group/check">
                  <input 
                    type="checkbox"
                    name="isCurrent"
                    checked={form.isCurrent}
                    onChange={handleChange}
                    className="hidden"
                  />
                  <div className={`w-4 h-4 rounded border transition-all flex items-center justify-center ${form.isCurrent ? 'bg-cyan-500 border-cyan-500' : 'border-white/20'}`}>
                    {form.isCurrent && <CheckCircle2 size={12} className="text-black" />}
                  </div>
                  <span className="text-[9px] font-bold uppercase text-gray-500 group-hover/check:text-cyan-400">Current</span>
               </label>
            </div>
            <input
              type="date"
              name="endDate"
              disabled={form.isCurrent}
              value={form.isCurrent ? "" : form.endDate}
              onChange={handleChange}
              className={`custom-input [color-scheme:dark] ${form.isCurrent ? 'opacity-30 cursor-not-allowed' : ''}`}
            />
          </motion.div>

          {/* Description */}
          <motion.div variants={itemVariants} className="md:col-span-2 space-y-2 group">
            <Label icon={<AlignLeft size={14} />} text="Description" />
            <textarea
              name="description"
              required
              rows={4}
              value={form.description}
              onChange={handleChange}
              placeholder="Responsibilities and key achievements..."
              className="custom-input resize-none"
            />
          </motion.div>

          {/* Tech Stack */}
          <motion.div variants={itemVariants} className="md:col-span-2 space-y-2 group">
            <Label icon={<Cpu size={14} />} text="Tech Stack" />
            <input
              name="techStack"
              value={form.techStack}
              onChange={handleChange}
              placeholder="React, TypeScript, MongoDB..."
              className="custom-input"
            />
            <p className="text-[9px] text-gray-600 uppercase tracking-tighter mt-1 ml-1">Comma-separated values</p>
          </motion.div>
        </div>

        <motion.div variants={itemVariants} className="flex flex-col gap-4 pt-10">
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isSubmitting}
            className="group relative w-full py-4 bg-cyan-500 text-black rounded-xl font-bold uppercase text-[11px] tracking-[0.2em] overflow-hidden transition-all disabled:opacity-50"
          >
            <div className="relative z-10 flex items-center justify-center gap-3">
              {isSubmitting ? (
                 <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              ) : (
                <>
                  <Save size={18} />
                  {isEdit ? "Commit Updates" : "Deploy Milestone"}
                </>
              )}
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
          </motion.button>

          <button
            type="button"
            onClick={() => router.back()}
            className="group flex items-center justify-center gap-2 text-gray-500 text-[10px] font-bold uppercase tracking-widest hover:text-white transition-all duration-300"
          >
            <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform" />
            Return to Dashboard
          </button>
        </motion.div>
      </motion.form>

      <style jsx global>{`
        .custom-input {
          width: 100%;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 0.85rem;
          color: white;
          outline: none;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          font-size: 0.9rem;
        }
        .custom-input:focus {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(6, 182, 212, 0.5);
          box-shadow: 0 0 20px rgba(6, 182, 212, 0.1);
        }
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 1.5s infinite;
        }
      `}</style>
    </div>
  );
}

function Label({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <label className="text-[10px] font-black uppercase tracking-[0.15em] text-gray-500 flex gap-2 items-center group-focus-within:text-cyan-400 transition-colors">
      <span className="text-cyan-500/60 group-focus-within:text-cyan-400">{icon}</span>
      {text}
    </label>
  );
}