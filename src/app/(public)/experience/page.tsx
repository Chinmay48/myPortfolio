"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Briefcase, ChevronRight, Calendar } from "lucide-react";

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
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    setMounted(true);
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

  if (!mounted) return null;

  return (
    <main ref={containerRef} className="min-h-screen bg-[var(--bg)] text-[var(--text)] px-4 md:px-12 py-8 md:py-12 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
        <div className="absolute top-24 left-10 w-72 h-72 bg-[var(--cyan)] opacity-[0.03] blur-[100px]" />
        <div className="absolute bottom-24 right-10 w-72 h-72 bg-[var(--purple)] opacity-[0.03] blur-[100px]" />
      </div>

      <div className="max-w-6xl mx-auto">
        <header className="mb-8 md:mb-12 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-7xl font-black mb-4"
          >
            <span className="bg-gradient-to-r from-[var(--cyan)] via-[var(--purple)] to-[var(--cyan)] bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-x">
              Career Path
            </span>
          </motion.h1>
          <p className="text-gray-500 font-mono text-sm uppercase tracking-widest">My Professional Journey</p>
        </header>

        <div className="relative">
          {/* Progress Line */}
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
            <div className="space-y-12 md:space-y-24">
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
  // Clean empty strings from bullets
  const stylishExperience = exp.description.split("•").filter(item => item.trim().length > 0);
  const dateRange = `${formatDate(exp.startDate)} — ${exp.isCurrent ? "Present" : formatDate(exp.endDate)}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative flex flex-col md:flex-row items-center justify-between ${
        isEven ? "md:flex-row-reverse" : ""
      }`}
    >
      {/* 1. Desktop Date (Hidden on Mobile) */}
      <div className="hidden md:block w-[45%] text-center">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="inline-block px-6 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm"
        >
          <span className="text-[var(--cyan)] font-mono text-sm tracking-tight">
            {dateRange}
          </span>
        </motion.div>
      </div>

      {/* 2. Timeline Central Dot */}
      <div className="absolute left-[9px] md:left-1/2 md:-translate-x-1/2 top-2 md:top-auto z-20">
        <div className="w-4 h-4 rounded-full bg-[var(--bg)] border-2 border-[var(--cyan)] shadow-[0_0_10px_rgba(0,245,212,0.5)]">
          <div className="w-full h-full rounded-full animate-pulse bg-[var(--cyan)] opacity-40" />
        </div>
      </div>

      {/* 3. The Content Card */}
      <div className="w-full md:w-[45%] pl-10 md:pl-0">
        <motion.div
          whileHover={{ y: -5 }} // Removed 3D tilt for better stability
          className="group relative bg-white/[0.03] border border-white/10 p-5 md:p-8 rounded-3xl backdrop-blur-xl hover:border-[var(--purple)]/50 transition-all duration-300"
        >
          {/* Mobile-Only Date Display */}
          <div className="md:hidden flex items-center gap-2 text-[var(--cyan)] font-mono text-[10px] mb-2 opacity-80">
            <Calendar size={12} />
            {dateRange}
          </div>

          <div className="relative z-10">
            <header className="mb-4">
              <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-[var(--cyan)] transition-colors leading-tight">
                {exp.role}
              </h3>
              <div className="flex items-center gap-2 text-gray-400 mt-2">
                <Briefcase size={14} className="text-[var(--purple)]" />
                <span className="text-sm font-medium tracking-wide uppercase">{exp.company}</span>
              </div>
            </header>

            <ul className="space-y-3 mb-6">
              {stylishExperience.map((expe, i) => (
                <li key={i} className="flex gap-2 text-gray-400 text-sm leading-relaxed">
                  <span className="text-[var(--cyan)] shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-[var(--cyan)] opacity-50" />
                  <span>{expe.trim()}</span>
                </li>
              ))}
            </ul>

            {/* Tech Tags */}
            <div className="flex flex-wrap gap-2">
              {exp.techStack?.map((tech) => (
                <span
                  key={tech}
                  className="flex items-center gap-1 text-[10px] px-3 py-1 rounded-md bg-white/5 border border-white/10 text-gray-300 group-hover:border-[var(--cyan)]/30 transition-all"
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

function formatDate(dateStr?: string) {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}