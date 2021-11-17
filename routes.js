const route = require('express').Router();
const {dashboard, services, contact, orders} = require('./controllers/index');
const {check} = require('express-validator')
const {appendValidation} = require('./global');
let validator = {
    update: {
        contact: appendValidation({
            "whatsapp" : ['isNumeric', 'notEmpty']
        }),
        services: appendValidation({
            nama: ['isString', 'notEmpty'],
            deskripsi: ['isString', 'notEmpty'],
            image: ['isString', 'notEmpty']
        })
    },
    insert: {
        services: appendValidation({
            nama: ['isString', 'notEmpty'],
            deskripsi: ['isString', 'notEmpty'],
            image: ['isString', 'notEmpty']
        })
    }
}

route.get('/', dashboard.get);

route.get('/contact', contact.get);
route.get('/contact/edit', contact.edit);
route.post('/contact/edit', validator.update.contact, contact.update);

route.get('/services', services.get);
route.get('/services/detail/:id', services.detail);
route.get('/services/create', services.create);
route.post('/services/create', validator.insert.services, services.insert);
route.get('/services/edit/:id', services.edit);
route.post('/services/edit/:id', validator.update.services, services.update);
route.get('/services/delete/:id', services.delete);

route.get('/orders', orders.get);
route.get('/orders/done/:id', orders.done);

module.exports = route;