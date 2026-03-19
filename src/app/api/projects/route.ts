import { connectDB } from "@/lib/db";
import { Project } from "@/model/project.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDB()
        const projects=await Project.find().sort({createdAt:-1})
        return NextResponse.json({
            success:true,
            data:projects
        },{
            status:200
        })
    } catch (error) {
        return NextResponse.json({
            success:false,
            message:"Failed to fetch projects"
        },{
            status:500
        })
    }
}


export async function POST(req:NextRequest) {
    try {
        await connectDB()
        const body= await req.json()
        const {title,description,githubUrl,liveUrl,type,techStack,image}=body
        if(!title || !description || !githubUrl || !type){
            return NextResponse.json({
                success:false,message:"Missing required fields"
            },{status:400})
        }

        const project=await Project.create({
            title,description,githubUrl,liveUrl,type,techStack,image
        })

        return NextResponse.json({
            success:true,
            message:"Project created successfully",
            data:project
        },{status:201})

    } catch (error) {
        return NextResponse.json({
            success:false,
            message:"Failed to create Project",
            
        },{status:500})
    }
}