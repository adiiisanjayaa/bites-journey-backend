const { responseError, responseOk } = require("../../utils/response.helper");
const knex = require("../../db/knex");
const { checkUserExist } = require("../auth/auth.model");
const { getAll ,deteleByUser,getByuser,updateByUser, checkUser} = require("./user.model");

//get user by username
async function getByUsername(req, res, _next) {
  const { username } = req.params;

  let user = null;
  try {
    user = await getByuser(username)
  } catch (error) {
    return res.status(500).json(responseError("Failed to get users"));
  }

  if (user.length == 0) {
    return res.status(404).json(responseError("User not found!"));
  } else {
    delete user[0]["password"];
    const finalUser = user[0];
    return res.status(200).json(responseOk("Success", finalUser));
  }
}

async function getAllUser(req, res, _next) {
  let user = null;
  try {
    user = await getAll()
  } catch (error) {
    console.log(error);
    return res.status(500).json(responseError("Failed to get users"));
  }

  if (user.length == 0) {
    return res.status(404).json(responseError("User not found!"));
  } else {
    return res.status(200).json(responseOk("Success", user));
  }
}

//update by username
async function updateByID(req, res, _next) {
  const { id } = req.params;
  const { name, email, phone, address } = req.body;
  if (!(name && email && phone && address)) {
    return res.status(400).json(responseError("Field cannot be empty!"));
  }

  let user;
  let updatedData;
  try {
    let findUser = await checkUser(id)
    if (findUser == null) {
      return res.status(404).json(responseError("User not found!"));
    }
    updatedData = {
      name: name,
      email: email,
      phone: phone,
      address: address,
      updated_at: new Date(),
    };
    user = await updateByUser(id,updatedData)
  } catch (error) {
    console.log(error);
    return res.status(400).json(responseError("Failed to update user"));
  }
  res.clearCookie("accessToken");
  return res.status(200).json(responseOk("Success", updatedData));
}

//delete by username
async function deteleByUsername(req, res, _next) {
  const { username } = req.params;
  let user;
  try {
    let exists = await checkUserExist(username)
    console.log(exists);
    if (exists.length == 0) {
      return res.status(400).json(responseError("User not found!"));
    }

    if (exists[0].username === username) {
      deteleByUser(username)
        .then(function () {
          return res
            .status(200)
            .json(responseOk("Success", "Deleted username " + username));
        });
    } else {
      return res.status(500).json(responseError("Failed to delete user"));
    }
  } catch (error) {
    return res.status(500).json(responseError("Failed to delete user"));
  }
  res.clearCookie("accessToken");
}

module.exports = {
  getByUsername,
  updateByID,
  deteleByUsername,
  getAllUser,
};
