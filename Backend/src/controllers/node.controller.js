import { Node } from "../models/node.models.js";
import { File } from "../models/file.model.js";
import { generateUniqueKey } from "../utils/generateUnique.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import path from "node:path";
import { dirname } from "path";

// import data from "../data";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
/* 
  creating node
  -uploading files to server
  -inserting files data into database
  -inserting node data into database
*/

const createNode = async (req, res, err) => {
  const saltRounds = 10;
  try {
    let fileArr = [];
    let fileIds = [];

    if (!req.files) {
      res.status(400).json({ message: "files not present" });
      throw new Error("files not present");
    }

    for (var i = 0; i < req.files.length; i++) {
      let currFile = req.files[i];
      const newFile = {
        _id: new mongoose.Types.ObjectId(),
        name: currFile.filename,
        originalname: currFile.originalname,
        storageId: currFile.path,
        size: currFile.size,
      };

      fileArr.push(newFile);
      fileIds.push(newFile._id);
    }

    File.insertMany(fileArr);

    let nodeid = await generateUniqueKey();
    var hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    const NewNode = new Node({
      nodeid: nodeid,
      name: nodeid,
      size: fileArr.length,
      requiresPassword: req.body.password.length > 0,
      password: hashedPassword,
      items: {
        files: [...fileIds],
      },
    });

    NewNode.save();

    res.status(200).send({
      message: "Files uploaded successfully",
      nodelink: nodeid,
      files: req.files,
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
    console.log("error occured while creating a new node:", err);
  }
};

export { createNode };

/* 
  -fetching nodedata from database
  -requesting password if node is secured by password
  -if node doesn't contains any password sending files contents
*/

const getNodeData = async (req, res) => {
  const nodeid = req.params.nodeid;
  const nodeData = await Node.findOne({ nodeid: nodeid });
  if (!nodeData) {
    return res.status(404).json({ message: " Invalid password" });
  }
  var fileIds = [...nodeData?.items?.files];

  if (nodeData.requiresPassword) {
    return res.status(200).json({ requiresPassword: true });
  }
  const nodeItems = await File.find({ _id: { $in: fileIds } });
  return res.json(nodeItems);
};
export { getNodeData };

const validateNodePassword = async (req, res) => {
  try {
    const { nodeid, password } = req.body;

    const nodeData = await Node.findOne({ nodeid: nodeid }).select("+password");

    const isValidPassword = await bcrypt.compare(password, nodeData.password);

    if (!isValidPassword) {
      return res.status(403).json({ message: " Invalid password" });
    }
    var fileIds = [...nodeData.items.files];
    const nodeItems = await File.find({ _id: { $in: fileIds } });
    return res.status(200).json(nodeItems);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export { validateNodePassword };

const downloadFiles = async (req, res) => {
  try {
    const { fileIds } = req.body;
    if (!fileIds) {
      res.status(403).json({ message: "invalid request" });
    }
    const paths = await File.find({ _id: { $in: fileIds } }, "storageId");
    // console.log("paths" + paths);
  } catch (error) {
    console.log(error);
  }
};
export { downloadFiles };

const singleDownload = async (req, res) => {
  // const fileName = req.file;
  // const fileName = "../../uploads/-1739466696158-tempicon.png";
  const fileobj = await File.findOne({ _id: req.params.fid });

  const fileName = `../../${fileobj.storageId}`;

  res.download(path.join(__dirname, fileName), fileobj.originalname, (err) => {
    console.log(err);
  });
};

export { singleDownload };
