const {schemaViewParams} = require('../global');
const model = require('../models/galeryModel');

const initialParam = {
    title: "Galery", 
    content: "/galery/index", 
    active: "Galery",
    subtitle: "Galery"
}

module.exports = {
    get: async (req,res, next) => {
        try {
            const isAPI = req.url.split('/')[1] == "api";
            const data = await model.findAll();
            if(isAPI) {
                res.send({
                    status: 200,
                    data
                })
                return;
            }
            res.render('index', schemaViewParams({
                ...initialParam,
                data,
                base_url: req.protocol + '://' + req.get('host')
            }));
        } catch (error) {
            next(error);
            return;
        }
    },

    update: async(req,res,next) => {
        if(res.file) {
            res.send("There is something is wrong");
            return;
        }

        try {
            const data = await model.findByPk(req.params.id);
            data.image = req.protocol + '://' + req.get('host') + "/" + (req.file.destination).replace("public/", "") + req.file.filename;
            await data.save();
            res.redirect('/galery')
            return;
        } catch (error) {
            res.send("Data Not Found");
            return;
        }
    },

    delete: async(req,res,next) => {
        try {
            const data = await model.findByPk(req.params.id);
            data.image = "";
            await data.save();
            res.redirect('/galery')
            return;
        } catch (error) {
            console.log(error)
            res.send("Data Not Found");
            return;
        }
    }
}