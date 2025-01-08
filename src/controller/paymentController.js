import paymentService from  "../service/paymentService"


export const generatePaymentLink = async (req, res) => {
  try {
    const { amount, description, orderCode, returnUrl, cancelUrl } = req.body;

    if (!amount || !description || !orderCode || !returnUrl || !cancelUrl) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }
    const paymentUrl = await paymentService.createPaymentLink({
      amount,
      description: description.slice(0, 25),
      orderCode,
      returnUrl,
      cancelUrl,
    });

    return res.status(200).json({
      success: true,
      paymentUrl,
    });
  } catch (error) {
    console.error("Payment link generation error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to create payment link",
    });
  }
};

export const processPaymentCallback = async (req, res) => {
  try {
    const { orderCode } = req.body;

    if (!orderCode) {
      return res.status(400).json({
        success: false,
        message: "Order code is required",
      });
    }

    const result = await paymentService.handlePaymentSuccess(orderCode);

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Payment callback error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Payment processing failed",
    });
  }
};


export default {
  generatePaymentLink,
  processPaymentCallback,
};