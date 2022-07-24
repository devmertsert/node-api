const { body, validationResult } = require("express-validator");
const User = require("../models/user.model");
const { handleErrors } = require("./handleErrors");

module.exports = {
    signup: () => {
        return [
            body("name")
                .notEmpty().bail()
                .isString().bail()
                .isLength({ max: 20 }),
            body("surname")
                .notEmpty().bail()
                .isString().bail()
                .isLength({max: 20 }),
            body("username")
                .notEmpty().bail()
                .isString().bail()
                .isLength({ max: 20 }).bail()
                .custom((val) => {
                    return User.findOne({ lowercaseUsername: String(val).toLowerCase() }).then((user) => {
                        if(user) {
                            return Promise.reject("Username is taken");
                        }
                    });
                }),
            body("password")
                .notEmpty().bail()
                .isString().bail()
                .isLength({ min: 6, max: 16 })
        ]
    },

    signin: () => {
        return [
            body("username")
                .notEmpty().bail()
                .isLength({ max: 20 }),
            body("password")
                .notEmpty().bail()
                .isLength({ max: 16 })
        ]
    },

    validate: (req, res, next) => {
        const errors = validationResult(req);
        if(errors.isEmpty()) return next();

        errors.name = "expressValidationError";

        const error = handleErrors(errors);

        return res.status(error.code).json(error);
    }
}