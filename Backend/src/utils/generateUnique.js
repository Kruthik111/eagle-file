export async function generateUniqueKey(len = 5) {
  let nodeId = (Math.random() + 1).toString(36).substring(len + 2);
  return nodeId;
}
