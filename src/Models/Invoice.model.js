const mongoose = require('mongoose');

const InvoiceItemSchema = new mongoose.Schema({
    description: String,
    quantity: Number,
    unitPrice: Number,
    total: Number
});

const InvoiceSchema = new mongoose.Schema({
    customerId: String,
    invoiceNumber: String,
    date: String,
    finalAmount: Number,
    InvoiceItems: [InvoiceItemSchema]
}, { timestamps: true });

const Invoice = mongoose.model('Invoice', InvoiceSchema);

module.exports = Invoice;
