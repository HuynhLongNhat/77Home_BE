require("dotenv").config();
import express from "express";

import initAuthRoutes from "./routes/authRoutes.js";
import initBuildingRoutes from "./routes/buildingRoutes.js";
import bodyParser from "body-parser";
import { configCors } from "./config/cors";
import cookieParser from "cookie-parser";
import connection from "./config/connectDB.js";

const app = express();
const PORT = process.env.PORT || 8888;

//config cors
configCors(app);
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
app.use((req, res) => {
  return res.send("404 not found");
});

app.listen(PORT, () => {
  console.log("77Home is running on the port =  " + PORT);
});
