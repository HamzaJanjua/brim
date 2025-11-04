import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle, FaGithub, FaFacebookF } from "react-icons/fa6";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); // toggle role

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3307";

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    // ✅ Correct endpoints
    const endpoint = isAdmin ? "/api/admin/login" : "/api/login";

    try {
      const res = await fetch(`${API_URL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      setLoading(false);

      if (
        res.ok &&
        (data.status === true ||
          data.message === "Login successful" ||
          data.message === "Admin Logged In!")
      ) {
        setMessage("✅ Login successful!");
        const storageKey = isAdmin ? "admin" : "user";

        // ✅ Save data
        localStorage.setItem(storageKey, JSON.stringify(data[storageKey]));
        localStorage.setItem("token", data.token || data[storageKey]?.token);

        setTimeout(() => {
          navigate(isAdmin ? "/admin-dashboard" : "/dashboard");
        }, 1000);
      } else {
        setMessage("❌ Invalid email or password.");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setMessage("❌ Server not reachable. Please try again later.");
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper d-flex justify-content-center align-items-center vh-100">
      <div className="login-container shadow-lg rounded-4 overflow-hidden d-flex flex-column flex-md-row">
        {/* Left Form Section */}
        <div className="form-section p-5 d-flex flex-column justify-content-center">
          <h6 className="logo-text">Your logo</h6>
          <h2 className="fw-bold mb-4">
            {isAdmin ? "Admin Login" : "User Login"}
          </h2>

          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="username@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-2">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {message && (
              <div
                className={`alert ${
                  message.startsWith("✅") ? "alert-success" : "alert-danger"
                } mt-2`}
              >
                {message}
              </div>
            )}

            <button
              type="submit"
              className="btn btn-orange w-100 mb-3"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>

            {!isAdmin && (
              <>
                <div className="text-center text-muted mb-3">Or Continue With</div>
                <div className="d-flex justify-content-center gap-3 mb-3">
                  <button type="button" className="btn btn-light border rounded-circle icon-btn">
                    <FaGoogle />
                  </button>
                  <button type="button" className="btn btn-light border rounded-circle icon-btn">
                    <FaGithub />
                  </button>
                  <button type="button" className="btn btn-light border rounded-circle icon-btn">
                    <FaFacebookF />
                  </button>
                </div>
              </>
            )}
          </form>

          {/* ✅ Role toggle link */}
          <div className="text-center mt-3">
            {isAdmin ? (
              <button
                className="btn btn-link p-0"
                onClick={() => setIsAdmin(false)}
              >
                Login as User
              </button>
            ) : (
              <button
                className="btn btn-link p-0"
                onClick={() => setIsAdmin(true)}
              >
                Login as Admin
              </button>
            )}
          </div>

          {!isAdmin && (
            <div className="text-center mt-2">
              Don’t have an account yet?{" "}
              <Link to="/register" className="text-orange fw-semibold text-decoration-none">
                Register for free
              </Link>
            </div>
          )}
        </div>

        {/* Right Image Section */}
        <div className="image-section d-none d-md-flex align-items-center justify-content-center">
          <img
            src="assets/images/hero_img.png"
            alt="Login Illustration"
            className="img-fluid login-image"
          />
        </div>
      </div>
    </div>
  );
}
