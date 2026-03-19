import { connectDB } from "@/lib/db";
import { Achievement } from "@/model/achievement.model";
import { NextRequest, NextResponse } from "next/server";

interface ParamsType {
  params: Promise<{ id: string }>;
}

export async function PUT(req: NextRequest, { params }: ParamsType) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await req.json();
    const { title, description, type, image, issuer, date } = body;

    if (!title || !description || !type || !image || !date) {
      return NextResponse.json(
        {
          success: false,
          message: "Required Missing details",
        },
        { status: 404 },
      );
    }

    const achievement = await Achievement.findByIdAndUpdate(
      id,
      { title, description, type, image, issuer, date },
      { new: true },
    );
    if (!achievement) {
      return NextResponse.json(
        {
          success: false,
          message: "Achievement not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Achievemnet updated successfully",
        data: achievement,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update Achievement",
      },
      { status: 500 },
    );
  }
}

export async function DELETE(req: NextRequest, { params }: ParamsType) {
  try {
    await connectDB(); 

    const { id } = await params;

    const achievement = await Achievement.findByIdAndDelete(id);

    if (!achievement) {
      return NextResponse.json(
        {
          success: false,
          message: "Achievement not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Achievement deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete achievement",
      },
      { status: 500 }
    );
  }
}