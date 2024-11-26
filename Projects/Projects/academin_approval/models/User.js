// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true } // Dealing Hand, Dean Academic, Dr. Academics, Section In-Charge
});

const User = mongoose.model('User', userSchema);
module.exports = User;
