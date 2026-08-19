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

// IMPORTANT:
// Actual file name is queuesocket.js
const queueSocket = require("./socket/queuesocket");

// =====================================================
// EXPRESS APP
// =====================================================

const app = express();

// =====================================================
// DATABASE
// =====================================================

connectDB();

// =====================================================
// CORS
// =====================================================

// In production, set FRONTEND_URL in Render.
// For local development, localhost:5173 remains supported.

const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
];

if (process.env.FRONTEND_URL) {
  allowedOrigins.push(
    process.env.FRONTEND_URL.replace(/\/$/, "")
  );
}

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests without an Origin header
      // such as server-to-server requests.
      if (!origin) {
        return callback(null, true);
      }

      const normalizedOrigin = origin.replace(/\/$/, "");

      if (allowedOrigins.includes(normalizedOrigin)) {
        return callback(null, true);
      }

      return callback(
        new Error("Not allowed by CORS")
      );
    },

    methods: [
      "GET",
      "POST",
      "PUT",
      "PATCH",
      "DELETE",
      "OPTIONS",
    ],

    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],

    credentials: true,
  })
);

// =====================================================
// GENERAL MIDDLEWARE
// =====================================================

app.use(helmet());

app.use(morgan("dev"));

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

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
    origin: (origin, callback) => {
      if (!origin) {
        return callback(null, true);
      }

      const normalizedOrigin = origin.replace(/\/$/, "");

      if (allowedOrigins.includes(normalizedOrigin)) {
        return callback(null, true);
      }

      return callback(
        new Error("Not allowed by Socket.IO CORS")
      );
    },

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

server.listen(
  PORT,
  "0.0.0.0",
  () => {
    console.log("");
    console.log(
      "=============================================="
    );
    console.log(
      "🏥 AI SMART HOSPITAL QUEUE MANAGEMENT SYSTEM"
    );
    console.log(
      "=============================================="
    );

    console.log(
      `🚀 Server running on port: ${PORT}`
    );

    console.log(
      `🏠 API Home: /`
    );

    console.log(
      `❤️ Health Check: /api/health`
    );

    console.log(
      `🔐 Register API: /api/auth/register`
    );

    console.log(
      `🔑 Login API: /api/auth/login`
    );

    console.log(
      `🤖 AI API: /api/ai/predict-waiting-time`
    );

    console.log(
      "⚡ Socket.IO: Enabled"
    );

    console.log(
      "=============================================="
    );

    console.log("");
  }
);

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