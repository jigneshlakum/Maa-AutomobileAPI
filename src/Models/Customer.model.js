const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
  vehicleNumber: { type: String, required: true },
  customerName: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  email: { type: String, required: true },
  city: { type: String, required: true },
  brandName: { type: String, required: true },
  modelName: { type: String, required: true },
  carService: { type: String, required: true },
  fullAddress: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  deletedAt: { type: Date, default: null }
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
