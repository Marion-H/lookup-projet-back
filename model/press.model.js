const Sequelize = require("sequelize");
const sequelizeInstance = require("../sequelize");

const Press = sequelizeInstance.define("Press",{
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
    picture: {
        type: Sequelize.STRING(250),
        allowNull: false,
    }
})

module.exports=Press;