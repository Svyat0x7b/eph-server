const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    firstname: { type: String },
    lastname: { type: String },
    address: { type: String },
    password: { type: String },
    token: { type: String },
});

module.exports = mongoose.model('user', userSchema);
