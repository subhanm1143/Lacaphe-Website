
var mysql = require('mysql2');
var con;
const config = require("../CONFIG/db.config.js");

function connectToDatabase() {
  con = mysql.createConnection({

    host: "localhost",
    user: "liberio",
    password: "DemBoys"
  });
  con.connect(err => {
    setupDatabase(err);
  });
}

function setupDatabase(err) {
  if (err) throw err;
  console.log("Connected to local mysql server!");

  con.query("CREATE DATABASE IF NOT EXISTS lacaphedb")
  if (err) throw err;
  console.log("Database created");
  con.query("use lacaphedb")
  if (err) throw err;

  var dropsql = "DROP TABLE IF EXISTS Drinks"
  con.query(dropsql, function (err) {
    if (err) throw err;
    console.log("Drink table dropped if it exits");
  })
  var dropUserSql = "DROP TABLE IF EXISTS UserLogin"
  con.query(dropUserSql, function (err) {
    if (err) throw err;
    console.log("User table dropped if it exits");
  })
  createDrinkTable();
  createUserLoginTable();
}
function createDrinkTable(){
  // 's' = signature drinks, 'c' = coffee, 't' = tea, 'i' = ice blended
  var tablesql = "CREATE TABLE Drinks(id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), image VARCHAR(255), price DECIMAL(5,2), type VARCHAR(2), description VARCHAR(255))"
  con.query(tablesql, function (err) {
    if (err) throw err;
    console.log("Drink table created");
  })
  populateDrinktable();
}
function createUserLoginTable(){


  const userLoginTable = `
  CREATE TABLE UserLogin (
    uuid VARCHAR(36) PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
  )`;
  con.query(userLoginTable, function (err) {
    if (err) throw err;
    console.log("User table created");
  })

}
function populateDrinktable(){
  // The image path is a URL, not a computer path
  var insertsql = "INSERT INTO Drinks(name, image,price,type, description) VALUES('boba tea','/drinksPNGS/test1.jpg',2.50,'t', 'desc 1'),"
    + "('lychee Tea','/drinksPNGS/test2.jpg',3.75, 't', 'desc 2'),"
    + "('Test Coffee','/drinksPNGS/test3.webp',5.00, 'c', 'desc 3'),"
    + "('Some Signature Drink', '/drinksPNGS/test4.jpg', 5.00, 's', 'desc 4'),"
    + "('Ice Blended Drink', '/drinksPNGS/test5.jpg', 2.75, 'i', 'desc 5');"
  con.query(insertsql, function (err) {
    if (err) throw err;
    console.log("Test table filled");
  })
  selectFromDrinkTable();
}
function selectFromDrinkTable(){
  var getsql = "SELECT * from Drinks"
  con.query(getsql, function (err, result) {
    if (err) console.log(err);
    else {
      const data = JSON.stringify(result)
      console.log(data)
    }
  })

}

/**
 * Function that gets the connection instance
 * 
 * @returns The connection instance (Don't reference object directly)
 */
function getCon() {
  if (!con) {
    connectToDatabase();
  }
  return con;
}

module.exports = {
  connectToDatabase, setupDatabase, getCon
}


