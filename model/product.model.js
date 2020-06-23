const Sequelize = require("sequelize");
const sequelizeInstance = require("../sequelize");

const Product = sequelizeInstance.define("Product", {
  uuid: {
    type: Sequelize.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  name: {
    type: Sequelize.STRING(100),
    allowNull: true,
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: true,
  },
  description: {
    type: Sequelize.STRING(1000),
    allowNull: true,
  },
  picture: {
    type: Sequelize.STRING(250),
    allowNull: false,
  },
});

module.exports = Product;
