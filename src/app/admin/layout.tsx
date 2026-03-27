import AdminSidebar from "@/components/layout/admin-sidebar";
import AnimatedWrapper from "@/components/ui/AnimatedUIWrapper";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#020202] text-white selection:bg-cyan-500/30">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/5 blur-[120px] rounded-full" />
      </div>

      <AdminSidebar />

      <main className="flex-1 relative z-10 pt-20 lg:pt-0">
        <div className="max-w-7xl mx-auto p-4 md:p-8 lg:p-12">
          <AnimatedWrapper>
            {children}
          </AnimatedWrapper>
        </div>
      </main>
    </div>
  );
}