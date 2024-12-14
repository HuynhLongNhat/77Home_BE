import express from "express";
const houseController = require("../controllers/houseController");

const router = express.Router();

const initHouseRoutes = (app) => {
  // Lấy danh sách tất cả các house
  router.get("/", houseController.getAllHouses);

  // Lấy thông tin một house theo ID
  router.get("/:id", houseController.getHouseById);

  // Tạo house mới
  router.post("/", houseController.createHouse);

  // Cập nhật thông tin house
  router.put("/:id", houseController.updateHouse);

  // Xóa house
  router.delete("/:id", houseController.deleteHouse);

  return app.use("/api/v1/house", router);
};
export default initHouseRoutes;
