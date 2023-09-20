const express = require("express");
const router = express.Router();
const { API_PATH } = require("../../configs/config");
const { login, register } = require("./auth.controller");

// USER PATH
const AUTH_PATH_V1 = `${API_PATH}/v1/auth`;

router.get(`${AUTH_PATH_V1}/ping`, (req, res) => {
  res.status(200).json({ ping: "OK" });
});

router.post(`${AUTH_PATH_V1}/login`, login);
router.post(`${AUTH_PATH_V1}/register`, register);

module.exports = router;
