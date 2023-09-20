const { responseError, responseOk } = require("../../utils/response.helper");
const knex = require("../../db/knex");
const { JWT_SECRET } = require("../../configs/config");
const jwt = require("jsonwebtoken");

//get articles by username
async function getArticleByUID(req, res, _next) {
  const { uid_users } = req.params;

  let data = null;
  try {
    console.log(uid_users);
    data = await knex
      .from("articles")
      .join("users", "users.uid_users", "articles.uid_users")
      .select("articles.*", "users.*")
      .where("articles.uid_users", uid_users);
  } catch (error) {
    console.log(error);
    return res.status(500).json(responseError("Failed to get articles"));
  }

  if (data.length == 0) {
    return res.status(404).json(responseError("Article not found!"));
  } else {
    return res.status(200).json(responseOk("Success", data));
  }
}

// get all article
async function getAllArticle(req, res, _next) {
  let data = null;
  try {
    data = await knex
      .select("id_article", "title", "content", "image")
      .from("articles");
  } catch (error) {
    console.log(error);
    return res.status(500).json(responseError("Failed to get articles"));
  }

  if (data.length == 0) {
    return res.status(404).json(responseError("article not found!"));
  } else {
    return res.status(200).json(responseOk("Success", data));
  }
}

async function createArticle(req, res, _next) {
  let { title, content, id_categories } = req.body;
  if (!(title && content && id_categories)) {
    return res.status(400).json(responseError("Field cannot be empty!"));
  }

  let result;
  let data;
  try {
    const token = req.headers.authorization;
    let jwtPayload;
    try {
      console.log(token);
      jwtPayload = jwt.verify(token, JWT_SECRET);
      console.log(jwtPayload);
    } catch (re) {
      console.log(re);
    }

    data = {
      title: title,
      content: content,
      id_categories: id_categories,
      uid_users: jwtPayload.uid_users,
      created_at: new Date(),
      updated_at: new Date(),
    };

    result = await knex("articles").insert(data);
  } catch (error) {
    console.log(error);
    return res.status(400).json(responseError("Failed to create article"));
  }
  return res.status(200).json(responseOk("Success", data));
}

//update by article
// async function updateArticle(req, res, _next) {
//   const { username } = req.params;
//   const { name, email, phone, address } = req.body;
//   if (!(name && email && phone && address)) {
//     return res.status(400).json(responseError("Field cannot be empty!"));
//   }

//   let user;
//   let updatedData;
//   try {
//     let findUser = await knex
//       .select()
//       .from("users")
//       .where("username", username);
//     if (findUser == null) {
//       return res.status(404).json(responseError("User not found!"));
//     }
//     updatedData = {
//       name: name,
//       email: email,
//       phone: phone,
//       address: address,
//       updated_at: new Date(),
//     };
//     user = await knex("users").where("username", username).update(updatedData);
//   } catch (error) {
//     console.log(error);
//     return res.status(400).json(responseError("Failed to update user"));
//   }
//   res.clearCookie("accessToken");
//   return res.status(200).json(responseOk("Success", updatedData));
// }

//delete by ID
async function deteleByID(req, res, _next) {
  const { id_article } = req.params;
  let data;
  try {
    let exists = await knex
      .select()
      .from("articles")
      .where("id_article", id_article);
    console.log(exists);
    if (exists.length == 0) {
      return res.status(400).json(responseError("Article not found!"));
    }

    knex("articles")
      .where("id_article", id_article)
      .del()
      .then(function () {
        return res
          .status(200)
          .json(
            responseOk("Success", "Deleted article with ID: " + id_article)
          );
      });
  } catch (error) {
    return res.status(500).json(responseError("Failed to delete article"));
  }
}

module.exports = {
  getArticleByUID,
  getAllArticle,
  createArticle,
  deteleByID,
};
