import db from "../models/index";

const getAllRooms = async () => {
  try {
    let rooms = await db.rooms.findAll({
      order: [["createdAt", "DESC"]],
      attributes: { exclude: ["createdAt", "updatedAt", "house_id"] },
      include: [
        {
          model: db.houses,
          as: "house",
          attributes: ["id", "name"],
        },
      ],
    });
    if (rooms) {
      return {
        EM: "Lấy dữ liệu thành công",
        EC: 0,
        DT: rooms,
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

const getRoomById = async (id) => {
  try {
    let room = await db.rooms.findOne({
      where: { id: id },
      attributes: { exclude: ["createdAt", "updatedAt", "house_id"] },
      include: [
        {
          model: db.houses,
          as: "house",
          attributes: ["id", "name"],
        },
      ],
    });
    if (room) {
      return {
        EM: "Lấy dữ liệu thành công",
        EC: 0,
        DT: room,
      };
    } else {
      return {
        EM: "Không tìm thấy room",
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

const createRoom = async (roomData) => {
  try {
    const newRoom = await db.rooms.create({
      name: roomData.name,
      area: roomData.area,
      maxOccupants: roomData.maxOccupants,
      monthlyRent: roomData.monthlyRent,
      status: roomData.status,
      description: roomData.description,
      house_id: roomData.house_id,
    });
    return {
      EM: "Tạo phòng  mới thành công",
      EC: 0,
      DT: newRoom,
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

const updateRoom = async (id, roomData) => {
  try {
    const room = await db.rooms.findByPk(id);
    if (room) {
      await room.update({
        name: roomData.name,
        area: roomData.area,
        maxOccupants: roomData.maxOccupants,
        monthlyRent: roomData.monthlyRent,
        status: roomData.status,
        description: roomData.description,
        house_id: roomData.house_id,
      });
      return {
        EM: "Cập nhật room thành công",
        EC: 0,
        DT: room,
      };
    } else {
      return {
        EM: "Không tìm thấy room",
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

const deleteRoom = async (id) => {
  try {
    const room = await db.rooms.findByPk(id);
    if (room) {
      await room.destroy();
      return {
        EM: "Xóa room thành công",
        EC: 0,
        DT: [],
      };
    } else {
      return {
        EM: "room không tồn tại",
        EC: 2,
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
  getAllRooms,
  getRoomById,
  createRoom,
  updateRoom,
  deleteRoom,
};
