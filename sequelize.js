require('dotenv').config();
const Sequelize = require("sequelize");

const { DB_NAME, DB_USER, DB_PASSWORD , NODE_ENV, DB_DIALECT, DB_TEST} = process.env;

module.exports = new Sequelize({
    host: 'localhost',
    username: DB_USER,
    password: DB_PASSWORD,
    database: NODE_ENV !== "test" ? DB_NAME : DB_TEST,
    dialect: DB_DIALECT, 
    logging: false,
});