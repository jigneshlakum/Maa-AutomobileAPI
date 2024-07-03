const Customer = require('../Models/Customer.model');
const { ObjectId } = require('mongodb'); // Import ObjectId from MongoDB



// Create a new customer
exports.createCustomer = async (req, res) => {
  try {
    const newCustomer = await Customer.create(req.body);
    res.status(201).json({ status: true, message: 'Created successfully', data: newCustomer });
  } catch (err) {
    res.status(400).json({ status: false, message: 'Failed to create', error: err.message });
  }
};

// Get all customers 
exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find({ deletedAt: null }).sort({ createdAt: -1 });
    res.status(200).json({ status: true, message: 'Retrieved successfully', data: customers });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Failed to retrieve', error: err.message });
  }
};

// Get customer by ID
exports.getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ status: false, message: 'Customer not found' });
    }
    res.status(200).json({ status: true, message: 'Retrieved successfully', data: customer });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Failed to retrieve customer', error: err.message });
  }
};

// Update customer by ID
exports.updateCustomerById = async (req, res) => {
  try {
    const query = req.body.id;
    const updatedCustomer = await Customer.findByIdAndUpdate({_id:query}, req.body, { new: true });
    if (!updatedCustomer) {
      return res.status(404).json({ status: false, message: 'Not found' });
    }
    res.status(200).json({ status: true, message: 'Updated successfully', data: updatedCustomer });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Failed to update', error: err.message });
  }
};

// Soft delete customer by ID
exports.deleteCustomerById = async (req, res) => {
  const query = req.params.id;
  const update = { $set: { deletedAt: new Date() } };
  try {
    const deletedCustomer = await Customer.findByIdAndUpdate({_id:query}, update);
    if (!deletedCustomer) {
      return res.status(404).json({ status: false, message: 'Not found' });
    }
    res.status(200).json({ status: true, message: 'Deleted successfully', data: deletedCustomer });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Failed to delete', error: err.message });
  }
};
