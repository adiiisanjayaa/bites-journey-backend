const express = require("express");
const router = express.Router();
const { API_PATH } = require("../../configs/config");
const { checkJwt } = require("../../middlewares/checkJwt");
const {
  getAllCategory,
  createCategory,
  deteleByID,
} = require("./category.controller");

// USER PATH
const CATEGORY_PATH_V1 = `${API_PATH}/v1/category`;

router.get(`${CATEGORY_PATH_V1}/ping`, (_req, res) => {
  res.status(200).json({ ping: "OK" });
});

router.get(`${CATEGORY_PATH_V1}/`, getAllCategory);
router.post(`${CATEGORY_PATH_V1}/create`, checkJwt, createCategory);
// router.put(`${USER_PATH_V1}/update/:username`, updateByUsername);
router.delete(`${CATEGORY_PATH_V1}/delete/:id_category`, deteleByID);

module.exports = router;
