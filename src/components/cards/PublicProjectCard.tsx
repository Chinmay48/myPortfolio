"use client";

import React, { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { Github, ExternalLink, ArrowUpRight, ChevronDown, ChevronUp } from "lucide-react";

interface Props {
  project: {
    title: string;
    description: string;
    githubUrl: string;
    liveUrl?: string;
    type: "individual" | "team";
    techStack: string[];
    image?: string;
  };
}

export default function ProjectCard({ project }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [expandedTech, setExpandedTech] = useState(false);

  // Mouse position for 3D tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth the mouse movement
  const mouseXSpring = useSpring(x, { stiffness: 250, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 250, damping: 25 });

  // Transform values for rotation
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Normalize values to -0.5 to 0.5
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Tech stack truncation logic
  const MAX_VISIBLE_TECH = 4;
  const techList = project.techStack || [];
  const visibleTech = expandedTech ? techList : techList.slice(0, MAX_VISIBLE_TECH);
  const hiddenCount = techList.length - MAX_VISIBLE_TECH;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="group relative h-full bg-[#0a0a0a] border border-white/10 rounded-[2rem] p-1 overflow-hidden transition-all duration-500 hover:border-[var(--cyan)]/40 hover:shadow-[0_15px_45px_-15px_rgba(0,245,212,0.2)]"
    >
      {/* 3D Content Container */}
      <div
        style={{ transform: "translateZ(30px)" }}
        className="relative z-10 bg-[#111] rounded-[1.8rem] p-6 h-full flex flex-col"
      >
        {/* Cyan-Tinted Spotlight Effect */}
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-[1.8rem] opacity-0 group-hover:opacity-100 transition duration-300"
          style={{
            background: useTransform(
              [mouseXSpring, mouseYSpring],
              ([mx, my]: any) => `
                radial-gradient(
                  500px circle at ${((mx as number) + 0.5) * 100}% ${((my as number) + 0.5) * 100}%,
                  rgba(0, 245, 212, 0.08),
                  transparent 45%
                )
              `
            ),
          }}
        />

        {/* Image / Header (Consistent aspect-video frame) */}
        <div className="relative overflow-hidden rounded-2xl mb-6 aspect-video shrink-0 bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/5">
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition duration-700 ease-out group-hover:scale-110 group-hover:rotate-1"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[var(--cyan)]/10 via-transparent to-[var(--purple)]/10">
              <span className="text-xs font-mono uppercase tracking-widest text-gray-500">
                {project.title}
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

          {/* Top-right interactive badge */}
          <a
            href={project.liveUrl || project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${project.title}`}
            className="absolute top-3.5 right-3.5 bg-black/60 backdrop-blur-md p-2 rounded-full border border-white/10 text-white group-hover:border-[var(--cyan)]/50 group-hover:text-[var(--cyan)] transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          >
            <ArrowUpRight size={17} />
          </a>
        </div>

        {/* Info */}
        <div className="flex-1 flex flex-col">
          <div className="flex items-center gap-3 mb-2.5">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] px-2.5 py-1 rounded-md bg-[var(--cyan)]/10 text-[var(--cyan)] border border-[var(--cyan)]/20">
              {project.type}
            </span>
          </div>

          <h3 className="text-xl font-bold text-white mb-2.5 line-clamp-1 group-hover:text-[var(--cyan)] transition-colors">
            {project.title}
          </h3>

          <p className="text-gray-400 text-sm leading-relaxed mb-5 line-clamp-3">
            {project.description}
          </p>
        </div>

        {/* Tech Stack with See More / See Less */}
        <motion.div layout className="flex flex-wrap items-center gap-1.5 mb-7">
          <AnimatePresence initial={false}>
            {visibleTech.map((tech) => (
              <motion.span
                layout
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.18 }}
                key={tech}
                className="text-[11px] font-medium text-gray-400 border border-white/10 px-2.5 py-1 rounded-md bg-white/[0.03] group-hover:border-white/15 transition-colors"
              >
                {tech}
              </motion.span>
            ))}
          </AnimatePresence>

          {hiddenCount > 0 && (
            <button
              type="button"
              onClick={() => setExpandedTech((prev) => !prev)}
              className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-md bg-[var(--cyan)]/10 text-[var(--cyan)] border border-[var(--cyan)]/25 hover:bg-[var(--cyan)]/20 transition-colors cursor-pointer"
            >
              {expandedTech ? (
                <>
                  See less <ChevronUp size={12} />
                </>
              ) : (
                <>
                  +{hiddenCount} more <ChevronDown size={12} />
                </>
              )}
            </button>
          )}
        </motion.div>

        {/* Action Buttons pinned to bottom */}
        <div className="flex gap-3 mt-auto pt-2">
          <motion.a
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-semibold hover:bg-white/10 hover:border-white/20 transition"
          >
            <Github size={16} /> Code
          </motion.a>
          {project.liveUrl && (
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-[var(--cyan)] to-[var(--purple)] text-black text-sm font-bold hover:shadow-[0_0_25px_rgba(0,245,212,0.35)] transition"
            >
              <ExternalLink size={16} /> Preview
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
}