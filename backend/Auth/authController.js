const User = require("../User/userModel");
const { StatusCodes } = require("http-status-codes");

const registerUser = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.createJWT();
  res
    .status(StatusCodes.CREATED)
    .json({ user: { username: user.username }, token });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide email and password." });

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    res.status(StatusCodes.BAD_REQUEST).json({ msg: "Invalid credentials..." });
  }

  const isPasswordCorrect = await user.comparePassword(password, user.password);

  if (!isPasswordCorrect) {
    res.status(StatusCodes.BAD_REQUEST).json({ msg: "Invalid credentials..." });
  }

  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ user: { username: user.username }, token });
};

module.exports = { registerUser, loginUser };
