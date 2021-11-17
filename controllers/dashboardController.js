const {schemaViewParams} = require('../global');
module.exports = {
    get: (req,res) => {
        res.render('index', schemaViewParams({title: "Dashboard", content: "/dashboard", active: "Dashboard"}))
    }
}