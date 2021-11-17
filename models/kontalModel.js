const db = require('../db');
const {DataTypes} = require('sequelize');

const kontak = db.define('kontak', {
    whatsapp: {
        type: DataTypes.STRING
    },
}, {
    freezeTableName: true,
    timestamps: true
});

module.exports = kontak;