import { connectDB } from "@/lib/db";
import { Project } from "@/model/project.model";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
interface paramsType {
  params: Promise<{ id: string }>;
}

export async function PUT(req: NextRequest, { params }: paramsType) {
 const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }
  try {
    await connectDB();
    const body = await req.json();
    const { id } = await params;
    const { title, description, githubUrl, liveUrl, type, techStack, image } =
      body;
    if (!title || !description || !githubUrl || !type) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields",
        },
        { status: 400 },
      );
    }

    const project=await Project.findByIdAndUpdate(id,{title, description, githubUrl, liveUrl, type, techStack, image},{new:true});
    if (!project) {
      return NextResponse.json(
        { success: false, message: "Project not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
        {
          success: true,
          message: "Project details updated successfully",
          data:project
        },
        { status: 200 },
      );
    

    
  } catch (error) {
    return NextResponse.json(
        {
          success: false,
          message: "Failed to update project details",
        },
        { status: 400 },
      );
  }
}


export async function DELETE(req:NextRequest,{params}:paramsType) {
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
      const project=  await Project.findByIdAndDelete(id);
        if (!project) {
      return NextResponse.json(
        { success: false, message: "Project not found" },
        { status: 404 }
      );
    }
        return NextResponse.json(
        {
          success: true,
          message: "Project deleted successfully",
        },
        { status: 200 },
      );
    } catch (error) {
        return NextResponse.json(
        {
          success: false,
          message: "Failed to delete project",
        },
        { status: 400 },
      );
    }
}