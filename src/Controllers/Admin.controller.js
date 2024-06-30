const Admin = require('../Models/Admin.model');
// import bcrypt from 'bcryptjs';
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;


exports.adminSave = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const newAdmin = new Admin({
            name,
            email,
            password,
        });
        const savedAdmin = await newAdmin.save();

        res.status(201).json({
            message: 'Admin saved successfully',
            status: true,
            data: savedAdmin,
        });
    } catch (error) {
        console.error('Error saving admin:', error);
        res.status(500).json({
            message: 'Failed to save admin',
            status: false,
            error: error.message,
        });
    }
};


exports.getAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Admin.findOne({ $and: [{ email }, { password }] });
        if (!user) {
            return res.status(400).json({ status: false, message: 'Invalid email or password' });
        }
        // const isMatch = await bcrypt.compare(password, user.password);
        // if (!isMatch) {
        //     return res.status(400).json({ status: false, message: 'Invalid email or password' });
        // }
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '2h' });
        res.status(201).json({
            message: 'Login successfully',
            token: token,
            status: true,
            data: { name: user.name, email: user.email, },
        });
    } catch (error) {
        console.error('Error saving admin:', error);
        res.status(500).json({
            message: 'Failed to save admin',
            status: false,
            error: error.message,
        });
    }
};