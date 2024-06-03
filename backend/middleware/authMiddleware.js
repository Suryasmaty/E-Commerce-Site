const asyncHandler = require("./asyncHandler");
const AppError = require("./AppError");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("./../models/userModel");

//Protect routes
const protect = asyncHandler(async (req, res, next) => {
  console.log("req object", req.cookies);
  let token;

  //read the JWt from the cookie
  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      //   const decoded = await promisify(jwt.verify)(
      //     token,
      //     process.env.JWT_SECRET
      //   );

      req.user = await User.findById(decoded.userId).select("-password");

      next();
    } catch (error) {
      next(new AppError("not authorised, token failed", 401));
    }
  } else {
    return next(new AppError("Not authorized, no token", 401));
  }
});

//Admin middleware
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    next(new AppError("You are not allowed to do this action", 401));
  }
};

module.exports = { protect, admin };
