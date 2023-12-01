const express = require('express');
const app = express();
const port = 3000;
const db = require('./database'); // Importing the database module

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/PAGES/index.html');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

db.connectToDatabase(); // Establish connection to the database
db.setupDatabase(); // Setup the database
