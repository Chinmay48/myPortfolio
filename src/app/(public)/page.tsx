"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Briefcase, Sparkles, Terminal } from "lucide-react";
import AboutSkills from "@/components/sections/AboutSkills";
import Contact from "@/components/sections/Contact";
import Connect from "@/components/sections/Connect";

const techStacks = [
  "Full Stack Developer",
  "AI & RAG Engineer",
  "Java & Spring Boot Dev",
  "Computer Engineer",
];

export default function HomePage() {
  const [text, setText] = useState("");
  const [stackIndex, setStackIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // 3D Tilt state for Profile Card
  const imageCardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 200, damping: 22 });
  const springY = useSpring(mouseY, { stiffness: 200, damping: 22 });
  const rotateX = useTransform(springY, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(springX, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleImageMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageCardRef.current) return;
    const rect = imageCardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleImageMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Typewriter Effect
  useEffect(() => {
    const currentFullText = techStacks[stackIndex];
    let delta = isDeleting ? 45 : 95;

    if (!isDeleting && text === currentFullText) {
      delta = 2600;
      setIsDeleting(true);
    } else if (isDeleting && text === "") {
      setIsDeleting(false);
      setStackIndex((prev) => (prev + 1) % techStacks.length);
      delta = 400;
    }

    const timeout = setTimeout(() => {
      setText((prev) =>
        isDeleting
          ? currentFullText.slice(0, prev.length - 1)
          : currentFullText.slice(0, prev.length + 1)
      );
    }, delta);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, stackIndex]);

  return (
    <main className="bg-[#0A0A0A] overflow-x-hidden">
      {/* SECTION 1: HERO */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 pt-16 md:pt-12">
        {/* Subtle Cyber Grid Background */}
        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_65%_55%_at_50%_50%,#000_65%,transparent_100%)] pointer-events-none"
        />

        {/* Ambient Animated Glows */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[320px] md:w-[550px] h-[320px] md:h-[550px] bg-[var(--cyan)] blur-[130px] rounded-full pointer-events-none"
        />
        <motion.div
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.04, 0.09, 0.04] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-1/4 w-[280px] md:w-[450px] h-[280px] md:h-[450px] bg-[var(--purple)] blur-[130px] rounded-full pointer-events-none"
        />

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-14 items-center">
          {/* Text Section */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: "easeOut" }}
            className="order-1 text-center lg:text-left z-10"
          >
            {/* Pulsing Availability Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15 }}
              whileHover={{ scale: 1.03, borderColor: "rgba(0, 245, 212, 0.45)" }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md mb-6 transition-colors"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--cyan)] opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[var(--cyan)]" />
              </span>
              <span className="text-[var(--cyan)] font-mono tracking-widest uppercase text-[11px] md:text-xs font-semibold">
                Available for new opportunities
              </span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black text-white leading-[1.08] tracking-tight mb-6">
              I&apos;m{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--cyan)] via-white to-[var(--purple)] bg-[length:200%_auto] animate-gradient-x">
                Chinmay Takke
              </span>
            </h1>

            {/* Terminal Typewriter */}
            <div className="h-10 md:h-12 flex items-center justify-center lg:justify-start">
              <span className="text-lg md:text-3xl font-mono text-gray-300 flex items-center">
                <span className="text-[var(--cyan)] mr-2">{">"}</span>
                {text}
                <span className="animate-pulse inline-block w-2 md:w-3 h-6 md:h-8 bg-[var(--cyan)] ml-2 rounded-xs" />
              </span>
            </div>

            {/* Concise Value Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="mt-4 text-gray-400 text-sm md:text-base max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              Building scalable full-stack web applications and citation-grounded AI
              systems with{" "}
              <span className="text-white font-medium">
                Java, Spring Boot, React &amp; LLMs
              </span>
              .
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link href="/projects" className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="group w-full px-8 py-4 rounded-full bg-white text-black font-bold hover:bg-[var(--cyan)] transition-colors duration-300 shadow-[0_0_25px_rgba(255,255,255,0.12)] hover:shadow-[0_0_30px_rgba(0,245,212,0.4)] flex items-center justify-center gap-2 cursor-pointer"
                >
                  Explore Projects
                  <ArrowRight
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </motion.button>
              </Link>

              <Link href="/experience" className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="group w-full px-8 py-4 rounded-full border border-white/15 bg-white/[0.04] backdrop-blur-md text-white font-bold hover:border-[var(--purple)] hover:bg-[var(--purple)]/10 hover:shadow-[0_0_25px_rgba(168,85,247,0.25)] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Briefcase
                    size={17}
                    className="text-[var(--purple)] transition-transform duration-300 group-hover:rotate-6"
                  />
                  View Experience
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Image Section with Interactive 3D Tilt & Floating Badges */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9 }}
            className="order-2 flex justify-center relative py-6 md:py-10"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-[var(--cyan)] to-[var(--purple)] rounded-full blur-[90px] md:blur-[110px] opacity-15 animate-pulse pointer-events-none" />

            <motion.div
              ref={imageCardRef}
              onMouseMove={handleImageMouseMove}
              onMouseLeave={handleImageMouseLeave}
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }}
              className="group relative w-[260px] sm:w-[320px] lg:w-[390px] aspect-[4/5] cursor-pointer"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="w-full h-full relative z-10"
              >
                {/* Animated Orbital Frames */}
                <div className="absolute inset-0 border border-[var(--cyan)] rounded-[2.5rem] md:rounded-[3rem] rotate-3 opacity-25 scale-105 group-hover:rotate-6 group-hover:opacity-60 transition-all duration-500 pointer-events-none" />
                <div className="absolute inset-0 border border-[var(--purple)] rounded-[2.5rem] md:rounded-[3rem] -rotate-2 opacity-25 scale-105 group-hover:-rotate-6 group-hover:opacity-60 transition-all duration-500 pointer-events-none" />

                {/* Main Image Container */}
                <div className="relative w-full h-full rounded-[2.5rem] md:rounded-[3rem] overflow-hidden border border-white/15 group-hover:border-[var(--cyan)]/40 bg-[#111] shadow-2xl transition-colors duration-500">
                  <Image
                    src="/profile.png"
                    alt="Chinmay Takke"
                    fill
                    className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105"
                    sizes="(max-width: 768px) 260px, 390px"
                    priority
                  />
                  <div className="absolute inset-0 pointer-events-none rounded-[2.5rem] md:rounded-[3rem] shadow-[inset_0_0_45px_rgba(0,0,0,0.65)]" />
                </div>

                {/* Floating Stat Pill — Top Left */}
                <motion.div
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  style={{ transform: "translateZ(35px)" }}
                  className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-black/80 backdrop-blur-md border border-white/15 group-hover:border-[var(--cyan)]/40 shadow-xl absolute -left-8 top-10 z-20 transition-colors"
                >
                  <Terminal size={15} className="text-[var(--cyan)]" />
                  <span className="text-xs font-mono font-bold text-white">
                    500+ DSA
                  </span>
                </motion.div>

                {/* Floating Stat Pill — Bottom Right */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{
                    duration: 4.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                  style={{ transform: "translateZ(35px)" }}
                  className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-black/80 backdrop-blur-md border border-white/15 group-hover:border-[var(--purple)]/40 shadow-xl absolute -right-6 bottom-12 z-20 transition-colors"
                >
                  <Sparkles size={15} className="text-[var(--purple)]" />
                  <span className="text-xs font-mono font-bold text-white">
                    9.86 CGPA
                  </span>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: ABOUT & SKILLS */}
      <AboutSkills />
      <Connect />
      <Contact />
    </main>
  );
}