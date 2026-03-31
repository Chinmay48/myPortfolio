"use client"
import SkillForm from '@/components/forms/skill-form'

import{motion} from "framer-motion"
export default function AdminSkillCreatePage() {
  return (
    <div className="max-w-4xl">
      <motion.div 
        initial={{ opacity: 0, x: -10 }} 
        animate={{ opacity: 1, x: 0 }}
        className="mb-10"
      >
        <h1 className="text-3xl font-black text-white uppercase tracking-tight">
          Add <span className="text-cyan-500">Skill</span>
        </h1>
        <p className="text-gray-500 text-sm mt-1">Register a new core technology to your professional stack.</p>
      </motion.div>
      <SkillForm />
    </div>
  );
}
