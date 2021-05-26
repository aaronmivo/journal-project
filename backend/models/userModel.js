const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    passwordHash: String,
})

userSchema.plugin(uniqueValidator)
const User = mongoose.model("user", userSchema);

module.exports = User;