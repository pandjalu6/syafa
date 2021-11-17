const db = require('../db');
const {DataTypes} = require('sequelize');

const laporan = db.define('laporan', {
    id_layanan: DataTypes.STRING,
    nama: DataTypes.STRING,
    nomor: DataTypes.STRING,
    terlayani: DataTypes.BOOLEAN
}, {
    freezeTableName: true,
    timestamps: true
});

module.exports = laporan;