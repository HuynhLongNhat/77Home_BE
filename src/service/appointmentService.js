import db from "../models/index";
import emailService from "./emailService";

const appointmentService = {
  createAppointment: async (appointmentData) => {
    try {
      const existingAppointment = await db.appointments.findOne({
        where: { renterId: appointmentData.renterId },
      });

      if (existingAppointment) {
        return {
          EM: "Bạn đã đặt lịch hẹn trước đó",
          EC: -1,
          DT: [],
        };
      }

      // Tìm thông tin phòng và nhà
      const room = await db.rooms.findByPk(appointmentData.rentEntityId, {
        include: [
          {
            model: db.houses,
            as: "house",
            attributes: ["name", "address"],
          },
        ],
      });

      const newAppointment = await db.appointments.create({
        renterId: appointmentData.renterId,
        rentEntityId: appointmentData.rentEntityId,
        meetDate: appointmentData.meetDate,
        note: appointmentData.note,
        status: 1,
      });
   
       const renter = await db.users.findByPk(appointmentData.renterId, {
         attributes: ["email"],
       });
       if (!renter) {
         return {
           EM: "Không tìm thấy thông tin người thuê",
           EC: -1,
           DT: [],
         };
       }
      // Gửi email xác nhận
      await emailService.sendAppointmentConfirmation(renter.email, {
        date: new Date(appointmentData.meetDate).toLocaleDateString(),
        time: new Date(appointmentData.meetDate).toLocaleTimeString(),
        roomName: room.name,
        address: room.house.address,
      });

      return {
        EM: "Đặt lịch hẹn thành công",
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
                include: [
                  {
                    model: db.users,
                    as: "owner",
                    attributes: ["citizenNumber", "fullName"],
                  },
                ],
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
        attributes: { exclude: ["renterId", "rentEntityId"] },
        include: [
          {
            model: db.users,
            as: "owner",
            attributes: ["fullName", "phone", "email"],
          },
          {
            model: db.rooms,
            as: "rooms",
            attributes: ["id", "name", "monthlyRent"],
            include: [
              {
                model: db.appointments,
                as: "appointments",
                attributes: { exclude: ["renterId", "rentEntityId"] },
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
        order: [["createdAt", "DESC"]],
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
          {
            model: db.rooms,
            as: "room",
            attributes: ["id", "name", "monthlyRent"],
            include: [
              {
                model: db.houses,
                as: "house",
                attributes: ["id", "name", "address"],
                include: [
                  {
                    model: db.users,
                    as: "owner",
                    attributes: ["citizenNumber", "fullName"],
                  },
                ],
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
        EM: "Lỗi dịch vụ " + error.message,
        EC: 1,
        DT: [],
      };
    }
  },

  // cập nhật trạng thái lịch hẹn
  updateAppointmentStatus: async (
    appointmentId,
    action,
    acceptedTime,
    abortedReason ,
    rejectedReason,
  ) => {
    try {
      const appointment = await db.appointments.findByPk(appointmentId, {
        include: [
          {
            model: db.rooms,
            as: "room",
            include: [
              {
                model: db.houses,
                as: "house",
              },
            ],
          },
          {
            model: db.users,
            as: "renter",
            attributes: ["email"],
          },
        ],
      });

      if (!appointment) {
        return {
          EM: "Không tìm thấy lịch hẹn",
          EC: 2,
          DT: [],
        };
      }

      const updateData = {};
      let emailResult = false;

      switch (action) {
        case "accept":
          updateData.status = 2;
          updateData.acceptedTime = acceptedTime;
          emailResult = await emailService.sendAppointmentAcceptance(
            appointment.renter.email,
            {
              date: new Date(appointment.meetDate).toLocaleDateString(),
              time: new Date(appointment.meetDate).toLocaleTimeString(),
              roomName: appointment.room.name,
              address: appointment.room.house.address,
            }
          );
          break;

        case "abort":
          updateData.status = 3;
          updateData.abortedTime = new Date();
          updateData.abortedReason = abortedReason;
          emailResult = await emailService.sendAppointmentCancellation(
            appointment.renter.email,
            {
              date: new Date(appointment.meetDate).toLocaleDateString(),
              time: new Date(appointment.meetDate).toLocaleTimeString(),
              roomName: appointment.room.name,
              address: appointment.room.house.address,
            },
            abortedReason
          );
          break;

        case "reject":
          updateData.status = 4;
          updateData.rejectedTime = new Date();
          updateData.rejectedReason = rejectedReason;
          emailResult = await emailService.sendAppointmentRejection(
            appointment.renter.email,
            {
              date: new Date(appointment.meetDate).toLocaleDateString(),
              time: new Date(appointment.meetDate).toLocaleTimeString(),
              roomName: appointment.room.name,
            },
            rejectedReason
          );
          break;
  
          updateData.status = 5;
          updateData.acceptedTime = paymentTime;
          break;
        default:
          return {
            EM: "Hành động không hợp lệ",
            EC: 1,
            DT: [],
          };
      }

      const updatedAppointment = await appointment.update(updateData);

      if (!emailResult) {
        console.log("Failed to send email notification");
      }

      return {
        EM: "Cập nhật trạng thái lịch hẹn thành công",
        EC: 0,
        DT: updatedAppointment,
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
  updateAppointmentStatusByAdmin: async (
    appointmentId,
    action,
    acceptedTime,
    abortedReason,
    rejectedReason,
  ) => {
    try {
      const appointment = await db.appointments.findByPk(appointmentId, {
        include: [
          {
            model: db.rooms,
            as: "room",
            include: [
              {
                model: db.houses,
                as: "house",
              },
            ],
          },
          {
            model: db.users,
            as: "renter",
            attributes: ["email"],
          },
        ],
      });

      if (!appointment) {
        return {
          EM: "Không tìm thấy lịch hẹn",
          EC: 2,
          DT: [],
        };
      }

      const updateData = {};
      let emailResult = false;

      switch (action) {
        case "accept":
          updateData.status = 2;
          updateData.acceptedTime = acceptedTime;
          emailResult = await emailService.sendAppointmentAcceptance(
            appointment.renter.email,
            {
              date: new Date(appointment.meetDate).toLocaleDateString(),
              time: new Date(appointment.meetDate).toLocaleTimeString(),
              roomName: appointment.room.name,
              address: appointment.room.house.address,
            }
          );
          break;

        case "abort":
          updateData.status = 3;
          updateData.abortedTime = new Date();
          updateData.abortedReason = abortedReason;
          emailResult = await emailService.sendAppointmentCancellation(
            appointment.renter.email,
            {
              date: new Date(appointment.meetDate).toLocaleDateString(),
              time: new Date(appointment.meetDate).toLocaleTimeString(),
              roomName: appointment.room.name,
              address: appointment.room.house.address,
            },
            abortedReason
          );
          break;

        case "reject":
          updateData.status = 4;
          updateData.rejectedTime = new Date();
          updateData.rejectedReason = rejectedReason;
          emailResult = await emailService.sendAppointmentRejection(
            appointment.renter.email,
            {
              date: new Date(appointment.meetDate).toLocaleDateString(),
              time: new Date(appointment.meetDate).toLocaleTimeString(),
              roomName: appointment.room.name,
            },
            rejectedReason
          );
          break;

     
        default:
          return {
            EM: "Hành động không hợp lệ",
            EC: 1,
            DT: [],
          };
      }

      const updatedAppointment = await appointment.update(updateData);

      if (!emailResult) {
        console.log("Failed to send email notification");
      }

      return {
        EM: "Cập nhật trạng thái lịch hẹn thành công",
        EC: 0,
        DT: updatedAppointment,
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
