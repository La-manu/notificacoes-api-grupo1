// src/config/database.js
const { Sequelize } = require("sequelize");
const sequelize = new Sequelize( // criar nova instancia
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql", // sequelize suporta varios bancos
    logging: process.env.NODE_ENV === "development" ? console.log : false,
  },
);
module.exports = sequelize;
