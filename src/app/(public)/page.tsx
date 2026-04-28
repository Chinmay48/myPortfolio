"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import AboutSkills from "@/components/sections/AboutSkills";
import Contact from "@/components/sections/Contact";

const techStacks = [
  "Full Stack Developer",
  "Computer Engineer",
  "Django Developer",
];

export default function HomePage() {
  const [text, setText] = useState("");
  const [stackIndex, setStackIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentFullText = techStacks[stackIndex];
    let delta = isDeleting ? 50 : 100;

    if (!isDeleting && text === currentFullText) {
      delta = 3000;
      setIsDeleting(true);
    } else if (isDeleting && text === "") {
      setIsDeleting(false);
      setStackIndex((prev) => (prev + 1) % techStacks.length);
      delta = 500;
    }

    const timeout = setTimeout(() => {
      setText((prev) => 
        isDeleting ? currentFullText.slice(0, prev.length - 1) : currentFullText.slice(0, prev.length + 1)
      );
    }, delta);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, stackIndex]);

  return (
    <main className="bg-[#0A0A0A] overflow-x-hidden">
      
      {/* SECTION 1: HERO */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 pt-12 md:pt-10">
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-[var(--cyan)] opacity-[0.05] blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          
          {/* Text Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="order-1 text-center lg:text-left z-10"
          >
            <h2 className="text-[var(--cyan)] font-mono mb-4 tracking-widest uppercase text-xs md:text-sm">
              Available for new opportunities
            </h2>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black text-white leading-[1.1] mb-6">
              I'm{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--cyan)] to-[var(--purple)]">
                Chinmay Takke
              </span>
            </h1>

            <div className="h-10 md:h-12 flex items-center justify-center lg:justify-start">
              <span className="text-lg md:text-3xl font-mono text-gray-400">
                {">"} {text}
                <span className="animate-pulse inline-block w-2 md:w-3 h-6 md:h-8 bg-[var(--cyan)] ml-2 align-middle" />
              </span>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link href="/projects" className="w-full sm:w-auto">
                <button className="w-full px-8 py-4 rounded-full bg-white text-black font-bold hover:bg-[var(--cyan)] transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg">
                  Explore Projects
                </button>
              </Link>
              <Link href="/experience" className="w-full sm:w-auto">
                <button className="w-full px-8 py-4 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-white font-bold hover:border-[var(--purple)] transition-all duration-300">
                  View Experience
                </button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="order-2 flex justify-center relative py-6 md:py-10"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-[var(--cyan)] to-[var(--purple)] rounded-full blur-[80px] md:blur-[100px] opacity-10 animate-pulse pointer-events-none" />

            <div className="relative w-[260px] sm:w-[320px] lg:w-[400px] aspect-[4/5]">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="w-full h-full relative z-10"
              >
                <div className="absolute inset-0 border border-[var(--cyan)] rounded-[2.5rem] md:rounded-[3rem] rotate-3 opacity-20 scale-105 pointer-events-none" />
                <div className="absolute inset-0 border border-[var(--purple)] rounded-[2.5rem] md:rounded-[3rem] -rotate-2 opacity-20 scale-105 pointer-events-none" />

                <div className="relative w-full h-full rounded-[2.5rem] md:rounded-[3rem] overflow-hidden border border-white/10 bg-[#111] shadow-2xl">
                  <Image
                    src="/profile.png"
                    alt="Chinmay"
                    fill
                    className="object-cover object-top grayscale hover:grayscale-0 transition-all duration-700 scale-100 hover:scale-110"
                    sizes="(max-width: 768px) 260px, 400px"
                    priority
                  />
                  <div className="absolute inset-0 pointer-events-none rounded-[2.5rem] md:rounded-[3rem] shadow-[inset_0_0_40px_rgba(0,0,0,0.5)]" />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: ABOUT & SKILLS */}
      <AboutSkills />
      <Contact/>
    </main>
  );
}