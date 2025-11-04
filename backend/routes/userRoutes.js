import express from "express";
import { registerUser, loginUser } from "../controller/userController.js";

const router = express.Router();

// ✅ User Registration
router.post("/register", registerUser);

// ✅ User Login
router.post("/login", loginUser);

export default router;
