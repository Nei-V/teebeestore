const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//need id, name, description, price - id is created by default in mongoDB

const product = new Schema({
    name: String,
    description: String,
    price: Number,
    //add pic to product
    picture: String
});
//create model by having the model name and a schema of the object as the second argument, this will be inserted in database
module.exports = mongoose.model('Product', product); 