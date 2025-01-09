require("dotenv").config();
import express from "express";

import initAuthRoutes from "./routes/authRoutes.js";
import initBuildingRoutes from "./routes/buildingRoutes.js";
import initHouserRoutes from "./routes/houseRoutes.js";
import initWardRoutes from "./routes/wardRoutes.js";
import initUserRoutes from "./routes/userRoutes.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import connection from "./config/connectDB.js";
import initRoomRoutes from "./routes/roomRoutes.js";
import initAppointmentRoutes from "./routes/appointmentRoutes.js";
import { createPaymentLink } from "./service/paymentService.js";
const cors = require("cors");
import initPaymentRoutes from "./routes/paymentRoutes.js";
const app = express();
const PORT = process.env.PORT || 8888;

//config cors
const corsOptions = {
  origin: ["http://localhost:5173", "https://77-home-fe-e9ms.vercel.app"],
  credentials: true,
};

app.use(cors(corsOptions));
// config view engine
connection();
//config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// test connection db
// connection();

// config cookie-parser
app.use(cookieParser());

//  web routes;
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
app.use((req, res) => {
  return res.send("404 not found");
});

app.listen(PORT, () => {
  console.log("77Home is running on the port =  " + PORT);
});
