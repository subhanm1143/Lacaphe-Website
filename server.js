const express = require('express');
const multer = require('multer');
const bcrypt = require('bcrypt');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const app = express();
const port = 3000;
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');

app.use(express.static(path.join(__dirname, 'STYLES')))
app.use(express.static(path.join(__dirname, 'PHOTOS')))
app.use(express.static(path.join(__dirname, 'ICONS')))
app.use(express.static(path.join(__dirname, 'COMPONENTS')))

// Set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/PAGES'));
app.use(express.static(path.join(__dirname, 'STYLES')))
app.use(express.static(path.join(__dirname, 'PHOTOS')))
app.use(express.static(path.join(__dirname, 'ICONS')))
app.use(express.static(path.join(__dirname, 'COMPONENTS')))

app.use(cookieParser());

var corsOptions = {
  origin: 'http://localhost:3000'
};

// Enable middleware
app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.render('index.ejs');
});

app.get('/about', (req, res) => {
  res.render('about.ejs');
});

app.get('/login', (req, res) => {
  res.render('login.ejs');
});

app.get('/review', (req, res) => {
  res.render('review.ejs');
});

app.get('/userLogout', (req, res) => {
  res.render('userLogout.ejs');
});
app.get('/drinks', (req, res) => {
  res.render('drinks.ejs');
});

app.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error("Error destroying session: ", err);
      return res.status(500).json({ message: 'Logout failed' });
    }
    
    res.clearCookie('connect.sid', { path: '/' });
    res.clearCookie('token', { path: '/' });
    res.cookie('jwt', '', { maxAge: 1, path: '/' });

    res.json({ message: 'Logged out successfully' });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
