const Joi = require('joi');
module.exports = () => {
    function validateUserData(data = {}) {
        const schema = {
            email: Joi.string().email().required(),
            username: Joi.string().required(),
            password: Joi.string().required()
        }
        const result = Joi.validate(data, schema);
        if (result.error) {
            return false;
        }
        return true;
    }

    function validateUserLoginData(data = {}) {
        const schema = {
            email: Joi.string().email().required(),
            password: Joi.string().required()
        }
        const result = Joi.validate(data, schema);
        if (result.error) {
            return false;
        }
        return true;
    }

    return {
        validateUserData,
        validateUserLoginData
    }
};