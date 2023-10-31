const { responseError, responseOk } = require("../../utils/response.helper");
const knex = require("../../db/knex");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../configs/config");
const {
  hashPassword,
  checkIfUnencryptedPasswordIsValid,
} = require("../../utils/helpers");
const { loginModel, registeModel, checkUserExist } = require("./auth.model");

//login
async function login(req, res, next) {
  const { username, password } = req.body;
  if (!(username && password)) {
    return res
      .status(400)
      .json(responseError("Username and password must be field"));
  }

  let user = null;
  try {
    user = await loginModel(username)
    console.log(user);
  } catch (error) {
    return res.status(500).json(responseError("Failed to login"));
  }
  if (user.length == 0) {
    return res.status(404).json(responseError("User not found!"));
  } else {
    console.log(user);
    //Check if encrypted password match
    if (!checkIfUnencryptedPasswordIsValid(user[0].password, password)) {
      return res.status(400).json(responseError("Incorrect password!"));
    }

    //sign JWT, valid for 1 hour
    const token = jwt.sign(
      { uid_users: user[0].uid_users, username: user[0].username },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    await res.cookie("accessToken", token, {
      expires: new Date(Date.now() + 8 * 3600000),
    });

    // delete password before return
    delete user[0]["password"];
    //Send the jwt in the response
    return res
      .status(200)
      .json(responseOk("Success", { token: token, user: user }));
  }
}

//register
async function register(req, res, next) {
  let { username, password, name, email } = req.body;
  if (!(name && username && password && email)) {
    return res.status(400).json(responseError("Field cannot be empty!"));
  }

  let user;
  let dataUser;
  try {
    let findUser = await checkUserExist(username)
    console.log(findUser);
    if (findUser.length > 0) {
      return res.status(400).json(responseError("User already registered"));
    }

    dataUser = {
      username: username,
      password: hashPassword(password),
      name: name,
      email: email,
      phone: "",
      address: "",
      created_at: new Date(),
      updated_at: new Date(),
    };

    user = await registeModel(dataUser)
  } catch (error) {
    console.log(error);
    return res.status(400).json(responseError("Failed to register user"));
  }
  res.clearCookie("accessToken");
  delete dataUser["password"];
  return res.status(200).json(responseOk("Success", dataUser));
}

module.exports = {
  login,
  register,
};
