import SkillForm from "@/components/forms/skill-form";

async function getSkill(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/skills/${id}`,
    { cache: "no-store" }
  );

  const data = await res.json();
  return data.data;
}

export default async function EditSkillPage({ params }: any) {
  const { id } = await params; // ✅ IMPORTANT (Next 15)

  const skill = await getSkill(id);

  return (
    <div className="p-6">
      <h1 className="text-white text-2xl mb-6">
        Edit Skill
      </h1>
      <SkillForm initialData={skill} />
    </div>
  );
}