const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../configs/config");
const { responseError } = require("../utils/response.helper");

const verifyUser = (req, res, next) => {
  //Get the jwt token from the head
  const token = req.headers.authorization;
  let jwtPayload;
  const { uid_users } = req.params;

  //Try to validate the token and get data
  try {
    jwtPayload = jwt.verify(token, JWT_SECRET);
    console.log(uid_users);
    console.log("user id from verify: ", jwtPayload.uid_users);
    if (jwtPayload.uid_users !== uid_users) {
      res.status(403).json(responseError("Forbidden!"));
      return;
    }
    res.locals.jwtPayload = jwtPayload;
  } catch (error) {
    //If token is not valid, respond with 401 (unauthorized)
    res.status(401).json(responseError("Unauthorized!"));
    return;
  }

  //Call the next middleware or controller
  next();
};

module.exports = {
  verifyUser,
};
