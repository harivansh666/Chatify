import express from "express";
import { Server } from "socket.io";
import http from "http";
import dotenv from "dotenv";
import cors from "cors";

//Configurations
dotenv.config();

// Database
import { mongoconnect } from "./config/db.connect.js";
mongoconnect();

// import middleware


//Routes
import authRoutes from "./routes/auth.route.js";

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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/", authRoutes);

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
