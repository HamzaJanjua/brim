import React from "react";
import { Navigate } from "react-router-dom";
import { getAuth } from "../utils/auth";

export default function AuthRoute({ children }) {
  const { token, isAdmin } = getAuth();

  if (token && isAdmin) return <Navigate to="/admin-dashboard" replace />;
  if (token && !isAdmin) return <Navigate to="/dashboard" replace />;

  return children;
}
