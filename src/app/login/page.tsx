"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { ArrowLeft } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black to-gray-900 px-4">
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-white/20 w-[350px] text-center">
        <h1 className="text-2xl font-bold text-white mb-2">
          Admin Login
        </h1>

        <p className="text-gray-300 mb-6">
          Sign in to manage your portfolio
        </p>

        <div className="space-y-3">
          <button
            onClick={() => signIn("google", { callbackUrl: "/admin" })}
            className="flex items-center justify-center gap-3 w-full py-3 bg-white text-black rounded-lg font-medium hover:scale-105 active:scale-95 transition-transform cursor-pointer"
          >
            <FcGoogle size={20} />
            Sign in with Google
          </button>

          <Link
            href="/"
            className="flex items-center justify-center gap-2 w-full py-3 bg-white/5 border border-white/15 text-gray-200 rounded-lg font-medium hover:bg-white/10 hover:text-white transition-all"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}