"use client";

import { motion } from "framer-motion";

export default function AdminHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex flex-col gap-1"
    >
      <span className="text-cyan-500 font-mono text-xs tracking-widest uppercase">
        Management / Projects
      </span>
      <h1 className="text-4xl font-black tracking-tight text-white">
        Project{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
          Inventory
        </span>
      </h1>
    </motion.div>
  );
}