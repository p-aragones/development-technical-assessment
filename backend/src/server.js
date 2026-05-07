import express from "express";
import mongoose from "mongoose";
import javascriptExerciseRoutes from "./enpoints/javascript/javascriptExercise.routes.js";
import mongoExerciseRoutes from "./enpoints/mongodb/mongoExercise.routes.js";
import usersRoutes from "./enpoints/users/users.routes.js"
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();
const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/app";

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/javascript", javascriptExerciseRoutes);
app.use("/mongo", mongoExerciseRoutes);
app.use("/users", usersRoutes);
app.use(errorHandler);

async function start() {
  await mongoose.connect(mongoUri);

  app.listen(port, () => {
    console.log(`Backend listening on port ${port}`);
  });
}

start().catch((error) => {
  console.error("Failed to start backend", error);
  process.exit(1);
});
