const express = require("express");
const router = express.Router();

// Test Route
router.post("/register", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Register API Working",
  });
});

module.exports = router;