import { Node } from "../models/node.models.js";
import { File } from "../models/file.model.js";
import { generateUniqueKey } from "../utils/generateUnique.js";
import multer from "multer";
// import data from "../data";

const getNodeData = async (req, res) => {
  const nodeId = req.params.nodeid;
  // const nodeData = await Node.find({ nodeId: nodeId });
};

export { getNodeData };

const createNode = async (req, res, err) => {
  let fileArr = [];
  for (var i = 0; i < req.files.length; i++) {
    let currFile = req.files[i];
    const file = new File({
      name: currFile.filename,
      originalname: currFile.originalname,
      storageId: currFile.destination,
      size: currFile.size,
    });

    fileArr.push(file._id);
  }

  let nodeId = generateUniqueKey();
  const NewNode = new Node({
    nodeId: nodeId,
    name: nodeId,
    size: fileArr.length,
    password: req.body.password,
    items: {
      files: [...fileArr],
    },
  });
  // await NewNode.save();
  console.log(req);
  try {
    res.status(200).send({
      message: "Files uploaded successfully",
      nodelink: nodeId,
      files: req.files,
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

export { createNode };
