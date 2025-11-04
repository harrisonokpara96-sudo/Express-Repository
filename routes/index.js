var express = require('express');
var router = express.Router();

// Home page
router.get('/', function (req, res) {
  res.render('index', { title: 'Home' });
});

// About page
router.get('/about', function (req, res) {
  res.render('about', { title: 'About' });
});

// Projects page
router.get('/projects', function (req, res) {
  res.render('project', { title: 'Projects' });
});

// Contact page
router.get('/contact', function (req, res) {
  res.render('contact', { title: 'Contact' });
});

module.exports = router;
router.get('/contact', (req, res) => {
  res.render('contact', { page: 'contact' });
});
