const BookingModel = require('../Models/Booking.model')


// Create a new Booking
exports.create = async (req, res) => {
    try {
        req.body.end_date = null
        const newBooking = await BookingModel.create(req.body);
        res.status(201).json({ status: true, message: 'Created successfully', data: newBooking });
    } catch (err) {
        res.status(400).json({ status: false, message: 'Failed to create', error: err.message });
    }
};



// Create a new Booking
exports.getAll = async (req, res) => {
    try {
        const getAll = await BookingModel.find({ deletedAt: null }).sort({ createdAt: -1 }).populate("customerId");
        res.status(200).json({ status: true, message: 'Retrieved successfully', data: getAll });
    } catch (err) {
        res.status(400).json({ status: false, message: 'Failed to create', error: err.message });
    }
};