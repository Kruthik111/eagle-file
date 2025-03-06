import { File } from "../models/file.model.js";
import path from "node:path";
import { dirname } from "path";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const singleDownload = async (req, res) => {
  const fileobj = await File.findOne({ _id: req.params.fid });

  const fileName = `../../${fileobj.storageId}`;

  res.download(path.join(__dirname, fileName), fileobj.originalname, (err) => {
    console.log(err);
  });
};

export { singleDownload };
