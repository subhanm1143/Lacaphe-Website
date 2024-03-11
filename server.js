const express = require('express');
const bcrypt = require('bcrypt');

//const jwt = require('jsonwebtoken');

const cors = require('cors');

const { v4: uuidv4 } = require('uuid');
//const cookieParser = require('cookie-parser');

const app = express();
const port = 3000;
const db = require('./DATABASE/database'); 
const path = require('path');
const config = require("./CONFIG/auth.config");


const {verifyToken} = require('./MIDDLEWARE/authjwt.js');
app.use(express.static(path.join(__dirname, 'STYLES')))
app.use(express.static(path.join(__dirname, 'PHOTOS')))
app.use(express.static(path.join(__dirname, 'ICONS')))
app.use(express.static(path.join(__dirname, 'COMPONENTS')))
const session = require('express-session');

// Set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/PAGES'));

app.use(cookieParser());



var corsOptions ={
  origin: 'http://localhost:3001'
};
//enable middleware
app.use(cors(corsOptions));


app.use(express.json());
app.use(cookieParser());
//test
// Serve static files from the 'public' directory
app.use(express.static('public'));
app.use(session({
  secret: 'yourSecretKey',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: 'auto' } // 'auto' will use 'true' on HTTPS
}));
app.get('/', (req, res) => {
 
  res.render('index.ejs');

});app.get('/about', (req, res) => {
  
  res.render('about.ejs');
});

app.get('/login', (req, res) => {
  
  res.render('login.ejs');
});

app.get('/userLogout', (req, res) => {
  
    res.render('userLogout.ejs');
  });

// TODO: Temporary page, get rid of later
app.get('/admin', (req, res) => {
  res.render('admin.ejs');
});
const secretKey = "yourSecretKey";
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const userId = uuidv4();
    const hashedPassword = await bcrypt.hash(password, 10);


    //const insertUserSql = "INSERT INTO UserLogin (uuid, email, password) VALUES (?, ?, ?)";
    db.getCon().query(insertUserSql, [userId, email, hashedPassword], (err, result) => {


    const insertUserSql = "INSERT INTO UserLogin (uuid, email, password) VALUES (?,?,?)";

    //create a local access token for the user
    try{
      const user ={userId,email};
      const accessToken = jwt.sign(user,config.access_secret,
        {algorithm: 'HS256', expiresIn:'15m'});
      const refreshToken = jwt.sign(user,config.refresh_secret,
        {algorithm: 'HS256',expiresIn:'120m'});
      res.cookie('refresh_token',refreshToken,{httpOnly:true});
      res.json({accessToken,refreshToken});
    }
    catch(error){
      res.status(401).json({error:error.message})
    }
    
  
    db.getCon().query(insertUserSql, [userId , email, hashedPassword], (err, result) => {

      if (err) {
        console.error('Error inserting new user:', err);
        //return res.status(500).send('Error during registration');
      }

      //res.send('User registered successfully');
    });


      //res.send('User registered successfully');
    });
    

  } catch (error) {
    console.error('Error during registration:', error);
    //res.status(500).send('Error during registration');
  }
  try {
    const { email, password } = req.body;
    const findUserSql = "SELECT * FROM UserLogin WHERE email = ?";

    db.getCon().query(findUserSql, [email], async (err, users) => {
      if (err) {
        console.error('Error fetching user:', err);
        return res.status(500).send('Error during login'); // Use return here
      }

      if (users.length === 0) {
        return res.status(404).send('User not found'); // Use return here
      }

      const user = users[0];
      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        const accessToken = jwt.sign({  email: user.email }, secretKey, { expiresIn: '1h' });
        res.cookie('token', accessToken, { httpOnly: true, secure: true, sameSite: 'strict' });
        console.log("Match");
        return res.json({ accessToken }); // Use return here
      } else {
        return res.status(401).send('Password is incorrect'); // Use return here
      }
    });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).send('Error during login'); // Use return here
  }
});

function authenticateToken(req, res, next) {
  const token = req.cookies['token']; // Access the token from the request cookies
  if (!token) return res.sendStatus(401); // No token found

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.sendStatus(403); // Token validation failed

    req.user = user; // Token is valid, proceed
    next();
  });
}
app.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error("Error destroying session: ", err);
      return res.status(500).json({ message: 'Logout failed' });
    }
    
    // Clear any authentication-related cookies
    res.clearCookie('connect.sid', { path: '/' }); // Adjust based on your session cookie's name
    res.clearCookie('token', { path: '/' }); // If you are using a 'token' cookie
    // Set 'jwt' cookie to expire immediately
    res.cookie('jwt', '', { maxAge: 1, path: '/' });

    // Send a JSON response indicating logout success
    res.json({ message: 'Logged out successfully' });
  });
});



app.get('/protected', authenticateToken, (req, res) => {
  // This route is now protected, and req.user contains the payload of the verified JWT
  res.send("welcome!!!")
});

app.get('/adminlogin', (req,res) =>{ //temporary page for admin login

  res.render('adminLogin.ejs')  
});

app.post('/adminLogin', async (req, res) => {
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
  let name = req.query.name;
  let query = '';
  let queryParams = [];

  if (type) {
    query = 'SELECT * FROM Drinks WHERE type = ?';
    queryParams = [type];
  } else if (name) {
    // Assuming the 'name' column in your database is the one to search by
    query = 'SELECT * FROM Drinks WHERE name LIKE ?';
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

//test authorization
//,function(req,res){verifyToken}
app.post('/tokenTest',(req, res) => {
  res.json("testing authentiification")
})
app.get('/tokenTest',verifyToken,verifyToken,(req, res) => {
  res.json("authoriztion worked")
})
