const initModels = require( '../model/init-models' );
const sequelize = require( '../model/index' );
const model = initModels( sequelize );
const { Sequelize } = require( 'sequelize' );
const fs = require( 'fs' );
const Op = Sequelize.Op;
const { successCode, errorCode, failCode } = require( '../config/response' );
const nguoi_dung = require( '../model/nguoi_dung' );
const luu_anh = require( '../model/luu_anh' );
const hinh_anh = require( '../model/hinh_anh' );

const createImageInfo = async ( req, res ) => {
    try {
        const file = req.file;
        const { tieu_de_hinh, mo_ta, duong_dan, nguoi_dung_id } = req.body;

        let ten_hinh = file.filename;
        let modelImage = await model.hinh_anh.create( {
            tieu_de_hinh, ten_hinh, duong_dan, mo_ta, nguoi_dung_id
        } );

        successCode( res, modelImage, 'Thêm hình thành công' );
    } catch ( err ) {
        console.log( err );
        errorCode( res, "Lỗi BE" );
    }
}

const getImageInfo = async ( req, res ) => {
    try {
        let hinh_id = req.params.id;

        let imageInfo = await model.hinh_anh.findAll( {
            include: [
                {
                    model: sequelize.model( 'nguoi_dung' ),
                    as: 'nguoi_dung',
                    required: true
                }
            ],
            where: {
                hinh_id
            }
        } );

        let detail = imageInfo[ 0 ];

        successCode( res, detail, 'Lấy hình thành công' );
    } catch ( err ) {
        console.log( err );
        errorCode( res, "Lỗi BE" );
    }
}

const getImageList = async ( req, res ) => {
    try {
        let imageInfo = await model.hinh_anh.findAll();

        successCode( res, imageInfo, 'Lấy hình thành công' );
    } catch ( err ) {
        console.log( err );
        errorCode( res, "Lỗi BE" );
    }
}

const getImageByName = async ( req, res ) => {
    try {
        let { tieu_de_hinh } = req.body;
        if ( tieu_de_hinh ) {
            let imageInfo = await model.hinh_anh.findAll( {
                where: {
                    tieu_de_hinh: {
                        [ Op.like ]: `%${ tieu_de_hinh }%`
                    }
                }
            } );
            successCode( res, imageInfo, 'Lấy hình thành công' );
        } else {
            errorCode( res, 'Không có từ khóa truyền vào' );
        }
    } catch ( err ) {
        console.log( err );
        errorCode( res, "Lỗi BE" );
    }
}

const getImageCreatedByUser = async ( req, res ) => {
    try {
        let nguoi_dung_id = req.body.userId;
        if ( nguoi_dung_id ) {
            let imagesCreatedByUser = await model.hinh_anh.findAll( {
                where: {
                    nguoi_dung_id
                }
            } );
            successCode( res, imagesCreatedByUser, 'Lấy hình thành công nha' );
        } else {
            failCode( res, null, 'Không có từ khóa truyền vào' );
        }
    } catch ( err ) {
        console.log( err );
        errorCode( res, "Lỗi BE" );
    }
}
const getUserSavedImage = async ( req, res ) => {
    try {
        let nguoi_dung_id = req.body.userId;
        let getImage = await model.luu_anh.findAll( {
            where: {
                nguoi_dung_id
            },
            include: [
                {
                    model: sequelize.model( 'hinh_anh' ),
                    as: 'hinh',
                    required: true
                }
            ]
        } )
        if ( getImage ) {
            let datas = getImage.map( item => {
                return item.dataValues.hinh.dataValues;
            } );
            successCode( res, datas, 'Lấy hình đã lưu thành công' );
        }
    } catch ( err ) {
        console.log( err );
        errorCode( res, "Lỗi BE" );
    }
}
const deleteImage = async ( req, res ) => {
    try {
        let hinh_id = req.params.imageId;
        if ( hinh_id ) {
            // let hinh = await model.hinh_anh.destroy( {
            //     where: {
            //         hinh_id
            //     }
            // } );
            let getImage = await model.hinh_anh.findAll( {
                where: {
                    hinh_id
                }
            } )
            if ( getImage ) {
                let imageName = getImage[ 0 ].dataValues.ten_hinh;

                fs.unlink( process.cwd() + '/public/img/' + imageName, ( err ) => {
                    if ( err ) throw err;
                    console.log( `${ imageName } was deleted` );
                } );
            }

            successCode( res, hinh_id, 'Xóa hình thành công' );
        } else {
            failCode( res, null, 'Không có id hình truyền vào' );
        }
    } catch ( err ) {
        console.log( err );
        errorCode( res, "Lỗi BE" );
    }
}

module.exports = {
    createImageInfo,
    getImageInfo,
    getImageList,
    getImageByName,
    getUserSavedImage,
    getImageCreatedByUser,
    deleteImage
}


