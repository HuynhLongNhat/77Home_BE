import db from "../models/index";
// order: [["createdAt", "DESC"]],
const getAllHouses = async () => {
  try {
    let houses = await db.houses.findAll({
      attributes: { exclude: ["ward_id", "owner_id"] },
      include: [
        {
          model: db.wards,
          as: "ward",
          attributes: ["id", "name"],
        },
        {
          model: db.users,
          as: "owner",
          attributes: ["citizenNumber", "fullName", "phone", "email"],
        },
      ],
    });
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
    let house = await db.houses.findOne({
      where: { id: id },
      attributes: { exclude: ["ward_id", "owner_id"] },
      include: [
        {
          model: db.wards,
          as: "ward",
          attributes: ["id", "name"],
        },
        {
          model: db.users,
          as: "owner",
          attributes: ["citizenNumber", "fullName", "phone", "email"],
        },
      ],
    });
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
    const house = await db.houses.create({
      name: houseData.name,
      address: houseData.address,
      yearBuilt: houseData.yearBuilt,
      description: houseData.description,
      numberOfFloors: houseData.numberOfFloors,
      numberRooms: houseData.numberRooms,
      area: houseData.area,
      status: houseData.status,
      avatar: houseData.avatar,
      longitude: houseData.longitude,
      latitude: houseData.latitude,
      region: houseData.region,
      position: houseData.position,
      ward_id: houseData.ward_id,
      owner_id: houseData.owner_id,
    });
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
      await house.update({
        name: houseData.name,
        address: houseData.address,
        yearBuilt: houseData.yearBuilt,
        description: houseData.description,
        numberOfFloors: houseData.numberOfFloors,
        numberRooms: houseData.numberRooms,
        area: houseData.area,
        status: houseData.status,
        avatar: houseData.avatar,
        longitude: houseData.longitude,
        latitude: houseData.latitude,
        region: houseData.region,
        position: houseData.position,
        ward_id: houseData.ward_id,
        owner_id: houseData.owner_id,
      });
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
