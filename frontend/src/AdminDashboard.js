import React, { useEffect, useState } from "react";
import api from "./api"; // your axios instance
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Define base URL for your backend (to serve images)
  const API_URL = "http://localhost:3307";

  // Check if admin is logged in
  useEffect(() => {
    const storedAdmin = localStorage.getItem("admin");
    const token = localStorage.getItem("token");

    if (!storedAdmin || !token) {
      navigate("/login");
      return;
    }

    setAdmin(JSON.parse(storedAdmin));
    fetchProducts(token);
  }, [navigate]);

  // Fetch all products
  const fetchProducts = async (token) => {
    try {
      const res = await api.get("/product", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(res.data.products || []);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch products.");
    } finally {
      setLoading(false);
    }
  };

  // Logout admin
  const handleLogout = () => {
    localStorage.removeItem("admin"); // remove admin session
    localStorage.removeItem("token"); // remove token
    navigate("/login");
  };

  // Delete product
  const handleDelete = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    const token = localStorage.getItem("token");
    try {
      await api.delete(`/product/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(products.filter((p) => p.id !== productId));
    } catch (err) {
      console.error(err);
      setError("Failed to delete product.");
    }
  };

  // Redirect to Add Product page
  const handleAddProduct = () => {
    navigate("/admin/add-product");
  };

  // Redirect to Edit Product page
  const handleEdit = (productId) => {
    navigate(`/admin/edit-product/${productId}`);
  };

  // ✅ Helper to determine correct image source
  const getImageUrl = (imagePath) => {
    if (!imagePath) return "https://via.placeholder.com/150"; // Fallback placeholder
    if (imagePath.startsWith("http")) return imagePath; // External URL (old data)
    return `${API_URL}${imagePath}`; // Local upload (new data)
  };

  return (
    <div className="container my-5">
      {/* Top Section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="text-orange">Admin Dashboard</h2>
          {admin && <p>Welcome, {admin.name}</p>}
        </div>
        <div className="d-flex gap-2">
          <button className="btn btn-success" onClick={handleAddProduct}>
            + Add New Product
          </button>
          <button className="btn btn-outline-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {/* Error */}
      {error && <p className="text-danger">{error}</p>}

      {/* Products Table */}
      {loading ? (
        <p>Loading products...</p>
      ) : products.length > 0 ? (
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>SKU</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>
                  {/* ✅ Updated Image Logic */}
                  <img
                    src={getImageUrl(product.image)}
                    alt={product.name}
                    style={{ width: "80px", height: "80px", objectFit: "cover" }}
                    onError={(e) => { e.target.src = "https://via.placeholder.com/150"; }}
                  />
                </td>
                <td>{product.name}</td>
                <td>{product.sku || "N/A"}</td>
                <td>Rs. {product.price}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm me-2"
                    onClick={() => handleEdit(product.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
}