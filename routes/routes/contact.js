const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// Display contact page
router.get('/', (req, res) => {
  res.render('contact', { title: 'Contact', message: '' });
});

// Handle form submission
router.post('/send', (req, res) => {
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

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.render('contact', { title: 'Contact', message: 'Error sending message 😢. Try again later.' });
    } else {
      console.log('Email sent: ' + info.response);
      res.render('contact', { title: 'Contact', message: '✅ Message sent successfully!' });
    }
  });
});

module.exports = router;
