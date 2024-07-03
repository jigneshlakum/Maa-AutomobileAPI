const jwt = require('jsonwebtoken');
const Admin = require('../Models/Admin.model');

const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader 

    if (!token) {
        return res.status(401).json({ message: "Unauthorized", status: 401 });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const admin = await Admin.findById(decoded.id);

        if (!admin) {
            return res.status(403).json({ message: "Forbidden", status: 403 });
        }

        req.admin = admin;
        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error", status: 500 });
    }
};

module.exports = authenticateToken;
