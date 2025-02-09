import mongoose from "mongoose";

const nodeSchema = new mongoose.Schema(
  {
    nodeid: {
      type: String,
      required: [true, "nodeid required"],
      unique: [true, "nodeid should be unique"],
      minlength: [4, "nodeid should be of atleast length 5"],
    },
    name: {
      type: String,
      required: [true, "nodename required"],
      minlength: [1, "node name cannot contain empty string "],
      default: "node",
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
      folders: {
        type: [
          {
            type: mongoose.Types.ObjectId,
            ref: "Folder",
          },
        ],
        default: [],
      },
      files: {
        type: [
          {
            type: mongoose.Types.ObjectId,
            ref: "File",
          },
        ],
        default: [],
      },
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
