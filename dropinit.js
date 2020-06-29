require("dotenv").config();
const sequelize = require("./sequelize");
(async () => {
  await sequelize.query(`DROP DATABASE ${process.env.DB_DATABASE}`);
  await sequelize.query(`CREATE DATABASE ${process.env.DB_DATABASE}`);
})();

process.exit();
