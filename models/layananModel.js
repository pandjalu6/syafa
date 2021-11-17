const db = require('../db');
const {DataTypes} = require('sequelize');

const layanan = db.define('layanan', {
    nama: DataTypes.STRING,
    deskripsi: DataTypes.STRING,
    image: DataTypes.STRING
}, {
    freezeTableName: true,
    timestamps: true
});

module.exports = layanan;