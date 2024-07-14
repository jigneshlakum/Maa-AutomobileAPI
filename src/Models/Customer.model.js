const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
  vehicleNumber: { type: String, required: true },
  customerName: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  email: { type: String, },
  city: { type: String,  },
  brandName: { type: String,  },
  modelName: { type: String, },
  carService: { type: String },
  fullAddress: { type: String },
  createdAt: { type: Date, default: Date.now },
  deletedAt: { type: Date, default: null }
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
