"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white flex items-center justify-center px-6">
      
      <div className="text-center max-w-3xl">
        
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold leading-tight"
        >
          Hi, I'm{" "}
          <span className="bg-gradient-to-r from-[#00F5D4] to-[#9B5DE5] bg-clip-text text-transparent">
            Chinmay
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-4 text-gray-400 text-lg"
        >
          Full Stack Developer | MERN | Next.js | Django
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mt-8 flex justify-center gap-4 flex-wrap"
        >
          
          {/* Projects Button */}
          <Link href="/projects">
            <button className="px-6 py-3 rounded-xl bg-[#121212] border border-[#00F5D4] text-[#00F5D4] 
              hover:shadow-[0_0_20px_#00F5D4] transition duration-300">
              View Projects
            </button>
          </Link>

          {/* Contact Button */}
          <Link href="/contact">
            <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#00F5D4] to-[#9B5DE5] text-black font-semibold 
              hover:shadow-[0_0_25px_#9B5DE5] transition duration-300">
              Contact Me
            </button>
          </Link>

        </motion.div>

      </div>
    </main>
  );
}