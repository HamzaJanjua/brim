// frontend/src/AddProduct.js
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
  const [imageFile, setImageFile] = useState(null); // ⚠️ CHANGE: State for the File object
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

    if (!imageFile) {
        setMessage("❌ Please select an image file.");
        setLoading(false);
        return;
    }
    
    // ⚠️ CHANGE: Use FormData to send the file and other fields
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("sku", sku);
    formData.append("image", imageFile); // 'image' must match Multer field name

    try {
      const res = await api.post("/product", formData, {
        headers: { 
            // ⚠️ IMPORTANT: Remove default 'Content-Type: application/json' header.
            // The browser will automatically set the correct 'multipart/form-data' boundary.
            'Content-Type': undefined 
        },
      });

      if (res.data.status || res.status === 200) {
        setMessage("✅ Product added successfully!");
        setTimeout(() => navigate("/admin-dashboard"), 1000);
      } else {
        setMessage("❌ Failed to add product.");
      }
    } catch (error) {
      console.error("Add product error:", error);
      setMessage("❌ Server error, try again. Check console for details.");
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

        <form onSubmit={handleSubmit} encType="multipart/form-data"> {/* Added encType */}
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

          {/* ⚠️ CHANGE: File Input replaces Image URL field */}
          <div className="mb-4">
            <label className="form-label fw-semibold">Image File</label>
            <input
              type="file"
              className="form-control"
              onChange={(e) => setImageFile(e.target.files[0])}
              accept="image/*"
              required
            />
            {imageFile && <p className="mt-2 text-muted small">Selected file: {imageFile.name}</p>}
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