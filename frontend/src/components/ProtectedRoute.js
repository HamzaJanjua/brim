import React from "react";
import { Navigate } from "react-router-dom";
import { getAuth } from "../utils/auth";

export default function ProtectedRoute({ children, role }) {
  const { token, isAdmin } = getAuth();

  if (!token) return <Navigate to="/login" replace />;

  if (role === "admin" && !isAdmin) return <Navigate to="/login" replace />;

  if (role === "user" && isAdmin) return <Navigate to="/login" replace />;

  return children;
}
