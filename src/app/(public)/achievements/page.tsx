"use client";

import { useEffect, useState } from "react";
import AchievementCard from "@/components/cards/public/public-achievement-card";
import { motion } from "framer-motion";

export default function AchievementsPage() {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const res = await fetch("/api/achievements");
        const result = await res.json();
       
        const sorted = result.data.sort((a: any, b: any) => 
          new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setAchievements(sorted);
      } catch (err) {
        console.error("Error fetching achievements:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAchievements();
  }, []);

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text)] px-6 py-12 relative">
      {/* Background Decor */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[var(--purple)] opacity-[0.05] blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-[var(--cyan)] opacity-[0.05] blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto">
        <header className="mb-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-7xl font-black mb-6 tracking-tighter"
          >
            <span className="bg-gradient-to-r from-[var(--cyan)] via-[var(--purple)] to-[var(--cyan)] bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-x">
              Milestones
            </span>
          </motion.h1>
          <p className="text-gray-500 font-mono text-sm uppercase tracking-widest">
            Awards, Certifications & Recognition
          </p>
        </header>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-10 h-10 border-4 border-[var(--cyan)] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {achievements.map((item, idx) => (
              <AchievementCard key={idx} achievement={item} index={idx} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}