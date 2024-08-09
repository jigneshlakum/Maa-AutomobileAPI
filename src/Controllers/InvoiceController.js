const Invoice = require("../Models/Invoice.model");
const Customer = require("../Models/Customer.model");
const sendMailService = require('../Middleware/emailService');
const ejs = require('ejs');
const path = require('path');
const moment = require('moment');

exports.createInvoice = async (req, res) => {
    try {
        const invoice = new Invoice(req.body);
        await invoice.save();

        // Send email on invoice creation
        if (invoice.customerId) {
            const customer = await Customer.findById(invoice.customerId);
            const getInvoice = await Invoice.findById(invoice._id);
            if (customer && customer.email) {
                const options = { year: 'numeric', month: 'long', day: 'numeric' };
                const formattedDate = new Intl.DateTimeFormat('en-US', options).format(new Date(getInvoice.date));

                const invoiceData = {
                    invoiceNumber: invoice.invoiceNumber,
                    date: formattedDate,
                    finalAmount: invoice.finalAmount.toFixed(2),
                    customerItem: {
                        vehicleNumber: customer.vehicleNumber,
                        customerName: customer.customerName,
                        mobileNumber: customer.mobileNumber,
                        email: customer.email,
                        fullAddress: customer.fullAddress,
                    },
                    InvoiceItems: getInvoice?.InvoiceItems
                };

                ejs.renderFile(
                    path.join(__dirname, '../views', 'invoice.ejs'),
                    invoiceData,
                    async (err, html) => {
                        if (err) {
                            console.error('Error rendering invoice template:', err);
                            return res.status(500).json({ status: false, message: 'Error generating invoice' });
                        }
                        const sendMailParams = {
                            to: customer.email,
                            // to: 'lakumjignesh914@gmail.com',
                            subject: "Invoice Created",
                            text: `Hello ${customer.name}, your booking has been confirmed.`,
                            html: html
                        };

                        try {
                            await sendMailService.sendMail(sendMailParams);
                            res.status(201).json({ status: true, message: 'Invoice created and email sent successfully', data: invoice });
                        } catch (mailError) {
                            console.error('Error sending email:', mailError);
                            res.status(500).json({ status: false, message: 'Invoice created, but failed to send email', error: mailError.message });
                        }
                    }
                );
            } else {
                res.status(404).json({ status: false, message: 'Customer not found or does not have an email address' });
            }
        } else {
            res.status(201).json({ status: true, message: 'Invoice created successfully', data: invoice });
        }
    } catch (error) {
        res.status(500).json({ status: false, message: 'Failed to create invoice', error: error.message });
    }
};

exports.updateInvoice = async (req, res) => {
    try {
        const invoice = await Invoice.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!invoice) {
            return res.status(404).json({ status: false, message: 'Invoice not found' });
        }
        res.status(200).json({ status: true, message: 'Invoice updated successfully', data: invoice });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Failed to update invoice', error: error.message });
    }
};

exports.getInvoiceById = async (req, res) => {
    try {
        const invoice = await Invoice.findById(req.params.id);
        if (!invoice) {
            return res.status(404).json({ status: false, message: 'Invoice not found' });
        }
        res.status(200).json({ status: true, message: 'Invoice retrieved successfully', data: invoice });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Failed to retrieve invoice', error: error.message });
    }
};

exports.getAllInvoices = async (req, res) => {
    try {
        const invoices = await Invoice.find();
        res.status(200).json({ status: true, message: 'Invoices retrieved successfully', data: invoices });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Failed to retrieve invoices', error: error.message });
    }
};

exports.deleteInvoice = async (req, res) => {
    try {
        const invoice = await Invoice.findByIdAndDelete(req.params.id);
        if (!invoice) {
            return res.status(404).json({ status: false, message: 'Invoice not found' });
        }
        res.status(200).json({ status: true, message: 'Invoice deleted successfully', data: invoice });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Failed to delete invoice', error: error.message });
    }
};