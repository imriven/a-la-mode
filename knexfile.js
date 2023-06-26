// Update with your config settings.

     

module.exports = {
  development: {
    client: "pg",
    connection: process.env.DATABASE_CONN,

    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: "./data/migrations",
    },
    seeds: {
      directory: "./data/seeds",
    },
    scripts: {
      server: "nodemon index.js",
    },
  },

  production: {
    client: "pg",
    connection: "",
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: "./data/migrations",
    },
    seeds: {
      directory: "./data/seeds",
    },
  },
};

