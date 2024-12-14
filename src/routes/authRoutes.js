// routes/userRoutes.js
import express from "express";
import authController from "../controller/authController.js";

const router = express.Router();

const initAuthRoutes = (app) => {
  router.post("/register", authController.handleRegister);
  router.post("/login", authController.handleLogin);
  router.post("/logout", authController.handleLogout);
  return app.use("/api/v1", router);
};
export default initAuthRoutes;
