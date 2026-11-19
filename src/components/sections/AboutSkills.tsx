"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import * as Icons from "react-icons/si";
import {
  Code2,
  Terminal,
  Cpu,
  Zap,
  Brain,
  Trophy,
  Database,
  Layers,
} from "lucide-react";

interface Skill {
  _id: string;
  name: string;
  icon: string; // e.g., "react", "mongodb", "springboot"
}

// Dynamic brand color resolver for react-icons/si keys
const BRAND_COLORS: Record<string, string> = {
  react: "#61DAFB",
  nextdotjs: "#FFFFFF",
  nextjs: "#FFFFFF",
  nodedotjs: "#339933",
  nodejs: "#339933",
  express: "#FFFFFF",
  expressjs: "#FFFFFF",
  django: "#44B78B",
  html5: "#E34F26",
  html: "#E34F26",
  css3: "#1572B6",
  css: "#1572B6",
  javascript: "#F7DF1E",
  typescript: "#3178C6",
  springboot: "#6DB33F",
  java: "#ED8B00",
  openjdk: "#ED8B00",
  python: "#3776AB",
  c: "#A8B9CC",
  cplusplus: "#00599C",
  tailwindcss: "#06B6D4",
  bootstrap: "#7952B3",
  numpy: "#4DABCF",
  pandas: "#E70488",
  googlegemini: "#8E75B2",
  gemini: "#8E75B2",
  openai: "#10A37F",
  huggingface: "#FFD21E",
  mysql: "#4479A1",
  mongodb: "#47A248",
  sqlite: "#44A8E0",
  postgresql: "#4169E1",
  git: "#F05032",
  github: "#FFFFFF",
  docker: "#2496ED",
  vercel: "#FFFFFF",
  render: "#46E3B7",
  powerbi: "#F2C811",
  postman: "#FF6C37",
  cloudinary: "#3448C5",
  sentry: "#FB4226",
};

function getBrandColor(iconName: string): string {
  const normalized = iconName.toLowerCase().replace(/[^a-z0-9]/g, "");
  return BRAND_COLORS[normalized] || "#00F5D4"; // Fallback to --cyan
}

export default function AboutSkills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await fetch("/api/skills");
        const data = await res.json();
        if (!res.ok) throw new Error("Failed to fetch");
        setSkills(data.data);
      } catch (error) {
        console.error("Error fetching skills:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  const highlights = [
    { text: "Java & Spring Boot", icon: <Terminal size={16} /> },
    { text: "MERN & React Developer", icon: <Code2 size={16} /> },
    { text: "RAG, LLMs & MCP Servers", icon: <Cpu size={16} /> },
    { text: "500+ DSA Problems Solved", icon: <Brain size={16} /> },
    { text: "95 Perf / 100 SEO Lighthouse", icon: <Zap size={16} /> },
    { text: "SQL & NoSQL Databases", icon: <Database size={16} /> },
    { text: "InnovGenius '26 2nd Runner-Up", icon: <Trophy size={16} /> },
    { text: "9.86 CGPA · Computer Engg.", icon: <Layers size={16} /> },
  ];

  return (
    <section className="relative py-24 px-6 bg-[#0A0A0A] overflow-hidden">
      {/* Decorative Floating Glows */}
      <motion.div
        animate={{ y: [0, -25, 0], opacity: [0.15, 0.35, 0.15] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-12 right-[12%] w-64 h-64 bg-[var(--purple)] blur-[130px] rounded-full pointer-events-none"
      />
      <motion.div
        animate={{ y: [0, 25, 0], opacity: [0.12, 0.28, 0.12] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-12 left-[10%] w-64 h-64 bg-[var(--cyan)] blur-[130px] rounded-full pointer-events-none"
      />

      <div className="max-w-7xl mx-auto flex flex-col gap-20">
        {/* TOP SECTION: About Me */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            About <span className="text-[var(--cyan)]">Me</span>
          </h2>

          <div className="space-y-5 text-gray-400 text-base md:text-lg leading-relaxed">
            <p>
              I’m a{" "}
              <span className="text-white font-semibold">
                Computer Engineering student (9.86 CGPA)
              </span>{" "}
              and{" "}
              <span className="text-[var(--cyan)] font-medium">
                Full-Stack Developer
              </span>{" "}
              experienced in building scalable, production-ready applications using{" "}
              <span className="text-white font-medium">
                Java, Spring Boot, React, and the MERN stack
              </span>
              , alongside AI technologies including{" "}
              <span className="text-[var(--purple)] font-medium">
                RAG pipelines, LLMs, and MCP servers
              </span>
              .
            </p>
            <p>
              From engineering citation-grounded academic AI platforms like{" "}
              <span className="text-white font-medium">EduPilot</span> to optimizing
              production web apps to{" "}
              <span className="text-[var(--cyan)] font-semibold">
                95 Performance and 100 SEO Lighthouse scores
              </span>
              , I focus on clean architecture and measurable impact—backed by{" "}
              <span className="text-[var(--purple)] font-bold">
                500+ DSA problems solved
              </span>{" "}
              across LeetCode, GFG, and HackerRank.
            </p>
          </div>

          {/* Highlight Chips */}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {highlights.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{
                  y: -3,
                  borderColor: "rgba(0, 245, 212, 0.4)",
                  backgroundColor: "rgba(255, 255, 255, 0.08)",
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.04] text-xs md:text-sm text-gray-300 backdrop-blur-sm transition-colors"
              >
                <span className="text-[var(--cyan)]">{item.icon}</span>
                {item.text}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Subtle Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* BOTTOM SECTION: Technical Skills */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="w-full"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              Technical <span className="text-[var(--purple)]">Skills</span>
            </h2>
            <p className="text-gray-500 text-sm uppercase tracking-widest mt-3">
              Languages, Frameworks, Databases & AI Stack
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 md:gap-5">
            {loading
              ? Array.from({ length: 16 }).map((_, i) => (
                  <div
                    key={i}
                    className="aspect-square rounded-2xl bg-white/5 animate-pulse border border-white/5"
                  />
                ))
              : skills.map((skill, index) => {
                  const iconKey = ("Si" +
                    skill.icon.charAt(0).toUpperCase() +
                    skill.icon.slice(1)) as keyof typeof Icons;
                  const IconComponent = Icons[iconKey];
                  const brandColor = getBrandColor(skill.icon || skill.name);

                  return (
                    <motion.div
                      key={skill._id}
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: (index % 8) * 0.04,
                        type: "spring",
                        stiffness: 280,
                        damping: 22,
                      }}
                      whileHover={{
                        y: -8,
                        scale: 1.04,
                      }}
                      style={
                        {
                          "--brand": brandColor,
                        } as React.CSSProperties
                      }
                      className="group relative aspect-square flex flex-col items-center justify-center p-4 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md transition-all duration-300 hover:border-[var(--brand)] hover:bg-white/[0.06] hover:shadow-[0_10px_30px_-10px_var(--brand)] cursor-default overflow-hidden"
                    >
                      {/* Brand-Tinted Radial Hover Glow */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none"
                        style={{
                          background: `radial-gradient(circle at center, ${brandColor}, transparent 75%)`,
                        }}
                      />

                      {/* Icon rendered in its official brand color */}
                      <div className="relative z-10 mb-3 transition-transform duration-300 group-hover:scale-115 group-hover:-translate-y-0.5">
                        {IconComponent ? (
                          <IconComponent
                            className="text-3xl md:text-4xl drop-shadow-[0_0_8px_rgba(255,255,255,0.08)]"
                            style={{ color: brandColor }}
                          />
                        ) : (
                          <Code2
                            className="text-3xl md:text-4xl"
                            style={{ color: brandColor }}
                          />
                        )}
                      </div>

                      <span className="relative z-10 text-[10px] md:text-[11px] font-mono uppercase tracking-wider text-gray-400 group-hover:text-white transition-colors text-center line-clamp-2 leading-tight">
                        {skill.name}
                      </span>
                    </motion.div>
                  );
                })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}