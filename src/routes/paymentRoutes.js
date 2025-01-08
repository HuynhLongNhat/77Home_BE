const express = require("express");
import paymentController from "../controller/paymentController"
const router = express.Router();

const initPaymentRoutes = (app) => {

router.post("/create-payment-link", paymentController.generatePaymentLink);

router.post("/callback", paymentController.processPaymentCallback);

  return app.use("/api/v1/payment", router);
}

export default initPaymentRoutes;
