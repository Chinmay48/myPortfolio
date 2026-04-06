"use client";

import { motion } from "framer-motion";
import { Pencil, Trash2, Award, Calendar, Building2 } from "lucide-react";

interface AdminAchievementCardProps {
  achievement: any;
  onDelete: (id: string) => void;
  onUpdate: (id: string) => void;
}

function AdminAchievementCard({
  achievement,
  onDelete,
  onUpdate,
}: AdminAchievementCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="group relative bg-[#0A0A0A] border border-white/5 rounded-2xl overflow-hidden hover:border-cyan-500/30 transition-all duration-500"
    >
      {/* Image Preview */}
      <div className="relative h-40 w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent z-10" />
        <img
          src={achievement.image || "/api/placeholder/400/200"}
          alt={achievement.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60 group-hover:opacity-100"
        />

        {/* Type Badge */}
        <div className="absolute top-3 left-3 z-20 flex gap-2">
          <span className="px-2 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-[10px] text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-1">
            <Award size={10} />
            {achievement.type}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        {/* Title */}
        <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors truncate">
          {achievement.title}
        </h3>

        {/* Description */}
        <p className="text-xs text-gray-400 line-clamp-2">
          {achievement.description}
        </p>

        {/* Issuer + Date */}
        <div className="flex flex-col gap-1 text-[11px] text-gray-400">
          <div className="flex items-center gap-2">
            <Building2 size={12} />
            <span className="truncate">{achievement.issuer}</span>
          </div>

          <div className="flex items-center gap-2">
            <Calendar size={12} />
            <span>{achievement.date}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/5">
          <button
            onClick={() => onUpdate(achievement._id)}
            className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-cyan-500/5 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-widest hover:bg-cyan-500 hover:text-black transition-all active:scale-95"
          >
            <Pencil size={14} />
            Update
          </button>

          <button
            onClick={() => onDelete(achievement._id)}
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

export default AdminAchievementCard;