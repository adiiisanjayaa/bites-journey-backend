const { responseError, responseOk } = require("../../utils/response.helper");
const knex = require("../../db/knex");
const { uploadCategoryImageHelper } = require("../../upload_file_helper");
const { checkCategoryExist ,createNewCategory,deteleCategoryById,getAll} = require("./category.model");

// get all category
async function getAllCategory(req, res, _next) {
  let data = null;
  try {
    data = await getAll()
  } catch (error) {
    console.log(error);
    return res.status(500).json(responseError("Failed to get category"));
  }

  if (data.length == 0) {
    return res.status(404).json(responseError("category not found!"));
  } else {
    return res.status(200).json(responseOk("Success", data));
  }
}

async function createCategory(req, res) {
  return uploadCategoryImageHelper(req, res, async function (err) {
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
    console.log("filename", req.file);
    console.log(req.body);
    let { title, description } = req.body;
    let result;
    let data;
    let filename;
    filename = req.file.filename;
    try {
      data = {
        title: title,
        description: description,
        image: filename,
        created_at: new Date(),
        updated_at: new Date(),
      };
      result = await createNewCategory(data)
    } catch (error) {
      console.log(error);
      return res.status(400).json(responseError("Failed to create categories"));
    }
    return res.status(200).json(responseOk("Success", data));
  });
}

//delete by ID
async function deteleByID(req, res, _next) {
  const { id_category } = req.params;
  try {
    let exists = await checkCategoryExist(id_category)
    console.log(exists);
    if (exists.length == 0) {
      return res.status(400).json(responseError("Category not found!"));
    }

   deteleCategoryById(id_category)
      .then(function () {
        return res
          .status(200)
          .json(
            responseOk("Success", "Deleted category with ID: " + id_category)
          );
      });
  } catch (error) {
    return res.status(500).json(responseError("Failed to delete category"));
  }
}

module.exports = {
  getAllCategory,
  deteleByID,
  createCategory,
};
