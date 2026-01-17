import express from "express";
import { googleLogin, refreshAccessToken, logout, getUserProfile, updateUserProfile } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.post("/google-login", googleLogin);
router.post("/refresh-token", refreshAccessToken);
router.post("/logout", protect, logout);

// Protected routes
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);

export default router;
