const express = require('express');
const app = express();
const port = 3000;
const db = require('./DataBase/database.js'); // Importing the database module

app.use(express.static("./")); // I can't run the website properly without this line
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/PAGES/index.html');
});
app.get('/about', (req, res) => {
  res.sendFile(__dirname + '/PAGES/about.html');
});
app.get('/order', (req, res) => {
  res.sendFile(__dirname + '/PAGES/order.html');
});
app.get('/drinks', (req, res) => {
  res.sendFile(__dirname + '/PAGES/drinks.html');
});
app.get('/drinks/list', (req, res) => {
  let type = req.query.type;
  let name = req.query.name;
  let query = '';
  let queryParams = [];

  if (type) {
    query = 'SELECT * FROM testtable WHERE type = ?';
    queryParams = [type];
  } else if (name) {
    // Assuming the 'name' column in your database is the one to search by
    query = 'SELECT * FROM testtable WHERE name LIKE ?';
    queryParams = [`%${name}%`]; // Use LIKE for partial matches
  } else {
    res.status(400).send('Missing type or name query parameter');
    return;
  }

  db.getCon().query(query, queryParams, (err, result) => {
    if (err) {
      res.status(500).send('Database Error :(');
      console.error(err);
      return;
    }
    res.json(result);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

db.connectToDatabase(); // Establish connection to the database
db.setupDatabase(); // Setup the database
