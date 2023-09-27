const Sequelize = require('sequelize');

const sequelize = require('../db/database');

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    Name: {
        type: Sequelize.STRING(255),
        allowNull: false,
    },
    phone_no: {
        type: Sequelize.STRING(20),
    },
    Email: {
        type: Sequelize.STRING(255),
        allowNull: false,
    },
});

module.exports = User;