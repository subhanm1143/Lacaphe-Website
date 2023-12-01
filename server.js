const express = require('express');
const app = express();
const port = 3000;
const db = require('./DATABASE/database'); 
const path = require('path');
app.use(express.static(path.join(__dirname, 'STYLES')))
app.use(express.static(path.join(__dirname, 'PHOTOS')))
app.use(express.static(path.join(__dirname, 'ICONS')))
// Set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/PAGES'));


//test
// Serve static files from the 'public' directory
app.use(express.static('public'));

app.get('/', (req, res) => {
 
  res.render('index.ejs');
});app.get('/about', (req, res) => {
  
  res.render('about.ejs');
});
app.get('/login', (req, res) => {
  
  res.render('login.ejs');
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Establish connection to the database
db.connectToDatabase(function(err) {
  if (err) {
    console.error("Failed to connect to database:", err);
    return;
  }

  // If connection is successful, proceed to set up the database
  db.setupDatabase(function(err) {
    if (err) {
      console.error("Failed to setup database:", err);
      return;
    }
  });
});
