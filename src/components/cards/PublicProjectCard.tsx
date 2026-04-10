"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Github, ExternalLink, ArrowUpRight } from "lucide-react";

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
  
  // Mouse position for 3D tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth the mouse movement
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  // Transform values for rotation
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

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
      className="group relative bg-[#0a0a0a] border border-white/10 rounded-[2rem] p-1 overflow-hidden transition-colors hover:border-white/20"
    >
      {/* 3D Content Container */}
      <div 
        style={{ transform: "translateZ(50px)" }}
        className="relative z-10 bg-[#111] rounded-[1.8rem] p-6 h-full flex flex-col"
      >
        {/* Spotlight Effect */}
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-[1.8rem] opacity-0 group-hover:opacity-100 transition duration-300"
          style={{
            background: useTransform(
              [mouseXSpring, mouseYSpring],
              ([mx, my]: any) => `
                radial-gradient(
                  600px circle at ${((mx as number) + 0.5) * 100}% ${((my as number) + 0.5) * 100}%,
                  rgba(255,255,255,0.06),
                  transparent 40%
                )
              `
            ),
          }}
        />

        {/* Image / Header */}
        {project.image && (
          <div className="relative overflow-hidden rounded-2xl mb-6 aspect-video">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition duration-700 group-hover:scale-110 group-hover:rotate-2"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md p-2 rounded-full border border-white/10 text-white">
              <ArrowUpRight size={18} />
            </div>
          </div>
        )}

        {/* Info */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] px-2 py-1 rounded bg-[var(--cyan)]/10 text-[var(--cyan)] border border-[var(--cyan)]/20">
              {project.type}
            </span>
          </div>
          
          <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[var(--cyan)] transition-colors">
            {project.title}
          </h3>

          <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">
            {project.description}
          </p>
        </div>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-8">
          {project.techStack.map((tech, i) => (
            <span
              key={tech}
              className="text-[11px] font-medium text-gray-500 border border-white/5 px-2 py-1 rounded-md bg-white/[0.02]"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-auto">
          <a
            href={project.githubUrl}
            target="_blank"
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-semibold hover:bg-white/10 transition"
          >
            <Github size={16} /> Code
          </a>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-[var(--cyan)] to-[var(--purple)] text-black text-sm font-bold hover:shadow-[0_0_20px_rgba(0,245,212,0.3)] transition"
            >
              <ExternalLink size={16} /> Preview
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}