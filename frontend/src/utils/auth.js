// src/utils/auth.js
export const getAuth = () => {
  const token = localStorage.getItem("token");
  const admin = localStorage.getItem("admin");
  return {
    token: !!token,
    isAdmin: !!admin,
  };
};
