require("dotenv").config();
import db from "../models/index";
import bcrypt from "bcryptjs";

import { createJWT } from "../middleware/authMiddleware";

const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (password) => {
  return bcrypt.hashSync(password, salt);
};

const checkEmailExist = async (email) => {
  try {
    let user = await db.users.findOne({
      where: {
        email: email,
      },
    });
    if (user) {
      return {
        EM: "The email is already exist",
        EC: -1,
        DT: "",
      };
    }
    return {
      EM: "OK",
      EC: 0,
      DT: "",
    };
  } catch (error) {
    console.log("check error", error);
    return {
      EM: "Something wrongs in services...",
      EC: -2,
      DT: "",
    };
  }
};

const checkPhoneExist = async (phone) => {
  try {
    let user = await db.users.findOne({
      where: {
        phone: phone,
      },
    });
    if (user) {
      return {
        EM: "The phone is already exist",
        EC: -1,
        DT: "",
      };
    }
    return {
      EM: "OK",
      EC: 0,
      DT: "",
    };
  } catch (error) {
    console.log("check error", error);
    return {
      EM: "Something wrongs in services...",
      EC: -2,
      DT: "",
    };
  }
};

const registerNewUser = async (data) => {
  try {
    //validate
    let isEmailExist = await checkEmailExist(data.email);
    if (isEmailExist.EC === -1) {
      return isEmailExist;
    }
    let isPhoneExist = await checkPhoneExist(data.phone);
    if (isPhoneExist.EC === -1) {
      return isPhoneExist;
    }

    // hash password
    let hashPassword = hashUserPassword(data.password);

    // Sử dụng transaction để đảm bảo tính nhất quán của dữ liệu
    const result = await db.sequelize.transaction(async (t) => {
      // create new user
      const newUser = await db.users.create(
        {
          citizenNumber: data.citizenNumber,
          email: data.email,
          phone: data.phone,
          fullName: data.fullName,
          password: hashPassword,
          dateOfBirth: data.dateOfBirth ? data.dateOfBirth : null,
          gender: data.gender || null,
        },
        { transaction: t }
      );

      await db.user_roles.create(
        {
          users_id: newUser.citizenNumber,
          roles_id: 3,
        },
        { transaction: t }
      );

      return newUser;
    });

    if (result) {
      return {
        EM: "A user is created successfully",
        EC: 0,
        DT: "",
      };
    }
    else {
      return {
        EM: "A user is created failed",
        EC: -1,
        DT: {},
      };
    }
  } catch (error) {
    console.log("check error", error);
    return {
      EM: `Something wrongs in services: ${error.message}`,
      EC: -2,
      DT: "",
    };
  }
};

const checkPassword = (password, hashPassword) => {
  return bcrypt.compareSync(password, hashPassword);
};

const getRoleUser = async (data) => {
  try {
    let user = await db.users.findOne({
      where: { email: data.email },
    });
    let roles = await db.user_roles.findAll({
      where: { users_id: user.citizenNumber },
      include: [
        {
          model: db.roles,
          as: "role",
          attributes: ["name"],
        },
      ],
    });
    let roleNames = roles.map((role) => role.role.name);

    return {
      EM: "OK",
      EC: 0,
      DT: roleNames,
    };
  } catch (error) {
    console.log("check error", error);
    return {
      EM: "Something wrongs in services...",
      EC: -2,
      DT: "",
    };
  }
};

const handleUserLogin = async (data) => {
  try {
    let user = await db.users.findOne({
      where: {
        email: data.email,
      },
    });

    if (user) {
      let isCorrectPassword = checkPassword(data.password, user.password);

      if (isCorrectPassword === true) {
        let userRole = await getRoleUser(data);
        let payload = {
          email: user.email,
          userRole,
          fullName: user.fullName,
        };
        let token = createJWT(payload);
        return {
          EM: "OK",
          EC: 0,
          DT: {
            access_token: token,
            email: user.email,
            role: userRole,
            fullName: user.fullName,
            id : user.citizenNumber

          },
        };
      }
    }
    return {
      EM: "Your email/phone number or password is incorrect!",
      EC: -1,
      DT: "",
    };
  } catch (error) {
    console.log("check error", error);
    return {
      EM: "Something wrongs in services...",
      EC: -2,
      DT: "",
    };
  }
};
module.exports = {
  registerNewUser,
  handleUserLogin,
  hashUserPassword,
  checkEmailExist,
  checkPhoneExist,
};
