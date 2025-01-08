import express from "express";
import roomController from "../controller/roomController";

const router = express.Router();

const initRoomRoutes = (app) => {
  router.get("/", roomController.getAllRooms);

  router.get("/:id", roomController.getRoomById);

  router.post("/", roomController.createRoom);

  router.put("/:id", roomController.updateRoom);

  router.delete("/:id", roomController.deleteRoom);

  return app.use("/api/v1/room", router);
};
export default initRoomRoutes;
