// routes/productRoutes.js
import express from "express";
import productController from "../controller/productController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * Routes liên quan đến sản phẩm
 */
const initProductRoutes = (app) => {
  // Lấy danh sách tất cả sản phẩm
  router.get("/", authenticateToken, productController.getAllProducts);

  // Lấy thông tin chi tiết một sản phẩm
  router.get("/:id", authenticateToken, productController.getProductById);

  // Thêm một sản phẩm mới
  router.post("/", authenticateToken, productController.createProduct);

  // Cập nhật thông tin sản phẩm
  router.put("/:id", authenticateToken, productController.updateProduct);

  // Xóa một sản phẩm
  router.delete("/:id", authenticateToken, productController.deleteProduct);

  // Gắn router vào app
  return app.use("/products", router);
};

export default initProductRoutes;
