import { connectDB } from "@/lib/db";
import { Skill } from "@/model/skill.model";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

interface paramsType {
  params: Promise<{ id: string }>;
}


export async function GET(req: NextRequest, { params }: paramsType) {
  try {
    await connectDB();

    const { id } = await params;

    const skill = await Skill.findById(id);

    if (!skill) {
      return NextResponse.json(
        { success: false, message: "Skill not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: skill,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch skill" },
      { status: 500 }
    );
  }
}

//
// ✅ UPDATE SKILL
//
export async function PUT(req: NextRequest, { params }: paramsType) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    await connectDB();

    const { id } = await params;
    const body = await req.json();

    const { name, icon, category } = body;

    if (!name || !icon || !category) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const skill = await Skill.findByIdAndUpdate(
      id,
      { name, icon, category },
      { new: true }
    );

    if (!skill) {
      return NextResponse.json(
        { success: false, message: "Skill not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Skill updated successfully",
        data: skill,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to update skill" },
      { status: 400 }
    );
  }
}


export async function DELETE(req: NextRequest, { params }: paramsType) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    await connectDB();

    const { id } = await params;

    const skill = await Skill.findByIdAndDelete(id);

    if (!skill) {
      return NextResponse.json(
        { success: false, message: "Skill not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Skill deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to delete skill" },
      { status: 400 }
    );
  }
}