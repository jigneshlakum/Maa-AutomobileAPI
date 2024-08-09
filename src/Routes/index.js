const express = require('express');
const router = express.Router();
const authenticateToken = require('../Middleware/authenticate');
const AdminController = require('../Controllers/Admin.controller')
const CustomerController = require('../Controllers/Customer.controller');
const BookingController = require('../Controllers/Booking.controller');
const InvoiceController = require('../controllers/InvoiceController');

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
router.delete('/booking/:id', authenticateToken,BookingController.deleteById);



router.post('/invoices', authenticateToken,InvoiceController.createInvoice);
router.put('/invoices/:id', authenticateToken,InvoiceController.updateInvoice);
router.get('/invoices/:id', authenticateToken,InvoiceController.getInvoiceById);
router.get('/invoices', authenticateToken,InvoiceController.getAllInvoices);
router.delete('/invoices/:id', authenticateToken,InvoiceController.deleteInvoice);


module.exports = router; 