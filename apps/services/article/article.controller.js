const { responseError, responseOk } = require("../../utils/response.helper");
const { JWT_SECRET } = require("../../configs/config");
const jwt = require("jsonwebtoken");
const { uploadArticleImageHelper } = require("../../upload_file_helper");
const articleModel = require('./article.model');

//get articles by username
async function getArticleByUID(req, res, _next) {
  const { uid_users } = req.params;

  let data = null;
  try {
    console.log(uid_users);
    data = await articleModel.getAllArticleByUID(uid_users)
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

//get articles by username
async function getArticleByID(req, res, _next) {
  const { id } = req.params;

  let data = null;
  try {
    console.log(id);
    data = await articleModel.getAllArticleByID(id)
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
    data = await articleModel.getAllArticle()
  } catch (errorAlert) {
    console.log(errorAlert);
    return res.status(500).json(responseError("Failed to get articles"));
  }

  if (data.length == 0) {
    return res.status(404).json(responseError("article not found!"));
  } else {
    return res.status(200).json(responseOk("Success", data));
  }
}

async function createArticle(req, res, _next) {
  return uploadArticleImageHelper(req, res, async function (err) {
    if (err) {
      // A Multer error occurred when uploading.
      if (err.toString().includes("cannot be empty")) {
        return res.status(400).json(responseError("All field must be filled"));
      }
      if (err.toString().includes("supports")) {
        return res.status(400).json(responseError("File not support"));
      }
      return res.status(400).send(err);
    }
    if (!req.file) {
      return res.status(400).json(responseError("All field must be filled"));
    }
    console.log(req.file);
    console.log(req.body);
    let { title, content, id_categories } = req.body;
    let result;
    let data;
    let filename;
    filename = req.file.filename;

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
      const arrCategory = id_categories.split(",").map(Number);

      data = {
        title: title,
        content: content,
        id_categories: arrCategory,
        uid_users: jwtPayload.uid_users,
        image: filename,
        created_at: new Date(),
        updated_at: new Date(),
      };

      result = await articleModel.createArticle(data)
    } catch (error) {
      console.log(error);
      return res.status(400).json(responseError("Failed to create article",error));
    }
    return res.status(200).json(responseOk("Success", data));
  });
}

//update by article
async function updateArticle(req, res, _next) {
  return uploadArticleImageHelper(req, res, async function (err) {
    if (err) {
      // Handle any upload errors here.
      if (err.toString().includes("cannot be empty")) {
        return res.status(400).json(responseError("All field must be filled"));
      }
      if (err.toString().includes("supports")) {
        return res.status(400).json(responseError("File not supported"));
      }
      return res.status(400).send(err);
    }
    
    // Check if the article ID is provided in the request.
    const articleId = req.params.articleId; // Assuming you pass the article ID as a parameter.
    
    if (!articleId) {
      return res.status(400).json(responseError("Article ID is required"));
    }
    
    console.log(req.file);
    console.log(req.body);
    let { title, content, id_categories } = req.body;
    let filename = req.file ? req.file.filename : undefined;

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
      let arrCategory;

    if (id_categories) {
        arrCategory = id_categories
        .split(",")
        .map(Number);
    } else {
      // Atur arrCategory ke nilai default atau empty array sesuai kebutuhan Anda.
      arrCategory = []; // Misalnya, jika id_categories tidak diberikan, kita menganggapnya sebagai array kosong.
    }
      // Check if the article with the given ID exists in the database.
      const existingArticle = await articleModel.getAllArticleByID(articleId)

      if (!existingArticle) {
        return res.status(404).json(responseError("Article not found"));
      }

      // If the request data is empty, use the existing data.
      if (!title) {
        title = existingArticle.title;
      }
      if (!content) {
        content = existingArticle.content;
      }
      if (!arrCategory || arrCategory.length === 0) {
        arrCategory = existingArticle.id_categories;
      }

      const data = {
        title: title,
        content: content,
        id_categories: arrCategory,
        image: filename || existingArticle.image, // Use the existing image if not provided.
        updated_at: new Date(),
      };

      // Assuming you have a function to update the article in your database.
      const result = await articleModel.editArticle(articleId, data);
      
      if (result) {
        return res.status(200).json(responseOk("Article updated successfully", data));
      } else {
        return res.status(403).json(responseError("You don't have permission to edit this article"));
      }
    } catch (error) {
      console.log(error);
      return res.status(400).json(responseError("Failed to edit article", error));
    }
  });
}

//delete by ID
async function deletedByID(req, res, _next) {
  const { id_article } = req.params;
  let data;
  try {
    let exists = await articleModel.getAllArticleByID(id_article);

    if (exists.length === 0) {
      return res.status(400).json(responseError("Article not found!"));
    }

    await articleModel.deleteArticleById(id_article); // Tambahkan await di sini

    return res.status(200).json(
      responseOk("Success", "Deleted article with ID: " + id_article)
    );
  } catch (error) {
    console.error("Failed to delete article:", error);
    return res.status(500).json(responseError("Failed to delete article"));
  }
}


module.exports = {
  getArticleByUID,
  getAllArticle,
  createArticle,
  getArticleByID,
  updateArticle,deletedByID
};
