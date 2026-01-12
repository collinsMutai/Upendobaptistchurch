import express from "express";
import {
  createPaypalOrder,
  capturePaypalOrder,
} from "../controllers/paypalController.js";
import axios from "axios";
import { verifyPaypalWebhook } from "../utils/paypalWebhookVerifier.js";
import { getPaypalAccessToken } from "../config/paypal.js";

const router = express.Router();

router.post("/create", createPaypalOrder);
router.post("/capture", capturePaypalOrder);

router.post("/webhook", async (req, res) => {
  const isValid = await verifyPaypalWebhook(req, process.env.PAYPAL_WEBHOOK_ID);

  if (!isValid) return res.sendStatus(400);

  const event = JSON.parse(req.body.toString());

  // Failsafe auto-capture
  if (event.event_type === "CHECKOUT.ORDER.APPROVED") {
    const token = await getPaypalAccessToken();
    const orderId = event.resource.id;

    try {
      await axios.post(
        `https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderId}/capture`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (_) {}
  }

  // Final confirmation hook
  if (event.event_type === "PAYMENT.CAPTURE.COMPLETED") {
    const captureId = event.resource.id;
    const orderId = event.resource.supplementary_data?.related_ids?.order_id;

    // 🔌 PLUG YOUR APP LOGIC HERE
    // onPaymentCompleted(orderId, captureId);
  }

  res.sendStatus(200);
});

export default router;
