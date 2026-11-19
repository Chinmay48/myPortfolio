"use client";

import { useState, MouseEvent } from "react";
import { motion, AnimatePresence, useMotionValue, useMotionTemplate } from "framer-motion";
import { Pencil, Trash2, ChevronDown, ChevronUp } from "lucide-react";

interface AdminProjectCardProps {
  project: any;
  onDelete: (id: string) => void;
  onUpdate: (id: string) => void;
}

export default function AdminProjectCard({
  project,
  onDelete,
  onUpdate,
}: AdminProjectCardProps) {
  const [showAllTech, setShowAllTech] = useState(false);

  // Mouse-tracking spotlight coordinates
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const techList: string[] = project.techStack || [];
  const MAX_VISIBLE = 3;
  const visibleTech = showAllTech ? techList : techList.slice(0, MAX_VISIBLE);
  const remainingCount = techList.length - MAX_VISIBLE;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      onMouseMove={handleMouseMove}
      className="group relative flex flex-col h-full bg-[#0A0A0A] border border-white/5 rounded-2xl overflow-hidden hover:border-cyan-500/40 hover:shadow-[0_10px_40px_-15px_rgba(6,182,212,0.25)] transition-colors duration-500"
    >
      {/* Interactive Cyan Radial Spotlight */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100 z-20"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              320px circle at ${mouseX}px ${mouseY}px,
              rgba(34, 211, 238, 0.12),
              transparent 80%
            )
          `,
        }}
      />

      {/* Image Preview with Glow & Shimmer */}
      <div className="relative h-40 w-full shrink-0 overflow-hidden bg-black">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent z-10" />
        <img
          src={project.image || "/api/placeholder/400/200"}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out opacity-65 group-hover:opacity-100"
        />
        <div className="absolute top-3 left-3 z-20 flex gap-2">
          <span className="px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md border border-cyan-500/20 text-[10px] text-cyan-400 font-bold uppercase tracking-wider shadow-[0_0_12px_rgba(34,211,238,0.15)]">
            {project.type}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1 gap-3 z-30">
        <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors truncate">
          {project.title}
        </h3>

        {/* Fixed-Height Tech Stack Area with Expandable Toggle */}
        <motion.div layout className="flex flex-wrap items-center gap-1.5 min-h-[28px]">
          <AnimatePresence initial={false}>
            {visibleTech.map((tech: string) => (
              <motion.span
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.18 }}
                key={tech}
                className="text-[10px] px-2 py-0.5 rounded-md bg-white/[0.04] text-gray-300 border border-white/10 group-hover:border-white/15 transition-colors"
              >
                {tech}
              </motion.span>
            ))}
          </AnimatePresence>

          {remainingCount > 0 && (
            <button
              type="button"
              onClick={() => setShowAllTech((prev) => !prev)}
              className="inline-flex items-center gap-0.5 text-[10px] font-semibold px-2 py-0.5 rounded-md bg-cyan-500/10 text-cyan-400 border border-cyan-500/25 hover:bg-cyan-500/20 transition-colors cursor-pointer"
            >
              {showAllTech ? (
                <>
                  Show less <ChevronUp size={11} />
                </>
              ) : (
                <>
                  +{remainingCount} more <ChevronDown size={11} />
                </>
              )}
            </button>
          )}
        </motion.div>

        {/* Action Buttons pinned to bottom */}
        <div className="grid grid-cols-2 gap-3 pt-4 mt-auto border-t border-white/5">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-cyan-500/5 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-widest hover:bg-cyan-500 hover:text-black hover:shadow-[0_0_20px_rgba(6,182,212,0.35)] transition-colors cursor-pointer"
            onClick={() => onUpdate(project._id)}
          >
            <Pencil size={14} />
            Update
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => onDelete(project._id)}
            className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-rose-500/5 border border-rose-500/20 text-rose-500 text-xs font-bold uppercase tracking-widest hover:bg-rose-500 hover:text-white hover:shadow-[0_0_20px_rgba(244,63,94,0.35)] transition-colors cursor-pointer"
          >
            <Trash2 size={14} />
            Delete
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}