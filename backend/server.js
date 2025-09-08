import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/dbConfig.js";

import authRoutes from "./routes/authRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());

connectDB();


app.get("/", (req, res) => {
  res.json({ message: "API is live" });
});


app.use("/api/auth", require("./routes/authRoutes.js"));


app.listen(PORT, () => {
  console.log('Server running ...')
});
