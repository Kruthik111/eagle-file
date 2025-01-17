import { request } from "express";
import mongoose from "mongoose";

const nodeSchema = new mongoose.Schema(
  {
    nodeid: {
      type: String,
      required: [true, "nodeid is required"],
      unique: [true, "nodeid should be unique"],
      min: [5, "nodeid should be of atleast length 5"],
    },
    name: {
      type: String,
      required: true,
      min: [1, "node name cannot contain empty string "],
    },
    iconcolor: { type: String, required: true, default: "#fca311" },
    size: {
      type: Number,
      required: [true, "size is required"],
    },
    password: {
      type: String,
      required: false,
      select: false,
    },
    items: {
      folders: [
        {
          type: mongoose.Types.ObjectId,
          ref: "Folder",
          required: true,
          default: [],
        },
      ],
      files: [
        {
          type: mongoose.Types.ObjectId,
          ref: "File",
          required: true,
          default: [],
        },
      ],
      required: true,
    },
    owner: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: false,
    },
    users: {
      type: [
        {
          type: mongoose.Types.ObjectId,
          ref: "User",
        },
      ],
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Node = new mongoose.model("Node", nodeSchema);
