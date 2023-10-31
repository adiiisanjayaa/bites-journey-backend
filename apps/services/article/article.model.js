const knex = require("../../db/knex");


    async function getAllArticle() {
        try{
            const data = knex
            .select("id_article", "title", "content", "image")
            .from("articles");
        return data ;
        }catch (error){
        return error
        }
        
    }
    async function getAllArticleByUID(uid){
        const data = knex
        .from("articles")
        .join("users", "users.uid_users", "articles.uid_users")
        .select("articles.*", "users.*")
        .where("articles.uid_users", uid);
        return data
    }
    async function getAllArticleByID(id){
        const data = knex
        .from("articles")
        .join("users", "users.uid_users", "articles.uid_users")
        .select("articles.*", "users.*")
        .where("articles.id_article", id);
        return data
    }

    async function createArticle (data_form){
        const data = knex("articles").insert(data_form);
        return data 
    }

    async function deleteArticleById(id_article) {
        try {
          const data = await knex("articles").where("id_article", id_article).del();
          return data;
        } catch (error) {
          // Handle error jika ada
          console.error('Kesalahan saat menghapus artikel:', error);
          throw error;
        }
      }
      
    async function editArticle(articleId, data){
        const article = await knex("articles").where("articles.id_article", articleId).update(data);
        return article
    }


module.exports = {
    deleteArticleById,
    editArticle,
    getAllArticle,
    createArticle,
    getAllArticleByUID,
    getAllArticleByID
}