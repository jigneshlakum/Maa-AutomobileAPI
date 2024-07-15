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
        const { selectedDate } = req.body;
        let query = { deletedAt: null };
        if (selectedDate) {
            query.start_date = selectedDate
        }
        const getAll = await BookingModel.find(query).sort({ createdAt: -1 }).populate("customerId");
        res.status(200).json({ status: true, message: 'Retrieved successfully', data: getAll });
    } catch (err) {
        res.status(400).json({ status: false, message: 'Failed to retrieve', error: err.message });
    }
};


// Get getById 
exports.getById = async (req, res) => {
    try {
        const getItem = await BookingModel.findById(req.params.id);
        if (!getItem) {
            return res.status(404).json({ status: false, message: 'Booking not found' });
        }
        res.status(200).json({ status: true, message: 'Retrieved successfully', data: getItem });
    } catch (err) {
        res.status(500).json({ status: false, message: 'Failed to retrieve booking', error: err.message });
    }
};


exports.updateById = async (req, res) => {
    try {
        const { id, customerId, start_date, end_date, advance_payment, status, kilometres, issue, additional_requirements, services } = req.body;
        if (!id) {
            return res.status(400).json({ status: false, message: 'ID is required' });
        }
        // Update the booking
        const updatedBooking = await BookingModel.findByIdAndUpdate(id, {
            customerId, start_date, end_date, advance_payment,
            status, kilometres, issue, additional_requirements, services
        },
            { new: true }
        );
        // Check if the booking was found and updated
        if (!updatedBooking) {
            return res.status(404).json({ status: false, message: 'Not found' });
        }
        res.status(200).json({ status: true, message: 'Updated successfully', data: updatedBooking });
    } catch (err) {
        console.error('Error updating booking:', err);
        res.status(500).json({ status: false, message: 'Failed to update', error: err.message });
    }
};


// Soft delete by ID
exports.deleteById = async (req, res) => {
    const query = req.params.id;
    const update = { $set: { deletedAt: new Date() } };
    try {
      const deletedItem = await BookingModel.findByIdAndUpdate({ _id: query }, update);
      if (!deletedItem) {
        return res.status(404).json({ status: false, message: 'Not found' });
      }
      res.status(200).json({ status: true, message: 'Deleted successfully', data: deletedItem });
    } catch (err) {
      res.status(500).json({ status: false, message: 'Failed to delete', error: err.message });
    }
  };