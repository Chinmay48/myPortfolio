"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Briefcase} from "lucide-react";
import AdminProjectCard from "@/components/cards/project-card";
import { showError, showSuccess } from "@/utils/toast";
import { useEffect } from "react";
import { useRouter } from "next/navigation";


export default function AdminProjectsPage() {
  
  const router = useRouter();
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();
      if (!res.ok) {
        showError("Failed to fetch projects");
      }

      setProjects(data.data);
    } catch (error: any) {
      showError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{
   fetchProjects();
  },[])



  

  const handleDelete = async (id: string) => {
   try {
     if(!confirm("Are you sure you need to delete this project?")) return;
    const res= await fetch(`/api/projects/${id}`,{
      method:"DELETE"
    });

    const data= await res.json();
    if(!res.ok) {
      showError("Failed to delete the project");
    }
    showSuccess(data.message);
    setProjects((prev)=>prev.filter((p)=>p._id !== id));
   } catch (error:any) {
      showError(error.message);
   }
  };

  const handleUpdate=async(id:String)=>{
       router.push(`/admin/projects/${id}`)
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
              Project Vault
            </span>
          </div>
          <h1 className="text-4xl font-black text-white">
            Manage{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Works
            </span>
          </h1>
        </motion.div>

        <Link href="/admin/projects/create">
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
          <p className="text-xl font-bold text-cyan-400">{projects.length}</p>
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
          {projects.map((project) => (
            <AdminProjectCard
              key={project._id}
              project={project}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          ))}
        </AnimatePresence>

        {/* Empty State / Add Card Placeholder */}
        <Link
          href="/admin/projects/create"
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
  );
}
