const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// GET contact page
router.get('/', (req, res) => {
  res.render('contact', { title: 'Contact', message: null });
});

// POST route for sending emails
router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: email,
      to: process.env.GMAIL_USER,
      subject: `New message from ${name}`,
      text: `Email: ${email}\n\nMessage:\n${message}`,
    });

    res.render('contact', {
      title: 'Contact',
      message: '✅ Your message was sent successfully!',
    });
  } catch (err) {
    console.error(err);
    res.render('contact', {
      title: 'Contact',
      message: '❌ Message failed to send. Please try again later.',
    });
  }
});

module.exports = router;
