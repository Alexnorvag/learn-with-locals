const jwt = require("jsonwebtoken");
const config = require("../config/config");

module.exports = checkJwt = (req, res, next) => {
  //Get jwt token from the head
  const token = req.headers["auth"];

  let jwtPayload = null;

  try {
    jwtPayload = jwt.verify(token, config.jwtSecret);
    res.locals.jwtPayload = jwtPayload;
  } catch (error) {
    //If token is not valid, respond with 401 (Unauthorized)
    res.status(401).send();
    return;
  }

  // The token is valid for 1 hour
  // We want to send a new token every request
  const { userId, username } = jwtPayload;
  const newToken = jwt.sign({ userId, username }, config.jwtSecret, {
    expiresIn: "1h",
  });
  res.setHeader("token", newToken);

  next();
};
