require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const http = require("http");
const { Server } = require("socket.io");

const connectDB = require("./config/db");

// =====================================================
// ROUTES
// =====================================================

const authRoutes = require("./routes/authRoutes");
const protectedRoutes = require("./routes/protectedRoutes");
const aiRoutes = require("./routes/aiRoutes");

// =====================================================
// SOCKET
// =====================================================

const queueSocket = require("./socket/queueSocket");

// =====================================================
// EXPRESS APP
// =====================================================

const app = express();

// =====================================================
// DATABASE
// =====================================================

connectDB();

// =====================================================
// MIDDLEWARE
// =====================================================

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use(helmet());

app.use(morgan("dev"));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// =====================================================
// API ROUTES
// =====================================================

// Authentication
app.use(
  "/api/auth",
  authRoutes
);

// Protected routes
app.use(
  "/api/protected",
  protectedRoutes
);

// AI routes
app.use(
  "/api/ai",
  aiRoutes
);

// =====================================================
// HOME API
// =====================================================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message:
      "AI Smart Hospital Queue Management System API Running 🚀",
    server: "Online",
    database: "MongoDB",
    socket: "Socket.IO Enabled",
  });
});

// =====================================================
// HEALTH CHECK
// =====================================================

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is healthy ❤️",
    timestamp: new Date(),
  });
});

// =====================================================
// CREATE HTTP SERVER
// =====================================================

const server = http.createServer(app);

// =====================================================
// SOCKET.IO SERVER
// =====================================================

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// =====================================================
// SOCKET.IO CONNECTION
// =====================================================

queueSocket(io);

// =====================================================
// SERVER START
// =====================================================

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log("");
  console.log("==============================================");
  console.log("🏥 AI SMART HOSPITAL QUEUE MANAGEMENT SYSTEM");
  console.log("==============================================");
  console.log(
    `🚀 Server running at: http://localhost:${PORT}`
  );
  console.log(
    `🏠 API Home: http://localhost:${PORT}/`
  );
  console.log(
    `❤️ Health Check: http://localhost:${PORT}/api/health`
  );
  console.log(
    `🔐 Register API: http://localhost:${PORT}/api/auth/register`
  );
  console.log(
    `🔑 Login API: http://localhost:${PORT}/api/auth/login`
  );
  console.log(
    `🤖 AI API: http://localhost:${PORT}/api/ai/predict-waiting-time`
  );
  console.log(
    `⚡ Socket.IO: Enabled`
  );
  console.log("==============================================");
  console.log("");
});

// =====================================================
// SERVER ERROR HANDLING
// =====================================================

server.on("error", (error) => {
  console.error(
    "❌ Server Error:",
    error.message
  );
});

// =====================================================
// PROCESS ERROR HANDLING
// =====================================================

process.on(
  "unhandledRejection",
  (error) => {
    console.error(
      "❌ Unhandled Promise Rejection:",
      error
    );
  }
);