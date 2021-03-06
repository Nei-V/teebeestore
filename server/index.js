require('dotenv').config();
const bodyParser = require("body-parser");
const session = require('express-session');
const cors = require('cors');

const adminController = require('./controllers/admin_controller');
const cloudinaryController = require('./controllers/cloudinary_controller');
const userController = require('./controllers/user_controller');
const productsController = require('./controllers/products_controller');

//import express server
const express = require('express');

//instance of the server called "app" where all endpoint will go through
const app = express();

//port -> has to be the same as proxy
const PORT = 5000;

//MongoDB client
const mongoose = require('mongoose');


const uri = process.env.REACT_APP_CONNECTION_STRING;

/* 
//not working with MongoClient - how to use?
const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
    if (err){
        return console.error("The error is",err);
        }
  //const collection = client.db("test").collection("devices");
  console.log("connected to the database");
  //console.log("the collection",collection);
  // perform actions on the collection object
 
  client.close();
}); */

mongoose.connect(uri,{useNewUrlParser:true},(err)=>{
    if (err) {console.log("connection to the db problem",err)}
    console.log("connected to the db");
})


//Middleware
//For initializing the req.body. If the middleware is not used, the req.body is undefined.

app.use(bodyParser.json());

//session -> for cookies
app.use(session({
    secret: process.env.REACT_APP_SESSION_SECRET,
    resave: false, //this for resaving the cookie false, if true can cause a memory leak.
    saveUninitialized: false , //saveUnitialized best false, unless connect to a database.
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 14
    }
}));

//cors -> allow cross origin requests
app.use(cors());

//setTimeout -> because of race condition, in order not to have errors (is asynchronous)
setTimeout(() => {
    //all our endpoints

//for  testing:
//app.get('/', (req, res) => res.send('Hello World!'));
//app.get('/api', (req, res) => res.send('Hello Api!'));

//USER endpoints:
app.get('/api/user-data', userController.readUserData);
app.post('/api/user-data/cart/:id', userController.addToCart);
app.delete('/api/user-date/cart/:id', userController.removeFromCart);
//because it uses Auth0 - which means users log with social media account, there is no need to register - to login is enough
//app.post('/api/login', userController.login); after setting up Auth0 we change this line to:
app.get('/auth/callback', userController.login)
app.post('/auth/callback', userController.login)
app.post('/api/logout', userController.logout);

//PRODUCTS endpoints - this is for showing (reading) products from database (reading is enough beacuse only the admin can create, update or delete products)
app.get('/api/products', productsController.readAllProducts); //getting all products
app.get('/api/products/:id',productsController.readProduct); //getting specific product using request paramter

//ADMIN endpoints:
app.get('/api/users',adminController.getAdminUsers);
app.post('/api/products',adminController.createProduct); //admin creates new product in the database, that's why no "id" parameter is needed
app.put('/api/products/:id', adminController.updateProduct); // needs "id" to access specific product in the database
app.delete('/api/products/:id',adminController.deleteProduct); //needs "id" to delete specific product from the database
}, 200);

//listen to our app on the port defined before:
app.listen(PORT,() => console.log('Listening on port',PORT));