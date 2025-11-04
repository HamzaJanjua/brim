import React, { useState } from "react";
import "./loginPage.css";
import { FaGoogle, FaGithub, FaFacebookF } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    gender: "",
    address: "",
    dob: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await fetch("http://localhost:3307/api/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.status) {
        setMessage("✅ Registration successful! Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setError(`❌ ${data.message || "Registration failed"}`);
      }
    } catch (error) {
      console.error("Registration error:", error);
      setError("❌ Server not reachable. Please try again later.");
    }
  };

  return (
    <div className="login-wrapper d-flex justify-content-center align-items-center vh-100">
      <div className="login-container shadow-lg rounded-4 overflow-hidden d-flex flex-column flex-md-row">
        {/* Left Form Section */}
        <div className="form-section p-5 flex-grow-1">
          <h6 className="logo-text text-orange">Your logo</h6>
          <h2 className="fw-bold mb-4">Create Account</h2>

          <form onSubmit={handleSubmit}>
            <div className="row">
              {/* Left Column */}
              <div className="col-md-6">
                {/* Full Name */}
                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Email */}
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="username@gmail.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Password */}
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Phone */}
                <div className="mb-3">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    className="form-control"
                    placeholder="+92 300 1234567"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="col-md-6">
                {/* Gender */}
                <div className="mb-3">
                  <label className="form-label">Gender</label>
                  <select
                    name="gender"
                    className="form-select"
                    value={formData.gender}
                    onChange={handleChange}
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Address */}
                <div className="mb-3">
                  <label className="form-label">Address</label>
                  <textarea
                    name="address"
                    className="form-control"
                    rows="2"
                    placeholder="Enter your address"
                    value={formData.address}
                    onChange={handleChange}
                  ></textarea>
                </div>

                {/* DOB */}
                <div className="mb-4">
                  <label className="form-label">Date of Birth</label>
                  <input
                    type="date"
                    name="dob"
                    className="form-control"
                    value={formData.dob}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* Messages */}
            {message && <p className="text-success fw-semibold">{message}</p>}
            {error && <p className="text-danger fw-semibold">{error}</p>}

            {/* Submit */}
            <button type="submit" className="btn btn-orange w-100 mb-3">
              Register
            </button>

            {/* Divider */}
            <div className="text-center text-muted mb-3">Or Sign Up With</div>

            {/* Social Buttons */}
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

            {/* Redirect */}
            <div className="text-center">
              Already have an account?{" "}
              <Link to="/login" className="text-orange fw-semibold text-decoration-none">
                Sign in
              </Link>
            </div>
          </form>
        </div>

        {/* Right Image Section */}
        <div className="image-section d-none d-md-flex align-items-center justify-content-center">
          <img
            src="assets/images/hero_img.png"
            alt="Register Illustration"
            className="img-fluid login-image"
          />
        </div>
      </div>
    </div>
  );
}
