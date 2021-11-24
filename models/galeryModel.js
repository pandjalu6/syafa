const db = require('../db');
const {DataTypes} = require('sequelize');

const kontak = db.define('gallery', {
    image: {
        allowNull: true,
        type: DataTypes.STRING
    },
    deskripsi: {
        allowNull: true,
        type: DataTypes.STRING
    }
}, {
    freezeTableName: true,
    timestamps: true
});

module.exports = kontak;