
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import todoRout from "./routes/todos.route.js";
import eventRout from "./routes/events.route.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const connect = async () => {
  if (mongoose.connection.readyState === 1) {
    return;
  }

  await mongoose.connect(process.env.MONGO);
  console.log("MongoDB connected");
};

app.use(async (req, res, next) => {
  try {
    await connect();
    next();
  } catch (error) {
    console.error("MongoDB connection error:", error);
    res.status(500).json({ message: "Database connection failed" });
  }
});

app.use("/api/todos", todoRout);
app.use("/api/events", eventRout);

export default app;

