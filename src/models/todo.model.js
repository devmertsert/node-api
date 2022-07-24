const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const schema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    content: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

schema.plugin(uniqueValidator);

module.exports = mongoose.model('todo', schema);