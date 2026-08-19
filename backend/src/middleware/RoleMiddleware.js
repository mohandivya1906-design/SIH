// =====================================================
// ROLE AUTHORIZATION MIDDLEWARE
// =====================================================

const allowRoles = (...allowedRoles) => {
  return (req, res, next) => {

    // User must be authenticated first
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    // -------------------------------------------------
    // Check User Role
    // -------------------------------------------------

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Access denied. You are not authorized.",
      });
    }

    next();
  };
};

module.exports = allowRoles;