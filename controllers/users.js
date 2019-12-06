module.exports = function() {
    const validateRequestData = require('../middlewares/validateRequestData')();
    const userRepo = require('../repository/users')();
    async function getUsers(req, res) {
        try {
            const allUsers = await userRepo.getUsers({});
            return res.success(allUsers);
        } catch (err) {
            return res.failure(err.status, err);
        }
       
    };

    async function createUser(req, res) {
        try {
            if (!validateRequestData.validateUserData(req.body)) {
                return res.preconditionFailed("fields are missing");
            }
            const result = await userRepo.createUser(req.body);
            return res.success(result);
        } catch (err) {
            return res.failure(420, err);
        }
    };

    function updateUser() {

    }

    function deleteUser() {

    }

    return {
        getUsers,
        createUser,
        updateUser,
        deleteUser
    }
};