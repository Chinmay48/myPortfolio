import ExperienceForm from "@/components/forms/experience-form";
import AdminHeader from "@/components/layout/admin-header";

interface Props{
    params:Promise<{id:string}>
}

export default async function AdminProjectsEditPage({params}:Props) {

    const {id}=await params;
    const res=await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/experience/${id}`,{cache:"no-store"});
    const data= await res.json()
  return (
    <div className="space-y-10">
      <header>
       <AdminHeader/>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        <div className="xl:col-span-8">
          <ExperienceForm initialData={data.data} />
        </div>
        
        {/* Helper Side Column */}
        <div className="xl:col-span-4 space-y-6">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <h3 className="text-sm font-bold uppercase text-gray-400 mb-4 tracking-widest">Guidelines</h3>
            <ul className="text-xs text-gray-500 space-y-3 leading-relaxed">
              <li className="flex gap-2">
                <span className="text-cyan-500">01</span>
                Use high-resolution 16:9 images for better display on the home page.
              </li>
              <li className="flex gap-2">
                <span className="text-cyan-500">02</span>
                Separate tech stack items with commas (e.g., React, Tailwind).
              </li>
              <li className="flex gap-2">
                <span className="text-cyan-500">03</span>
                Verify live URLs before creating to ensure site reliability.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}