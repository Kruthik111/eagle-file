import cors from "cors";

import { app } from "./app.js";
import connectDB from "./db/index.js";

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
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(
        `app listening on http://localhost:${process.env.PORT || 8000}`
      );
    });
  })
  .catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
  });
