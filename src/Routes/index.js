const express = require('express');
const router = express.Router();
const AdminController = require('../Controllers/Admin.controller')
const CustomerController =  require('../Controllers/Customer.controller')

// router.post('/admin/login',AdminController.adminSave)
router.post('/admin/login',AdminController.getAdmin)


// Customers
router.post('/customers', CustomerController.createCustomer);
router.get('/customers', CustomerController.getAllCustomers);
router.get('/customers/:id', CustomerController.getCustomerById);
router.put('/customers/:id', CustomerController.updateCustomerById);
router.delete('/customers/:id', CustomerController.deleteCustomerById);


module.exports = router; 