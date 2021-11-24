const {schemaViewParams} = require('../global');
const model = require('../models/layananModel');
const { validationResult } = require('express-validator');

const initialParam = {
    title: "Layanan", 
    active: "Layanan",
    action: "/services/update",
    subtitle: "Daftar layanan"
}

module.exports = {
    get: async (req,res) => {
        try {
            const isAPI = req.url.split('/')[1] == "api";
            let data = await model.findAll();
            if(isAPI) {
                res.send({
                    status: 200,
                    data
                })
                return;
            }
            let message = await req.consumeFlash('message')
            res.render('index', schemaViewParams({
                ...initialParam,
                services: data,
                base_url: req.protocol + '://' + req.get('host'), 
                subcontent: "/services/table", 
                content: "/layouts/tableLayout",
                create: "/services/create",
                message: message[0]
            }))
        } catch (error) {
            res.send({
                error
            })
        }
    },

    detail: async (req,res) => {
        try {
            let message = await req.consumeFlash('message');
            let query = await model.findByPk(req.params.id);
            console.log(message)
            res.render('index', schemaViewParams({
                ...initialParam,
                query,
                subcontent: "/services/form", 
                content: "/layouts/formLayout",
                isShow: "/services/edit/" + query.id,
                subtitle: "Detail layanan",
                message: message[0]
            }))
        } catch (error) {
            res.send("Terjadi Error atau data tidak ditemukan")
        }
    },

    create: async(req,res) => {
        res.render('index', schemaViewParams({
            ...initialParam,
            subcontent: "/services/form", 
            content: "/layouts/formLayout",
            isCreate: "/services/insert",
            subtitle: "Tambah layanan"
        }))
    },

    insert: async(req,res) => {
        const errors = validationResult(req).array();
        if(errors[0]) {
            let sendErrors = {};
            errors.forEach(v => {
                sendErrors[v.param] = v.msg
            })
            let {nama, deskripsi, image} = req.body;
            let query = {nama, deskripsi, image};
            res.render('index', schemaViewParams({
                ...initialParam,
                subcontent: "/services/form", 
                content: "/layouts/formLayout",
                isCreate: "/services/insert",
                subtitle: "Tambah layanan",
                errors: sendErrors,
                query
            }))
            return;
        }

        const {nama, deskripsi, image} = req.body;
        await model.create({nama, deskripsi, image});

        await req.flash('message', "Data layanan berhasil di tambah!")
        
        res.redirect('/services/');
    },

    edit: async (req,res) => {
        try {
            let query = await model.findByPk(req.params.id);
            const errors = await req.consumeFlash('errors');
            res.render('index', schemaViewParams({
                ...initialParam,
                query,
                subcontent: "/services/form", 
                content: "/layouts/formLayout",
                isEdit: "/services/update/" + query.id,
                errors: errors || [],
                subtitle: "Edit layanan"
            }))
        } catch (error) {
            res.send("Terjadi Error atau data tidak ditemukan")
        }
    },

    update: async (req,res) => {
        const {id} = req.params;
        const errors = validationResult(req).array();
        if(errors[0]) {
            let sendErrors = {};
            errors.forEach(v => {
                sendErrors[v.param] = v.msg
            })
            
            let {nama, deskripsi, image} = req.body;
            let query = {nama, deskripsi, image};
            res.render('index', schemaViewParams({
                ...initialParam,
                subcontent: "/services/form", 
                content: "/layouts/formLayout",
                isEdit: "/services/update/" + query.id,
                errors: errors || [],
                subtitle: "Edit layanan",
                query
            }))
            return;
        }

        const {nama, deskripsi, image} = req.body;
        const query = await model.findByPk(id);
        query.set({
            nama,
            deskripsi,
            image
        })
        await query.save();

        await req.flash('message', "Data layanan berhasil di perbarui!")
        
        res.redirect('/services/detail/' + id)
    },
    
    delete: async(req,res) => {
        const query = await model.findByPk(req.params.id);
        await query.destroy();

        await req.flash('message', "Data layanan berhasil di hapus!")
        
        res.redirect('/services')
    }
} 