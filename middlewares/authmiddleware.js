import jwt from "jsonwebtoken";
import { User, Role } from "../models/index.js";

export const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ status: 401, message: "Token missing ❌" });
  }

  try {
    // ✅ Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Fetch user and role details
    const user = await User.findByPk(decoded.id, { include: Role });
    if (!user) {
      return res.status(403).json({ status: 403, message: "Invalid token ❌" });
    }

    req.user = user; // attach user to request for controllers
    next();
  } catch (err) {
    // ✅ Handle specific JWT errors
    if (err.name === "TokenExpiredError") {
      // Axios interceptor will now catch this and refresh
      return res.status(401).json({ status: 401, message: "Token expired ❌" });
    }

    // Any other JWT or verification error
    return res.status(403).json({ status: 403, message: "Invalid token ❌" });
  }
};
