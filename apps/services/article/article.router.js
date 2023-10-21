const express = require("express");
const router = express.Router();
const { API_PATH } = require("../../configs/config");
const { checkJwt } = require("../../middlewares/checkJwt");
const {
  getArticleByUID,
  getAllArticle,
  createArticle,
  deteleByID,
  getArticleByID,
} = require("./article.controller");
const { verifyUser } = require("../../middlewares/verify_user");

// USER PATH
const ARTICLE_PATH_V1 = `${API_PATH}/v1/article`;

router.get(`${ARTICLE_PATH_V1}/ping`, (_req, res) => {
  res.status(200).json({ ping: "OK" });
});

router.get(`${ARTICLE_PATH_V1}/`, getAllArticle);
router.get(`${ARTICLE_PATH_V1}/:uid_users`, getArticleByUID);
router.get(`${ARTICLE_PATH_V1}/id/:id`, getArticleByID);
router.post(`${ARTICLE_PATH_V1}/create`, checkJwt, createArticle);
// router.put(`${USER_PATH_V1}/update/:username`, updateByUsername);
router.delete(`${ARTICLE_PATH_V1}/delete/:id_article`, deteleByID);

module.exports = router;
