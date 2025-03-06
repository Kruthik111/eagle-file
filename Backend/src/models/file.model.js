import mongoose, { Schema } from "mongoose";

const fileSchema = new mongoose.Schema(
  {
    _id: Schema.Types.ObjectId,
    name: { type: String, required: true },
    originalname: { type: String, required: true },
    storageId: {
      type: String,
      required: true,
      unique: true,
    },
    size: {
      type: Number,
      required: true,
      default: 0,
    },
    password: {
      type: String,
      required: false,
      select: false,
    },
    createdAt: { type: Date, expires: "10m", default: Date.now },
  },
  {
    timestamps: true,
  }
);

export const File = mongoose.model("File", fileSchema);
