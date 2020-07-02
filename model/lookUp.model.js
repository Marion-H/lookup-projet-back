const Sequelize = require("sequelize");
const sequelizeInstance = require("../sequelize");
const bcrypt = require("bcrypt");

const Lookup = sequelizeInstance.define(
  "Lookup",
  {
    uuid: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    companyName: {
      type: Sequelize.STRING(50),
      allowNull: true,
    },
    streetName: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    streetNumber: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    postalCode: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    city: {
      type: Sequelize.STRING(50),
      allowNull: true,
    },
    email: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    phone: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    siret: {
      type: Sequelize.STRING(50),
      allowNull: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    hooks: {
      beforeCreate: (user) => {
        if (user.password) {
          user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync());
        }
      },
    },
  }
);

Lookup.prototype.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = Lookup;
