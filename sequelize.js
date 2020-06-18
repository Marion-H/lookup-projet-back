require('dotenv').config();
const Sequelize = require("sequelize");

const { DB_NAME, DB_USER, DB_PASSWORD , NODE_ENV, DB_DIALECT, DB_TEST, DB_HOST} = process.env;

module.exports = new Sequelize({
    host: DB_HOST,
    username: DB_USER,
    password: DB_PASSWORD,
    database: NODE_ENV !== "test" ? DB_NAME : DB_TEST,
    dialect: DB_DIALECT, 
    logging: false,
});