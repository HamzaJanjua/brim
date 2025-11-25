// backend/index.js
import express from "express";
import 'dotenv/config'
import cors from "cors";
import db from "./config/database.js";
import productRoute from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import path from "path";
import { fileURLToPath } from 'url';
import multer from "multer"; // ✅ Import Multer for error checking

const app = express();
const PORT = process.env.PORT || 3307;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Serve static files
app.use('/public/uploads', express.static(path.join(__dirname, 'public/uploads')));

app.use(express.json());

// Routes
app.use("/api/product", productRoute);
app.use("/api", userRoutes);
app.use("/api/admin", adminRoutes);

// ✅ NEW: Global Error Handler (Must be the last middleware)
app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", err); // Log error to backend terminal

  if (err instanceof multer.MulterError) {
    // Handle Multer-specific errors (e.g., File too large)
    return res.status(400).json({ status: false, message: `Upload Error: ${err.message}` });
  } else if (err) {
    // Handle other errors
    return res.status(500).json({ status: false, message: err.message || "Internal Server Error" });
  }
  next();
});

// DB Connection
try {
  db.connect?.((err) => {
    if (err) console.error("❌ Database connection failed:", err.message);
    else console.log("✅ Database connected successfully");
  });
} catch {
  console.log("ℹ️ Skipping DB connection test...");
}

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});