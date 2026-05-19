import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { testDBConnection } from "./config/db.js";
import urlRoutes from "./routes/urlRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: ["GET", "POST"],
}));

app.use(express.json());

// Routes
app.use("/", urlRoutes);

// Test DB connection
testDBConnection();

// Home route
app.get("/", (req, res) => {
  res.send("URL Shortener API is running");
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});