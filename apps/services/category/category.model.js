const knex = require("../../db/knex");

async function getAll() {
    const data = await knex
        .select()
        .from("categories");
    return data
}

async function createNewCategory(data_form) {
    const data = await knex("categories").insert(data_form);
    return data
}

async function checkCategoryExist(id_category) {
    const data = knex
        .select()
        .from("categories")
        .where("id_category", id_category);
    return data
}

async function deteleCategoryById(id_category) {
    const result = knex("categories")
        .where("id_category", id_category)
        .del()
    return result
}

module.exports = {
    checkCategoryExist,
    getAll,
    deteleCategoryById,
    createNewCategory
};
