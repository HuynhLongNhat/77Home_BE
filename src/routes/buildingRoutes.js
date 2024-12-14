import express from "express";
const router = express.Router();
import buildingController from "../controller/buildingController";

const initBuildingRoutes = (app) => {
  // Lấy danh sách tất cả các building
  router.get("/", buildingController.getAllBuildings);

  // Lấy thông tin một building theo ID
  router.get("/:id", buildingController.getBuildingById);

  // Tạo building mới
  router.post("/", buildingController.createBuilding);

  // Cập nhật thông tin building
  router.put("/:id", buildingController.updateBuilding);

  // Xóa building
  router.delete("/:id", buildingController.deleteBuilding);
  return app.use("/api/v1/building", router);
};
export default initBuildingRoutes;
