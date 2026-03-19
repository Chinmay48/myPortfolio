import mongoose, { Schema, Document, models, model } from "mongoose";

export interface IAchievement extends Document {
  title: string;
  description: string;
  type: "hackathon" | "certificate" | "award";
  image: string;
  issuer?: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

const AchievementSchema = new Schema<IAchievement>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["hackathon", "certificate", "award"],
      required: true,
    },
    image: {
      type: String,
      required: true, // certificate image URL
    },
    issuer: {
      type: String, // e.g., Google, Hackathon name
    },
    date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Achievement =
  models.Achievement ||
  model<IAchievement>("Achievement", AchievementSchema);