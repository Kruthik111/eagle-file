import { Router } from "express";
import { singleDownload } from "../controllers/file.controller.js";

const filerouter = Router();

filerouter.get("/download/:fid", singleDownload);

export default filerouter;
