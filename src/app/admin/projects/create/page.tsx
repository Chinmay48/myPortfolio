"use client";

import ProjectForm from "@/components/forms/project-form";
import { motion } from "framer-motion";

export default function AdminProjectsCreatePage() {
  return (
    <div className="space-y-10">
      <header>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col gap-1"
        >
          <span className="text-cyan-500 font-mono text-xs tracking-widest uppercase">
            Management / Projects
          </span>
          <h1 className="text-4xl font-black tracking-tight text-white">
            Project <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Inventory</span>
          </h1>
        </motion.div>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        <div className="xl:col-span-8">
          <ProjectForm />
        </div>
        
        {/* Helper Side Column */}
        <div className="xl:col-span-4 space-y-6">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <h3 className="text-sm font-bold uppercase text-gray-400 mb-4 tracking-widest">Guidelines</h3>
            <ul className="text-xs text-gray-500 space-y-3 leading-relaxed">
              <li className="flex gap-2">
                <span className="text-cyan-500">01</span>
                Use high-resolution 16:9 images for better display on the home page.
              </li>
              <li className="flex gap-2">
                <span className="text-cyan-500">02</span>
                Separate tech stack items with commas (e.g., React, Tailwind).
              </li>
              <li className="flex gap-2">
                <span className="text-cyan-500">03</span>
                Verify live URLs before creating to ensure site reliability.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}