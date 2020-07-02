const Sequelize = require("sequelize");
const sequelizeInstance = require("../sequelize");

const Partenaire = sequelizeInstance.define("Partenaire",{
    uuid: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
    },
    title: {
        type: Sequelize.STRING(50),
        allowNull: true,
    },
    description: {
        type: Sequelize.STRING(50),
        allowNull: false,
    },
    logo: {
        type: Sequelize.STRING(250),
        allowNull: false,
    }
})

module.exports= Partenaire;