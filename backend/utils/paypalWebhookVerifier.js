import axios from "axios";
import { getPaypalAccessToken } from "../config/paypal.js";

export const verifyPaypalWebhook = async (req, webhookId) => {
  const accessToken = await getPaypalAccessToken();

  const response = await axios.post(
    "https://api-m.sandbox.paypal.com/v1/notifications/verify-webhook-signature",
    {
      transmission_id: req.headers["paypal-transmission-id"],
      transmission_time: req.headers["paypal-transmission-time"],
      cert_url: req.headers["paypal-cert-url"],
      auth_algo: req.headers["paypal-auth-algo"],
      transmission_sig: req.headers["paypal-transmission-sig"],
      webhook_id: webhookId,
      webhook_event: JSON.parse(req.body.toString()),
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data.verification_status === "SUCCESS";
};
