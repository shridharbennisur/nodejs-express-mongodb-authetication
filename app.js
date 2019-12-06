const express = require('express');
const bodyParser = require('body-parser');
const customResponses = require( "./middlewares/customResponses" );
const logger = require( "./utilities/logger" );
require('dotenv').config();

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());

app.use( customResponses );

require('./db/mongoose')(app);

require( "./routes" )(app);

app.use( ( req, res ) => {
    res.status(404).send({message: 'url not found'});
});

app.use( ( err, req, res, next ) => {
    console.log( err.stack );
    next( err );
} );

// Don't remove next !!!!
app.use( ( err, req, res, next ) => { // eslint-disable-line no-unused-vars
    res.status( 503 ).json( {
        success: false,
        error: "server_error",
    } );
} );

app.listen(process.env.PORT || 5000, () => {
    logger.info( `Listening on port ${ process.env.PORT }` );
});