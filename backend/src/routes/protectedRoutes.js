const express = require("express");

const protect = require("../middleware/authmiddleware");
const allowRoles = require("../middleware/roleMiddleware");

const router = express.Router();

// =====================================================
// COMMON PROTECTED ROUTE
// =====================================================

router.get("/profile", protect, (req, res) => {
  res.status(200).json({
    success: true,s
    message: "Protected profile accessed successfully.",
    user: req.user,
  });
});

// =====================================================
// PATIENT ONLY
// =====================================================

router.get(
  "/patient",
  protect,
  allowRoles("patient"),
  (req, res) => {
    res.status(200).json({
      success: true,
      message: "Patient protected route accessed.",
      user: req.user,
    });
  }
);

// =====================================================
// DOCTOR ONLY
// =====================================================

router.get(
  "/doctor",
  protect,
  allowRoles("doctor"),
  (req, res) => {
    res.status(200).json({
      success: true,
      message: "Doctor protected route accessed.",
      user: req.user,
    });
  }
);

// =====================================================
// ADMIN ONLY
// =====================================================

router.get(
  "/admin",
  protect,
  allowRoles("admin"),
  (req, res) => {
    res.status(200).json({
      success: true,
      message: "Admin protected route accessed.",
      user: req.user,
    });
  }
);

module.exports = router;