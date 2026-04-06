"use client"
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { showError,showSuccess } from "@/utils/toast";
import { Plus, Briefcase} from "lucide-react";

import AdminAchievementCard from "@/components/cards/achievement-card";
function AdminAchievementPage() {
   
  const router =useRouter();
  const[achievements,setAchievements]=useState<any[]>([]);
  const [loading,setLoading]=useState(false)

  const fetchAchievemnets=async()=>{
    setLoading(true)
    try {
       const res=await fetch("/api/achievements")
       const data=await res.json();
       if(!res.ok){
        showError("Failed to fetch achievements")
       }
       setAchievements(data.data);
    } catch (error:any) {
      showError(error.message)
    }
    finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
     fetchAchievemnets()
  },[])


  const handleDelete=async(id:string)=>{
    try {
      if(!confirm("Are you sure you need to delete this achievements")) return;
      const res=await fetch(`/api/achievements/${id}`);
      const data=await res.json();
      if(!res.ok){
        showError("Failed to delete the Achievements")
      }
      showSuccess(data.message)
      setAchievements((prev)=>prev.filter((a)=>a._id!==id));
    } catch (error:any) {
      showError(error.message)
    }

  }

  const handleUpdate=(id:string)=>{
    router.push(`/admin/achievements/${id}`)
  }

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="flex items-center gap-2 text-cyan-500 mb-2">
            <Briefcase size={16} />
            <span className="text-xs font-bold uppercase tracking-[0.3em]">
              Achievements Vault
            </span>
          </div>
          <h1 className="text-4xl font-black text-white">
            Manage{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Works
            </span>
          </h1>
        </motion.div>

        <Link href="/admin/achievements/create">
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 20px rgba(6,182,212,0.4)",
            }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 bg-cyan-500 text-black px-6 py-3 rounded-2xl font-bold uppercase text-xs tracking-widest transition-all"
          >
            <Plus size={18} />
            Add New Project
          </motion.button>
        </Link>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-1 bg-white/5 border border-white/10 rounded-2xl">
        <div className="p-4 text-center border-r border-white/5">
          <p className="text-[10px] text-gray-500 uppercase font-bold tracking-tighter">
            Total Projects
          </p>
          <p className="text-xl font-bold text-cyan-400">{achievements.length}</p>
        </div>
        <div className="p-4 text-center">
          <p className="text-[10px] text-gray-500 uppercase font-bold tracking-tighter">
            Live Status
          </p>
          <p className="text-xl font-bold text-green-500 underline decoration-green-500/30 underline-offset-4">
            Active
          </p>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AnimatePresence mode="popLayout">
          {achievements.map((achievement) => (
            <AdminAchievementCard
              key={achievement._id}
              achievement={achievement}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          ))}
        </AnimatePresence>

        {/* Empty State / Add Card Placeholder */}
        <Link
          href="/admin/achievements/create"
          className="group border-2 border-dashed border-white/5 rounded-2xl flex flex-col items-center justify-center min-h-[300px] hover:border-cyan-500/20 hover:bg-cyan-500/[0.02] transition-all"
        >
          <div className="p-4 rounded-full bg-white/5 group-hover:bg-cyan-500/10 group-hover:scale-110 transition-all text-gray-600 group-hover:text-cyan-400">
            <Plus size={32} />
          </div>
          <p className="mt-4 text-xs font-bold uppercase tracking-widest text-gray-600 group-hover:text-gray-400">
            New Entry
          </p>
        </Link>
      </div>
    </div>
  )
}

export default AdminAchievementPage;
