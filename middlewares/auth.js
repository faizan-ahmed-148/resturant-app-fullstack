const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");

exports.isAuthenticated = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({
        message: "Please login first",
      });
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded._id);

    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// admin role
exports.authorizeRole = (...roles) => {
  try {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return res.status(400).json({
          success: false,
          message: `Role: ${req.user.role} is not allowed to access this resouce`
        })
      }
      next()
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}