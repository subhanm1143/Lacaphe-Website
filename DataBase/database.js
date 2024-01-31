
var mysql = require('mysql2');
var con;
function connectToDatabase() {
  con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "DemBoys!!!!"
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

  var dropsql = "DROP TABLE IF EXISTS testtable"
  con.query(dropsql, function (err) {
    if (err) throw err;
    console.log("Test table dropped if it exits");
  })
  createDrinkTable();
}
function createDrinkTable(){
  // 's' = signature drinks, 'c' = coffee, 't' = tea, 'i' = ice blended
  var tablesql = "CREATE TABLE testtable(id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), image VARCHAR(255), price DECIMAL(5,2), type VARCHAR(2))"
  con.query(tablesql, function (err) {
    if (err) throw err;
    console.log("Test table created");
  })
  populateDrinktable();
}

function populateDrinktable(){
  var insertsql = "INSERT INTO testtable (name, image,price,type) VALUES('boba tea','https://www.unionsquareawards.org/wp-content/uploads/2019/09/images3904-5d882e0c1594c.jpg',2.50,'t'),"
    + "('lychee Tea','https://s3-media0.fl.yelpcdn.com/bphoto/Z0nZF9zYTaMVT5nbbGuxDA/o.jpg',3.75, 't'),"
    + "('Test Coffee','https://images.immediate.co.uk/production/volatile/sites/30/2020/08/flat-white-3402c4f.jpg?quality=90&webp=true&resize=500,454',5.00, 'c'),"
    + "('Some Signature Drink', 'http://1.bp.blogspot.com/-JFw1MGN5OoM/UD-BpCdlxzI/AAAAAAAAEMQ/brNZEjdhZWU/s1600/Lychee%2BMartini%2B3fc.jpg', 5.00, 's'),"
    + "('Ice Blended Drink', 'https://www.gfbfood.com.my/wp-content/uploads/2020/03/Untitled-design-1.jpg', 2.75, 'i');"
  con.query(insertsql, function (err) {
    if (err) throw err;
    console.log("Test table filled");
  })
  selectFromDrinkTable();
}
function selectFromDrinkTable(){
  var getsql = "SELECT * from testtable"
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

