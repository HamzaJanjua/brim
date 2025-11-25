// frontend/src/EditProduct.js
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "./api";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  // ✅ Define base URL
  const API_URL = "http://localhost:3307";

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    sku: "",
    image: "", 
  });

  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchProduct = async () => {
      try {
        const res = await api.get(`/product/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.status) {
          setProduct(res.data.product);
        } else {
          setError("Failed to fetch product.");
        }
      } catch (err) {
        console.error(err);
        setError("Error fetching product.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setMessage("");

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("stock", product.stock);
    formData.append("sku", product.sku);

    if (imageFile) {
        formData.append("image", imageFile);
    }

    try {
      const res = await api.put(`/product/${id}`, formData, {
        headers: {
            'Content-Type': undefined
        }
      });

      if (res.data.status) {
        setMessage("✅ Product updated successfully!");
        setTimeout(() => navigate("/admin-dashboard"), 1500);
      } else {
        setError(res.data.message || "Failed to update product.");
      }
    } catch (err) {
      console.error(err);
      setError("Error updating product.");
    } finally {
      setSaving(false);
    }
  };

  // ✅ Helper to determine correct image source
  const getImageUrl = (imagePath) => {
    if (!imagePath) return "https://via.placeholder.com/100"; 
    if (imagePath.startsWith("http")) return imagePath; 
    return `${API_URL}${imagePath}`; 
  };

  if (loading) return <p>Loading product details...</p>;

  return (
    <div className="container my-5">
      <div className="card shadow-lg p-4 rounded-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="text-orange">Edit Product</h2>
          <button
            className="btn btn-outline-danger"
            onClick={() => navigate("/admin-dashboard")}
          >
            &larr; Back
          </button>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}
        {message && <div className="alert alert-success">{message}</div>}

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="row g-3 mb-3">
            <div className="col-md-6">
              <label className="form-label fw-semibold">Product Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={product.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold">SKU</label>
              <input
                type="text"
                className="form-control"
                name="sku"
                value={product.sku}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row g-3 mb-3">
            <div className="col-md-6">
              <label className="form-label fw-semibold">Price</label>
              <input
                type="number"
                className="form-control"
                name="price"
                value={product.price}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold">Stock</label>
              <input
                type="number"
                className="form-control"
                name="stock"
                value={product.stock}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Description</label>
            <textarea
              className="form-control"
              name="description"
              value={product.description}
              onChange={handleChange}
              rows="4"
              placeholder="Add a brief product description..."
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold">Update Image (Optional)</label>
            <input
              type="file"
              className="form-control"
              onChange={handleFileChange}
              accept="image/*"
            />
            {/* Image Preview Logic */}
            {(product.image || imageFile) && (
                <div className="mt-2">
                    <p className="text-muted small mb-1">Current/New Image:</p>
                    <img
                      // ✅ Check if new file selected, else use helper for existing
                      src={imageFile ? URL.createObjectURL(imageFile) : getImageUrl(product.image)}
                      alt="Product"
                      style={{width: '100px', height: '100px', objectFit: 'cover'}}
                      onError={(e) => { e.target.src = "https://via.placeholder.com/100"; }}
                    />
                </div>
            )}
          </div>

          <div className="d-flex justify-content-end">
            <button
              type="submit"
              className="btn btn-primary px-4"
              disabled={saving}
            >
              {saving ? "Updating..." : "Update Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}