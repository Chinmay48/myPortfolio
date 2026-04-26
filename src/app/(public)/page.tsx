"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

const techStacks = [
  "Full Stack Developer",
  "Computer Engineer",
  "Django Developer",
];

export default function HomePage() {
  const [text, setText] = useState("");
  const [stackIndex, setStackIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter logic
useEffect(() => {
  const currentFullText = techStacks[stackIndex];
  
  // Determine speed: 
  // 1. If pausing at the end: 2000ms
  // 2. If deleting: 50ms
  // 3. If typing: 100ms
  let delta = isDeleting ? 50 : 100;

  if (!isDeleting && text === currentFullText) {
    // We finished typing, wait before deleting
    delta = 3000;
    setIsDeleting(true);
  } else if (isDeleting && text === "") {
    // We finished deleting, move to next word
    setIsDeleting(false);
    setStackIndex((prev) => (prev + 1) % techStacks.length);
    delta = 500; // Small pause before typing next word
  }

  const timeout = setTimeout(() => {
    setText((prev) => {
      if (isDeleting) {
        return currentFullText.slice(0, prev.length - 1);
      } else {
        return currentFullText.slice(0, prev.length + 1);
      }
    });
  }, delta);

  return () => clearTimeout(timeout);
}, [text, isDeleting, stackIndex]);

  return (
    <main className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-6 pt-20 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-[var(--cyan)] opacity-[0.05] blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Side: Text */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="order-2 md:order-1"
        >
          <h2 className="text-[var(--cyan)] font-mono mb-4 tracking-widest uppercase text-sm">
            Available for new opportunities
          </h2>
          <h1 className="text-5xl md:text-8xl font-black text-white leading-none mb-6">
            I'm{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--cyan)] to-[var(--purple)]">
              Chinmay Takke
            </span>
          </h1>

          <div className="h-12 flex items-center">
            <span className="text-xl md:text-3xl font-mono text-gray-400">
              {">"} {text}
              <span className="animate-pulse inline-block w-3 h-8 bg-[var(--cyan)] ml-2 align-middle" />
            </span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-10 flex gap-4 flex-wrap"
          >
            <Link href="/projects">
              <button className="px-8 py-4 rounded-full bg-white text-black font-bold hover:bg-[var(--cyan)] transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                Explore Projects
              </button>
            </Link>
            <Link href="/experience">
              <button className="px-8 py-4 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-white font-bold hover:border-[var(--purple)] transition-all duration-300">
                View Experience
              </button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Right Side: Image with floating effect */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="order-1 md:order-2 flex justify-center relative py-10"
        >
          {/* The Glow - Optimized for portrait */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[var(--cyan)] to-[var(--purple)] rounded-full blur-[100px] opacity-10 animate-pulse pointer-events-none" />

          {/* The Container - Adjusted to aspect-auto or a portrait ratio */}
          <div className="relative w-full max-w-[320px] md:max-w-[400px] aspect-[4/5]">
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="w-full h-full relative z-10"
            >
              {/* Decorative Floating Frames - Slightly offset to match portrait */}
              <div className="absolute inset-0 border border-[var(--cyan)] rounded-[3rem] rotate-3 opacity-20 scale-105 pointer-events-none" />
              <div className="absolute inset-0 border border-[var(--purple)] rounded-[3rem] -rotate-2 opacity-20 scale-105 pointer-events-none" />

              {/* The Main Image Wrapper */}
              <div className="relative w-full h-full rounded-[3rem] overflow-hidden border border-white/10 bg-[#111] shadow-2xl ring-1 ring-white/5">
                <Image
                  src="/profile.png"
                  alt="Chinmay"
                  fill
                  className="object-cover object-top grayscale hover:grayscale-0 transition-all duration-700 scale-100 hover:scale-110"
                  sizes="(max-width: 768px) 320px, 400px"
                  priority
                />

                {/* Subtle Inner Shadow to soften the 'sharp' image feeling */}
                <div className="absolute inset-0 pointer-events-none rounded-[3rem] shadow-[inset_0_0_40px_rgba(0,0,0,0.5)]" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
