const express = require("express");
const router = express.Router();
const { API_PATH } = require("../../configs/config");
const { checkJwt } = require("../../middlewares/checkJwt");
const {
  getByUsername,
  updateByUsername,
  deteleByUsername,
  getAllUser,
  updateByID,
} = require("./user.controller");

// USER PATH
const USER_PATH_V1 = `${API_PATH}/v1/user`;

router.get(`${USER_PATH_V1}/ping`, (_req, res) => {
  res.status(200).json({ ping: "OK" });
});

router.get(`${USER_PATH_V1}/`, checkJwt, getAllUser);
router.get(`${USER_PATH_V1}/:username`, checkJwt, getByUsername);
router.put(`${USER_PATH_V1}/update/:id`, updateByID);
router.delete(`${USER_PATH_V1}/delete/:username`, deteleByUsername);

module.exports = router;
