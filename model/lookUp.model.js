const Sequelize = require("sequelize");
const sequelizeInstance = require("../sequelize");

const Lookup = sequelizeInstance.define("Lookup", {
  uuid: {
    type: Sequelize.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  companyName: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
  streetName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  streetNumber: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  postalCode: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  city: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
  phone: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  siret: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Lookup;
