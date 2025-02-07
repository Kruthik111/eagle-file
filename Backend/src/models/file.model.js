import mongoose from "mongoose";

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
  },
  {
    timestamps: true,
  }
);

export const File = mongoose.model("File", fileSchema);
