const { body, validationResult } = require("express-validator");
const User = require("../models/user.model");
const { handleErrors } = require("./handleErrors");

module.exports = {
    signin: () => {
        return [
            body("username")
                .notEmpty().bail()
                .isString().bail()
                .isLength({ max: 20 }).bail()
                .custom((val) => {
                    return User.findOne({ username: val }).then((user) => {
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
    validate: (req, res, next) => {
        const errors = validationResult(req);
        if(errors.isEmpty()) return next();

        errors.name = "expressValidationError";

        const error = handleErrors(errors);

        return res.status(error.code).json(error);
    }
}