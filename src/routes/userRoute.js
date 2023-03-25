const express = require( 'express' );
const userRoute = express.Router();

//import controller
const { userLogin, userSignUp, getUserInfo, updateUserInfo } = require( '../controllers/userControlelr' );
const { authentication } = require( '../config/jwt' );

userRoute.post( '/signup', userSignUp );
userRoute.post( '/login', userLogin );
userRoute.get( '/info', authentication, getUserInfo );
userRoute.put( '/updateUser/', authentication, updateUserInfo );

module.exports = userRoute