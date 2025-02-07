import { Router } from "express";
import { createNode, getNodeData } from "../controllers/node.controller.js";
import multer from "multer";
import path from "path";

const noderouter = Router();

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

noderouter.get("/:nodeid", getNodeData);
noderouter.post("/new", upload.array("files", 5), createNode);

export default noderouter;
