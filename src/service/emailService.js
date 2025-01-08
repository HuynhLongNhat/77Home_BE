import nodemailer from "nodemailer";
require("dotenv").config();

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // Verify connection configuration
    this.transporter.verify((error, success) => {
      if (error) {
        console.error("SMTP Verification Error:", error);
      } else {
        console.log("SMTP server is ready to take messages");
      }
    });
  }

  async sendEmail(to, subject, html) {
    try {
      console.log("Email Configuration:", {
        from: process.env.SMTP_USER,
        to: to,
        subject: subject,
      });

      const mailOptions = {
        from: process.env.SMTP_USER,
        to: to,
        subject: subject,
        html: html,
      };

      const info = await this.transporter.sendMail(mailOptions);
      console.log("Email sent successfully:", info.messageId);
      return info;
    } catch (error) {
      console.error("Detailed email error:", {
        code: error.code,
        response: error.response,
        responseCode: error.responseCode,
        command: error.command,
      });
      throw new Error(`Failed to send email: ${error.message}`);
    }
  }

  async sendAppointmentConfirmation(userEmail, appointmentDetails) {
    const html = `
      <h2>Xác nhận đặt lịch thành công</h2>
      <p>Kính gửi quý khách,</p>
      <p>Lịch hẹn của quý khách đã được đặt thành công với các thông tin sau:</p>
      <ul>
        <li>Ngày: ${appointmentDetails.date}</li>
        <li>Thời gian: ${appointmentDetails.time}</li>
        <li>Phòng: ${appointmentDetails.roomName}</li>
        <li>Địa chỉ: ${appointmentDetails.address}</li>
      </ul>
      <p>Vui lòng chờ chủ nhà xác nhận lịch hẹn.</p>
      <p>Cảm ơn quý khách đã sử dụng dịch vụ của chúng tôi!</p>
    `;

    return this.sendEmail(userEmail, "Xác nhận đặt lịch thành công", html);
  }

  async sendAppointmentAcceptance(userEmail, appointmentDetails) {
    const html = `
      <h2>Thông báo chấp nhận lịch hẹn</h2>
      <p>Kính gửi quý khách,</p>
      <p>Chúng tôi vui mừng thông báo lịch hẹn của quý khách đã được chấp nhận:</p>
      <ul>
        <li>Ngày: ${appointmentDetails.date}</li>
        <li>Thời gian: ${appointmentDetails.time}</li>
        <li>Phòng: ${appointmentDetails.roomName}</li>
        <li>Địa chỉ: ${appointmentDetails.address}</li>
      </ul>
      <p>Vui lòng đến đúng giờ theo lịch hẹn.</p>
      <p>Xin cảm ơn!</p>
    `;

    return this.sendEmail(userEmail, "Lịch hẹn đã được chấp nhận", html);
  }

  async sendAppointmentRejection(userEmail, appointmentDetails, reason) {
    const html = `
      <h2>Thông báo từ chối lịch hẹn</h2>
      <p>Kính gửi quý khách,</p>
      <p>Rất tiếc, lịch hẹn của quý khách đã bị từ chối:</p>
      <ul>
        <li>Ngày: ${appointmentDetails.date}</li>
        <li>Thời gian: ${appointmentDetails.time}</li>
        <li>Phòng: ${appointmentDetails.roomName}</li>
      </ul>
      <p>Lý do: ${reason}</p>
      <p>Quý khách có thể đặt lịch hẹn khác hoặc liên hệ với chúng tôi để được hỗ trợ.</p>
      <p>Xin cảm ơn!</p>
    `;

    return this.sendEmail(userEmail, "Thông báo từ chối lịch hẹn", html);
  }

  async sendAppointmentCancellation(userEmail, appointmentDetails, reason) {
    const html = `
      <h2>Xác nhận hủy lịch hẹn</h2>
      <p>Kính gửi quý khách,</p>
      <p>Lịch hẹn của quý khách đã được hủy thành công:</p>
      <ul>
        <li>Ngày: ${appointmentDetails.date}</li>
        <li>Thời gian: ${appointmentDetails.time}</li>
        <li>Phòng: ${appointmentDetails.roomName}</li>
        <li>Địa chỉ: ${appointmentDetails.address}</li>
      </ul>
      ${reason ? `<p>Lý do: ${reason}</p>` : ""}
      <p>Quý khách có thể đặt lịch hẹn mới khi cần.</p>
      <p>Xin cảm ơn!</p>
    `;

    return this.sendEmail(userEmail, "Xác nhận hủy lịch hẹn", html);
  }
}

export default new EmailService();
