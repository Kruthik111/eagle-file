import { Router } from "express";
import {
  createNode,
  downloadFiles,
  getNodeData,
  getNodeDataWithoutPassword,
  validateNodePassword,
} from "../controllers/node.controller.js";
import multer from "multer";

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

noderouter.post("/new", upload.array("files"), createNode);
noderouter.post("/download", downloadFiles);
noderouter.get("/:nodeid", getNodeData);
noderouter.get("/owner/:nodeid", getNodeDataWithoutPassword);
noderouter.post("/:nodeid/validate", validateNodePassword);

export default noderouter;
