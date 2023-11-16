const config = require("../config.js");
const APIError = require("../exceptions/APIError.js");
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return next(APIError.Unauthorized());
    }

    const decodedData = jwt.verify(token, config.JWT_SECRET);

    req.user = decodedData;
    next();
  } catch {
    next(APIError.Unauthorized());
  }
};
