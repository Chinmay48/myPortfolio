import { connectDB } from "@/lib/db";
import { Skill } from "@/model/skill.model";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
interface ParamsType{
    params:Promise<{id:string}>

}

export async function PUT(req:NextRequest,{params}:ParamsType) {
   const session = await getServerSession(authOptions);
      if (!session) {
        return NextResponse.json(
          { success: false, message: "Unauthorized" },
          { status: 401 },
        );
      }
    try {
        await connectDB()
        const {id}=await params;
        const body= await req.json();
        const {name,icon,category}=body
        const skill= await Skill.findByIdAndUpdate(id,{
            name,icon,category
        },{new:true})

        if(!skill){
            return NextResponse.json({
                success:false,
                message:"Skill not found"
            },{status:404})
        }

        return NextResponse.json({
            success:true,
            message:"Skill Updated",
            data:skill
        })


    } catch (error) {
        return NextResponse.json({
                success:false,
                message:"Failed to update skill"
            },{status:500})
    }
}


export async function DELETE({params}:ParamsType) {
    const session = await getServerSession(authOptions);
      if (!session) {
        return NextResponse.json(
          { success: false, message: "Unauthorized" },
          { status: 401 },
        );
      }
    try {
        await connectDB();
        const {id}=await params;
        const skill=await Skill.findByIdAndDelete(id);
        if(!skill){
            return NextResponse.json({
                success:false,
                message:"Skill not found"
            },{status:404})
        }

        return NextResponse.json({
            success:true,
            message:"Skill deleted"
        })
    } catch (error) {
        return NextResponse.json({
                success:false,
                message:"Failed to delete skill"
            },{status:500})
    }
}