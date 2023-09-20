/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable("users", function (table) {
    table.increments("uid_users").primary().unique();
    table.string("name");
    table.string("username").notNullable();
    table.string("password").notNullable();
    table.string("email");
    table.string("phone");
    table.string("address");
    table.string("profile_image");
    table.date("created_at").notNullable();
    table.date("updated_at").notNullable();
  });

  await knex.schema.createTable("categories", function (table) {
    table.increments("id_category").primary().unique();
    table.string("title");
    table.string("description");
    table.string("image");
    table.date("created_at").notNullable();
    table.date("updated_at").notNullable();
  });

  await knex.schema.createTable("articles", function (table) {
    table.increments("id_article").primary().unique();
    table.string("image");
    table.string("title");
    table.string("content");
    table
      .integer("id_category")
      .references("id_category")
      .inTable("categories")
      .notNullable()
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table
      .integer("uid_users")
      .references("uid_users")
      .inTable("users")
      .notNullable()
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table.date("created_at").notNullable();
    table.date("updated_at").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("users");
  await knex.schema.dropTableIfExists("categories");
  await knex.schema.dropTableIfExists("articles");
};
