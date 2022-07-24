const { handleErrors } = require("../helpers/handleErrors");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

module.exports = {
    signup: async (req) => {
        try {

            const {
                name,
                surname,
                username,
                password
            } = req.body;

            const user = new User({
                name,
                surname,
                username,
                lowercaseUsername: String(username).toLowerCase(),
                password
            });

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
    },

    signin: async (req) => {
        try {
            
            const {
                username,
                password
            } = req.body;

            const user = await User.findOne({ username });

            if(user) {
                if(user.isValid(password)) {
                    const refresh = jwt.sign({ id: user._id }, process.env.JWT_REFRESH_TOKEN_SECRET, { expiresIn: '1d' });
                    const access = jwt.sign({ id: user._id }, process.env.JWT_ACCESS_TOKEN_SECRET, { expiresIn: '1h' });

                    return {
                        code: 200,
                        status: 'success',
                        message: 'Signed in successfully',
                        data: {
                            user: {
                                name: user.name,
                                surname: user.surname,
                                username: user.username
                            },
                            tokens: {
                                refresh,
                                access
                            }
                        }
                    }
                }
            }

            return {
                code: 401,
                status: 'error',
                message: 'username or password is incorrect',
                error: {}
            }
        } catch (error) {
            return handleErrors(error);
        }
    }
}