import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import initAuthRoutes from "./routes/authRoutes.js";
import initBuildingRoutes from "./routes/buildingRoutes.js";
import initHouserRoutes from "./routes/houseRoutes.js";
import initWardRoutes from "./routes/wardRoutes.js";
import initUserRoutes from "./routes/userRoutes.js";
import initRoomRoutes from "./routes/roomRoutes.js";
import initAppointmentRoutes from "./routes/appointmentRoutes.js";
import initPaymentRoutes from "./routes/paymentRoutes.js";
import connection from "./config/connectDB.js";
import { createPaymentLink } from "./service/paymentService.js";

const app = express();
const PORT = process.env.PORT || 8888;

//config cors
const corsOptions = {
  origin: ["http://localhost:5173", "https://77-home-fe-e9ms.vercel.app"],
  credentials: true,
};

app.use(cors(corsOptions));

// Connect DB
connection();

//config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// config cookie-parser
app.use(cookieParser());

//  web routes
initAuthRoutes(app);
initBuildingRoutes(app);
initHouserRoutes(app);
initWardRoutes(app);
initUserRoutes(app);
initRoomRoutes(app);
initAppointmentRoutes(app);
initPaymentRoutes(app);

app.get("/hello", (req, res) => {
  res.send("Hello World");
});

// Error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

// 404 handler
app.use((req, res) => {
  return res.status(404).send("404 not found");
});

export default app;
