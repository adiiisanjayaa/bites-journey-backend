const { responseError, responseOk } = require("../../utils/response.helper");
const knex = require("../../db/knex");

// get all category
async function getAllCategory(req, res, _next) {
  let data = null;
  try {
    data = await knex.select().from("categories");
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

async function createCategory(req, res, _next) {
  let { title, description, image } = req.body;
  if (!(title && description && image)) {
    return res.status(400).json(responseError("Field cannot be empty!"));
  }

  let result;
  let data;
  try {
    data = {
      title: title,
      description: description,
      image: image,
      created_at: new Date(),
      updated_at: new Date(),
    };

    result = await knex("categories").insert(data);
  } catch (error) {
    console.log(error);
    return res.status(400).json(responseError("Failed to create categories"));
  }
  return res.status(200).json(responseOk("Success", data));
}

//delete by ID
async function deteleByID(req, res, _next) {
  const { id_category } = req.params;
  try {
    let exists = await knex
      .select()
      .from("categories")
      .where("id_category", id_category);
    console.log(exists);
    if (exists.length == 0) {
      return res.status(400).json(responseError("Category not found!"));
    }

    knex("categories")
      .where("id_category", id_category)
      .del()
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
