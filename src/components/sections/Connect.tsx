"use client";

import { motion } from "framer-motion";
import { 
  SiLeetcode, 
   
  SiGithub, 
  SiInstagram 
} from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import { ExternalLink } from "lucide-react";

const socials = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/chinmay-takke-4a331a28a/",
    icon: <FaLinkedin />,
    color: "#0077B5",
    description: "Professional Network & Experience",
  },
  {
    name: "GitHub",
    url: "https://github.com/Chinmay48",
    icon: <SiGithub />,
    color: "#FFFFFF",
    description: "Open Source Projects & Codebase",
  },
  {
    name: "LeetCode",
    url: "https://leetcode.com/u/Chinmay48/",
    icon: <SiLeetcode />,
    color: "#FFA116",
    description: "400+ Problems Solved",
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/chinmaytakke48/",
    icon: <SiInstagram />,
    color: "#E4405F",
    description: "Personal Updates & Tech Reels",
  },
];

export default function Connect() {
  return (
    <section className="py-20 px-6 bg-[#0A0A0A]">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--cyan)] to-[var(--purple)]">Connect</span>
          </h2>
          <p className="text-gray-400 font-mono text-sm tracking-widest uppercase">
            Follow my journey across the web
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {socials.map((social, index) => (
            <motion.a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative p-8 rounded-[2rem] bg-white/5 border border-white/10 overflow-hidden transition-all duration-500 hover:border-white/20"
            >
              {/* Dynamic Glow Background */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
                style={{ backgroundColor: social.color }}
              />
              
              <div className="relative z-10 flex flex-col items-center text-center">
                <div 
                  className="text-4xl mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
                  style={{ color: social.color }}
                >
                  {social.icon}
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-white transition-colors">
                  {social.name}
                </h3>
                
                <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                  {social.description}
                </p>

                <div 
                  className="flex items-center gap-2 text-xs font-bold uppercase tracking-tighter transition-all duration-300 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
                  style={{ color: social.color }}
                >
                  Visit Profile <ExternalLink size={14} />
                </div>
              </div>

              {/* Decorative Corner Icon */}
              <div 
                className="absolute -bottom-4 -right-4 text-8xl opacity-[0.03] transition-all duration-500 group-hover:opacity-[0.07] group-hover:scale-110"
                style={{ color: social.color }}
              >
                {social.icon}
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}