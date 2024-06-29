const Admin = require('../Models/Admin.model');

exports.adminSave = async (req, res) => {
    try {
        console.log(res.body);
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
