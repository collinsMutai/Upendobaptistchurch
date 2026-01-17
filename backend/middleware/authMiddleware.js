import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Middleware for routes that REQUIRE login
export const protect = async (req, res, next) => {
  let token;

  // Check for token in Authorization header
  if (req.headers.authorization?.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      return next();
    } catch (error) {
      return res.status(401).json({ message: "Not authorized, invalid token" });
    }
  }

  // Check for token in cookies (refresh token flow)
  if (req.cookies?.refreshToken) {
    try {
      token = req.cookies.refreshToken;
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      return next();
    } catch (error) {
      return res
        .status(401)
        .json({ message: "Not authorized, invalid refresh token" });
    }
  }

  // No token found
  return res.status(401).json({ message: "Not authorized, no token" });
};
