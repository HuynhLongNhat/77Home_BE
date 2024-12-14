const houseService = require("../services/houseService");

const getAllHouses = async (req, res) => {
  try {
    const data = await houseService.getAllHouses();
    return res.status(200).json({
      EM: data.EM, // Assuming your service returns EM, EC, and DT
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

const getHouseById = async (req, res) => {
  try {
    const data = await houseService.getHouseById(req.params.id);
    if (!data.DT) {
      return res.status(404).json({
        EM: "Không tìm thấy house",
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

const createHouse = async (req, res) => {
  try {
    const data = await houseService.createHouse(req.body);
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

const updateHouse = async (req, res) => {
  try {
    const data = await houseService.updateHouse(req.params.id, req.body);
    if (!data.DT) {
      return res.status(404).json({
        EM: "Không tìm thấy house",
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
    return res.status(400).json({
      EM: "Lỗi hệ thống",
      EC: "-1",
      DT: "",
    });
  }
};

const deleteHouse = async (req, res) => {
  try {
    const data = await houseService.deleteHouse(req.params.id);
    if (!data.DT) {
      return res.status(404).json({
        EM: "Không tìm thấy house",
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
  getAllHouses,
  getHouseById,
  createHouse,
  updateHouse,
  deleteHouse,
};
