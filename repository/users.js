module.exports = () => {
    const userModel = require('../models/user');
    function getUsers(data = {}) {
        try {
            const allUsers = userModel.find(data);
            return (allUsers);
        } catch (err) {
            return [];
        }
    }

    function createUser(requestData = {}) {
        try {
            const data = {
                email: requestData.email,
                password: requestData.password,
                username: requestData.username
            }
            const user = new userModel(data);
            user.setPass(data.password);
            return user.save();
        } catch (err) {
            return err;
        }
       
    }

    function getUser(data) {
        try {
            const user = userModel.findOne(data);
            return (user);
        } catch (err) {
            return {};
        }
    }
    return {
        getUsers,
        createUser,
        getUser
    }
}