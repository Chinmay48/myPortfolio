import { Inter } from "next/font/google";
import Navbar from "@/components/layout/navbar";

const inter = Inter({ subsets: ["latin"] });

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${inter.className} bg-[#0A0A0A] text-white antialiased`}
      style={{
        ["--cyan" as any]: "#00F5D4",
        ["--purple" as any]: "#9B5DE5",
        ["--bg" as any]: "#0A0A0A",
        ["--text" as any]: "#FFFFFF",
      }}
    >
      <Navbar />

      <div className="relative isolate pt-12">
        {children}
      </div>

      <footer className="py-10 text-center text-gray-600 text-sm border-t border-white/5">
        © {new Date().getFullYear()} Chinmay.dev • Built with Next.js
      </footer>
    </div>
  );
}