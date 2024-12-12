import { Sequelize } from "sequelize";

// Khởi tạo Sequelize với cấu hình kết nối
const sequelize = new Sequelize("77home", "root", "admin", {
  host: "localhost",
  dialect: "mysql",
});

// Tạo hàm kết nối và đồng bộ cơ sở dữ liệu
const connection = async () => {
  try {
    // Kiểm tra kết nối cơ sở dữ liệu
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    // Đồng bộ mô hình với cơ sở dữ liệu
    await sequelize.sync({ force: false, alter: true });
    console.log("Database synchronized successfully!");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

// Xuất kết nối để sử dụng ở nơi khác trong ứng dụng
export default connection;
