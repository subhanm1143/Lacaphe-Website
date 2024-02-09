const express = require('express');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const app = express();
const port = 3000;
const db = require('./DATABASE/database'); 
const path = require('path');
app.use(express.static(path.join(__dirname, 'STYLES')))
app.use(express.static(path.join(__dirname, 'PHOTOS')))
app.use(express.static(path.join(__dirname, 'ICONS')))
app.use(express.static(path.join(__dirname, 'COMPONENTS')))
// Set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/PAGES'));

app.use(express.json());
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
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const userId = uuidv4();

    const hashedPassword = await bcrypt.hash(password, 10);


    const insertUserSql = "INSERT INTO UserLogin (uuid, email, password) VALUES (?,?,?)";

  
    db.getCon().query(insertUserSql, [userId , email, hashedPassword], (err, result) => {
      if (err) {
        console.error('Error inserting new user:', err);
        res.status(500).send('Error during registration');
        return;
      }

      res.send('User registered successfully');
    });

  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).send('Error during registration');
  }
});

app.get('/drinks', (req, res) => {
  
  res.render('drinks.ejs');
});

app.get('/drinks/list', (req, res) => {
  let type = req.query.type;
  // console.log(type);
  db.getCon().query('SELECT * FROM Drinks WHERE type = ?', [type], (err, result) => {
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
