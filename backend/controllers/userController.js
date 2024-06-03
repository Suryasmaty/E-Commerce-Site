const asyncHandler = require("./../middleware/asyncHandler");
const User = require("./../models/userModel");
const AppError = require("./../middleware/AppError");
const jwt = require("jsonwebtoken");
const generateToken = require("./../utils/generateToken");

// @desc    Auth user & get token
// @route   GET /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });
  if (user && (await user.matchPassword(password))) {
    //generating the token
    generateToken(res, user._id);

    return res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    return next(new AppError("Invalid email or password", 401));
  }
  //res.send("user not found");
});

// @desc    Register user
// @route   POST /api/users/
// @access  Private
const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    next(new AppError("user already exists", 400));
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    next(new AppError("Invalid user data", 400));
  }
});

// @desc    Logout user/clear cookie
// @route   POST /api/users/
// @access  Private
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    expires: new Date(0), // Set the expiration date to the past
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Add secure flag if in production
    sameSite: "strict", // Adjust sameSite setting if needed
  });
  res.status(200).send({ message: "Logged out successfully" });
});
// const logoutUser = asyncHandler(async (req, res) => {
//   res.cookie("jwt", "", {
//     expires: new Date(Date.now() + 10 * 1000),
//     httpOnly: true,
//   });
// res.cookie("jwt", "", {
//   httpOnly: true,
//   secure: process.env.NODE_ENV === "production", // Ensure the cookie is only sent over HTTPS in production
//   sameSite: "Strict", // Prevents the browser from sending this cookie along with cross-site requests
//   expires: new Date(0),
// });
//   res.status(200).json({ message: "Logged out successfully" });
// });

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    next(new AppError("User no found", 404));
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    next(new AppError("User not found", 404));
  }
});

// @desc    Get users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  res.send("get users");
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  res.send("get user by ID");
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  res.send("delete user by ID");
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUserById = asyncHandler(async (req, res) => {
  res.send("update user by ID");
});

module.exports = {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUserById,
};
