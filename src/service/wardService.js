import db from "../models/index";

const getAllWards = async () => {
  try {
    let wards = await db.wards.findAll();
    if (wards) {
      return {
        EM: "Lấy dữ liệu thành công",
        EC: 0,
        DT: wards,
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
  getAllWards,
};
