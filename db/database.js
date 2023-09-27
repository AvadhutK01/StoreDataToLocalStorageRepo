const Sequelize = require('sequelize');

const sequelize = new Sequelize('user-db', 'root', 'root123', { dialect: 'mysql', host: 'localhost' });

module.exports = sequelize;