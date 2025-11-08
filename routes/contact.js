const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
require('dotenv').config();

// Contact form POST route
router.post('/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
      }
    });

    const mailOptions = {
      from: email,
      to: process.env.GMAIL_USER,
      subject: `Message from ${name}`,
      text: message
    };

    await transporter.sendMail(mailOptions);
    res.render('contact', { message: '✅ Message sent successfully!' });

  } catch (error) {
    console.error('Error sending email:', error);
    res.render('contact', { message: '❌ There was an error sending your message.' });
  }
});

module.exports = router;
