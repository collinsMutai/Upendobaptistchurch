import dotenv from 'dotenv';
dotenv.config();
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const client = new OAuth2Client(process.env.CLIENT_ID);

// Google login
export const googleLogin = async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID,
    });

    const { email, name, picture } = ticket.getPayload();

    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ email, name, role: "user", profilePicture: picture });
      await user.save();
    } else {
      user.name = name;
      user.profilePicture = picture;
      await user.save();
    }

    const accessToken = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
    const refreshToken = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "Strict",
    });

    res.json({ accessToken, user: { id: user._id, name: user.name, email: user.email, role: user.role, profilePicture: user.profilePicture } });
  } catch (error) {
    res.status(500).json({ message: "Google login error", error: error.message });
  }
};

// Refresh access token
export const refreshAccessToken = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) return res.status(401).json({ message: "No refresh token provided" });

    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
    const accessToken = jwt.sign({ id: decoded.id, role: decoded.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ accessToken });
  } catch {
    res.status(403).json({ message: "Invalid or expired refresh token" });
  }
};

// Logout
export const logout = (req, res) => {
  res.clearCookie("refreshToken", { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "Strict" });
  res.status(200).json({ message: "Logged out successfully" });
};

// Get user profile
export const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) return res.status(404).json({ message: "User not found" });

  res.json({ id: user._id, name: user.name, email: user.email, role: user.role, profilePicture: user.profilePicture });
};

// Update user profile
export const updateUserProfile = async (req, res) => {
  const { name, email } = req.body;
  const user = await User.findById(req.user._id);
  if (!user) return res.status(404).json({ message: "User not found" });

  user.name = name || user.name;
  user.email = email || user.email;
  await user.save();

  res.json({ id: user._id, name: user.name, email: user.email, role: user.role, profilePicture: user.profilePicture });
};
