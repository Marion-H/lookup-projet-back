const Sequelize = require("sequelize");
const sequelizeInstance = require("../sequelize");

const Service = sequelizeInstance.define("Service", {
  uuid: {
    type: Sequelize.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  title: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING(1000),
    allowNull: false,
  },
  logo: {
    type: Sequelize.STRING(250),
    allowNull: false,
  },
});

module.exports = Service;
