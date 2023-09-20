const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../configs/config");
const { responseError } = require("../utils/response.helper");

const checkJwt = (req, res, next) => {
  //Get the jwt token from the head
  const token = req.headers.authorization;
  let jwtPayload;

  //Try to validate the token and get data
  try {
    jwtPayload = jwt.verify(token, JWT_SECRET);
    res.locals.jwtPayload = jwtPayload;
  } catch (error) {
    console.log(error);
    //If token is not valid, respond with 401 (unauthorized)
    res.status(401).json(responseError("Unauthorized!"));
    return;
  }

  //The token is valid for 1 hour
  //We want to send a new token on every request
  const { uid_users, username } = jwtPayload;
  const newToken = jwt.sign({ uid_users, username }, JWT_SECRET, {
    expiresIn: "24h",
  });
  res.setHeader("token", newToken);

  //Call the next middleware or controller
  next();
};

module.exports = {
  checkJwt,
};
