import express from "express";
import { 
  getProducts, 
  addProduct, 
  editProduct, 
  deleteProduct,
  getProductById // ✅ add this
} from "../controller/productController.js";

import verifyToken from "../middleware/verifytoken.js";

const router = express.Router();

// Secure routes with verifyToken
router.get("/", verifyToken, getProducts);
router.get("/:id", verifyToken, getProductById); // ✅ NEW route to fetch single product
router.post("/", verifyToken, addProduct);
router.put("/:id", verifyToken, editProduct);
router.delete("/:id", verifyToken, deleteProduct);

export default router;
