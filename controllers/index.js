const dashboard = require('./dashboardController');
const services = require('./servicesController');
const contact = require('./contactController');
const orders = require('./ordersController');
const galery = require('./galleryController');
const login = require('./loginController')

module.exports = {
    dashboard,
    services,
    contact,
    orders,
    galery,
    login
}