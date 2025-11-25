// backend/routes/productRoutes.js
import express from "express";
import { 
  getProducts, 
  addProduct, 
  editProduct, 
  deleteProduct,
  getProductById 
} from "../controller/productController.js";

import verifyToken from "../middleware/verifytoken.js";
import { uploadProductImage } from "../middleware/upload.js"; // ⚠️ NEW IMPORT

const router = express.Router();

// Secure routes with verifyToken
router.get("/", verifyToken, getProducts);
router.get("/:id", verifyToken, getProductById); 
// ✅ ADDED: Middleware to handle 'image' file upload
router.post("/", verifyToken, uploadProductImage, addProduct);
// ✅ ADDED: Middleware to handle 'image' file upload
router.put("/:id", verifyToken, uploadProductImage, editProduct);
router.delete("/:id", verifyToken, deleteProduct);

export default router;