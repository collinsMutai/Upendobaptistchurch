import * as paypalService from "../services/paypalService.js";

export const createPaypalOrder = async (req, res) => {
  try {
    const { amount, returnUrl, cancelUrl, referenceId } = req.body;

    const order = await paypalService.createOrder({
      amount,
      returnUrl,
      cancelUrl,
      referenceId,
    });

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const capturePaypalOrder = async (req, res) => {
  try {
    const { orderId } = req.body;
    const result = await paypalService.captureOrder(orderId);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
