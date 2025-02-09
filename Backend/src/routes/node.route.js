import { Router } from "express";
import {
  createNode,
  getNodeData,
  validateNodePassword,
} from "../controllers/node.controller.js";
import multer from "multer";
import path from "path";
import fs from "node:fs";

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

async function isSecuredNode(req, res, next) {
  var nid = req.params.nodeid;
  const nodeData = await Node.findOne({ nodeid: nid });
  if (nodeData.password.length > 0) {
  }
  console.log(nodeData);
  next();
}

noderouter.get("/:nodeid", getNodeData);
noderouter.get("/:nodeid/validate", validateNodePassword);
noderouter.post("/new", upload.array("files", 5), createNode);

export default noderouter;
