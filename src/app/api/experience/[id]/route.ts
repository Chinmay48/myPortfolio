import { connectDB } from "@/lib/db";
import { Experience } from "@/model/experience.model";
import { NextRequest, NextResponse } from "next/server";

interface ParamsType {
  params: Promise<{ id: string }>;
}

export async function PUT(req: NextRequest, { params }: ParamsType) {
  try {
    await connectDB();

    const { id } = await params;
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

    if (!role || !company || !description || !startDate) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields",
        },
        { status: 400 }
      );
    }

    const experience = await Experience.findByIdAndUpdate(
      id,
      { role, company, description, startDate, endDate, isCurrent, techStack },
      { new: true }
    );

    if (!experience) {
      return NextResponse.json(
        {
          success: false,
          message: "Experience not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Experience updated successfully",
        data: experience,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update experience",
      },
      { status: 500 }
    );
  }
}


export async function DELETE(
  req: NextRequest,
  { params }: ParamsType
) {
  try {
    await connectDB();

    const { id } = await params;

    const experience = await Experience.findByIdAndDelete(id);

    if (!experience) {
      return NextResponse.json(
        {
          success: false,
          message: "Experience not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Experience removed successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to remove experience",
      },
      { status: 500 }
    );
  }
}
