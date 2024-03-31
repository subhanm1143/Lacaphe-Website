
var mysql = require('mysql2');
var con;
const config = require("../CONFIG/db.config.js");

function connectToDatabase() {
  con = mysql.createConnection({

    host: "localhost",
    user: "root",
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
    password VARCHAR(255) NOT NULL,
    role VARCHAR(255)
  )`;
  con.query(userLoginTable, function (err) {
    if (err) throw err;
    console.log("User table created");
  })

}

function populateDrinktable(){
  var insertsql = "INSERT INTO Drinks(name, image, price, type, description) VALUES('boba tea','https://www.unionsquareawards.org/wp-content/uploads/2019/09/images3904-5d882e0c1594c.jpg',2.50,'t', 'desc 1'),"
    + "('Eggspresso Hanoi','https://146372128.cdn6.editmysite.com/uploads/1/4/6/3/146372128/s387883941657224239_p1_i1_w4160.png?width=1280&dpr=1',6.95, 'e', 'phin-dripped milk coffee with sweet egg cream'),"
    + "('Coco Freeze','https://146372128.cdn6.editmysite.com/uploads/1/4/6/3/146372128/s387883941657224239_p3_i1_w4160.png?width=1280&dpr=1',6.50, 'c', 'coconut coffee blended with toasted coconut flakes'),"
    + "('Signature Saigon', 'https://146372128.cdn6.editmysite.com/uploads/1/4/6/3/146372128/s387883941657224239_p19_i1_w4160.png?width=1280&dpr=1', 6.75, 's', 'our house blend coffee with cloud cream'),"
    + "('Peach', 'https://146372128.cdn6.editmysite.com/uploads/1/4/6/3/146372128/s387883941657224239_p5_i1_w4160.png?width=1280&dpr=1', 6.75, 'p', 'black tea infused with peach, orange, lemongrass'),"
    + "('Lotus', 'https://146372128.cdn6.editmysite.com/uploads/1/4/6/3/146372128/s387883941657224239_p10_i1_w4160.png?width=1280&dpr=1', 6.50, 'l', 'creamy lotus milk tea with crystal boba');"
    
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


