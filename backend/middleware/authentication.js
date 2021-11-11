const jwt = require("jsonwebtoken");
const CustomError = require("../errors");
const { attachCookiesToResponse } = require("../utils/jwt");
const { StatusCodes } = require("http-status-codes");
const { authenticateUser } = require("./full-auth");

const isAuthenticated = async (req, res, next) => {
  /*
    OLD WAY OF AUTHENTICATION
  */
  // Check header
  // const authHeader = req.headers.authorization;
  // if (!authHeader || !authHeader.startsWith("Bearer ")) {
  //   return res
  //     .status(StatusCodes.UNAUTHORIZED)
  //     .json("You are not authenticated...");
  // }
  // const token = authHeader.split(" ")[1];
  // try {
  //   const payload = jwt.verify(token, process.env.JWT_SECRET);
  //   // Attach the user to the request
  //   req.user = { userId: payload.userId, isAdmin: payload.isAdmin };
  //   next();
  // } catch (error) {
  //   return res.status(StatusCodes.FORBIDDEN).json("Token is not valid...");
  // }
  const { token } = req.signedCookies;

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch (error) {
    throw new CustomError.UnauthenticatedError("Authentication Invalid");
  }
};

const isAuthorized = (req, res, next) => {
  if (req.user.userId !== req.params.id) {
    throw new CustomError.UnauthorizedError(
      "Unauthorized to access this route"
    );
  }
  next();
};

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new CustomError.UnauthorizedError(
        "Unauthorized to access this route"
      );
    }
    next();
  };
};

module.exports = {
  isAuthenticated,
  isAuthorized,
  authorizeRoles,
};
