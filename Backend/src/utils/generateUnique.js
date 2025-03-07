export async function generateUniqueKey(len = 5) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  return Array.from(
    { length: len },
    () => chars[Math.floor(Math.random() * chars.length)]
  ).join("");
}
