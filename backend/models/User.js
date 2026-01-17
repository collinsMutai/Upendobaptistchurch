import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, default: null }, // Not used for Google login
    role: { type: String, enum: ["user", "admin"], default: "user" },
    profilePicture: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
