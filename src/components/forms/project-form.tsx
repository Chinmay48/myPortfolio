"use client";

import { showError, showSuccess } from "@/utils/toast";
import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Type, 
  AlignLeft, 
  Github, 
  ExternalLink, 
  Users, 
  Code, 
  Upload, 
  PlusCircle,
  Image as ImageIcon,
  Loader2
} from "lucide-react";

export default function ProjectForm({initialData}:any) {
  console.log("Initail Data:",initialData)
  const [form, setForm] = useState({
    title: initialData?.title || "",
    description:  initialData?.description || "",
    githubUrl:  initialData?.githubUrl || "",
    liveUrl: initialData?.liveUrl || "",
    type:  initialData?.type || "individual",
    techStack:  initialData?.techStack?.join(",") ||  "",
    image:  initialData?.image || "",
  });

  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const isEdit= !!initialData;

  const handleUpload = async () => {
    if (!file) {
      showError("Please select a file first");
      return;
    }
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload Failed");

      const data = await res.json();
      
      if (data.success) {
        setForm({ ...form, image: data.data.secure_url });
        showSuccess("Image Uploaded successfully");
      } else {
        throw new Error(data.message || "Upload failed");
      }
    } catch (error: any) {
      showError(error.message || "Something went wrong");
    } finally {
      setIsUploading(false);
    }
  };
   
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(form);
    try {
      const url= isEdit?`/api/projects/${initialData._id}`:`/api/projects`;
      const method=isEdit?"PUT":"POST"
      const res = await fetch(url, {
        method: method,
        body: JSON.stringify({
          ...form,
          techStack: form.techStack.split(",").map((s:string) => s.trim()),
        }),
      });

      const data = await res.json();
      if (data.success) showSuccess(data.message);
    } catch (error: any) {
      showError(error.message);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.form
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      onSubmit={handleSubmit}
      className="bg-[#0A0A0A] border border-white/5 p-8 rounded-2xl space-y-6 max-w-2xl shadow-2xl relative overflow-hidden"
    >
      {/* Decorative background glow */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-cyan-500/10 blur-[80px] rounded-full pointer-events-none" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Title */}
        <motion.div variants={itemVariants} className="space-y-2 col-span-2">
          <label className="text-xs font-bold uppercase tracking-widest text-gray-500 flex items-center gap-2">
            <Type size={14} /> Project Title
          </label>
          <input
            name="title"
            placeholder="E.g. Portfolio v3"
            onChange={handleChange}
            className="w-full p-3 bg-white/5 border border-white/10 rounded-xl focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 outline-none transition-all text-white placeholder:text-gray-600"
            value={form.title}
          />
        </motion.div>

        {/* Description */}
        <motion.div variants={itemVariants} className="space-y-2 col-span-2">
          <label className="text-xs font-bold uppercase tracking-widest text-gray-500 flex items-center gap-2">
            <AlignLeft size={14} /> Description
          </label>
          <textarea
            name="description"
            value={form.description}
            rows={3}
            placeholder="What makes this project special?"
            onChange={handleChange}
            className="w-full p-3 bg-white/5 border border-white/10 rounded-xl focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 outline-none transition-all text-white placeholder:text-gray-600 resize-none"
          />
        </motion.div>

        {/* URLs */}
        <motion.div variants={itemVariants} className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-gray-500 flex items-center gap-2">
            <Github size={14} /> GitHub URL
          </label>
          <input
            value={form.githubUrl}
            name="githubUrl"
            placeholder="https://github.com/..."
            onChange={handleChange}
            className="w-full p-3 bg-white/5 border border-white/10 rounded-xl focus:border-cyan-500/50 outline-none transition-all text-white placeholder:text-gray-600"
          />
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-gray-500 flex items-center gap-2">
            <ExternalLink size={14} /> Live URL
          </label>
          <input
            name="liveUrl"
            value={form.liveUrl}
            placeholder="https://demo.com"
            onChange={handleChange}
            className="w-full p-3 bg-white/5 border border-white/10 rounded-xl focus:border-cyan-500/50 outline-none transition-all text-white placeholder:text-gray-600"
          />
        </motion.div>

        {/* Type & Tech Stack */}
        <motion.div variants={itemVariants} className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-gray-500 flex items-center gap-2">
            <Users size={14} /> Project Type
          </label>
          <select
            value={form.type}
            name="type"
            onChange={handleChange}
            className="w-full p-3 bg-white/5 border border-white/10 rounded-xl focus:border-cyan-500/50 outline-none transition-all text-white appearance-none cursor-pointer"
          >
            <option value="individual" className="bg-gray-900">Individual</option>
            <option value="team" className="bg-gray-900">Team</option>
          </select>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-gray-500 flex items-center gap-2">
            <Code size={14} /> Tech Stack
          </label>
          <input
            name="techStack"
            value={form.techStack}
            placeholder="Next.js, Tailwind, GSAP"
            onChange={handleChange}
            className="w-full p-3 bg-white/5 border border-white/10 rounded-xl focus:border-cyan-500/50 outline-none transition-all text-white placeholder:text-gray-600"
          />
        </motion.div>

        {/* File Upload Section */}
        <motion.div variants={itemVariants} className="col-span-2 space-y-4">
          <label className="text-xs font-bold uppercase tracking-widest text-gray-500 flex items-center gap-2">
            <ImageIcon size={14} /> Project Thumbnail
          </label>
          
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <label className="flex-1 w-full flex flex-col items-center justify-center p-6 border-2 border-dashed border-white/10 hover:border-cyan-500/40 bg-white/5 rounded-2xl cursor-pointer transition-all group">
              <Upload className="text-gray-500 group-hover:text-cyan-400 mb-2 transition-colors" />
              <span className="text-sm text-gray-400 group-hover:text-white transition-colors">
                {file ? file.name : "Click to select image"}
              </span>
              <input
                type="file"
                className="hidden"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
            </label>

            <button
              type="button"
              onClick={handleUpload}
              disabled={isUploading || !file}
              className="w-full md:w-auto px-6 py-3 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 rounded-xl hover:bg-cyan-500 hover:text-black transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-bold uppercase text-xs tracking-widest"
            >
              {isUploading ? <Loader2 className="animate-spin" size={16} /> : <Upload size={16} />}
              Upload
            </button>
          </div>
          
          {form.image && (
            <p className="text-[10px] text-cyan-500/70 truncate bg-cyan-500/5 p-2 rounded border border-cyan-500/10">
              Successfully linked: {form.image}
            </p>
          )}
        </motion.div>
      </div>

      <motion.button
        variants={itemVariants}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        className="w-full py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-xl font-bold uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-all flex items-center justify-center gap-3"
      >
        <PlusCircle size={20} />
       {isEdit?"Update Project":"Create Project"}
      </motion.button>
    </motion.form>
  );
}