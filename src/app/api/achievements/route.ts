import { connectDB } from "@/lib/db";
import { Achievement } from "@/model/achievement.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const achivements = await Achievement.find().sort({ date:-1 });
    return NextResponse.json(
      {
        success: true,
        data: achivements,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch the experience",
      },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const { title, description, type, image, issuer, date } = body;
    if (!title || !description || !type || !image || !date) {
      return NextResponse.json(
        {
          success: false,
          message: "Required Missing details",
        },
        { status: 400 },
      );
    }

    const achievement = await Achievement.create({
      title,
      description,
      type,
      image,
      issuer,
      date,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Achievement create successfully",
        data: achievement,
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to add Achievement",
      },
      { status: 500 },
    );
  }
}
