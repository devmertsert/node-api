const { body, param, validationResult } = require("express-validator");
const User = require("../models/user.model");
const { handleErrors } = require("./handleErrors");

const { Types } = require("mongoose");

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

    todoCreate: () => {
        return [
            body("content")
                .notEmpty().bail()
                .isString()
        ]
    },

    todoGetById: () => {
        return [
            param("id").custom((val) => Types.ObjectId.isValid(val))
        ]
    },

    todoUpdate: () => {
        return [
            param("id").custom((val) => Types.ObjectId.isValid(val)),
            body("content")
                .notEmpty().bail()
                .isString()
        ]
    },

    todoDelete: () => {
        return [
            param("id").custom((val) => Types.ObjectId.isValid(val))
        ]
    },

    validate: (req, res, next) => {
        const errors = validationResult(req);
        if(errors.isEmpty()) return next();

        const extractedErrors = [];
        errors.array().map((err) => extractedErrors.push({
            key: err.param,
            value: err.msg === "Invalid value" ? "Please enter a valid " + err.param : err.msg
        }));

        return res.status(422).json({
            code: 422,
            status: 'error',
            message: 'Express Validation Error',
            error: extractedErrors
        });
    }
}