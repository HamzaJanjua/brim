import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "./api";

export default function AddProduct() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [sku, setSku] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("❌ You must be logged in!");
      setLoading(false);
      return;
    }

    const payload = { name, price, stock, description, sku, image };

    try {
      const res = await api.post("/product", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.status || res.status === 200) {
        setMessage("✅ Product added successfully!");
        setTimeout(() => navigate("/admin-dashboard"), 1000);
      } else {
        setMessage("❌ Failed to add product.");
      }
    } catch (error) {
      console.error("Add product error:", error);
      setMessage("❌ Server error, try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-5">
      {/* Card container */}
      <div className="card shadow-lg p-4 rounded-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="text-orange">Add New Product</h2>
          <button
            className="btn btn-outline-danger"
            onClick={() => navigate("/admin-dashboard")}
          >
            &larr; Back
          </button>
        </div>

        {message && (
          <div
            className={`alert ${
              message.startsWith("✅") ? "alert-success" : "alert-danger"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Name & SKU side by side */}
          <div className="row g-3 mb-3">
            <div className="col-md-6">
              <label className="form-label fw-semibold">Product Name</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold">SKU</label>
              <input
                type="text"
                className="form-control"
                value={sku}
                onChange={(e) => setSku(e.target.value)}
              />
            </div>
          </div>

          {/* Price & Stock side by side */}
          <div className="row g-3 mb-3">
            <div className="col-md-6">
              <label className="form-label fw-semibold">Price</label>
              <input
                type="number"
                className="form-control"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold">Stock</label>
              <input
                type="number"
                className="form-control"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Description */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Description</label>
            <textarea
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              placeholder="Add a brief product description..."
            ></textarea>
          </div>

          {/* Image URL */}
          <div className="mb-4">
            <label className="form-label fw-semibold">Image URL</label>
            <input
              type="text"
              className="form-control"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          {/* Submit button */}
          <div className="d-flex justify-content-end">
            <button
              type="submit"
              className="btn btn-success px-4"
              disabled={loading}
            >
              {loading ? "Adding..." : "+ Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
