const express = require( 'express' );
const saveRoute = express.Router();

//import controller
const { saveImage, unSaveImage, getIsImageSaved } = require( '../controllers/savedController' );

saveRoute.get( '/:imageId', getIsImageSaved );
saveRoute.post( '/', saveImage );
saveRoute.delete( '/', unSaveImage );

module.exports = saveRoute