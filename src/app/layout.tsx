

import type { Metadata } from "next";
import ToastProvider from "@/components/ui/ToastProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Chinmay Takke's Portfolio",
  description:
    "Portfolio of Chinmay Takke, a Computer Engineering student and Full-Stack Developer in Mumbai experienced in building scalable web applications using Java, Spring Boot, React, MERN stack, and AI technologies including RAG and LLMs.",
  keywords: [
    "Chinmay Takke",
    "Full-Stack Developer",
    "AI Engineer",
    "Computer Engineering",
    "Java Developer",
    "Spring Boot",
    "React",
    "MERN Stack",
    "Node.js",
    "Python",
    "RAG",
    "LLMs",
    "MCP Server",
    "Mumbai",
  ],
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      
    >
      <body className="min-h-full flex flex-col">{children}
      <ToastProvider/>
      </body>
    </html>
  );
}
