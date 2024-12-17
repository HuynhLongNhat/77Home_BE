import roomService from "../service/roomService";

const getAllRooms = async (req, res) => {
  try {
    const data = await roomService.getAllRooms();
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.log("check error ", error);
    return res.status(500).json({
      EM: "Lỗi hệ thống",
      EC: "-1",
      DT: "",
    });
  }
};

const getRoomById = async (req, res) => {
  try {
    const data = await roomService.getRoomById(req.params.id);
    if (!data.DT) {
      return res.status(404).json({
        EM: "Không tìm thấy room",
        EC: "1",
        DT: "",
      });
    }
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.log("check error ", error);
    return res.status(500).json({
      EM: "Lỗi hệ thống",
      EC: "-1",
      DT: "",
    });
  }
};

const createRoom = async (req, res) => {
  try {
    const data = await roomService.createRoom(req.body);
    return res.status(201).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.log("check error ", error);
    return res.status(400).json({
      EM: "Lỗi hệ thống",
      EC: "-1",
      DT: "",
    });
  }
};

const updateRoom = async (req, res) => {
  try {
    const data = await roomService.updateRoom(req.params.id, req.body);

    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.log("check error ", error);
    return res.status(400).json({
      EM: "Lỗi hệ thống",
      EC: "-1",
      DT: "",
    });
  }
};

const deleteRoom = async (req, res) => {
  try {
    const data = await roomService.deleteRoom(req.params.id);
    if (!data.DT) {
      return res.status(404).json({
        EM: "Không tìm thấy room",
        EC: "-1",
        DT: "",
      });
    }
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.log("check error ", error);
    return res.status(500).json({
      EM: "Lỗi hệ thống",
      EC: "-1",
      DT: "",
    });
  }
};

module.exports = {
  getAllRooms,
  getRoomById,
  createRoom,
  updateRoom,
  deleteRoom,
};
