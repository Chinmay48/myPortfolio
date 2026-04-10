"use client";

import { useEffect, useState } from "react";
import ProjectCard from "@/components/cards/PublicProjectCard";
import { motion, AnimatePresence } from "framer-motion";

interface Project {
  _id: string;
  title: string;
  description: string;
  githubUrl: string;
  liveUrl?: string;
  type: "individual" | "team";
  techStack: string[];
  image?: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/projects");
        const data = await res.json();
        setProjects(data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text)] px-6 py-12 relative overflow-hidden">
      {/* Dynamic Background Ornament */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[var(--cyan)] opacity-[0.05] blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[var(--purple)] opacity-[0.05] blur-[120px] animate-pulse" />
      </div>

      <div className="max-w-7xl mx-auto">
        <header className="mb-10 space-y-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-3xl md:text-5xl font-black tracking-tighter"
          >
            <span className="bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
              CRAFTED
            </span>
            <br />
            <span className="bg-gradient-to-r from-[var(--cyan)] via-[var(--purple)] to-[var(--cyan)] bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-x">
              SOLUTIONS
            </span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-gray-500 max-w-xl mx-auto uppercase tracking-widest text-sm font-medium"
          >
            A collection of digital experiences and technical experiments
          </motion.p>
        </header>

        {loading ? (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="mb-8 h-80 rounded-3xl bg-white/5 animate-pulse" />
            ))}
          </div>
        ) : (
          <AnimatePresence>
            {projects.length === 0 ? (
              <p className="text-center text-gray-500 py-20">No projects found.</p>
            ) : (
              /* Asymmetrical Staggered Layout using Columns */
              <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                {projects.map((project, index) => (
                  <motion.div
                    key={project._id}
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="break-inside-avoid"
                  >
                    <ProjectCard project={project} />
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
        )}
      </div>
    </main>
  );
}