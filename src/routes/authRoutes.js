// routes/userRoutes.js
import express from "express";
import userController from "../controller/userController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

const initAuthRoutes = (app) => {
  const authController = require("../controllers/authController");

  router.post("/register", authController.register);
  router.post("/login", authController.login);
  router.post("/logout", authController.logout);
  return app.use("/api/v1", router);
};
export default initAuthRoutes;
