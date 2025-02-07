import express from "express";
import cors from "cors";

const port = 8000;

// local import
// const local = require("./data.js");
import { app } from "./app.js";

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

app.listen(port, () => {
  console.log(`app listening on http://localhost:${port}`);
});
