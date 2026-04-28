"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import * as Icons from "react-icons/si"; 
import { 
  Code2, 
  Terminal, 
  Cpu, 
  Zap, 
  Globe, 
  Brain, 
  Rocket, 
  Flame 
} from "lucide-react";

// Types for the backend skills
interface Skill {
  _id: string;
  name: string;
  icon: string; // e.g., "react", "mongodb"
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
    { text: "MERN Stack Developer", icon: <Code2 size={16} /> },
    { text: "Django Full Stack", icon: <Terminal size={16} /> },
    { text: "400+ DSA Problems", icon: <Brain size={16} /> },
    { text: "Performance Optimization", icon: <Zap size={16} /> },
    { text: "AI & API Integration", icon: <Cpu size={16} /> },
    { text: "Problem Solver", icon: <Rocket size={16} /> },
    { text: "Fast Learner", icon: <Flame size={16} /> },
    { text: "Tech Enthusiast", icon: <Globe size={16} /> },
  ];

  return (
    <section className="relative py-20 px-6 bg-[#0A0A0A] overflow-hidden">
      {/* Decorative Floating Elements */}
      <motion.div 
        animate={{ y: [0, -20, 0], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-10 right-[10%] w-32 h-32 bg-[var(--purple)] blur-[100px] rounded-full pointer-events-none"
      />
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        
        {/* Left Side: About Me */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            About <span className="text-[var(--cyan)]">Me</span>
          </h2>
          
          <div className="space-y-6 text-gray-400 text-lg leading-relaxed">
            <p>
              I’m a <span className="text-white font-medium">Computer Engineering student</span> and 
              Full Stack Developer with experience in <span className="text-[var(--cyan)]">MERN and Django</span>. 
              I build scalable, responsive, and production-ready web applications with a strong focus on 
              performance and user experience.
            </p>
            <p>
              I’ve worked on real-world projects, optimized applications for performance and SEO, and 
              solved <span className="text-[var(--purple)] font-bold">400+ DSA problems</span>, 
              strengthening my problem-solving skills. I’m passionate about creating impactful tech 
              solutions and continuously learning new technologies.
            </p>
          </div>

          {/* Badges / Chips */}
          <div className="mt-10 flex flex-wrap gap-3">
            {highlights.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-gray-300 backdrop-blur-sm"
              >
                <span className="text-[var(--cyan)]">{item.icon}</span>
                {item.text}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right Side: Skills Grid */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-10 lg:text-right">
            Technical <span className="text-[var(--purple)]">Skills</span>
          </h2>

          <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 md:gap-6">
            {loading ? (
              // Skeleton Loading State
              Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="aspect-square rounded-2xl bg-white/5 animate-pulse border border-white/5" />
              ))
            ) : (
              skills.map((skill, index) => {
                // Dynamic Icon Logic
                const iconKey = ("Si" + skill.icon.charAt(0).toUpperCase() + skill.icon.slice(1)) as keyof typeof Icons;
                const IconComponent = Icons[iconKey];

                return (
                  <motion.div
                    key={skill._id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: (index % 4) * 0.1 }}
                    whileHover={{ 
                        y: -10, 
                        borderColor: "var(--cyan)", 
                        boxShadow: "0 0 20px rgba(0, 255, 255, 0.1)" 
                    }}
                    className="group relative aspect-square flex flex-col items-center justify-center p-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-300"
                  >
                    {/* Floating Background Glow for each icon */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--cyan)] to-[var(--purple)] opacity-0 group-hover:opacity-10 transition-opacity rounded-2xl" />
                    
                    {IconComponent ? (
                      <IconComponent className="text-3xl md:text-4xl mb-2 text-gray-400 group-hover:text-white transition-colors" />
                    ) : (
                      <Code2 className="text-3xl md:text-4xl mb-2 text-gray-400" />
                    )}
                    
                    <span className="text-[10px] md:text-xs font-mono uppercase tracking-wider text-gray-500 group-hover:text-[var(--cyan)] transition-colors text-center">
                      {skill.name}
                    </span>
                  </motion.div>
                );
              })
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}