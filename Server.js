const express = require('express');
const app = express();
const port = 4000;

// Middleware to check if it's within working hours
const checkWorkingHours = (req, res, next) => {
  const date = new Date();
  const day = date.getDay();
  const hour = date.getHours();


  if (day >= 1 && day <= 8 ) {
    next();
  } else {
    res.send('The website is only available during working hours (Monday to Friday, from 9 to 17).');
  }
};

// Serve static files in the 'public' directory
app.use(express.static('public'));

// Routes
app.get('/', checkWorkingHours, (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/services', checkWorkingHours, (req, res) => {
  res.sendFile(__dirname + '/services.html');
});

app.get('/contact', checkWorkingHours, (req, res) => {
  res.sendFile(__dirname + '/contact.html');
});

// Start the server
app.listen(port)
