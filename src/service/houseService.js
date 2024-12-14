import db from "../models/index";

const getAllHouses = async () => {
  try {
    let houses = await db.houses.findAll();
    if (houses) {
      return {
        EM: "Lấy dữ liệu thành công",
        EC: 0,
        DT: houses,
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

const getHouseById = async (id) => {
  try {
    let house = await db.houses.findByPk(id);
    if (house) {
      return {
        EM: "Lấy dữ liệu thành công",
        EC: 0,
        DT: house,
      };
    } else {
      return {
        EM: "Không tìm thấy house",
        EC: 2,
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

const createHouse = async (houseData) => {
  try {
    const house = await db.houses.create(houseData);
    return {
      EM: "Tạo house mới thành công",
      EC: 0,
      DT: house,
    };
  } catch (error) {
    console.log("check error :", error);
    return {
      EM: "Lỗi hệ thống",
      EC: -1,
      DT: "",
    };
  }
};

const updateHouse = async (id, houseData) => {
  try {
    const house = await db.houses.findByPk(id);
    if (house) {
      await house.update(houseData);
      return {
        EM: "Cập nhật house thành công",
        EC: 0,
        DT: "",
      };
    } else {
      return {
        EM: "Không tìm thấy house",
        EC: 2,
        DT: "",
      };
    }
  } catch (error) {
    console.log("check error :", error);
    return {
      EM: "Lỗi dịch vụ",
      EC: 1,
      DT: [],
    };
  }
};

const deleteHouse = async (id) => {
  try {
    const house = await db.houses.findByPk(id);
    if (house) {
      await house.destroy();
      return {
        EM: "Xóa house thành công",
        EC: 0,
        DT: [],
      };
    } else {
      return {
        EM: "House không tồn tại",
        EC: 2, // Assuming 2 represents 'not found'
        DT: [],
      };
    }
  } catch (error) {
    console.log("check error : ", error);
    return {
      EM: "Lỗi dịch vụ",
      EC: -1,
      DT: [],
    };
  }
};

module.exports = {
  getAllHouses,
  getHouseById,
  createHouse,
  updateHouse,
  deleteHouse,
};
