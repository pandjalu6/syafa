const route = require('express').Router();
const {dashboard, services, contact, orders, galery, login} = require('./controllers/index');
const {appendValidation} = require('./global');
const multer = require('multer');
const nanoId = require('nanoid');
const path = require('path');
const galeryStorage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null, "public/img/uploads/galery/")
    },

    filename: (req, file, cb) => {
        let id = nanoId.nanoid()
        cb(null, id + path.extname(file.originalname))
    }
})

const galeryMulter = multer({storage: galeryStorage})

let validator = {
    contact: {
        update: appendValidation({
            "whatsapp" : ['isNumeric', 'notEmpty']
        })
    },
    services: {
        insert: appendValidation({
            nama: ['isString', 'notEmpty'],
            deskripsi: ['isString', 'notEmpty'],
            image: ['isString', 'notEmpty']
        }),
        update: appendValidation({
            nama: ['isString', 'notEmpty'],
            deskripsi: ['isString', 'notEmpty'],
            image: ['isString', 'notEmpty']
        })
    },
    orders: {
        order: appendValidation({
            nama: ['isString', 'notEmpty'],
            id_layanan: ['isNumeric', "notEmpty"],
            nomor: ["isString", "notEmpty"]
        })
    }
}


route.get('/login', login.login)
route.post('/login', login.login)

route.get('/', login.verifyLogin, dashboard.get);

route.get('/contact', login.verifyLogin, contact.get);
route.get('/contact/edit', login.verifyLogin, contact.edit);
route.post('/contact/edit', login.verifyLogin, validator.contact.update, contact.update);

route.get('/services', login.verifyLogin, services.get);
route.get('/services/detail/:id', login.verifyLogin, services.detail);
route.get('/services/create', login.verifyLogin, services.create);
route.post('/services/create', login.verifyLogin, validator.services.insert, services.insert);
route.get('/services/edit/:id', login.verifyLogin, services.edit);
route.post('/services/edit/:id', login.verifyLogin, validator.services.update, services.update);
route.get('/services/delete/:id', login.verifyLogin, services.delete);

route.get('/orders', login.verifyLogin, orders.get);
route.get('/orders/done/:id', login.verifyLogin, orders.done);

route.get('/galery', login.verifyLogin, galery.get);
route.post('/galery/update/:id', login.verifyLogin, galeryMulter.single('image'), galery.update);
route.get('/galery/delete/:id', login.verifyLogin, galery.delete)

// api
route.get('/api/contact', contact.get)
route.get('/api/services', services.get);
route.get('/api/galery', galery.get);
route.post('/api/orders/order', validator.orders.order, orders.order);

module.exports = route;