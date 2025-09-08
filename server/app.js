import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

//Configurations
dotenv.config();
// Database
import { mongoconnect } from "./config/db.connect.js";
mongoconnect();

//Routes
import authRoutes from "./routes/auth.route.js";
import messageRoute from "./routes/message.route.js";
import { app, server } from "./config/socket.js";

app.use(cookieParser());

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// routes
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoute);

// Server Start
server.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
