const User = require("../User/userModel");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const { createUserToken, attachCookieToResponse } = require("../utils/jwt");

const registerUser = async (req, res) => {
  const { email, name, username, password } = req.body;
  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    throw new CustomError.BadRequestError("Email already exists");
  }

  const user = await User.create({
    name,
    username,
    email,
    password,
  });

  res
    .status(StatusCodes.CREATED)
    .json({ msg: "You have been successfully registered." });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new CustomError.BadRequestError("Please provide email and password");
  }
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new CustomError.UnauthenticatedError("Invalid Credentials");
  }
  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError("Invalid Credentials");
  }
  // const userToken = user.createJWT();
  const userToken = createUserToken(user);

  attachCookieToResponse({ res, user: userToken });
  res.status(StatusCodes.OK).json({ user: userToken });
};

const logoutUser = async (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: "User logged out!" });
};
module.exports = { registerUser, loginUser, logoutUser };
