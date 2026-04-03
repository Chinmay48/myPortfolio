"use client";

import { motion } from "framer-motion";
import {
  Pencil,
  Trash2,
  Briefcase,
  Building2,
  CalendarDays,
  Code2,
  CheckCircle,
} from "lucide-react";

interface AdminExperienceCardProps {
  experience: any;
  onDelete: (id: string) => void;
  onUpdate: (id: string) => void;
}

export default function AdminExperienceCard({
  experience,
  onDelete,
  onUpdate,
}: AdminExperienceCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="group relative bg-[#0A0A0A] border border-white/5 rounded-2xl overflow-hidden hover:border-cyan-500/30 transition-all duration-500"
    >
      {/* Top Section (Role + Company) */}
      <div className="relative p-5 border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-all" />

        <div className="relative z-10 space-y-2">
          <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors flex items-center gap-2 truncate">
            <Briefcase size={16} />
            {experience.role}
          </h3>

          <p className="text-sm text-gray-400 flex items-center gap-2 truncate">
            <Building2 size={14} />
            {experience.company}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        {/* Duration */}
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <CalendarDays size={14} />
          <span>
            {experience.startDate} -{" "}
            {experience.isCurrent ? (
              <span className="text-cyan-400 flex items-center gap-1 inline-flex">
                Present <CheckCircle size={12} />
              </span>
            ) : (
              experience.endDate
            )}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-500 line-clamp-3">
          {experience.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-1.5">
          {experience.techStack?.slice(0, 4).map((tech: string) => (
            <span
              key={tech}
              className="text-[9px] px-2 py-0.5 rounded bg-white/5 text-gray-400 border border-white/5 flex items-center gap-1"
            >
              <Code2 size={10} />
              {tech}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/5">
          <button
            onClick={() => onUpdate(experience._id)}
            className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-cyan-500/5 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-widest hover:bg-cyan-500 hover:text-black transition-all active:scale-95"
          >
            <Pencil size={14} />
            Update
          </button>

          <button
            onClick={() => onDelete(experience._id)}
            className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-rose-500/5 border border-rose-500/20 text-rose-500 text-xs font-bold uppercase tracking-widest hover:bg-rose-500 hover:text-white transition-all hover:shadow-[0_0_15px_rgba(244,63,94,0.3)] active:scale-95"
          >
            <Trash2 size={14} />
            Delete
          </button>
        </div>
      </div>
    </motion.div>
  );
}