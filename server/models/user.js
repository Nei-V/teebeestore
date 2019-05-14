const mongoose = require('mongoose');

const Schema = mongoose.Schema;


//Define your User Collection Objects Structure

//With datatypes

//We'll be using Auth0 for authentication in the future.

const user = new Schema({

    //THis is where the user will login
    
    //For Now we will be inserting test data

    name: String,
    email: String,
    username: String,
    auth0_id: String,
    profile_picture: String
});

module.exports = mongoose.model('User', user);