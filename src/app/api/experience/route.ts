import { connectDB } from "@/lib/db";
import { Experience } from "@/model/experience.model";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
export async function GET() {
  try {
    await connectDB();
    const experience = await Experience.find().sort({ createdAt: -1 });
    return NextResponse.json(
      {
        success: true,
        data: experience,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch Experiences",
      },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
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
    const {
      role,
      company,
      description,
      startDate,
      endDate,
      isCurrent,
      techStack,
    } = body;

    if(!role || !company || !description || !startDate){
        return NextResponse.json({
            success:false,
            message:"Missing details required"
        },{status:400})
    }

    const experience= await Experience.create({
      role,
      company,
      description,
      startDate,
      endDate,
      isCurrent,
      techStack,
    })

    return NextResponse.json({
        success:true,
        message:"Experience added successfully",
        data:experience
    })

    
  } catch (error) {

    return NextResponse.json(
      {
        success: false,
        message: "Failed to add Experiences",
      },
      { status: 500 },
    );
  }
}
