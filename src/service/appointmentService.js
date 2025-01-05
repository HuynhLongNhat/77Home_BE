import db from "../models/index";

const appointmentService = {
  createAppointment: async (appointmentData) => {
    try {
      const newAppointment = await db.appointments.create({
        renterId: appointmentData.renterId,
        rentEntityId: appointmentData.rentEntityId,
        meetDate: appointmentData.meetDate,
        note: appointmentData.note,
        status: 1,
      });

      return {
        EM: "Tạo lịch hẹn thành công",
        EC: 0,
        DT: newAppointment,
      };
    } catch (error) {
      console.log("check error:", error);
      return {
        EM: "Lỗi dịch vụ",
        EC: 1,
        DT: [],
      };
    }
  },
  // xem ds lịch hẹn của renter
  getRenterAppointments: async (renterId) => {
    try {
      const appointments = await db.appointments.findAll({
        where: { renterId: renterId },
        attributes: { exclude: ["renterId", "rentEntityId"] },
        include: [
          {
            model: db.users,
            as: "renter",
            attributes: ["fullName", "phone", "email"],
          },
          {
            model: db.rooms,
            as: "room",
            attributes: ["id", "name", "monthlyRent"],
            include: [
              {
                model: db.houses,
                as: "house",
                attributes: ["id", "name", "address"],
              },
            ],
          },
        ],
        order: [["createdAt", "DESC"]],
      });

      return {
        EM: "Lấy danh sách lịch hẹn thành công",
        EC: 0,
        DT: appointments,
      };
    } catch (error) {
      console.log("check error:", error);
      return {
        EM: "Lỗi dịch vụ",
        EC: 1,
        DT: [],
      };
    }
  },
  // xem ds lịch hẹn của owner
  getOwnerAppointments: async (ownerCitizenNumber) => {
    try {
      const ownerHouses = await db.houses.findAll({
        where: { owner_id: ownerCitizenNumber },
        attributes: ["id", "name", "address", "status"],
        include: [
          {
            model: db.rooms,
            as: "rooms",
            attributes: ["id", "name", "monthlyRent", "status"],
            include: [
              {
                model: db.appointments,
                as: "appointments",
                attributes: [
                  "id",
                  "renterId",
                  "meetDate",
                  "status",
                  "createdAt",
                ],
                include: [
                  {
                    model: db.users,
                    as: "renter",
                    attributes: ["fullName", "phone", "email"],
                  },
                ],
              },
            ],
          },
        ],
        order: [
          ["createdAt", "DESC"],
          [{ model: db.rooms, as: "rooms" }, "createdAt", "DESC"],
          [
            { model: db.rooms, as: "rooms" },
            { model: db.appointments, as: "appointments" },
            "createdAt",
            "DESC",
          ],
        ],
      });

      return {
        EM: "Lấy danh sách nhà và phòng thành công",
        EC: 0,
        DT: ownerHouses,
      };
    } catch (error) {
      console.log("check error:", error);
      return {
        EM: "Lỗi dịch vụ",
        EC: 1,
        DT: [],
      };
    }
  },

  // xem ds lịch hẹn của admin
  getAllAppointments: async () => {
    try {
      const appointments = await db.appointments.findAll({
        attributes: { exclude: ["renterId", "rentEntityId"] },
        include: [
          {
            model: db.users,
            as: "renter",
            attributes: ["fullName", "phone", "email"],
          },
        ],
      });
      if (appointments) {
        return {
          EM: "Lấy danh sách lịch hẹn thành công",
          EC: 0,
          DT: appointments,
        };
      }
    } catch (error) {
      console.log("check error:", error);
      return {
        EM: error.message,
        EC: 1,
        DT: [],
      };
    }
  },
  // cập nhật trạng thái lịch hẹn
  updateAppointmentStatus: async (
    appointmentId,
    action,
    acceptedTime = null,
    abortedReason = null
  ) => {
    try {
      const appointment = await db.appointments.findByPk(appointmentId);
      if (!appointment) {
        return {
          EM: "Không tìm thấy lịch hẹn",
          EC: 2,
          DT: [],
        };
      }

      const updateData = {};

      switch (action) {
        case "accept":
          updateData.status = 2; // accepted
          updateData.acceptedTime = acceptedTime;
          break;
        case "abort":
          updateData.status = 3; // aborted
          updateData.abortedTime = new Date();
          updateData.abortedReason = abortedReason;
          break;
        case "reject":
          updateData.status = 4; // rejected
          updateData.abortedTime = new Date();
          updateData.abortedReason = abortedReason;
          break;
        default:
          return {
            EM: "Hành động không hợp lệ",
            EC: 1,
            DT: [],
          };
      }

      await appointment.update(updateData);

      return {
        EM: "Cập nhật trạng thái lịch hẹn thành công",
        EC: 0,
        DT: appointment,
      };
    } catch (error) {
      console.log("check error:", error);
      return {
        EM: "Lỗi dịch vụ",
        EC: 1,
        DT: [],
      };
    }
  },
};

export default appointmentService;
