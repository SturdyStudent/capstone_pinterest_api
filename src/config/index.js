require( 'dotenv' ).config();
module.exports = {
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    baseUrl: `${ process.env.DB_HOST }:${ Number( process.env.WEB_HOST_PORT ) }/`
}