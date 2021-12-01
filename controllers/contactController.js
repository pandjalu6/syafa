const {schemaViewParams} = require('../global');
const model = require('../models/kontalModel');
const { validationResult } = require('express-validator');

const initialParam = {
    title: "Kontak", 
    content: "/layouts/formLayout", 
    subcontent: "/contact/form", 
    active: "Kontak",
    subtitle: "Kontak"
}

module.exports = {
    get: async (req,res,next) => {
        try {
            const isAPI = req.url.split('/')[1] == "api";
            const query = await (await model.findOne()).get();
            if(isAPI) {
                res.send({
                    status: 200,
                    data: query
                })
                return;
            }
            const message = await req.consumeFlash('message');
            res.render('index', schemaViewParams({
                ...initialParam,
                isShow: "/contact/edit",
                message : message[0],
                query
            }));
        } catch (error) {
            next(error);
            return;
        }

    },
    edit: async (req,res,next) => {
        try {
            const query = await (await model.findOne()).get();
            const errors = await req.consumeFlash('errors');
            res.render('index', schemaViewParams({
                ...initialParam,
                isEdit: "/contact/update",
                errors: errors[0] || {},
                query
            }));
        } catch (error) {
            next(error);
            return;
        }
    },
    update: async (req,res,next) => {
        const errors = validationResult(req).array();
        if(errors[0]) {
            let sendErrors = {};
            errors.forEach(v => {
                sendErrors[v.param] = v.msg
            })
            
            await req.flash('errors', sendErrors);
            res.redirect("/contact/edit");
            return;
        }

        const query = await model.findOne();
        query.whatsapp = `${req.body.whatsapp}`;
        query.about = `${req.body.about}`;
        await query.save();

        await req.flash('message', "Kontak berhasil di perbarui!")
        
        res.redirect('/contact')
    }
}