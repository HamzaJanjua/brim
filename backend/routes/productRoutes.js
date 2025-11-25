import express from "express";
import { 
  getProducts, 
  addProduct, 
  editProduct, 
  deleteProduct,
  getProductById, // ✅ add this
  uploadImage
} from "../controller/productController.js";

import verifyToken from "../middleware/verifytoken.js";
import { upload } from "../middleware/uploadimage.js";

const router = express.Router();

// Secure routes with verifyToken
router.get("/", verifyToken, getProducts);
router.get("/:id", verifyToken, getProductById); // ✅ NEW route to fetch single product
router.post("/", verifyToken, addProduct);
router.put("/:id", verifyToken, editProduct);
router.delete("/:id", verifyToken, deleteProduct);
router.post('/uploadImage' ,upload.single('productImage'));

export default router;
