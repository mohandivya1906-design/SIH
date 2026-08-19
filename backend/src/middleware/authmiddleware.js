const jwt = require("jsonwebtoken");
const User = require("../models/User");

// =====================================================
// AUTHENTICATION MIDDLEWARE
// =====================================================

const protect = async (req, res, next) => {
  try {
    // -------------------------------------------------
    // Get Authorization Header
    // -------------------------------------------------

    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Authentication required. Please login.",
      });
    }

    // -------------------------------------------------
    // Check Bearer Token
    // -------------------------------------------------

    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Invalid authorization format.",
      });
    }

    // -------------------------------------------------
    // Extract Token
    // -------------------------------------------------

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token not found.",
      });
    }

    // -------------------------------------------------
    // Verify JWT
    // -------------------------------------------------

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // -------------------------------------------------
    // Find User
    // -------------------------------------------------

    const user = await User.findById(decoded.id).select(
      "-password"
    );

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User no longer exists.",
      });
    }

    // -------------------------------------------------
    // Attach User To Request
    // -------------------------------------------------

    req.user = user;

    next();

  } catch (error) {
    console.error("Auth Middleware Error:", error.message);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Session expired. Please login again.",
      });
    }

    return res.status(401).json({
      success: false,
      message: "Invalid authentication token.",
    });
  }
};

module.exports = protect;