// Update with your config settings.
require("dotenv").config();
module.exports = {
  development: {
    client: "postgresql",
    connection: {
      database: "debugging_app",
      user: "postgres",
      password: "orange",
    },
    migrations: {
      directory: __dirname + "/migrations",
    },
    seeds: {
      directory: __dirname + "/seeds",
    },
  },
  production: {
    client: "postgresql",
    connection: {
      database: process.env.DB_NAME,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: __dirname + "/migrations",
    },
  },
};
