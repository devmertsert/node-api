const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const bcryptjs = require("bcryptjs");

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        max: 20
    },
    surname: {
        type: String,
        required: true,
        max: 20
    },
    username: {
        type: String,
        required: true,
        unique: true,
        max: 20
    },
    lowercaseUsername: {
        type: String,
        required: true,
        unique: true,
        max: 20
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

schema.pre('save', function (next) {
    if (!this.isModified("password")) return next();

    const salt = bcryptjs.genSaltSync(12);
    this.password = bcryptjs.hashSync(this.password, salt);
    next();
});

schema.methods.isValid = function (password) {
    return bcryptjs.compareSync(password, this.password);
}

schema.plugin(uniqueValidator);

module.exports = mongoose.model('user', schema);