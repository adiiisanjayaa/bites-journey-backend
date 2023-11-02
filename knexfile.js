module.exports = {
  development: {
    client: "pg",
    connection: 'postgres://navqsllu:1cN4Uf98CwD8q81NYK94QkJuNVQGV3Z-@rosie.db.elephantsql.com/navqsllu' ,
    migrations: {
      directory: "./apps/db/migrations",
    },
    seeds: {
      directory: "./apps/db/seeds",
    },
  },
  production: {
    client: "pg",
    connection: 'postgres://navqsllu:1cN4Uf98CwD8q81NYK94QkJuNVQGV3Z-@rosie.db.elephantsql.com/navqsllu',
    migrations: {
      directory: "./apps/db/migrations",
    },
    seeds: {
      directory: "./apps/db/seeds",
    },
    ssl: {
      rejectUnauthorized: false,
    },
  },
};
