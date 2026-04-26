"use client";

import { motion } from "framer-motion";
import { Trophy, Award, Code, ExternalLink, Calendar } from "lucide-react";
import Image from "next/image";

interface Achievement {
  _id: string;
  title: string;
  description: string;
  type: "hackathon" | "certificate" | "award";
  image: string;
  issuer?: string;
  date: Date | string;
}

const typeConfig = {
  hackathon: { icon: Code, color: "text-cyan-400", bg: "bg-cyan-400/10" },
  certificate: { icon: Award, color: "text-purple-400", bg: "bg-purple-400/10" },
  award: { icon: Trophy, color: "text-amber-400", bg: "bg-amber-400/10" },
};

export default function AchievementCard({ achievement, index }: { achievement: Achievement; index: number }) {
  const Icon = typeConfig[achievement.type].icon;
  const colors = typeConfig[achievement.type];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative h-full flex flex-col bg-white/[0.02] border border-white/10 rounded-[2rem] overflow-hidden hover:border-white/20 transition-all duration-500"
    >
      {/* Image Container */}
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={achievement.image}
          alt={achievement.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-transparent to-transparent opacity-60" />
        
        {/* Type Badge */}
        <div className={`absolute top-4 left-4 flex items-center gap-2 px-3 py-1 rounded-full backdrop-blur-md border border-white/10 ${colors.bg}`}>
          <Icon size={14} className={colors.color} />
          <span className={`text-[10px] font-bold uppercase tracking-wider ${colors.color}`}>
            {achievement.type}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-white group-hover:text-[var(--cyan)] transition-colors line-clamp-2 leading-tight">
            {achievement.title}
          </h3>
        </div>

        {achievement.issuer && (
          <p className="text-[var(--purple)] text-xs font-mono mb-4 flex items-center gap-2">
            <span className="w-4 h-[1px] bg-[var(--purple)] opacity-50" />
            {achievement.issuer}
          </p>
        )}

        <p className="text-gray-400 text-sm line-clamp-3 mb-6 leading-relaxed">
          {achievement.description}
        </p>

        {/* Footer */}
        <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-500 text-[10px] font-mono">
            <Calendar size={12} />
            {new Date(achievement.date).toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </div>
          <motion.div 
            whileHover={{ rotate: 45 }}
            className="text-gray-400 group-hover:text-[var(--cyan)] cursor-pointer"
          >
            <ExternalLink size={16} />
          </motion.div>
        </div>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute -inset-px bg-gradient-to-br from-[var(--cyan)]/10 to-[var(--purple)]/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </motion.div>
  );
}