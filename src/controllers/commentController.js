const initModels = require( '../model/init-models' );
const sequelize = require( '../model/index' );
const model = initModels( sequelize );
const { presentDate } = require( '../utils/utility' );
const { successCode, errorCode, failCode } = require( '../config/response' );

const postUserComment = async ( req, res ) => {
    try {
        const { hinh_id, noi_dung } = req.body;
        let nguoi_dung_id = req.body.userId;
        const ngay_binh_luan = presentDate();
        let modelComment = await model.binh_luan.create( {
            nguoi_dung_id, hinh_id, noi_dung, ngay_binh_luan
        } );
        successCode( res, modelComment, 'Đã lưu bình luận' );
    } catch ( err ) {
        errorCode( res, "Lỗi BE" );
    }
}

const getCommentListByImage = async ( req, res ) => {
    try {
        const hinh_id = req.params.imageId;
        let commentList = await model.binh_luan.findAll( {
            where: {
                hinh_id
            }
        } );
        console.log( commentList );
        let data = commentList.map( item => {
            return item.dataValues;
        } );
        successCode( res, data, 'Trả về danh sách bình luận thành công' );
    } catch ( err ) {
        console.log( err );
        errorCode( res, "Lỗi BE" );
    }
}

module.exports = {
    postUserComment,
    getCommentListByImage
}


