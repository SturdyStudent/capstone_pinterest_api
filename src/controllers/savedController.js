const initModels = require( '../model/init-models' );
const sequelize = require( '../model/index' );
const model = initModels( sequelize );
const { successCode, errorCode, failCode } = require( '../config/response' );

const getIsImageSaved = async ( req, res ) => {
    try {
        const hinh_id = req.params.imageId;

        let savedImage = await model.luu_anh.findAll( {
            where: {
                hinh_id
            }
        } );
        console.log( savedImage );
        if ( savedImage.length != 0 ) {
            successCode( res, { saved: true }, 'Hình đã được lưu' );
        } else {
            successCode( res, { saved: false }, 'Hình chưa được lưu' );
        }
    } catch ( err ) {
        console.log( err );
        errorCode( res, "Lỗi BE" );
    }
}

const saveImage = async ( req, res ) => {
    try {
        const { nguoi_dung_id, hinh_id } = req.body;

        let ngay_luu = new Date().toISOString().slice( 0, 19 ).replace( 'T', ' ' );
        let modelSavedImage = await model.luu_anh.create( {
            nguoi_dung_id, hinh_id, ngay_luu
        } );

        successCode( res, modelSavedImage, 'Lưu hình thành công' );
    } catch ( err ) {
        console.log( err );
        errorCode( res, "Lỗi BE" );
    }
}

const unSaveImage = async ( req, res ) => {
    try {
        const { nguoi_dung_id, hinh_id } = req.body;

        let modelUnSavedImage = await model.luu_anh.destroy( {
            where: {
                nguoi_dung_id, hinh_id,
            }
        } );

        successCode( res, modelUnSavedImage, 'Xóa khỏi yêu thích thành công' );
    } catch ( err ) {
        console.log( err );
        errorCode( res, "Lỗi BE" );
    }
}

module.exports = {
    saveImage,
    unSaveImage,
    getIsImageSaved
}


