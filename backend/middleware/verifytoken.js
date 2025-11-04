import jwt from "jsonwebtoken";

const JWT_SECRET = "^#BHF&($HKBFBQA@!#@#*$&?HFNL";

function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Token Missing!" });
  }

  const token = authHeader.split(" ")[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ message: "Token Missing!" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Attach decoded info to request (userId or adminId)
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or Expired Token!" });
  }
}

export default verifyToken;
