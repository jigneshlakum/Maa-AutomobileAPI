// emailService.js
const nodemailer = require('nodemailer');

// Create a transporter object using SMTP
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASSWORD,
    },
    tls: { rejectUnauthorized: false, },
});

// Define a function to send an email
exports.sendMail = (to, subject, text, html) => {
    const mailOptions = {
        from: process.env.USER_EMAIL,
        to: to,
        subject: subject,
        text: text,
        html: html,
    };
    return transporter.sendMail(mailOptions);
};

