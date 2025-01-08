import db from "../models/index";
import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (password) => {
  return bcrypt.hashSync(password, salt);
};
const getAllUser = async () => {
  try {
    let users = await db.users.findAll({
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: db.user_roles,
          as: "user_roles",
          attributes: ["roles_id"],
          include: [
            {
              model: db.roles,
              as: "role",
              attributes: ["name"],
            },
          ],
        },
      ],
    });
    if (users) {
      return {
        EM: "Lấy dữ liệu thành công",
        EC: 0,
        DT: users,
      };
    } else {
      return {
        EM: "Lấy dữ liệu không thành công",
        EC: -1,
        DT: [],
      };
    }
  } catch (error) {
    console.log("check error", error);
    return {
      EM: "Lỗi dịch vụ",
      EC: -2,
      DT: [],
    };
  }
};

const createNewUser = async (dataUser) => {
  console.log("Data user", dataUser);
  try {
    let hashPassword = hashUserPassword(dataUser.password);
    let newUser = await db.users.create({
      citizenNumber: dataUser.citizenNumber,
      fullName: dataUser.fullName,
      dateOfBirth: dataUser.dateOfBirth,
      password: hashPassword,
      email: dataUser.email,
      phone: dataUser.phone,
      gender: dataUser.gender,
    });

    if (newUser) {
      await db.user_roles.create({
        users_id: newUser.citizenNumber,
        roles_id: dataUser.role_id,
      });
      return {
        EM: "Tạo người dùng mới thành công  ! ",
        EC: 0,
        DT: newUser,
      };
    } else {
      return {
        EM: "Tạo người dùng mới thất bại !",
        EC: -1,
        DT: {},
      };
    }
  } catch (error) {
    console.log("check error", error);
    return {
      EM: "Lỗi hệ thống",
      EC: -2,
      DT: {},
    };
  }
};

const getUserByCitizenNumber = async (citizenNumber) => {
  try {
    let user = await db.users.findOne({
      where: { citizenNumber: citizenNumber },
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: db.user_roles,
          as: "user_roles",
          attributes: ["roles_id"],
          include: [
            {
              model: db.roles,
              as: "role",
              attributes: ["name"],
            },
          ],
        },
      ],
    });
    if (user) {
      return {
        EM: "Lấy dữ liệu thành công",
        EC: 0,
        DT: user,
      };
    } else {
      return {
        EM: "Không tìm thấy người dùng!",
        EC: -1,
        DT: [],
      };
    }
  } catch (error) {
    console.log("check error", error);
    return {
      EM: "Lỗi dịch vụ",
      EC: -2,
      DT: [],
    };
  }
};

const updateUser = async (citizenNumber, dataUser) => {
  try {
    let user = await db.users.findByPk(citizenNumber);
    if (user) {
      await user.update({
        fullName: dataUser.fullName,
        dateOfBirth: dataUser.dateOfBirth,
        gender: dataUser.gender,
      });
      let userRole = await db.user_roles.findOne({
        where: { users_id: citizenNumber },
      });
      if (userRole) {
        if (userRole.roles_id !== dataUser.role_id) {
          await db.user_roles.update(
            {
              roles_id: dataUser.role_id,
            },
            {
              where: { users_id: citizenNumber },
            }
          );
        }
      } else {
        await db.user_roles.create({
          users_id: citizenNumber,
          roles_id: dataUser.role_id,
        });
      }

      return {
        EM: "Cập nhật người dùng thành công!",
        EC: 0,
        DT: user,
      };
    } else {
      return {
        EM: "Người dùng không tồn tại!",
        EC: -1,
        DT: {},
      };
    }
  } catch (error) {
    console.log("check error", error);
    return {
      EM: "Lỗi hệ thống",
      EC: -2,
      DT: {},
    };
  }
};

const deleteUser = async (citizenNumber) => {
  try {
    let user = await db.users.findByPk(citizenNumber);
    if (user) {
      await user.destroy();
      await db.user_roles.destroy({ where: { users_id: citizenNumber } });
      return {
        EM: "Xóa người dùng thành công!",
        EC: 0,
        DT: {},
      };
    } else {
      return {
        EM: "Người dùng không tồn tại!",
        EC: -1,
        DT: {},
      };
    }
  } catch (error) {
    console.log("check error", error);
    return {
      EM: "Lỗi hệ thống",
      EC: -2,
      DT: {},
    };
  }
};
module.exports = {
  getAllUser,
  createNewUser,
  getUserByCitizenNumber,
  updateUser,
  deleteUser,
};
