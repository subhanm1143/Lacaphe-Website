const express = require('express');
const app = express();
const port = 3000;


app.use(express.static("./")); // I can't run the website properly without this line
app.get('/', (req, res) => {
  // Render 'index.ejs' from the 'views' folder
  res.render('index.ejs');
});app.get('/about', (req, res) => {
  // Render 'index.ejs' from the 'views' folder
  res.render('about.ejs');
});
app.get('/login', (req, res) => {
  // Render 'index.ejs' from the 'views' folder
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

  // Setup the database
  db.setupDatabase(function(err) {
    if (err) {
      console.error("Failed to setup database:", err);
    }
  });
});
