import React, { useEffect, useState } from "react";
import api from "./api";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import { useCart } from "./context/CartContext";

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    fetchProducts();
  }, [navigate]);

  const fetchProducts = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await api.get("/product", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(res.data.products || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Add to cart functionality (same as before)
  const handleAddToCart = (product) => {
    addToCart(product, 1);
  };

  // Navigate to product details
  const handleViewDetails = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="App">
      <div className="container my-5">
        {/* Top Section */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold text-orange">Our Menu</h2>
          <div className="d-flex gap-3">
            <button
              className="btn btn-outline-dark"
              onClick={() => navigate("/cart")}
            >
              🛒 View Cart
            </button>
            <button className="btn btn-outline-danger" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>

        {loading ? (
          <p className="text-center text-muted">Loading products...</p>
        ) : (
          <div className="row">
            {products.length > 0 ? (
              products.map((product) => (
                <div key={product.id} className="col-md-3 mb-4">
                  <div className="card product-card h-100 shadow-sm">
                    <img
                      src={product.image}
                      className="card-img-top"
                      alt={product.name}
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                    <div className="card-body text-center">
                      <h5 className="card-title">{product.name}</h5>
                      <p className="card-text text-muted">
                        {product.description
                          ? product.description.substring(0, 71) + "..."
                          : "No description available."}
                      </p>
                      <h6 className="fw-bold mb-3">
                        Price: Rs. {product.price}
                      </h6>
                      <div className="d-flex justify-content-center gap-2">
                        <button
                          className="btn btn-dark"
                          onClick={() => handleAddToCart(product)}
                        >
                          🛒 Add to Cart
                        </button>
                        <button
                          className="btn btn-outline-secondary"
                          onClick={() => handleViewDetails(product.id)}
                        >
                          🔍 View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-muted">No products found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
