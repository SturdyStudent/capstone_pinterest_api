const initModels = require( '../model/init-models' );
const sequelize = require( '../model/index' );
const model = initModels( sequelize );
require( 'dotenv' ).config();
const bcrypt = require( 'bcrypt' );
const { generateToken } = require( '../config/jwt' )

const { failCode, successCode, errorCode } = require( '../config/response' );

const userLogin = async ( req, res ) => {
    try {
        //lấy từ FE

        let { email, mat_khau } = req.body;

        let checkEmail = await model.nguoi_dung.findAll( {
            where: {
                email
            }
        } )
        if ( checkEmail.length == 0 ) {
            successCode( res, '', 'Đăng nhập thất bại' );
            return;
        }
        let checkPass = bcrypt.compareSync( mat_khau, checkEmail[ 0 ].dataValues.mat_khau );

        if ( checkPass ) {
            let token = generateToken( { data: checkEmail } );

            successCode( res, token, "Login thành công" );
        } else {
            failCode( res, "", "Mật khẩu không đúng !" );
        }
    } catch ( err ) {
        console.log( err );
        errorCode( res, err );
    }
}

const userSignUp = async ( req, res ) => {
    try {
        let { email, mat_khau, ho_ten, tuoi } = req.body;

        let checkEmail = await model.nguoi_dung.findOne( {
            where: {
                email
            }
        } );

        let modelUser = {
            email, mat_khau: bcrypt.hashSync( mat_khau, Number( process.env.HASH_ROUND ) ), ho_ten, tuoi
        }
        if ( checkEmail ) {
            failCode( res, checkEmail, 'Email đã tồn tại' );
            return;
        }
        await model.nguoi_dung.create( modelUser );

        successCode( res, modelUser, 'Tạo người dùng thành công' );
    } catch ( err ) {
        errorCode( res, err );
    }
}



const userCreate = async ( req, res ) => {
    try {
        let { email, mat_khau, ho_ten, tuoi } = req.body;

        let modelUser = model.nguoi_dung.create( {
            email, mat_khau, ho_ten, tuoi
        } )
        res.send( 'created user' );
    } catch ( err ) {
        errorCode( res, "Lỗi BE" );
    }
}

const getUserInfo = async ( req, res ) => {
    try {
        let nguoi_dung_id = req.body.userId;

        let userInfo = await model.nguoi_dung.findAll( {
            where: {
                nguoi_dung_id
            }
        } )
        let detail = userInfo[ 0 ].dataValues;
        if ( detail ) {
            successCode( res, { ...( detail ), mat_khau: '' }, 'Trả về thông tin người dùng thành công' );
        } else {
            successCode( res, { ...( detail ), mat_khau: '' }, 'Không tìm thấy người dùng' );
        }
    } catch ( err ) {
        console.log( err )
        errorCode( res, err.message );
    }
}

const updateUserInfo = async ( req, res ) => {
    try {
        const { email, mat_khau, ho_ten, tuoi } = req.body;
        const nguoi_dung_id = req.body.userId;
        if ( nguoi_dung_id ) {
            let modelUser = await model.nguoi_dung.update( {
                email, mat_khau: bcrypt.hashSync( mat_khau, Number( process.env.HASH_ROUND ) ), ho_ten, tuoi
            }, {
                where: {
                    nguoi_dung_id
                }
            } )
            successCode( res, modelUser, 'Cập nhật thông tin người dùng thành công' );
        } else {
            failCode( res, null, 'Không có id người dùng' );
        }

    } catch ( err ) {
        errorCode( res, 'Lỗi BE' )
    }
}

module.exports = {
    userCreate,
    userSignUp,
    userLogin,
    getUserInfo,
    updateUserInfo
}