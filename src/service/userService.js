import db from "../models/index";

const getAllUser = async () => {
  try {
    let users = await db.users.findAll();
    if (users) {
      return {
        EM: "Lấy dữ liệu thành công",
        EC: 0,
        DT: users,
      };
    } else {
      return {
        EM: "Lấy dữ liệu không thành công",
        EC: 0,
        DT: [],
      };
    }
  } catch (error) {
    console.log("check error", error);
    return {
      EM: "Lỗi dịch vụ",
      EC: 1,
      DT: [],
    };
  }
};

module.exports = {
  getAllUser,
};
