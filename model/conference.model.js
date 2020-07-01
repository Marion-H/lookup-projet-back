const Sequelize = require("sequelize");
const sequelizeInstance = require("../sequelize");

const Conference= sequelizeInstance.define("Conference",{
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
    subject: {
        type: Sequelize.STRING(150),
        allowNull: false,
    },
    date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
    },
    picture: {
        type: Sequelize.STRING(250),
        allowNull: false,
    }
})

module.exports=Conference;