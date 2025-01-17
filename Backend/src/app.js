import express from "express";
import cors from "cors";
import noderouter from "./routes/node.route";

const app = express();

app.use(express.json({ limit: "16kb" }));
// app.use();

app.use("/share", noderouter);
app.use("/node", noderouter);

export { app };
