const Sequelize = require("sequelize");
const sequelizeInstance = require("../sequelize");

const Client = sequelizeInstance.define("Client", {
  uuid: {
    type: Sequelize.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  companyName: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
  streetNumber: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  streetName: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
  city: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
  postalCode: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  siret: {
    type: Sequelize.STRING(14),
    allowNull: false,
  },
});

module.exports = Client;
