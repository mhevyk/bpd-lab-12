const config = require("../config.js");
const APIError = require("../exceptions/APIError.js");
const jwt = require("jsonwebtoken");

module.exports = roles => {
  return (req, res, next) => {
    if (req.method === "OPTIONS") {
      return next();
    }

    try {
      const token = req.headers.authorization.split(" ")[1];
      if (!token) {
        return next(APIError.Forbidden());
      }

      const { roles: userRoles } = jwt.verify(token, config.JWT_SECRET);
      let hasRole = false;

      for (const role of userRoles) {
        if (roles.includes(role)) {
          hasRole = true;
          break;
        }
      }

      if (!hasRole) {
        return next(APIError.Forbidden(roles));
      }

      next();
    } catch {
      next(APIError.Forbidden());
    }
  };
};
