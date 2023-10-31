const knex = require("../../db/knex");

async function loginModel(username) {
    const data = knex.select().from("users").where("username", username);
    return data 
}

async function registeModel(dataUser){
    const data = knex("users").insert(dataUser);
    return data 
}

async function checkUserExist(username){
   const user =  knex
      .select()
      .from("users")
      .where("username", username);
      return user
}
module.exports = {
    loginModel,
    registeModel,
    checkUserExist
  };
  