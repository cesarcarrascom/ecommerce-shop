const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");

const isAuthenticated = async (req, res, next) => {
  // Check header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json("You are not authenticated...");
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // Attach the user to the request
    req.user = { userId: payload.userId, isAdmin: payload.isAdmin };
    next();
  } catch (error) {
    return res.status(StatusCodes.FORBIDDEN).json("Token is not valid...");
  }
};

const isAuthenticatedAndAuthorized = (req, res, next) => {
  isAuthenticated(req, res, () => {
    if (req.user.userId === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res
        .status(StatusCodes.FORBIDDEN)
        .json("You are not allowed in this route.");
    }
  });
};

const isAuthenticatedAndAdmin = (req, res, next) => {
  isAuthenticated(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res
        .status(StatusCodes.FORBIDDEN)
        .json("You are not allowed in this route.");
    }
  });
};

module.exports = {
  isAuthenticated,
  isAuthenticatedAndAuthorized,
  isAuthenticatedAndAdmin,
};
