"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useSpring, } from "framer-motion";
import {  Briefcase, ChevronRight } from "lucide-react";

interface Experience {
  _id: string;
  role: string;
  company: string;
  description: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  techStack?: string[];
}

export default function ExperiencePage() {
  const [data, setData] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  
  // 1. Attach the ref to the outer container that is ALWAYS rendered
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll();

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    setMounted(true); // 2. Confirm we are on the client
    const fetchExperience = async () => {
      try {
        const res = await fetch("/api/experience");
        const result = await res.json();
        const sortedData = result.data.sort((a: Experience, b: Experience) => {
          return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
        });
        setData(sortedData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchExperience();
  }, []);

  // Prevent hydration mismatch by returning null until mounted
  if (!mounted) return null;

  return (
    <main 
      ref={containerRef} // Now the target is stable and always exists
      className="min-h-screen bg-[var(--bg)] text-[var(--text)] px-6 py-24 relative overflow-hidden"
    >
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
        <div className="absolute top-24 left-10 w-72 h-72 bg-[var(--cyan)] opacity-[0.03] blur-[100px]" />
        <div className="absolute bottom-24 right-10 w-72 h-72 bg-[var(--purple)] opacity-[0.03] blur-[100px]" />
      </div>

      <div className="max-w-6xl mx-auto">
        <header className="mb-24 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black mb-6"
          >
            <span className="bg-gradient-to-r from-[var(--cyan)] via-[var(--purple)] to-[var(--cyan)] bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-x">
              Career Path
            </span>
          </motion.h1>
        </header>

        <div className="relative">
          {/* Progress Line - Stays visible but fills up as data loads */}
          <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 w-[2px] h-full bg-white/5">
            <motion.div 
              style={{ scaleY, originY: 0 }}
              className="w-full h-full bg-gradient-to-b from-[var(--cyan)] via-[var(--purple)] to-transparent shadow-[0_0_15px_rgba(0,245,212,0.5)]"
            />
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 border-2 border-[var(--cyan)] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="space-y-24">
              {data.map((exp, index) => (
                <ExperienceCard key={exp._id} exp={exp} index={index} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

function ExperienceCard({ exp, index }: { exp: Experience; index: number }) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`relative flex items-center justify-between md:flex-row ${
        isEven ? "md:flex-row-reverse" : ""
      } flex-row`}
    >
      {/* 1. Date (Mobile: Hidden, Desktop: Floating Side) */}
      <div className="hidden md:block w-[45%] text-center">
        <motion.div 
          whileHover={{ scale: 1.1 }}
          className="inline-block px-6 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm"
        >
          <span className="text-[var(--cyan)] font-mono text-sm">
            {formatDate(exp.startDate)} — {exp.isCurrent ? "Present" : formatDate(exp.endDate)}
          </span>
        </motion.div>
      </div>

      {/* 2. Timeline Central Dot */}
      <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 z-20">
        <motion.div 
          whileHover={{ scale: 1.5 }}
          className="w-4 h-4 rounded-full bg-black border-2 border-[var(--cyan)] shadow-[0_0_10px_#00F5D4]"
        >
          <div className="w-full h-full rounded-full animate-ping bg-[var(--cyan)] opacity-20" />
        </motion.div>
      </div>

      {/* 3. The Content Card */}
      <div className="pl-12 md:pl-0 md:w-[45%]">
        <motion.div
          whileHover={{ y: -5, rotateX: 2, rotateY: isEven ? -2 : 2 }}
          className="group relative bg-white/[0.03] border border-white/10 p-6 rounded-[2rem] backdrop-blur-xl hover:border-[var(--purple)]/50 transition-colors duration-500"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Card Glow Effect */}
          <div className="absolute -inset-px bg-gradient-to-br from-[var(--cyan)]/20 to-[var(--purple)]/20 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity blur-md" />

          <div className="relative z-10">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold text-white group-hover:text-[var(--cyan)] transition-colors">
                  {exp.role}
                </h3>
                <div className="flex items-center gap-2 text-gray-400 mt-1">
                  <Briefcase size={14} className="text-[var(--purple)]" />
                  <span className="text-sm font-medium">{exp.company}</span>
                </div>
              </div>
              <div className="md:hidden text-[10px] text-gray-500 font-mono border border-white/10 px-2 py-1 rounded">
                {new Date(exp.startDate).getFullYear()}
              </div>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed mb-6 italic">
              &quot;{exp.description}&quot;
            </p>

            {/* Tech Tags */}
            <div className="flex flex-wrap gap-2">
              {exp.techStack?.map((tech) => (
                <span 
                  key={tech}
                  className="flex items-center gap-1 text-[10px] px-3 py-1 rounded-full bg-black/50 border border-white/5 text-gray-300 group-hover:border-[var(--cyan)]/30 transition-all"
                >
                  <ChevronRight size={10} className="text-[var(--cyan)]" />
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// Utility to format date nicely
function formatDate(dateStr?: string) {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}