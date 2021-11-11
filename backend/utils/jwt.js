const jwt = require("jsonwebtoken");

const createUserToken = (user) => {
  return {
    userId: user._id,
    name: user.name,
    username: user.username,
    email: user.email,
    role: user.role,
  };
};

const createJWT = ({ payload }) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET);
  return token;
};

const attachCookieToResponse = ({ res, user }) => {
  // Create JWT Token
  const token = createJWT({ payload: user });

  // Options for Cookie
  const oneDay = 1000 * 60 * 60 * 24;

  const options = {
    expires: new Date(Date.now() + process.env.JWT_LIFETIME * oneDay),
    httpOnly: true,
    signed: true,
  };

  res.cookie("token", token, options);

  //   res.cookie("token", token, {
  //     httpOnly: true,
  //     expires: new Date(Date.now() + oneDay),
  //     secure: process.env.NODE_ENV === "production",
  //     signed: true,
  //   });
};

module.exports = { attachCookieToResponse, createUserToken };
