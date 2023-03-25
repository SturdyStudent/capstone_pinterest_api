const express = require( 'express' );
const cors = require( 'cors' );
const app = express();
const rootRoute = require( './routes/rootRoute' );
const PORT = 3000;

app.use( express.json() );
app.use( cors() );
app.use( express.static( "." ) );

app.listen( 3000, () => {
    console.log( `Server is running on port ${ PORT }` );
} )

app.use( '/api', rootRoute );

