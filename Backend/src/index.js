import express from "express";
import path from "path";
import cors from "cors";

const app = express();
const port = 8000;

// local import
// const local = require("./data.js");
import local from "./data.js";

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use((req, res, next) => {
  console.log("requested");
  next();
});

// Define a route to serve JSON data
app.get("/data", (req, res) => {
  res.json(local);
});

app.listen(port, () => {
  console.log(`app listening on http://localhost:${port}`);
});
