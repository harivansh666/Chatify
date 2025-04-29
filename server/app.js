import express from "express";
import { Server } from "socket.io";
import http from "http";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

//Configurations
dotenv.config();

// Database
import { mongoconnect } from "./config/db.connect.js";
mongoconnect();

// import middleware

//Routes
import authRoutes from "./routes/auth.route.js";
import messageRoute from "./routes/message.route.js";

// App Setup
const app = express();
const server = http.createServer(app);

// socket.io setup
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // frontend URL
    methods: ["GET", "POST"],
    credentials: true,
  },
});

//use middlewares
app.use(cookieParser());

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// routes
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoute);

// Socket.io Events
io.on("connection", (socket) => {
  console.log("a user connected socket id", socket.id);
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

// Server Start
server.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
