const {schemaViewParams} = require('../global');
const model = require('../models/laporanModel');
const db = require('../db');
const {QueryTypes} = require('sequelize');

const initialParam = {
    title: "Pesanan", 
    active: "Pesanan",
    subtitle: "Daftar Pesanan"
}

module.exports = {
    get: async (req,res) => {
        try {
            let result = await db.query(`SELECT laporan.*,layanan.nama as nama_layanan FROM laporan JOIN layanan ON laporan.id_layanan = layanan.id`, {type: QueryTypes.SELECT});
            let message = await req.consumeFlash('message');
            res.render('index', schemaViewParams({
                ...initialParam,
                orders: result,
                base_url: req.protocol + '://' + req.get('host'), 
                subcontent: "/orders/table", 
                content: "/layouts/tableLayout",
                message: message[0]
            }))
        } catch (error) {
            console.log(error)
            res.send("Ada sesuatu kesalahan")
        }
    },

    done: async(req,res) => {
        try {
            let data = await model.findByPk(req.params.id);
            data.terlayani = 1;
            await data.save();
            
            await req.flash('message', "Data layanan berhasil di ubah!");
            res.redirect('/orders');
        } catch (error) {
            setTimeout(() => {
                res.redirect('/orders')
            }, 3000);
            res.send("Data tidak ada!")
        }
    }

    
} 