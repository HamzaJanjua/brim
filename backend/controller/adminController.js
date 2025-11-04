import jwt from "jsonwebtoken";
import db from "../config/database.js";

export const adminLogin = (req, res) => {
  const { email, password } = req.body; // ✅ fixed

  if (!email || !password) {
    return res.status(400).json({
      status: false,
      message: "Email and password are required",
    });
  }

  const query = "SELECT * FROM admins WHERE email=? AND `password`=?";
  db.query(query, [email, password], (err, result) => {
    if (err) {
      console.error("DB Error:", err);
      return res.status(500).json({
        status: false,
        message: "Database error",
      });
    }

    if (result.length > 0) {
      const admin = result[0];
      const token = jwt.sign(
        { adminId: admin.id, adminEmail: admin.email },
        "^#BHF&($HKBFBQA@!#@#*$&?HFNL",
        { expiresIn: "1h" }
      );

      res.json({
        status: true,
        message: "Admin Logged In!",
        token,
        admin,
      });
    } else {
      res.json({
        status: false,
        message: "Invalid Credentials",
        admin: {},
      });
    }
  });
};
