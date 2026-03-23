const express = require("express")
const cors = require("cors");
import type { Request, Response } from "express";
import userRoutes from "./routes/user.routes"
import otpRoutes  from "./routes/otp.routes"
import path from  "path"


const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users",userRoutes)
app.use("/api/otp",otpRoutes)

app.get("/", (req:Request,res:Response) => {
  res.send("Res-Q API running ");
});

app.get("/emergency/:id", (req:Request, res:Response) => {
  res.sendFile("E:/Abhishek-IITP/ABHILIB/res-q/res-q-backend/index.html");
});
export default app;