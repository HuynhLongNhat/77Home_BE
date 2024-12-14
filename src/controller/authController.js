import authService from "../service/authService";

const handleRegister = async (req, res) => {
  // console.log("data", req.body);
  try {
    if (
      !req.body.citizenNumber ||
      !req.body.fullName ||
      !req.body.email ||
      !req.body.phone ||
      !req.body.password
    ) {
      return res.status(200).json({
        EM: "Thiếu tham số bắt buộc",
        EC: "1",
        DT: "",
      });
    }
    if (req.body.password && req.body.password.length < 6) {
      return res.status(200).json({
        EM: "Mật khẩu của bạn phải có nhiều hơn 6 ký tự",
        EC: "1",
        DT: "",
      });
    }
    //service : create user
    let data = await authService.registerNewUser(req.body);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: "",
    });
  } catch (e) {
    return res.status(404).json({
      EM: "Lỗi hệ thống",
      EC: "-1",
      DT: "",
    });
  }
};

const handleLogin = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res.status(200).json({
        EM: "Thiếu tham số bắt buộc",
        EC: "1",
        DT: "",
      });
    }
    let data = await authService.handleUserLogin(req.body);

    // set
    if (data && data.DT && data.DT.access_token) {
      // thuộc tính httpsOnly : true chỉ cho phía server lấy cookie
      res.cookie("jwt", data.DT.access_token, {
        httpsOnly: true,
        maxAge: 60 * 60 * 1000,
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

const handleLogout = async (req, res) => {
  try {
    res.clearCookie("jwt");
    return res.status(200).json({
      EM: "Xóa cookie xong!",
      EC: 0,
      DT: "",
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
  handleRegister,
  handleLogin,
  handleLogout,
};
