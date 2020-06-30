const jwt = require("jsonwebtoken");
const secret = require("../secret");

module.exports = (role) => (req, res, next) => {
  if (!req.headers.authorization) {
    res.status(401).json({
      message: "No token provided",
    });
  }
  const token = req.headers.authorization.split(" ")[1];

  if (token) {
    jwt.verify(token, secret, (err, payload) => {
      if (err) {
        res.status(401).json(err);
      } else {
        if (payload.role === role) {
          next();
        } else {
          res.status(403).json({
            message: "You are not allowed to access this",
          });
        }
      }
    });
  } else {
    res.status(401).json({
      message: "No token provided",
    });
  }
};
