const dotenv = require("dotenv").config();

module.exports = {
  NODE_ENV: process.env.NODE_ENV || "development",
  HOST: process.env.HOST || "127.0.0.1",
  PORT: process.env.PORT || 3001,
  PASSWORD: process.env.PASSWORD || process.env.PASSWORD,
  USER: process.env.USER || process.env.USER,
  DBNAME: process.env.DBNAME || process.env.DBNAME,
};
