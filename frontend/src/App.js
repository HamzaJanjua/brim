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

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Auth Pages */}
        <Route path="/login" element={<AuthRoute><LoginPage /></AuthRoute>} />
        <Route path="/register" element={<AuthRoute><RegisterPage /></AuthRoute>} />

        {/* User Dashboard */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute role="user">
              <Dashboard />
            </ProtectedRoute>
          } 
        />

        {/* Admin Dashboard */}
        <Route 
          path="/admin-dashboard" 
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />

        {/* Admin Product Routes */}
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
  );
}

export default App;
