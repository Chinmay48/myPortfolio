"use client"
import ExperienceForm from "@/components/forms/experience-form"
import {motion} from "framer-motion"
function AdminExperienceCreatePage() {
  return (
    <div className="space-y-10">
          <header>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col gap-1"
            >
              <span className="text-cyan-500 font-mono text-xs tracking-widest uppercase">
                Management / Experience
              </span>
              <h1 className="text-4xl font-black tracking-tight text-white">
                Experience <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Inventory</span>
              </h1>
            </motion.div>
          </header>
    
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
            <div className="xl:col-span-8">
              <ExperienceForm />
            </div>
            
           
          </div>
        </div>
  )
}

export default AdminExperienceCreatePage
