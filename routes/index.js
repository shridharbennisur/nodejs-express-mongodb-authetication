const authRouter = require( "./auth" );
const usersRouter = require( "./users" );
const validateToken = require( "../middlewares/validateToken" );
module.exports = (app) => {
    app.use('/auth', authRouter);
    app.use( "/users", validateToken, usersRouter);
};