import { Router } from "express";
import { createNode, getNodeData } from "../controllers/node.controller";

const noderouter = Router();

noderouter.get("/:nodeid", getNodeData);
noderouter.post("/new", createNode);

export default noderouter;
