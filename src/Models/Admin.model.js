// models/User.js
const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: false,
    },
    password: {
        type: String,
        required: true,
    },
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
