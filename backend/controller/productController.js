import db from '../config/database.js';
import { BASE_UPLOAD_PATH } from '../middleware/upload.js';

// Get All Active (Non-deleted) Products
export const getProducts = (req, res) => {
  const query = 'SELECT * FROM products WHERE deleted_at IS NULL';

  db.query(query, (err, result) => {
    if (err) {
      console.error("DB Error:", err);
      return res.status(500).json({
        status: false,
        message: "Database Error",
      });
    }

    res.json({
      status: true,
      message: "All Active Products",
      products: result,
    });
  });
};

// Get Single Product by ID
export const getProductById = (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM products WHERE id = ? AND deleted_at IS NULL";

  db.query(query, [id], (err, results) => {
    if (err) {
      console.error("DB Error:", err);
      return res.status(500).json({
        status: false,
        message: "Database Error while fetching product",
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        status: false,
        message: "Product not found or already deleted",
      });
    }

    res.json({
      status: true,
      message: "Product fetched successfully",
      product: results[0],
    });
  });
};

// Add Product
export const addProduct = (req, res) => {
  console.log("📝 Request Body:", req.body);
  console.log("Tb Request File:", req.file);

  const { name, description, price, stock, sku } = req.body;

  // ✅ VALIDATION: Ensure an image was actually uploaded
  if (!req.file) {
    return res.status(400).json({ 
      status: false, 
      message: "Image is required (and must be a valid image format)." 
    });
  }

  // Construct the path
  const image = `${BASE_UPLOAD_PATH}/${req.file.filename}`;

  const query = `
    INSERT INTO products 
    (name, description, price, stock, sku, image, created_at) 
    VALUES (?, ?, ?, ?, ?, ?, NOW())
  `;

  db.query(query, [name, description, price, stock, sku, image], (err) => {
    if (err) {
      console.error("❌ Database Insert Error:", err);
      return res.status(500).json({
        status: false,
        message: "Database Error: " + err.sqlMessage,
      });
    }

    res.json({
      status: true,
      message: "Product Added Successfully!",
    });
  });
};

// Edit / Update Product
export const editProduct = (req, res) => {
  const { id } = req.params;
  const { name, description, price, stock, sku } = req.body;

  const checkQuery = "SELECT * FROM products WHERE id = ? AND deleted_at IS NULL";

  db.query(checkQuery, [id], (err, results) => {
    if (err) {
      console.error("DB Error:", err);
      return res.status(500).json({
        status: false,
        message: "Database Error while checking product",
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        status: false,
        message: "Product not found or already deleted",
      });
    }

    // Check if a new file was uploaded
    let newImage = req.file ? `${BASE_UPLOAD_PATH}/${req.file.filename}` : null;
    
    // If a new image was uploaded, use it. Otherwise, keep the old one.
    const oldImage = results[0].image;
    const finalImage = newImage || oldImage;

    const updateQuery = `
      UPDATE products 
      SET name = ?, description = ?, price = ?, stock = ?, sku = ?, image = ?, updated_at = NOW() 
      WHERE id = ? AND deleted_at IS NULL
    `;

    db.query(updateQuery, [name, description, price, stock, sku, finalImage, id], (err) => {
      if (err) {
        console.error("DB Error:", err);
        return res.status(500).json({
          status: false,
          message: "Database Error while updating product",
        });
      }

      res.json({
        status: true,
        message: "Product Updated Successfully!",
      });
    });
  });
};

// Soft Delete Product
export const deleteProduct = (req, res) => {
  const { id } = req.params;

  const checkQuery = "SELECT * FROM products WHERE id = ? AND deleted_at IS NULL";

  db.query(checkQuery, [id], (err, results) => {
    if (err) {
      console.error("DB Error:", err);
      return res.status(500).json({
        status: false,
        message: "Database Error while checking product",
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        status: false,
        message: "Product not found or already deleted",
      });
    }

    const softDeleteQuery = `
      UPDATE products 
      SET deleted_at = NOW() 
      WHERE id = ? AND deleted_at IS NULL
    `;

    db.query(softDeleteQuery, [id], (err) => {
      if (err) {
        console.error("DB Error:", err);
        return res.status(500).json({
          status: false,
          message: "Database Error while soft deleting product",
        });
      }

      res.json({
        status: true,
        message: "Product Soft Deleted Successfully!",
      });
    });
  });
};