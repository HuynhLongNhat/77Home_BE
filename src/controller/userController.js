import userService from "../service/userService";

const getAllUsers = async (req, res) => {
  try {
    const data = await userService.getAllUser();
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
const createNewUser = async (req, res) => {
  try {
    const data = await userService.createNewUser(req.body);
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
const getUserByCitizenNumber = async (req, res) => {
  try {
    const data = await userService.getUserByCitizenNumber(
      req.params.citizenNumber
    );
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

const updateUser = async (req, res) => {
  try {
    const data = await userService.updateUser(
      req.params.citizenNumber,
      req.body
    );

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

const deleteUser = async (req, res) => {
  try {
    const data = await userService.deleteUser(req.params.citizenNumber);
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

module.exports = {
  getUserByCitizenNumber,
  createNewUser,
  updateUser,
  deleteUser,
  getAllUsers,
};
