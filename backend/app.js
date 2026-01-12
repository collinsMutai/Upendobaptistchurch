import express from "express";
import paypalRoutes from "./routes/paypalRoutes.js";

const app = express();

// ⚠️ PayPal webhook requires raw body
app.use(
  "/api/paypal/webhook",
  express.raw({ type: "application/json" })
);

app.use(express.json());
app.use("/api/paypal", paypalRoutes);

export default app;
