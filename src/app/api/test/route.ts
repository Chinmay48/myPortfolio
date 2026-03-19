import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Project } from "@/model/project.model";
export async function GET() {
    await connectDB()
    const projects=await Project.find()
    return NextResponse.json({message:"Model Working",date:projects})
}