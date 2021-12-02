const db = require('../db');
const {DataTypes} = require('sequelize');

const user = db.define('user', {
    email: DataTypes.STRING,
    password: DataTypes.STRING
}, {
    freezeTableName: true,
    timestamps: true
});

module.exports = user;