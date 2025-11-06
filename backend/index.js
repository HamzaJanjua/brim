import express from "express";
// import dotenv from 'dotenv';
// dotenv.config();
import 'dotenv/config'
import cors from "cors";
import db from "./config/database.js";
import productRoute from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";


const app = express();


const PORT = process.env.PORT;
// Allowing React frontend (localhost:3000) to access this backend
// app.use(
//   cors({
//     origin: "http://localhost:3000", // your React app's URL
//     methods: ["GET", "POST"],
//     credentials: true,
//   })
// );


app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);


// Middleware to parse JSON request bodies
app.use(express.json());

// Routes
app.use("/api/product", productRoute);
app.use("/api", userRoutes);
app.use("/api/admin", adminRoutes);

// Optional: test DB connection (for mysql2)
try {
  db.connect?.((err) => {
    if (err) console.error("❌ Database connection failed:", err.message);
    else console.log("✅ Database connected successfully");
  });
} catch {
  console.log("ℹ️ Skipping DB connection test...");
}

// Start server
app.listen(PORT, () => {
  console.log("🚀 Server is running on dev environment on port (3307 previous) " + PORT);
});
