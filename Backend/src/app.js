import express from "express";
import cors from "cors";
import noderouter from "./routes/node.route.js";
import local from "./data.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

var corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
};

app.use(express.json({ limit: "30kb" }));

app.use("/share", noderouter);
app.use("/node", cors(corsOptions), noderouter);
app.get("/", (req, res) => {
  res.sendFile("index.html", { root: __dirname });
});

app.get("/data", (req, res) => {
  res.json(local);
});

export { app };
