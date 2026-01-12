import paypal from "@paypal/checkout-server-sdk";
import axios from "axios";
import { paypalClient, getPaypalAccessToken } from "../config/paypal.js";

export const createOrder = async ({
  amount,
  currency = "USD",
  returnUrl,
  cancelUrl,
  referenceId,
}) => {
  const request = new paypal.orders.OrdersCreateRequest();

  request.requestBody({
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: currency,
          value: amount.toString(),
        },
        custom_id: referenceId,
      },
    ],
    application_context: {
      return_url: returnUrl,
      cancel_url: cancelUrl,
      user_action: "PAY_NOW",
    },
  });

  const response = await paypalClient.execute(request);

  return {
    orderId: response.result.id,
    approvalLink: response.result.links.find(
      (l) => l.rel === "approve"
    ).href,
  };
};

export const captureOrder = async (orderId) => {
  const accessToken = await getPaypalAccessToken();

  // 1. Check order state
  const order = await axios.get(
    `https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderId}`,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );

  if (order.data.status === "COMPLETED") {
    return { status: "COMPLETED", alreadyCaptured: true };
  }

  if (order.data.status !== "APPROVED") {
    return { status: order.data.status };
  }

  // 2. Capture funds
  const request = new paypal.orders.OrdersCaptureRequest(orderId);
  const response = await paypalClient.execute(request);

  return {
    status: "COMPLETED",
    captureId:
      response.result.purchase_units[0].payments.captures[0].id,
  };
};
