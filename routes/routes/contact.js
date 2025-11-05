const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// POST route for contact form
router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // Gmail transporter (secure + simple)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER, // your Gmail address
        pass: process.env.GMAIL_PASS, // app password
      },
    });

    // Send mail
    await transporter.sendMail({
      from: email,
      to: process.env.GMAIL_USER,
      subject: `New message from ${name}`,
      text: `Email: ${email}\n\nMessage:\n${message}`,
    });

    res.render('contact', { message: '✅ Your message was sent successfully!' });
  } catch (err) {
    console.error(err);
    res.render('contact', { message: '❌ Failed to send message. Try again later.' });
  }
});

module.exports = router;
