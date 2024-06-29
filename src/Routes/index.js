const express = require('express');
const router = express.Router();
const AdminController = require('../Controllers/Admin.controller')


router.post('/admin',AdminController.adminSave)



module.exports = router;