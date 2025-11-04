import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./loginPage";
import RegisterPage from "./RegisterPage";
import Dashboard from "./Dashboard";
import AdminDashboard from "./AdminDashboard";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthRoute from "./components/AuthRoute";
import CartPage from "./CartPage"; // 🛒 Cart Page
import { CartProvider } from "./context/CartContext"; // 🧩 Cart Context

function App() {
  return (
    // 🧠 Wrap everything with CartProvider (outside Router)
    <CartProvider>
      <Router>
        <Routes>
          {/* Default Route */}
          <Route path="/" element={<Navigate to="/login" />} />

          {/* Auth Pages */}
          <Route
            path="/login"
            element={
              <AuthRoute>
                <LoginPage />
              </AuthRoute>
            }
          />
          <Route
            path="/register"
            element={
              <AuthRoute>
                <RegisterPage />
              </AuthRoute>
            }
          />

          {/* 🧍‍♂️ User Dashboard */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute role="user">
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* 🛒 User Cart */}
          <Route
            path="/cart"
            element={
              <ProtectedRoute role="user">
                <CartPage />
              </ProtectedRoute>
            }
          />

          {/* 👑 Admin Dashboard */}
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* 🧩 Admin Product Routes */}
          <Route
            path="/admin/add-product"
            element={
              <ProtectedRoute role="admin">
                <AddProduct />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/edit-product/:id"
            element={
              <ProtectedRoute role="admin">
                <EditProduct />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
