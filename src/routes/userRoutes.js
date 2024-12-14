// routes/userRoutes.js
import express from "express";
import userController from "../controller/userController.js";

const router = express.Router();

const initUserRoutes = (app) => {
  router.get("/", userController.getAllUsers);
  return app.use("/api/v1/user", router);
};
export default initUserRoutes;
