require('dotenv').config();
const bodyParser = require("body-parser");
const session = require('express-session');
const cors = require('cors');

const adminController = require('./controllers/admin_controller');
const cloudinaryController = require('./controllers/cloudinary_controller');
const userController = require('./controllers/user_controller');
const productsController = require('./controllers/products_controller');

//const mongoose = require('mongoose');

const MongoClient = require('mongodb').MongoClient;

const express = require('express');

const app = express();

const PORT = 3000;

const uri = process.env.CONNECTION_STRING;
const client = new MongoClient(uri, {useNewUrlParser: true });
client.connect(err => {
    const collection = client.db("test").collection('devices');
    // perform actions on the collection object
    console.log("connected?");
    client.close();
});

app.use(bodyParser.json());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false, //this for resaving the cookie false, if true can cause a memory leak.
    saveUninitialized: false , //saveUnitialized best false, unless connect to a database.
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 14
    }
}));

app.use(cors());

setTimeout(() => {
    //all our endpoints
}, 200);

app.get('/api/user-data', userController.readUserData);

app.post('/api/user-data/cart/:id', userController.addToCart);

app.delete('api/user-date/cart/:id', userController.removeFromCart);

app.post('/api/login', userController.login)

app.post('/api/logout', userController.logout)