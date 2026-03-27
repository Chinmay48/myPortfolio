"use client";

import { motion } from "framer-motion";
import { Pencil, Trash2, ExternalLink, Github, Code2 } from "lucide-react";

interface AdminProjectCardProps {
  project: any;
  onDelete: (id: string) => void;
}

export default function AdminProjectCard({ project, onDelete }: AdminProjectCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="group relative bg-[#0A0A0A] border border-white/5 rounded-2xl overflow-hidden hover:border-cyan-500/30 transition-all duration-500"
    >
      {/* Image Preview with Glow */}
      <div className="relative h-40 w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent z-10" />
        <img
          src={project.image || "/api/placeholder/400/200"}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60 group-hover:opacity-100"
        />
        <div className="absolute top-3 left-3 z-20 flex gap-2">
           <span className="px-2 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-[10px] text-cyan-400 font-bold uppercase tracking-wider">
             {project.type}
           </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors truncate">
          {project.title}
        </h3>
        
        <div className="flex flex-wrap gap-1.5">
          {project.techStack?.slice(0, 3).map((tech: string) => (
            <span key={tech} className="text-[9px] px-2 py-0.5 rounded bg-white/5 text-gray-400 border border-white/5">
              {tech}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/5">
          <button className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-cyan-500/5 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-widest hover:bg-cyan-500 hover:text-black transition-all active:scale-95">
            <Pencil size={14} />
            Update
          </button>
          <button 
            onClick={() => onDelete(project._id)}
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