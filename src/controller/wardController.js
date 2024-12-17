import wardService from "../service/wardService";

const getAllWards = async (req, res) => {
  try {
    const data = await wardService.getAllWards();
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
  getAllWards,
};
