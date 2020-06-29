require("dotenv").config();
const sequelize = require("./sequelize");
(async () => {
  try{
    await sequelize.query(`DROP DATABASE ${process.env.DB_DATABASE}`);
    await sequelize.query(`CREATE DATABASE ${process.env.DB_DATABASE}`);
    await sequelize.query(`DROP DATABASE ${process.env.DB_TEST}`);
    await sequelize.query(`CREATE DATABASE ${process.env.DB_TEST}`);
    console.log("success")
    process.exit();
  }catch(err){
    console.log(err)
  }
})();

