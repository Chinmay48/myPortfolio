import { connectDB } from "@/lib/db";
import { Skill } from "@/model/skill.model";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
export async function GET() {
    try {
        await connectDB();
        const skills=await Skill.find()
        return NextResponse.json({
            success:true,
            data:skills
        })
    } catch (error) {
        return NextResponse.json({
            success:false,
            message:"Failed to fetch skills",
            
        },{status:500})
    }
}


export async function  POST(req:NextRequest) {
  const session = await getServerSession(authOptions);
      if (!session) {
        return NextResponse.json(
          { success: false, message: "Unauthorized" },
          { status: 401 },
        );
      }
   try {
     await connectDB()
    const body=req.json();
    const {name,icon,category}=await body

    if(!name || !icon || !category){
         return NextResponse.json({
            success:false,
            message:"Missing required details",
            
        },{status:400})
    }

    const skill=await Skill.create({
        name,icon,category
    })
    return NextResponse.json({
        success:true,
        message:"Skill added successfully",
        data:skill
    },{status:201})
   } catch (error) {
    return NextResponse.json({
            success:false,
            message:"Failed to add skills",
            
        },{status:500})
   }
}