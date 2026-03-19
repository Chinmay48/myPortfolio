"use client";

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black to-gray-900">
      
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-white/20 w-[350px] text-center">
        
        <h1 className="text-2xl font-bold text-white mb-2">
          Admin Login
        </h1>
        
        <p className="text-gray-300 mb-6">
          Sign in to manage your portfolio
        </p>

        <button
          onClick={() => signIn("google")}
          className="flex items-center justify-center gap-3 w-full py-3 bg-white text-black rounded-lg font-medium hover:scale-105 transition-transform"
        >
          <FcGoogle size={20} />
          Sign in with Google
        </button>

      </div>

    </div>
  );
}