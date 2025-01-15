import express from "express";
import cors from "cors";

const app = express();

app.use(express.json({ limit: "16kb" }));

app.use();

export { app };
