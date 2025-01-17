import mongoose from "mongoose";

const fileSchema = new mongoose.Schema(
  {
    fid: {
      type: String,
      required: true,
      unique: true,
      min: 5,
    },
    name: { type: String, required: true },
    actualname: { type: String, required: true },
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
    rootid: {
      type: mongoose.Types.ObjectId,
      refPath: "entityType",
      required: true,
    },
    entityType: {
      type: String,
      enum: ["Node", "Folder"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const File = mongoose.model("File", fileSchema);
