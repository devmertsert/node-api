const { handleErrors } = require("../helpers/handleErrors");
const User = require("../models/user.model");

module.exports = {
    signin: async (req) => {
        try {

            const { username, password } = req.body;

            const user = new User({ username, password });

            await user.save();

            return {
                code: 201,
                message: 'User created successfully',
                status: 'success',
                data: {
                    username: user.username
                }
            }
        } catch (error) {
            return handleErrors(error);
        }
    }
}