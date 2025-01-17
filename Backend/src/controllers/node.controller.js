import Node from "../models/node.models.js";

const getNodeData = async (req, res) => {
  const nodeId = req.params.nodeid;
  const nodeData = await Node.find({ nodeId: nodeId });
};

export { getNodeData };

const createNode = async (req, res) => {
    const nodeid="";
  const name = req.body.name || nodeid;
  const 
};

export { createNode };
