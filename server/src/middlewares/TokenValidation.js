const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeaders = req.headers.authorization;

  if (!authHeaders) {
    throw new Error("Token validation: missing authorization headers");
  }

  if (!authHeaders.startsWith("Bearer")) {
    throw new Error("Token validation: wrong authorization headers");
  }

  jwt.verify(
    authHeaders.split(" ")[1],
    process.env.ACCESS_TOKEN_SECRET,
    (error, decoded) => {
      if (error) {
        throw new Error("Token validation: wrong or expiring token!");
      }

      req.user = decoded.user;
      next();
    }
  );
};
