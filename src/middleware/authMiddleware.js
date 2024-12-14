import jwt from "jsonwebtoken";
require("dotenv").config();

const nonSecurePaths = [
  "/api/v1/auth/logout",
  "/api/v1/auth/login",
  "/api/v1/auth/register",
];

const createJWT = (payload) => {
  let key = process.env.JWT_SECRET;
  let token = null;
  try {
    token = jwt.sign(payload, key, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  } catch (error) {
    console.log("Check error : ", error);
  }
  return token;
};

const verifyToken = (token) => {
  let key = process.env.JWT_SECRET;
  let decoded = null;
  try {
    decoded = jwt.verify(token, key);
  } catch (error) {
    console.log("Check error :", error);
  }
  return decoded;
};

const extractToken = (req) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    return req.headers.authorization.split(" ")[1];
  }
  return null;
};

const authMiddleware = async (req, res, next) => {
  try {
    if (nonSecurePaths.includes(req.path)) {
      return next();
    }

    const token = extractToken(req) || (req.cookies && req.cookies.jwt);

    if (!token) {
      return res.status(401).json({
        EC: -1,
        DT: "",
        EM: "Chưa xác thực người dùng",
      });
    }

    const decoded = verifyToken(token);

    if (!decoded) {
      return res.status(401).json({
        EC: -1,
        DT: "",
        EM: "Token không hợp lệ",
      });
    }

    // Lấy thông tin user (bao gồm role) từ database dựa trên userId trong token
    const user = await User.findByPk(decoded.userId, {
      include: { model: Role }, // Include Role để lấy thông tin về vai trò
    });

    if (!user) {
      return res.status(401).json({
        EC: -1,
        DT: "",
        EM: "Người dùng không tồn tại",
      });
    }

    req.user = {
      userId: user.id,
      email: user.email,
      role: user.Roles[0].name, // Lấy tên của role đầu tiên (giả sử mỗi user chỉ có 1 role)
    };

    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      EM: "Lỗi server",
      EC: -1,
      DT: "",
    });
  }
};

module.exports = {
  createJWT,
  verifyToken,
  authMiddleware,
  extractToken,
};
