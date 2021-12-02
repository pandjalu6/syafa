require('dotenv').config();
const express = require('express');
const app = express();
const routes = require('./routes');
const db = require('./db');
const session = require('express-session');
const {flash} = require('express-flash-message');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const passwordHash = require('password-hash');

db.authenticate().then(res => console.log("Database is Connected!")).catch(err => console.log("There is something wrong when connect Database!"))

app.set('trust proxy', 1);
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
}));

app.use(cookieParser());
app.use(flash({ sessionKeyName: 'flashMessage' }));

app.use(cors())
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

app.use('/', express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

app.use('/', routes);
app.get('/pass', (req,res) => res.send(passwordHash.generate('SyafaAdmin321')))

app.listen(8000, () => console.log('Server Is running at port 8000'));