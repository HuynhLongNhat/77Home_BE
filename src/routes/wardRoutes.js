// routes/userRoutes.js
import express from "express";
import wardController from "../controller/wardController.js";

const router = express.Router();

const initWardRoutes = (app) => {
  router.get("/", wardController.getAllWards);
  return app.use("/api/v1/ward", router);
};
export default initWardRoutes;
