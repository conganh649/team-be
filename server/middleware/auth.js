const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(403).send("A token is required for authorization");
    }
    jwt.verify(authorization, process.env.TOKEN_SECRET);
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;
