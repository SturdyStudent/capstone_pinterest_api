const jwt = require( 'jsonwebtoken' );

const generateToken = ( data ) => {
    let token = jwt.sign( { data }, 'key', { expiresIn: "5m", algorithm: 'HS256' } );

    return token;
}

const authentication = ( req, res, next ) => {
    try {
        let { token } = req.headers;
        let checkedToken = verifyToken( token );
        if ( checkedToken ) {
            let userId = checkedToken.data.data[ 0 ].nguoi_dung_id;
            req.body.userId = userId ?? 0;
            next();
        }
    } catch ( err ) {
        console.log( err );
        res.status( 401 ).send( 'Bạn không có quyền truy cập' );
    }
}

const verifyToken = ( token ) => {
    let checkedToken = jwt.verify( token, 'key' );
    return checkedToken;
}

const decodedToken = ( token ) => {
    let decode = jwt.decode( token );
    return decode;
}

module.exports = {
    generateToken,
    verifyToken,
    decodedToken,
    authentication
}