const express = require( 'express' );
const imageRoute = express.Router();
const multer = require( 'multer' );
const { authentication } = require( '../config/jwt' );
//import controller
const { getUserSavedImage, createImageInfo, deleteImage, getImageInfo, getImageByName, getImageList, getImageCreatedByUser } = require( '../controllers/imageController' );

const storage = multer.diskStorage( {
    destination: ( req, file, cb ) => {
        // là nơi định nghĩa đường dẫn lưu hình
        cb( null, process.cwd() + "/public/img" );
    },
    // giúp đổi tên file đang được up lên
    filename: ( req, file, cb ) => {
        // Math.random
        // time
        const newfileName = Date.now() + "-" + file.originalname;
        cb( null, newfileName );
    }
} )
const upload = multer( { storage } )

imageRoute.get( '/findByName', getImageByName );
imageRoute.get( '/createdByUser', authentication, getImageCreatedByUser );
imageRoute.post( '/uploadImage', upload.single( "data" ), createImageInfo );
imageRoute.get( '/:id', getImageInfo );
imageRoute.get( '/', getImageList );
imageRoute.get( '/savedImage', authentication, getUserSavedImage );
imageRoute.delete( '/:imageId', deleteImage );

module.exports = imageRoute