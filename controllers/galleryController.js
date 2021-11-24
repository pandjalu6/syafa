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
                data
            }));
        } catch (error) {
            next(error);
            return;
        }
    },

    update: async(req,res,next) => {
        const {id, image} = req.body;
        if(!id) {
            res.send("There is something is wrong");
            return;
        }

        try {
            const data = await model.findByPk(id);
            data.image = image;
            await data.save();
            res.redirect('/galery')
            return;
        } catch (error) {
            res.send("Data Not Found");
            return;
        }
    }
}