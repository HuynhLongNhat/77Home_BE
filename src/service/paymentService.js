const PayOS = require("@payos/node");
import db from "../models/index";
const payos = new PayOS(
  process.env.PAYOS_CLIENT_ID,
  process.env.PAYOS_API_KEY,
  process.env.PAYOS_CHECKSUM_KEY
);

export const createPaymentLink = async (order) => {
  console.log("order" , order)
  try {
    if (!payos) {
      throw new Error("PayOS client not initialized");
    }

    const paymentLinkResponse = await payos.createPaymentLink({
      orderCode: order.orderCode,
      amount: parseInt(order.amount),
      description: order.description,
      returnUrl: order.returnUrl,
      cancelUrl: order.cancelUrl,
    });

    if (!paymentLinkResponse || !paymentLinkResponse.checkoutUrl) {
      throw new Error("Invalid payment link response from PayOS");
    }

    return paymentLinkResponse;
  } catch (error) {
    console.error("Error in createPaymentLink:", error);
    throw new Error(`Payment link creation failed: ${error.message}`);
  }
};

export const handlePaymentSuccess = async (orderCode) => {
  const transaction = await db.sequelize.transaction();

  try {

   const appointmentId = Math.floor(orderCode / 1000);

    const appointment = await db.appointments.findByPk(appointmentId, {
      include: [
        {
          model: db.rooms,
          as: "room",
          attributes: ["monthlyRent"],
        },
      ],
      transaction,
    });

    if (!appointment) {
      throw new Error("Appointment not found");
    }

    await appointment.update(
      {
        status: 5,
        paymentTime: new Date(),
      },
      { transaction }
    );
    await db.paymenthistorys.create(
      {
        paymentDate: new Date(),
        amount: appointment.room.monthlyRent,
        oppointment_id: appointmentId,
      },
      { transaction }
    );

    await transaction.commit();

    return {
      success: true,
      message: "Payment processed successfully",
      data: appointment,
    };
  } catch (error) {
    await transaction.rollback();
    throw new Error(`Payment processing failed: ${error.message}`);
  }
};

export default {
  createPaymentLink,
  handlePaymentSuccess,
};