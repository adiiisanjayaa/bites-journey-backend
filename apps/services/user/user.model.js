const knex = require("../../db/knex");

//get user by username
async function getByuser(username) {

    const user = knex
        .select()
        .from("users")
        .where("username", username);
    return user
}

async function getAll() {
    const user = await knex
        .select(
            "uid_users",
            "name",
            "username",
            "phone",
            "address",
            "email",
            "profile_image"
        )
        .from("users");
    return user
}

//update by username
async function updateByUser(id,updatedData) {
    const user = await knex("users").where("uid_users", id).update(updatedData);
    return user
}

//delete by username
async function deteleByUser(username) {
const data = knex("users")
    .where("username", username)
    .del()
    return data 
}
async function checkUser(id){
    const user =  knex
       .select()
       .from("users")
       .where("uid_users", id);
       return user
 }

module.exports = {
  getByuser,
  updateByUser,
  deteleByUser,
  getAll,
  checkUser
};
