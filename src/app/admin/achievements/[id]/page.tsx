
import AchievementForm from "@/components/forms/achievement-form";
import AdminHeader from "@/components/layout/admin-header";

interface Props{
   params:Promise<{id:string}>
}

export default async function AdminAchievementsEditPage({params}:Props) {

    const {id}=await params;
    const res=await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/achievements/${id}`,{cache:"no-store"});
    const data= await res.json();
  return (
    <div className="space-y-10">
      <header>
       <AdminHeader/>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        <div className="xl:col-span-8">
         <AchievementForm initialData={data.data} />
        </div>  
      </div>
    </div>
  );
}

