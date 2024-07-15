const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    serviceType: { type: String },
    price: { type: Number },
});

const bookingSchema = new mongoose.Schema({
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    start_date: { type: String },
    end_date: { type: String },
    advance_payment: { type: Number },
    status: { type: String },
    kilometres: { type: Number },
    mileage: { type: String },
    issue: { type: String },
    additional_requirements: { type: String },
    services: [serviceSchema],
    deletedAt: { type: Date, default: null },
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
