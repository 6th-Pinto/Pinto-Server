require('dotenv').config();

const { env } = process;

const development = {
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_DATABASE,
  dialect: env.DB_DIALECT,
  host: env.DB_HOST,
};

module.exports = development;
