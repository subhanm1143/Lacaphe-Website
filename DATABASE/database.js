var mysql = require('mysql2');
const dotenv = require('dotenv')
dotenv.config({path: './.env'})
// Create a MySQL connection
var con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

// Function to establish a connection to the database
function connectToDatabase(callback) {
  con.connect(function(err) {
    if (err) {
      console.error("Error connecting to local MySQL server:", err);
      return callback(err);
    }
    console.log("Connected to local MySQL server!");
    callback(null);
  });
}

// Function to setup the database
function setupDatabase(callback) {
  con.query("CREATE DATABASE IF NOT EXISTS lacaphedb", function(err) {
    if (err) {
      console.error("Error creating database:", err);
      return callback(err);
    }
    console.log("Database created");

    con.query("USE lacaphedb", function(err) {
      if (err) {
        console.error("Error using database:", err);
        return callback(err);
      }

      var tablesql = "CREATE TABLE IF NOT EXISTS testtable (id INT AUTO_INCREMENT PRIMARY KEY, drink VARCHAR(255), image VARCHAR(255), price DECIMAL(5,2))";
      con.query(tablesql, function(err) {
        if (err) {
          console.error("Error creating table:", err);
          return callback(err);
        }
        console.log("Test table created");
        callback(null);
      });
      var USER = "CREATE TABLE IF NOT EXISTS USER_LOGIN (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), email VARCHAR(255), password VARCHAR(255))";
      con.query(USER, function(err) {
        if (err) {
          console.error("Error creating table:", err);
          return callback(err);
        }
        console.log("USER table created");
        callback(null);
      });
    });
  });
}

module.exports = {
  connectToDatabase,
  setupDatabase
};

