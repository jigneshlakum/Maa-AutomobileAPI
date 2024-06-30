const Customer = require('../Models/Customer.model');

// Create a new customer
exports.createCustomer = async (req, res) => {
  try {
    const newCustomer = await Customer.create(req.body);
    res.status(201).json({ status: true, message: 'Customer created successfully', data: newCustomer });
  } catch (err) {
    res.status(400).json({ status: false, message: 'Failed to create customer', error: err.message });
  }
};

// Get all customers (excluding deleted ones)
exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find({ deletedAt: null });
    res.status(200).json({ status: true, message: 'Customers retrieved successfully', data: customers });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Failed to retrieve customers', error: err.message });
  }
};

// Get customer by ID
exports.getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ status: false, message: 'Customer not found' });
    }
    res.status(200).json({ status: true, message: 'Customer retrieved successfully', data: customer });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Failed to retrieve customer', error: err.message });
  }
};

// Update customer by ID
exports.updateCustomerById = async (req, res) => {
  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCustomer) {
      return res.status(404).json({ status: false, message: 'Customer not found' });
    }
    res.status(200).json({ status: true, message: 'Customer updated successfully', data: updatedCustomer });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Failed to update customer', error: err.message });
  }
};

// Soft delete customer by ID
exports.deleteCustomerById = async (req, res) => {
  try {
    const deletedCustomer = await Customer.findByIdAndUpdate(req.params.id, { deletedAt: new Date() }, { new: true });
    if (!deletedCustomer) {
      return res.status(404).json({ status: false, message: 'Customer not found' });
    }
    res.status(200).json({ status: true, message: 'Customer deleted successfully', data: deletedCustomer });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Failed to delete customer', error: err.message });
  }
};
