// import db from "../config/database.js";

// // Register User
// export const registerUser = (req, res) => {
//   const { name, email, password, dob, gender, phone, address } = req.body;

//   const checkEmailQuery = "SELECT * FROM users WHERE email = ?";
//   db.query(checkEmailQuery, [email], (err, result) => {
//     if (result.length > 0) {
//       return res.json({ status: false, message: "Email Already Exist" });
//     }

//     const query = `
//       INSERT INTO users (name, email, password, dob, gender, phone_number, address, created_at)
//       VALUES (?, ?, ?, ?, ?, ?, ?, NOW())
//     `;
//     db.query(query, [name, email, password, dob, gender, phone, address], (err, result) => {
//       if (err) {
//         return res.json({ status: false, message: "Error registering user" });
//       }
//       res.json({ status: true, message: "User Registered" });
//     });
//   });
// };

// // Login User
// export const loginUser = (req, res) => {
//   const { email, password } = req.body;

//   const query = "SELECT * FROM users WHERE email = ? AND password = ?";
//   db.query(query, [email, password], (err, result) => {
//     if (err) return res.status(500).json({ message: "Database error" });
//     if (result.length === 0)
//       return res.status(401).json({ message: "Invalid email or password" });

//     const user = result[0];
//     res.json({
//       message: "Login successful",
//       user: { name: user.name, email: user.email },
//     });
//   });
// };



import db from "../config/database.js";
import jwt from "jsonwebtoken";

// Secret key for JWT
const JWT_SECRET = "^#BHF&($HKBFBQA@!#@#*$&?HFNL"; // same as in verifyToken.js

// ---------------- REGISTER USER ----------------
export const registerUser = (req, res) => {
  const { name, email, password, dob, gender, phone, address } = req.body;

  const checkEmailQuery = "SELECT * FROM users WHERE email = ?";
  db.query(checkEmailQuery, [email], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ status: false, message: "Database error" });
    }

    if (result.length > 0) {
      return res.json({ status: false, message: "Email Already Exist" });
    }

    const query = `
      INSERT INTO users (name, email, password, dob, gender, phone_number, address, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, NOW())
    `;
    db.query(
      query,
      [name, email, password, dob, gender, phone, address],
      (err, result) => {
        if (err) {
          console.error("Error registering user:", err);
          return res
            .status(500)
            .json({ status: false, message: "Error registering user" });
        }
        res.json({ status: true, message: "User Registered" });
      }
    );
  });
};

// ---------------- LOGIN USER ----------------
export const loginUser = (req, res) => {
  const { email, password } = req.body;

  const query = "SELECT * FROM users WHERE email = ? AND password = ?";
  db.query(query, [email, password], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Database error" });
    }

    if (result.length === 0) {
      return res
        .status(401)
        .json({ message: "Invalid email or password" });
    }

    const user = result[0];

    // ✅ Create JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: "2h" } // expires in 2 hours
    );

    // ✅ Send back user info + token
    res.json({
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        token, // include token
      },
    });
  });
};
