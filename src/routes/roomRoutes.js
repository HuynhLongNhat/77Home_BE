import express from "express";
import roomController from "../controller/roomController";

const router = express.Router();

const initRoomRoutes = (app) => {
  // Lấy danh sách tất cả các house
  router.get("/", roomController.getAllRooms);

  // Lấy thông tin một house theo ID
  router.get("/:id", roomController.getRoomById);

  // Tạo house mới
  router.post("/", roomController.createRoom);

  // Cập nhật thông tin house
  router.put("/:id", roomController.updateRoom);

  // Xóa house
  router.delete("/:id", roomController.deleteRoom);

  return app.use("/api/v1/room", router);
};
export default initRoomRoutes;
