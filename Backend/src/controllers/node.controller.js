import { Node } from "../models/node.models.js";
import { File } from "../models/file.model.js";
import { generateUniqueKey } from "../utils/generateUnique.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
// import data from "../data";

/* 
  creating node
  -uploading files to server
  -inserting files data into database
  -inserting node data into database
*/

const createNode = async (req, res, err) => {
  try {
    let fileArr = [];
    let fileIds = [];
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
    const NewNode = new Node({
      nodeid: nodeid,
      name: nodeid,
      size: fileArr.length,
      password: req.body.password,
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
    console.log(err);
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
  var fileIds = [...nodeData.items.files];

  if (nodeData.password) {
    return res.status(200).json({ requiresPassword: true });
  }
  const nodeItems = await File.find({ _id: { $in: fileIds } });
  return res.json(nodeItems);
};
export { getNodeData };

const validateNodePassword = async (req, res) => {
  try {
    const { nodeid, password } = req.params;

    const nodeData = await Node.findOne({ nodeid: nodeid });
    // console.log(nodeData);

    const isValidPassword = await bcrypt.compare(password, nodeData.password);

    if (!isValidPassword) {
      return res.status(403).json({ message: " Invalid password" });
    }
    var fileIds = [...nodeData.items.files];
    const nodeItems = await File.find({ _id: { $in: fileIds } });
    return res.status(200).json({ content: nodeItems });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export { validateNodePassword };
