// frontend/src/ProductPage.js
import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "./api";
import { useCart } from "./context/CartContext";

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // ✅ Define base URL for your backend
  const API_URL = "http://localhost:3307";

  const fetchProduct = useCallback(async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await api.get(`/product/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProduct(res.data.product);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  }, [id]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  if (!product) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <p className="text-muted fs-5">Loading product details...</p>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, 1);
  };

  // ✅ Helper to determine correct image source
  const getImageUrl = (imagePath) => {
    if (!imagePath) return "https://via.placeholder.com/400"; // Fallback placeholder
    if (imagePath.startsWith("http")) return imagePath; // External URL (old data)
    return `${API_URL}${imagePath}`; // Local upload (new data)
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg border-0" style={{ maxWidth: "850px" }}>
        <div className="row g-0 align-items-center">
          {/* Image Section */}
          <div className="col-md-6">
            <img
              // ✅ Use helper function here
              src={getImageUrl(product.image)}
              alt={product.name}
              className="img-fluid rounded-start"
              style={{
                height: "400px",
                width: "100%",
                objectFit: "cover",
                borderTopLeftRadius: "0.5rem",
                borderBottomLeftRadius: "0.5rem",
              }}
              // ✅ Handle broken images
              onError={(e) => { e.target.src = "https://via.placeholder.com/400"; }}
            />
          </div>

          {/* Details Section */}
          <div className="col-md-6">
            <div className="card-body p-4">
              <h3 className="card-title fw-bold">{product.name}</h3>
              <p className="text-muted small mb-2">SKU: {product.sku}</p>
              <p className="card-text mb-4">{product.description}</p>

              <h4 className="fw-bold mb-4 text-success">
                Rs. {product.price}
              </h4>

              <div className="d-flex gap-2">
                <button className="btn btn-dark" onClick={handleAddToCart}>
                  🛒 Add to Cart
                </button>
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => navigate("/dashboard")}
                >
                  ← Back to Dashboard
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}