import mongoose from "mongoose";

const folderSchema = new mongoose.Schema(
  {
    folderid: {
      type: String,
      required: true,
      unique: true,
      min: 5,
    },
    name: { type: String, required: true, default: "untitled" },
    iconcolor: { type: String, required: true, default: "#fca311" },
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
    modifiedBy: {
      type: {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
      required: true,
      default: null,
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

export const Folder = new mongoose.model("Folder", folderSchema);
