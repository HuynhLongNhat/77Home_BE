import appointmentService from "../service/appointmentService";

const appointmentController = {
  createAppointment: async (req, res) => {
    try {
      const data = await appointmentService.createAppointment(req.body);
      return res.status(201).json({
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
  },

  getRenterAppointments: async (req, res) => {
    const renterId = req.params.citizenNumber;

    try {
      const data = await appointmentService.getRenterAppointments(renterId);
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
  },

  getOwnerAppointments: async (req, res) => {
    try {
      const ownerCitizenNumber = req.params.citizenNumber;
      const data = await appointmentService.getOwnerAppointments(
        ownerCitizenNumber
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
  },

  getAllAppointments: async (req, res) => {
    try {
      const data = await appointmentService.getAllAppointments();
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
  },

  acceptAppointment: async (req, res) => {
    try {
      const data = await appointmentService.updateAppointmentStatus(
        req.params.id,
        "accept",
        new Date(),
        null,
        null,
       
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
  },

  rejectAppointment: async (req, res) => {
    try {
      const data = await appointmentService.updateAppointmentStatus(
        req.params.id,
        "reject",
        null,
        null,
        req.body.rejectedReason,
      
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
  },

  abortAppointment: async (req, res) => {
    console.log("Data", req.body);
    try {
      const data = await appointmentService.updateAppointmentStatus(
        req.params.id,
        "abort",
        null,
        req.body.abortedReason,
        null,
       
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
  },

 

  acceptAppointmentByAdmin: async (req, res) => {
    try {
      const data = await appointmentService.updateAppointmentStatusByAdmin(
        req.params.id,
        "accept",
        new Date(),
        null,
        null
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
  },

  rejectAppointmentByAdmin: async (req, res) => {
    try {
      const data = await appointmentService.updateAppointmentStatusByAdmin(
        req.params.id,
        "reject",
        null,
        null,
        req.body.rejectedReason
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
  },
};

export default appointmentController;
