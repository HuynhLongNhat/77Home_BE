import express from "express";
import appointmentController from "../controller/appointmentController";

const router = express.Router();

const initAppointmentRoutes = (app) => {
  // Routes cho Renter
  router.post("/", appointmentController.createAppointment); // Tạo lịch hẹn mới
  router.get(
    "/renter/:citizenNumber",
    appointmentController.getRenterAppointments
  ); // Xem lịch hẹn của mình
  router.put("/renter/:id/abort", appointmentController.abortAppointment); // Hủy lịch hẹn

  // Routes cho Owner
  router.get(
    "/owner/:citizenNumber",
    appointmentController.getOwnerAppointments
  );
  router.put("/owner/:id/accept", appointmentController.acceptAppointment); // Chấp nhận lịch hẹn
  router.put("/owner/:id/reject", appointmentController.rejectAppointment); // Từ chối lịch hẹn

  // Routes cho Admin
  router.get("/admin/all", appointmentController.getAllAppointments); // Xem tất cả lịch hẹn
  router.put(
    "/admin/:id/accept",
    appointmentController.acceptAppointmentByAdmin
  ); // Chấp nhận lịch hẹn
  router.put(
    "/admin/:id/reject",
    appointmentController.rejectAppointmentByAdmin
  ); // Từ chối lịch hẹn

  return app.use("/api/v1/appointment", router);
};

export default initAppointmentRoutes;
