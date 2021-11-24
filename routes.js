const route = require('express').Router();
const {dashboard, services, contact, orders, galery} = require('./controllers/index');
const {check} = require('express-validator')
const {appendValidation} = require('./global');
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

route.get('/', dashboard.get);

route.get('/contact', contact.get);
route.get('/contact/edit', contact.edit);
route.post('/contact/edit', validator.contact.update, contact.update);

route.get('/services', services.get);
route.get('/services/detail/:id', services.detail);
route.get('/services/create', services.create);
route.post('/services/create', validator.services.insert, services.insert);
route.get('/services/edit/:id', services.edit);
route.post('/services/edit/:id', validator.services.update, services.update);
route.get('/services/delete/:id', services.delete);

route.get('/orders', orders.get);
route.get('/orders/done/:id', orders.done);

route.get('/galery', galery.get);
route.post('/galery', galery.update);

// api
route.get('/api/services', services.get);
route.get('/api/galery', galery.get);
route.post('/api/orders/order', validator.orders.order, orders.order);

module.exports = route;