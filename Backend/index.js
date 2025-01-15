const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const cors = require("cors");

// local import
const local = require("./data.js");

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

app.get("/", (req, res) => {
  res.send({ name: "kruthik", age: 90 });
});

app.listen(port, () => {
  console.log(`app listening on http://localhost:${port}`);
});
