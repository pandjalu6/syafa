require('dotenv').config();
const express = require('express');
const app = express();
const routes = require('./routes');
const db = require('./db');
const session = require('express-session');
const {flash} = require('express-flash-message');
const cors = require('cors');

db.authenticate().then(res => console.log("Database is Connected!")).catch(err => console.log("There is something wrong when connect Database!"))

app.set('trust proxy', 1);
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
}));

app.use(flash({ sessionKeyName: 'flashMessage' }));

app.use(cors())
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

app.use('/', routes);


app.listen(8000, () => console.log('Server Is running at port 8000'));