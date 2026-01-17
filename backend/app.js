import express from "express";
import paypalRoutes from "./routes/paypalRoutes.js";
import userRoutes from "./routes/userRoutes.js";



const app = express();

// ⚠️ PayPal webhook requires raw body
app.use(
  "/api/paypal/webhook",
  express.raw({ type: "application/json" })
);

app.use(express.json());
app.use("/api/paypal", paypalRoutes);
app.use("/api/user", userRoutes);

export default app;
