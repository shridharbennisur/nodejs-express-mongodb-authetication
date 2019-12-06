module.exports = () => {
    const userRepo = require('../repository/users')();
    const validateData = require('../middlewares/validateRequestData')();
    const checkPass = require('../utilities/index').checkPass;
    const { loginUserDetails } = require('../utilities/users');
    const jwt = require("jsonwebtoken");
    async function login(req, res) {
        try {
            if (!validateData.validateUserLoginData(req.body)) {
                return res.preconditionFailed("fields are missing");
            }
            const user = await userRepo.getUser({email: req.body.email});
            if (user && Object.keys(user).length) {
                if (checkPass(user.password, req.body.password)) {
                    user.token = jwt.sign( user.toObject(), process.env.MY_PRIVATE_KEY, { expiresIn: 1440 } );
                    return res.send(loginUserDetails(user));
                }
            } 
            return res.failure(400, "Invalid credentials");
        } catch (err) {
            return res.failure(400, "Invalid credentials");
        }
    };

    function logout(req, res) {
        return res.status(200);
    };

    return {
        login,
        logout
    }
};