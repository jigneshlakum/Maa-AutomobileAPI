const express = require('express');
const router = express.Router();
const AdminController = require('../Controllers/Admin.controller')
const CustomerController = require('../Controllers/Customer.controller');
const BookingController = require('../Controllers/Booking.controller');
const authenticateToken = require('../Middleware/authenticate');

// router.post('/admin/login',AdminController.adminSave)
router.post('/admin/login', AdminController.getAdmin)


// Customers
router.post('/customers', authenticateToken, CustomerController.createCustomer);
router.get('/customers', authenticateToken, CustomerController.getAllCustomers);
router.get('/customers/:id',authenticateToken, CustomerController.getCustomerById);
router.put('/customers',authenticateToken, CustomerController.updateCustomerById);
router.delete('/customers/:id',authenticateToken, CustomerController.deleteCustomerById);


// Customers
router.post('/booking', authenticateToken, BookingController.create);
router.post('/getbooking', authenticateToken, BookingController.getAll);
router.get('/booking/:id',authenticateToken, BookingController.getById);
router.post('/bookingUpdate', authenticateToken,BookingController.updateById);
router.delete('/booking/:id', BookingController.deleteById);



module.exports = router; 