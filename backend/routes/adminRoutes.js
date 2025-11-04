import express from "express";
import { adminLogin } from "../controller/adminController.js";

const router = express.Router();

// ✅ keep it consistent with frontend
router.post("/login", adminLogin);

export default router;
