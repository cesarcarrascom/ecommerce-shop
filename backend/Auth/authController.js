const User = require("../User/userModel");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

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
  // const { email, password } = req.body;

  // // try {
  // if (!email || !password) {
  //   res
  //     .status(StatusCodes.BAD_REQUEST)
  //     .json({ msg: "Email and password can not be empty." });
  // }
  // // const user = await User.findOne({ email }).select("+password");
  // const user = await User.findOne({ email });

  // if (!user) {
  //   res.status(StatusCodes.BAD_REQUEST).json({ msg: "Invalid credentials..." });
  // }

  // const isPasswordCorrect = await user.comparePassword(password);
  // console.log(user.password);
  // if (!isPasswordCorrect) {
  //   res.status(StatusCodes.BAD_REQUEST).json({ msg: "Invalid credentials..." });
  // }

  // res.status(StatusCodes.OK).json({ user, token });
  // } catch (error) {
  //   res
  //     .status(StatusCodes.BAD_REQUEST)
  //     .json({ msg: "Something wrong happened... Try again later." });
  // }

  const { email, password } = req.body;

  if (!email || !password) {
    throw new CustomError.BadRequestError("Please provide email and password");
  }
  const user = await User.findOne({ email });

  if (!user) {
    throw new CustomError.UnauthenticatedError("Invalid Credentials");
  }
  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError("Invalid Credentials");
  }
  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ user: user.id, token });
};

module.exports = { registerUser, loginUser };
