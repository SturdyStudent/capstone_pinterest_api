const express = require( 'express' );
const rootRoute = express.Router();

const userRoute = require( './userRoute' );
const imageRoute = require( './imageRoute' );
const saveRoute = require( './saveImageRoute' );
const commentRoute = require( './commentRoute' );

rootRoute.use( '/user', userRoute );
rootRoute.use( '/image', imageRoute );
rootRoute.use( '/save/', saveRoute );
rootRoute.use( '/comment', commentRoute );
module.exports = rootRoute;