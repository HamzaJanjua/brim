import db from '../config/database.js';

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
  const { name, description, price, stock, sku, image } = req.body;

  const query = `
    INSERT INTO products 
    (name, description, price, stock, sku, image, created_at) 
    VALUES (?, ?, ?, ?, ?, ?, NOW())
  `;

  db.query(query, [name, description, price, stock, sku, image], (err) => {
    if (err) {
      console.error("DB Error:", err);
      return res.status(500).json({
        status: false,
        message: "Database Error while adding product",
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
  const { name, description, price, stock, sku, image } = req.body;

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

    const updateQuery = `
      UPDATE products 
      SET name = ?, description = ?, price = ?, stock = ?, sku = ?, image = ?, updated_at = NOW() 
      WHERE id = ? AND deleted_at IS NULL
    `;

    db.query(updateQuery, [name, description, price, stock, sku, image, id], (err) => {
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

// Soft Delete Product (set deleted_at timestamp)
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
