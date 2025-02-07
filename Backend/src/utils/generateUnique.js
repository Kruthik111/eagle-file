export function generateUniqueKey(len = 7) {
  let nodeId = (Math.random() + 1).toString(36).substring(len);
  return nodeId;
}
