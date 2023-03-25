const express = require( 'express' );
const imageRoute = express.Router();
const multer = require( 'multer' );
const { authentication } = require( '../config/jwt' );
//import controller
const { postUserComment, getCommentListByImage } = require( '../controllers/commentController' );

imageRoute.get( '/:imageId', getCommentListByImage );
imageRoute.post( '/', authentication, postUserComment );

module.exports = imageRoute