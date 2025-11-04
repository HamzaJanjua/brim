import React, { useEffect, useState } from "react";
import api from "./api";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import { useCart } from "./context/CartContext"; // ✅ Import cart context

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { addToCart, cart } = useCart(); // ✅ Use Cart context

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    fetchProducts();
  }, [navigate]);

  // Fetch products
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

  return (
    <div className="App">
      <div className="container my-5">
        {/* 🧭 Top Section: Title + Cart + Logout */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold text-orange">Our Menu</h2>
          <div className="d-flex align-items-center gap-2">
            <button
              className="btn btn-danger position-relative"
              onClick={() => navigate("/cart")}
            >
              Cart
              {cart.length > 0 && (
                <span
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                  style={{ fontSize: "0.75rem" }}
                >
                  {cart.length}
                </span>
              )}
            </button>

            <button className="btn btn-outline-danger" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>

        {/* 🛍️ Product List */}
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
                    />
                    <div className="card-body text-center">
                      <h5 className="card-title">{product.name}</h5>
                      <p className="card-text text-muted">
                        {product.description
                          ? product.description.substring(0, 71) + "..."
                          : "No description available."}
                      </p>
                      <h6 className="fw-bold">Price: Rs. {product.price}</h6>
                      <div className="mt-3">
                        <button
                          className="btn btn-dark"
                          onClick={() => addToCart(product)} // ✅ Add to cart
                        >
                          Add to cart
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
