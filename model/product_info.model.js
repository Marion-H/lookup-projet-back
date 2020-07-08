const Sequelize = require("sequelize");
const SequelizeInstance = require("../sequelize");

const Product_info = SequelizeInstance.define("Product_info", {
  uuid: {
    type: Sequelize.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  title: {
    type: Sequelize.STRING(100),
    allowNull: true,
  },
  description: {
    type: Sequelize.STRING(1000),
    allowNull: true,
  },
  description2: {
    type: Sequelize.STRING(1000),
    allowNull: true,
  },
  description3: {
    type: Sequelize.STRING(1000),
    allowNull: true,
  },
  picture: {
    type: Sequelize.STRING(250),
    allowNull: false,
  },
  picture2: {
    type: Sequelize.STRING(250),
    allowNull: false,
  },
  picture3: {
    type: Sequelize.STRING(250),
    allowNull: false,
  },
});

module.exports = Product_info;
