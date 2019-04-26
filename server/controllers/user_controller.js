const User = require('../models/user')
const axios = require('axios')

module.exports = {
    readUserData(req,res) {
        //get the session, to update the reducer
        res.status(200).json({user:req.session.user});
    },
    addToCart(req,res){

    },
    removeFromCart(req,res){
        
    },
    login(req,res){
        //setup of the auth post request to retrieve accessTokenRespone
        return axios.post(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/oauth/token`,{
            client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
            client_secret: process.env.REACT_APP_AUTH0_CLIENT_SECRET,
            code: req.query.code,
            grant_type: 'authorization_code',
            redirect_uri: `http://${req.headers.host}/auth/callback`
        }).then(accessTokenResponse =>{
            //Get the data from the response
            const accessToken = accessTokenResponse.data.access_token;
            console.log(accessToken)
            //now return a axios get retrieving the user information using the access token
            return axios.get(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/userinfo?access_token=${accessToken}`).then(userDataResponse => {
                //destruct the data from the auth0
                const { name, nickname, email, picture, sub } = userDataResponse.data;
                console.log('user data-----------------', userDataResponse.data);
                //res.status(200).json({message: 'mEssages})     //line commented out in original tutorial, with typo
                User.findOne({auth0_id: sub}, (err, user) => {
                    if (err) console.log('Login Error------------', err);
                    //if the user is undefined:
                    if(!user) {
                        //Create a new user
                        let newUser = new User({
                            name: name,
                            email: email,
                            username: nickname,
                            profile_picture: picture,
                            auth0_id: sub,
                            //for now, set is_admin to true, then after you login set it to false, so other users are not consiedered the admin
                            //is_admin: true
                            is_admin: false
                        });
                        //Assign the user to the session
                        req.session.user = newUser;
                        //save the session
                        req.session.save();
                        //save the newUser instance to mongodb
                        newUser.save();
                    }
                    req.session.user = user;
                    req.session.save();
                    res.redirect('/');
                })
            }).catch(err => console.log('Auth0 get user info error-----------------', err));
        }).catch(err => console.log('Auth0 axios post backend error--------', err));
    },
    logout(req, res) {
        //destroy the session,this will logout the user, because when the user session is undefined the redux also logouts the user in the frontend
        req.session.destroy();
        //send message informing that the user successfully logged out
        req.status(200).json({message: 'Logout Successfully!'});
    }
};